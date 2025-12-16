export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt: string;
  isLive: boolean;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoCount: number;
  url: string;
  publishedAt: string;
}

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Helper to check if we're on the server side
const isServer = typeof window === 'undefined';

export async function getLatestYouTubeStream(): Promise<YouTubeVideo | null> {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_HANDLE = '@GraceontheashleyOrg';

  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured');
    return null;
  }

  // Check cache first - if fresh (< 6 hours old), return cached data (server-side only)
  if (isServer) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const cachePath = path.join(process.cwd(), 'logs', 'youtube-stream-cache.json');
      if (fs.existsSync(cachePath)) {
        const txt = fs.readFileSync(cachePath, 'utf8');
        const parsed = JSON.parse(txt);
        if (parsed && parsed.ts && parsed.video) {
          const cacheAge = Date.now() - new Date(parsed.ts).getTime();
          if (cacheAge < CACHE_TTL_MS) {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[YouTube] returning fresh cached stream', { 
                cacheTs: parsed.ts, 
                ageMinutes: Math.round(cacheAge / 60000),
                ttlMinutes: Math.round(CACHE_TTL_MS / 60000)
              });
            }
            return parsed.video as YouTubeVideo;
          } else {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[YouTube] cache expired, fetching fresh stream data', { 
                cacheTs: parsed.ts, 
                ageMinutes: Math.round(cacheAge / 60000),
                ttlMinutes: Math.round(CACHE_TTL_MS / 60000)
              });
            }
          }
        }
      }
    } catch (cacheErr) {
      if (process.env.NODE_ENV !== 'production') console.warn('[YouTube] failed to read stream cache', cacheErr);
    }
  }

  try {
    // First, get the channel ID from the handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(CHANNEL_HANDLE)}&type=channel&key=${YOUTUBE_API_KEY}&maxResults=1`
    );

    if (!searchResponse.ok) {
      if (searchResponse.status === 403) {
        console.warn('YouTube API quota exceeded for stream search - returning null');
        return null;
      }
      throw new Error(`YouTube API search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const channelId = searchData.items?.[0]?.snippet?.channelId;

    if (!channelId) {
      throw new Error('Channel not found');
    }

    // Now get the latest videos from the channel
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&key=${YOUTUBE_API_KEY}&maxResults=10`
    );

    if (!videosResponse.ok) {
      if (videosResponse.status === 403) {
        console.warn('YouTube API quota exceeded for videos - returning null');
        return null;
      }
      throw new Error(`YouTube API videos failed: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    // Find the latest live stream or video
    const latestVideo = videosData.items?.[0];

    if (!latestVideo) {
      return null;
    }

    const videoId = latestVideo.id.videoId;
    const snippet = latestVideo.snippet;

    // Get detailed video info to check if it's live
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    const videoDetails = videoDetailsResponse.ok ? await videoDetailsResponse.json() : null;
    const isLive = videoDetails?.items?.[0]?.liveStreamingDetails?.actualStartTime != null;

    const video = {
      id: videoId,
      title: snippet.title,
      thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: snippet.publishedAt,
      isLive
    };

    // Cache the result (server-side only)
    if (isServer) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const logsDir = path.join(process.cwd(), 'logs');
        fs.mkdirSync(logsDir, { recursive: true });
        const cachePath = path.join(logsDir, 'youtube-stream-cache.json');
        fs.writeFileSync(cachePath, JSON.stringify({ ts: new Date().toISOString(), video }));
      } catch (writeErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('[YouTube] failed to write stream cache', writeErr);
      }
    }

    return video;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    
    // Try to return cached data as fallback on error (server-side only)
    if (isServer) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const cachePath = path.join(process.cwd(), 'logs', 'youtube-stream-cache.json');
        if (fs.existsSync(cachePath)) {
          const txt = fs.readFileSync(cachePath, 'utf8');
          const parsed = JSON.parse(txt);
          if (parsed && parsed.video) {
            const cacheAge = parsed.ts ? Date.now() - new Date(parsed.ts).getTime() : Infinity;
            if (process.env.NODE_ENV !== 'production') {
              console.warn('[YouTube] returning cached stream (possibly stale) due to fetch failure', { 
                cacheTs: parsed.ts,
                ageMinutes: parsed.ts ? Math.round(cacheAge / 60000) : 'unknown'
              });
            }
            return parsed.video as YouTubeVideo;
          }
        }
      } catch (cacheErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('[YouTube] failed to read stream cache on error', cacheErr);
      }
    }
    
    return null;
  }
}

export async function getYouTubePlaylists(): Promise<YouTubePlaylist[]> {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_HANDLE = '@GraceontheashleyOrg';

  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured');
    return [];
  }

  // Check cache first - if fresh (< 6 hours old), return cached data (server-side only)
  if (isServer) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const cachePath = path.join(process.cwd(), 'logs', 'youtube-playlists-cache.json');
      if (fs.existsSync(cachePath)) {
        const txt = fs.readFileSync(cachePath, 'utf8');
        const parsed = JSON.parse(txt);
        if (parsed && parsed.ts && Array.isArray(parsed.playlists)) {
          const cacheAge = Date.now() - new Date(parsed.ts).getTime();
          if (cacheAge < CACHE_TTL_MS) {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[YouTube] returning fresh cached playlists', { 
                cacheTs: parsed.ts, 
                ageMinutes: Math.round(cacheAge / 60000),
                ttlMinutes: Math.round(CACHE_TTL_MS / 60000)
              });
            }
            return parsed.playlists as YouTubePlaylist[];
          } else {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[YouTube] cache expired, fetching fresh playlists data', { 
                cacheTs: parsed.ts, 
                ageMinutes: Math.round(cacheAge / 60000),
                ttlMinutes: Math.round(CACHE_TTL_MS / 60000)
              });
            }
          }
        }
      }
    } catch (cacheErr) {
      if (process.env.NODE_ENV !== 'production') console.warn('[YouTube] failed to read playlists cache', cacheErr);
    }
  }

  try {
    // First, get the channel ID from the handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(CHANNEL_HANDLE)}&type=channel&key=${YOUTUBE_API_KEY}&maxResults=1`
    );

    if (!searchResponse.ok) {
      if (searchResponse.status === 403) {
        console.warn('YouTube API quota exceeded for playlists - returning empty array');
        return [];
      }
      throw new Error(`YouTube API search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const channelId = searchData.items?.[0]?.snippet?.channelId;

    if (!channelId) {
      throw new Error('Channel not found');
    }

    // Get playlists from the channel
    const playlistsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&key=${YOUTUBE_API_KEY}&maxResults=50`
    );

    if (!playlistsResponse.ok) {
      if (playlistsResponse.status === 403) {
        console.warn('YouTube API quota exceeded for playlist fetch - returning empty array');
        return [];
      }
      throw new Error(`YouTube API playlists failed: ${playlistsResponse.status}`);
    }

    const playlistsData = await playlistsResponse.json();

    // Filter out funeral services playlist and map to our interface
    interface YouTubeApiPlaylist {
      id: string;
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: {
          maxres?: { url: string };
          high?: { url: string };
          medium?: { url: string };
          default?: { url: string };
        };
        publishedAt?: string;
      };
      contentDetails?: { itemCount?: number };
    }

    interface YouTubeApiPlaylistItem {
      snippet?: {
        thumbnails?: {
          maxres?: { url: string };
          high?: { url: string };
          medium?: { url: string };
          default?: { url: string };
        };
      };
    }

    const items = playlistsData.items as YouTubeApiPlaylist[] | undefined;

    const playlists = await Promise.all(
      (items
        ?.filter((playlist) => !(playlist.snippet?.title ?? '').toLowerCase().includes('funeral'))
        .map(async (playlist) => {
          let thumbnailUrl = playlist.snippet?.thumbnails?.maxres?.url ||
            playlist.snippet?.thumbnails?.high?.url ||
            playlist.snippet?.thumbnails?.medium?.url ||
            playlist.snippet?.thumbnails?.default?.url;

          // If no playlist thumbnail, try to get thumbnail from first video in playlist
          if (!thumbnailUrl) {
            try {
              const playlistItemsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&key=${YOUTUBE_API_KEY}&maxResults=1`
              );

              if (playlistItemsResponse.ok) {
                const playlistItemsData = (await playlistItemsResponse.json()) as { items?: YouTubeApiPlaylistItem[] };
                const firstVideo = playlistItemsData.items?.[0];
                if (firstVideo) {
                  thumbnailUrl = firstVideo.snippet?.thumbnails?.maxres?.url ||
                    firstVideo.snippet?.thumbnails?.high?.url ||
                    firstVideo.snippet?.thumbnails?.medium?.url ||
                    firstVideo.snippet?.thumbnails?.default?.url;
                }
              }
            } catch (error) {
              console.warn(`Failed to get thumbnail for playlist ${playlist.id}:`, error);
            }
          }

          return {
            id: playlist.id,
            title: playlist.snippet?.title ?? '',
            description: playlist.snippet?.description ?? '',
            thumbnailUrl: thumbnailUrl || '/WorshipEdited.jpg', // Fallback to default image
            videoCount: playlist.contentDetails?.itemCount || 0,
            url: `https://www.youtube.com/playlist?list=${playlist.id}`,
            publishedAt: playlist.snippet?.publishedAt ?? ''
          };
        }) ?? [])
    );

    // Cache the results (server-side only)
    if (isServer) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const logsDir = path.join(process.cwd(), 'logs');
        fs.mkdirSync(logsDir, { recursive: true });
        const cachePath = path.join(logsDir, 'youtube-playlists-cache.json');
        fs.writeFileSync(cachePath, JSON.stringify({ ts: new Date().toISOString(), playlists }));
      } catch (writeErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('[YouTube] failed to write playlists cache', writeErr);
      }
    }

    return playlists;
  } catch (error) {
    console.error('Error fetching YouTube playlists:', error);
    
    // Try to return cached data as fallback on error (server-side only)
    if (isServer) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const cachePath = path.join(process.cwd(), 'logs', 'youtube-playlists-cache.json');
        if (fs.existsSync(cachePath)) {
          const txt = fs.readFileSync(cachePath, 'utf8');
          const parsed = JSON.parse(txt);
          if (parsed && Array.isArray(parsed.playlists)) {
            const cacheAge = parsed.ts ? Date.now() - new Date(parsed.ts).getTime() : Infinity;
            if (process.env.NODE_ENV !== 'production') {
              console.warn('[YouTube] returning cached playlists (possibly stale) due to fetch failure', { 
                cacheTs: parsed.ts,
                ageMinutes: parsed.ts ? Math.round(cacheAge / 60000) : 'unknown'
              });
            }
            return parsed.playlists as YouTubePlaylist[];
          }
        }
      } catch (cacheErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('[YouTube] failed to read playlists cache on error', cacheErr);
      }
    }
    
    return [];
  }
}