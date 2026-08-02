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

// The homepage hero is meant to showcase the latest sermon, not memorial
// services or one-off recap videos that also get uploaded to the channel.
const NON_SERMON_KEYWORDS = ['memorial', 'celebration of life', 'funeral', 'recap'];

// A live stream event can be created (with a placeholder title like just the
// series name) days before it actually airs. Until it starts, its
// liveBroadcastContent is "upcoming" and it isn't a real "latest sermon" yet
// — skip it so a not-yet-aired placeholder doesn't outrank last week's
// completed sermon just because it was created more recently.
function isUpcomingBroadcast(item: { snippet?: { liveBroadcastContent?: string } }) {
  return item.snippet?.liveBroadcastContent === 'upcoming';
}

function isNonSermonVideo(title: string) {
  const lower = title.toLowerCase();
  return NON_SERMON_KEYWORDS.some((kw) => lower.includes(kw));
}

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
    // Resolve the channel's "uploads" playlist, then read the latest items from
    // it. We deliberately DON'T use `search?order=date` here: that endpoint lags
    // several hours behind a just-ended livestream (so a Sunday sermon wouldn't
    // surface in the hero until mid-week) and costs 100 quota units per call.
    // The uploads playlist reflects new/ended uploads within minutes and the
    // whole chain below is 3 quota units total.
    // `channels?forHandle=` is a direct handle-to-channel lookup (1 unit) and
    // hands us the uploads playlist id via contentDetails.relatedPlaylists.uploads.
    // Cache upstream responses in Next's Data Cache (works on Vercel's read-only
    // filesystem, unlike the fs-based cache above) to avoid burning YouTube
    // quota on every render, which would force the stale error-fallback path.
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
    );

    if (!channelResponse.ok) {
      if (channelResponse.status === 403) {
        console.warn('YouTube API quota exceeded for channel lookup - returning null');
        return null;
      }
      throw new Error(`YouTube API channel lookup failed: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('Uploads playlist not found');
    }

    // Latest uploads (already newest-first; we re-sort defensively below).
    const playlistItemsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=10&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
    );

    if (!playlistItemsResponse.ok) {
      if (playlistItemsResponse.status === 403) {
        console.warn('YouTube API quota exceeded for uploads playlist - returning null');
        return null;
      }
      throw new Error(`YouTube API uploads playlist failed: ${playlistItemsResponse.status}`);
    }

    const playlistItemsData = await playlistItemsResponse.json();

    const recent = (playlistItemsData.items ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        videoId: item.contentDetails?.videoId as string | undefined,
        publishedAt: item.contentDetails?.videoPublishedAt as string | undefined,
      }))
      .filter((v: { videoId?: string }): v is { videoId: string; publishedAt?: string } => !!v.videoId)
      .sort(
        (a: { publishedAt?: string }, b: { publishedAt?: string }) =>
          new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime()
      );

    if (recent.length === 0) {
      return null;
    }

    // One videos.list call (1 unit) fetches title, thumbnails, live status and
    // liveStreamingDetails for every candidate at once. playlistItems can't tell
    // us liveBroadcastContent, so we need this to skip "upcoming" placeholders.
    const ids = recent.map((v: { videoId: string }) => v.videoId).join(',');
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${ids}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
    );

    if (!videoDetailsResponse.ok) {
      if (videoDetailsResponse.status === 403) {
        console.warn('YouTube API quota exceeded for video details - returning null');
        return null;
      }
      throw new Error(`YouTube API video details failed: ${videoDetailsResponse.status}`);
    }

    const videoDetailsData = await videoDetailsResponse.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const byId = new Map<string, any>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (videoDetailsData.items ?? []).map((item: any) => [item.id, item])
    );

    // Walk newest-first and pick the first real, already-aired sermon: skip
    // memorials/recaps and not-yet-aired "upcoming" placeholders (a scheduled
    // livestream can be created days ahead with its final title, and must not
    // outrank last week's completed sermon just because it sorts newer).
    const latest = recent
      .map((v: { videoId: string }) => byId.get(v.videoId))
      .find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item && !isNonSermonVideo(item.snippet?.title ?? '') && !isUpcomingBroadcast(item)
      );

    if (!latest) {
      return null;
    }

    const snippet = latest.snippet;
    const isLive = latest.liveStreamingDetails?.actualStartTime != null;

    const video = {
      id: latest.id,
      title: snippet.title,
      thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
      videoUrl: `https://www.youtube.com/watch?v=${latest.id}`,
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
    // First, get the channel ID from the handle. `channels?forHandle=` is a
    // direct handle-to-channel lookup (1 quota unit) — more reliable and far
    // cheaper than a `search?q=<handle>&type=channel` text search (100 units).
    // Cache upstream responses in Next's Data Cache (works on Vercel's
    // read-only filesystem).
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
    );

    if (!searchResponse.ok) {
      if (searchResponse.status === 403) {
        console.warn('YouTube API quota exceeded for playlists - returning empty array');
        return [];
      }
      throw new Error(`YouTube API search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const channelId = searchData.items?.[0]?.id;

    if (!channelId) {
      throw new Error('Channel not found');
    }

    // Get playlists from the channel
    const playlistsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&key=${YOUTUBE_API_KEY}&maxResults=50`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
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
        publishedAt?: string;
        thumbnails?: {
          maxres?: { url: string };
          high?: { url: string };
          medium?: { url: string };
          default?: { url: string };
        };
      };
      contentDetails?: { videoPublishedAt?: string };
    }

    const items = playlistsData.items as YouTubeApiPlaylist[] | undefined;

    const playlists = await Promise.all(
      (items
        // Exclude funeral services and empty playlists (videoCount === 0, e.g.
        // "Palm Sunday 2026", which would render a generic no_thumbnail image).
        ?.filter((playlist) =>
          !(playlist.snippet?.title ?? '').toLowerCase().includes('funeral') &&
          (playlist.contentDetails?.itemCount ?? 0) > 0
        )
        .map(async (playlist) => {
          let thumbnailUrl = playlist.snippet?.thumbnails?.maxres?.url ||
            playlist.snippet?.thumbnails?.high?.url ||
            playlist.snippet?.thumbnails?.medium?.url ||
            playlist.snippet?.thumbnails?.default?.url;

          // Ordering signal: recency of the playlist's most-recent video.
          // Default to the playlist's creation date if items can't be read.
          let latestVideoAt = playlist.snippet?.publishedAt ?? '';

          // One playlistItems call per playlist serves double duty: latest-video
          // date (ordering) + thumbnail fallback when the playlist has none.
          try {
            const playlistItemsResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlist.id}&key=${YOUTUBE_API_KEY}&maxResults=50`
            );

            if (playlistItemsResponse.ok) {
              const playlistItemsData = (await playlistItemsResponse.json()) as { items?: YouTubeApiPlaylistItem[] };
              const pItems = playlistItemsData.items ?? [];

              const times = pItems
                .map((v) => v.contentDetails?.videoPublishedAt || v.snippet?.publishedAt)
                .filter((d): d is string => !!d)
                .map((d) => new Date(d).getTime())
                .filter((t) => !Number.isNaN(t));
              if (times.length > 0) {
                latestVideoAt = new Date(Math.max(...times)).toISOString();
              }

              if (!thumbnailUrl) {
                thumbnailUrl = pItems[0]?.snippet?.thumbnails?.maxres?.url ||
                  pItems[0]?.snippet?.thumbnails?.high?.url ||
                  pItems[0]?.snippet?.thumbnails?.medium?.url ||
                  pItems[0]?.snippet?.thumbnails?.default?.url;
              }
            }
          } catch (error) {
            console.warn(`Failed to read items for playlist ${playlist.id}:`, error);
          }

          return {
            id: playlist.id,
            title: playlist.snippet?.title ?? '',
            description: playlist.snippet?.description ?? '',
            thumbnailUrl: thumbnailUrl || '/WorshipEdited.jpg', // Fallback to default image
            videoCount: playlist.contentDetails?.itemCount || 0,
            url: `https://www.youtube.com/playlist?list=${playlist.id}`,
            publishedAt: playlist.snippet?.publishedAt ?? '',
            latestVideoAt
          };
        }) ?? [])
    );

    // Order by recency of each playlist's most-recent video so the actively
    // running teaching series leads, rather than by playlist creation date.
    playlists.sort(
      (a, b) => new Date(b.latestVideoAt).getTime() - new Date(a.latestVideoAt).getTime()
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