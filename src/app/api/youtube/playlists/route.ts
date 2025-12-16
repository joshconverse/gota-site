import { NextResponse } from 'next/server';

export async function GET() {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_HANDLE = '@GraceontheashleyOrg';

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
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

    return NextResponse.json({ playlists }, { 
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600', // 6 hours cache
      }
    });
  } catch (error) {
    console.error('Error in YouTube playlists API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlists', details: String(error) },
      { status: 500 }
    );
  }
}
