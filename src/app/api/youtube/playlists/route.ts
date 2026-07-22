import { NextResponse } from 'next/server';
import { getYouTubePlaylists } from '@/utils/youtube';

export async function GET() {
  const playlists = await getYouTubePlaylists();

  return NextResponse.json({ playlists }, {
    headers: {
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600', // 6 hours cache
    },
  });
}
