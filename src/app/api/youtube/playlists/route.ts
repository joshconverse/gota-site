import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export async function GET() {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_HANDLE = '@GraceontheashleyOrg';

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
  }

  // Check file-based cache first
  try {
    const cachePath = path.join(process.cwd(), 'logs', 'youtube-playlists-cache.json');
    if (fs.existsSync(cachePath)) {
      const cacheContent = fs.readFileSync(cachePath, 'utf8');
      const parsed = JSON.parse(cacheContent);
      if (parsed && parsed.ts && Array.isArray(parsed.playlists)) {
        const cacheAge = Date.now() - new Date(parsed.ts).getTime();
        if (cacheAge < CACHE_TTL_MS) {
          console.log('[YouTube API] Returning cached playlists', {
            cacheTs: parsed.ts,
            ageMinutes: Math.round(cacheAge / 60000),
            playlistCount: parsed.playlists.length
          });
          return NextResponse.json({ playlists: parsed.playlists }, {
            headers: {
              'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600',
            }
          });
        } else {
          console.log('[YouTube API] Cache expired, fetching fresh data', {
            cacheTs: parsed.ts,
            ageMinutes: Math.round(cacheAge / 60000)
          });
        }
      }
    }
  } catch (cacheErr) {
    console.warn('[YouTube API] Failed to read cache:', cacheErr);
  }

  try {
    // First, get the channel ID from the handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(CHANNEL_HANDLE)}&type=channel&key=${YOUTUBE_API_KEY}&maxResults=1`
    );

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('YouTube API search error:', searchResponse.status, errorText);
      return NextResponse.json(
        { error: `YouTube API error: ${searchResponse.status}`, details: errorText },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    const channelId = searchData.items?.[0]?.snippet?.channelId;

    if (!channelId) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    // Get playlists from the channel
    const playlistsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&key=${YOUTUBE_API_KEY}&maxResults=50`
    );

    if (!playlistsResponse.ok) {
      const errorText = await playlistsResponse.text();
      console.error('YouTube API playlists error:', playlistsResponse.status, errorText);
      return NextResponse.json(
        { error: `YouTube API error: ${playlistsResponse.status}`, details: errorText },
        { status: playlistsResponse.status }
      );
    }

    const playlistsData = await playlistsResponse.json();

    const playlists = playlistsData.items?.map((item: {
      id: string;
      snippet: {
        title: string;
        description: string;
        thumbnails: { high?: { url: string }; default?: { url: string } };
        publishedAt: string;
      };
      contentDetails: { itemCount: number };
    }) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      videoCount: item.contentDetails.itemCount,
      url: `https://www.youtube.com/playlist?list=${item.id}`,
      publishedAt: item.snippet.publishedAt,
    })) || [];

    // Save to cache
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      fs.mkdirSync(logsDir, { recursive: true });
      const cachePath = path.join(logsDir, 'youtube-playlists-cache.json');
      fs.writeFileSync(cachePath, JSON.stringify({ 
        ts: new Date().toISOString(), 
        playlists 
      }));
      console.log('[YouTube API] Cached playlists successfully', {
        playlistCount: playlists.length,
        timestamp: new Date().toISOString()
      });
    } catch (writeErr) {
      console.warn('[YouTube API] Failed to write cache:', writeErr);
    }

    return NextResponse.json({ playlists }, { 
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600', // 6 hours cache
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[YouTube API] Error fetching playlists:', errorMessage);
    
    // Try to return cached data as fallback on error
    try {
      const cachePath = path.join(process.cwd(), 'logs', 'youtube-playlists-cache.json');
      if (fs.existsSync(cachePath)) {
        const cacheContent = fs.readFileSync(cachePath, 'utf8');
        const parsed = JSON.parse(cacheContent);
        if (parsed && Array.isArray(parsed.playlists)) {
          const cacheAge = parsed.ts ? Date.now() - new Date(parsed.ts).getTime() : Infinity;
          console.warn('[YouTube API] Returning stale cache due to API error', {
            error: errorMessage,
            cacheTs: parsed.ts,
            ageMinutes: parsed.ts ? Math.round(cacheAge / 60000) : 'unknown',
            playlistCount: parsed.playlists.length
          });
          return NextResponse.json({ 
            playlists: parsed.playlists,
            cached: true,
            cacheAge: parsed.ts ? Math.round(cacheAge / 60000) : null
          });
        }
      }
    } catch (fallbackErr) {
      console.warn('[YouTube API] Failed to read fallback cache:', fallbackErr);
    }
    
    // If no cache available, return empty array instead of error
    console.warn('[YouTube API] No cache available, returning empty playlists');
    return NextResponse.json(
      { 
        playlists: [],
        error: 'YouTube API quota exceeded. Playlists will be available when quota resets.',
        cached: false
      },
      { status: 200 } // Return 200 instead of 500 so the page doesn't break
    );
  }
}
