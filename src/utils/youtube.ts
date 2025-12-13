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

export async function getLatestYouTubeStream(): Promise<YouTubeVideo | null> {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_HANDLE = '@GraceontheashleyOrg';

  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured');
    return null;
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

    return {
      id: videoId,
      title: snippet.title,
      thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: snippet.publishedAt,
      isLive
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
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

  // Simple cache to avoid repeated API calls during build
  const cacheKey = 'youtube-playlists-cache';
  const cacheExpiryKey = 'youtube-playlists-cache-expiry';
  const now = Date.now();
  const cacheExpiry = 1000 * 60 * 60; // 1 hour cache

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    const cachedExpiry = localStorage.getItem(cacheExpiryKey);

    if (cached && cachedExpiry && now < parseInt(cachedExpiry)) {
      return JSON.parse(cached);
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
    const playlists = await Promise.all(
      playlistsData.items
        ?.filter((playlist: any) => !playlist.snippet.title.toLowerCase().includes('funeral'))
        .map(async (playlist: any) => {
          let thumbnailUrl = playlist.snippet.thumbnails?.maxres?.url || 
                           playlist.snippet.thumbnails?.high?.url || 
                           playlist.snippet.thumbnails?.medium?.url || 
                           playlist.snippet.thumbnails?.default?.url;

          // If no playlist thumbnail, try to get thumbnail from first video in playlist
          if (!thumbnailUrl) {
            try {
              const playlistItemsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&key=${YOUTUBE_API_KEY}&maxResults=1`
              );
              
              if (playlistItemsResponse.ok) {
                const playlistItemsData = await playlistItemsResponse.json();
                const firstVideo = playlistItemsData.items?.[0];
                if (firstVideo) {
                  thumbnailUrl = firstVideo.snippet.thumbnails?.maxres?.url || 
                               firstVideo.snippet.thumbnails?.high?.url || 
                               firstVideo.snippet.thumbnails?.medium?.url || 
                               firstVideo.snippet.thumbnails?.default?.url;
                }
              }
            } catch (error) {
              console.warn(`Failed to get thumbnail for playlist ${playlist.id}:`, error);
            }
          }

          return {
            id: playlist.id,
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            thumbnailUrl: thumbnailUrl || '/WorshipEdited.jpg', // Fallback to default image
            videoCount: playlist.contentDetails?.itemCount || 0,
            url: `https://www.youtube.com/playlist?list=${playlist.id}`,
            publishedAt: playlist.snippet.publishedAt
          };
        }) || []
    );

    // Cache the results
    if (typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify(playlists));
      localStorage.setItem(cacheExpiryKey, (now + cacheExpiry).toString());
    }

    return playlists;
  } catch (error) {
    console.error('Error fetching YouTube playlists:', error);
    return [];
  }
}