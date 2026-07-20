import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export async function GET() {
  // Use server-side key first, fallback to public key
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
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
    // First, get the channel ID from the handle.
    // Cache upstream responses in Next's Data Cache (works on Vercel's read-only
    // filesystem, unlike the fs-based cache above) so we don't hit the expensive
    // YouTube `search` endpoint (100 quota units) on every request.
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(CHANNEL_HANDLE)}&type=channel&key=${YOUTUBE_API_KEY}&maxResults=1`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
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
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&key=${YOUTUBE_API_KEY}&maxResults=50`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
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

    interface YouTubeThumbnails {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    }
    interface YouTubeApiPlaylistItem {
      id: string;
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: YouTubeThumbnails;
        publishedAt?: string;
      };
      contentDetails?: { itemCount?: number };
    }

    const pickThumbnail = (t?: YouTubeThumbnails) =>
      t?.maxres?.url || t?.high?.url || t?.medium?.url || t?.default?.url;

    interface YouTubePlaylistItem {
      snippet?: { publishedAt?: string; thumbnails?: YouTubeThumbnails };
      contentDetails?: { videoPublishedAt?: string };
    }

    const items = playlistsData.items as YouTubeApiPlaylistItem[] | undefined;

    // Hide empty playlists (videoCount === 0). Live example: "Palm Sunday 2026"
    // with 0 videos, which would otherwise render YouTube's generic no_thumbnail
    // placeholder. Filtering first also avoids spending quota on their items.
    const nonEmpty = (items ?? []).filter(
      (item) => (item.contentDetails?.itemCount ?? 0) > 0
    );

    const playlists = await Promise.all(
      nonEmpty.map(async (item) => {
        let thumbnailUrl = pickThumbnail(item.snippet?.thumbnails);
        // Ordering signal: recency of the playlist's most-recent video. Default
        // to the playlist's own creation date if we can't read its items.
        let latestVideoAt = item.snippet?.publishedAt ?? '';

        // One playlistItems call per playlist (1 quota unit each, cached via
        // next.revalidate) serves double duty: (a) the latest-video date used for
        // ordering, and (b) a thumbnail fallback when the playlist has none — a
        // newly created series (e.g. Proverbs) may have no playlist-level
        // thumbnail yet. maxResults=50 covers every current series; if a playlist
        // ever exceeds 50 videos the max is taken over the first page only, which
        // is a good-enough recency signal for an actively-running series.
        try {
          const playlistItemsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${item.id}&key=${YOUTUBE_API_KEY}&maxResults=50`,
            { next: { revalidate: CACHE_TTL_MS / 1000 } }
          );
          if (playlistItemsResponse.ok) {
            const playlistItemsData = (await playlistItemsResponse.json()) as {
              items?: YouTubePlaylistItem[];
            };
            const pItems = playlistItemsData.items ?? [];

            // Most-recent video across the page. Prefer the video's own publish
            // date; fall back to when it was added to the playlist.
            const times = pItems
              .map((v) => v.contentDetails?.videoPublishedAt || v.snippet?.publishedAt)
              .filter((d): d is string => !!d)
              .map((d) => new Date(d).getTime())
              .filter((t) => !Number.isNaN(t));
            if (times.length > 0) {
              latestVideoAt = new Date(Math.max(...times)).toISOString();
            }

            if (!thumbnailUrl) {
              thumbnailUrl = pickThumbnail(pItems[0]?.snippet?.thumbnails);
            }
          }
        } catch (itemErr) {
          console.warn(`[YouTube API] Failed to read items for playlist ${item.id}:`, itemErr);
        }

        return {
          id: item.id,
          title: item.snippet?.title ?? '',
          description: item.snippet?.description ?? '',
          thumbnailUrl: thumbnailUrl || '/WorshipEdited.jpg', // static fallback so a card is never imageless
          videoCount: item.contentDetails?.itemCount ?? 0,
          url: `https://www.youtube.com/playlist?list=${item.id}`,
          publishedAt: item.snippet?.publishedAt ?? '',
          latestVideoAt,
        };
      })
    );

    // Order by recency of each playlist's most-recent video so the actively
    // running teaching series (which gets a new video ~weekly) leads the grid,
    // rather than by playlist creation date (which surfaces stale 1-video
    // playlists like a just-created "Mission Trips" ahead of "Proverbs 2026").
    playlists.sort(
      (a, b) => new Date(b.latestVideoAt).getTime() - new Date(a.latestVideoAt).getTime()
    );

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
