import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import * as youtube from './youtube';

const OLD = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
});

afterEach(() => {
  if (OLD !== undefined) process.env.NEXT_PUBLIC_YOUTUBE_API_KEY = OLD;
});

describe('youtube utils (basic)', () => {
  it('getLatestYouTubeStream returns null when API key is not configured', async () => {
    const res = await youtube.getLatestYouTubeStream();
    expect(res).toBeNull();
  });

  it('getYouTubePlaylists returns empty array when API key is not configured', async () => {
    const res = await youtube.getYouTubePlaylists();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
  });
});

describe('getLatestYouTubeStream (mocked fetch)', () => {
  const originalFetch = global.fetch;
  const cachePath = 'logs/youtube-stream-cache.json';

  beforeEach(() => {
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY = 'test-key';
    try {
      if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
    } catch {
      // ignore
    }
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
    try {
      if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
    } catch {
      // ignore
    }
  });

  it('skips a not-yet-aired "upcoming" placeholder and returns last week\'s completed sermon', async () => {
    // channels.list now returns the uploads playlist id, not a bare channel id.
    const channelLookup = {
      items: [{ contentDetails: { relatedPlaylists: { uploads: 'UU123' } } }],
    };
    // The uploads playlist lists the newest video first (a scheduled placeholder
    // dated later than last week's real sermon).
    const uploads = {
      items: [
        { contentDetails: { videoId: 'upcoming-id', videoPublishedAt: '2026-07-20T22:04:17Z' } },
        { contentDetails: { videoId: 'aired-id', videoPublishedAt: '2026-07-20T04:37:48Z' } },
      ],
    };
    // videos.list returns live status + details for both candidates at once.
    const videoDetails = {
      items: [
        {
          id: 'upcoming-id',
          snippet: {
            title: '07.26.26 - Proverbs - Pastor Kelly Graham',
            liveBroadcastContent: 'upcoming',
            publishedAt: '2026-07-20T22:04:17Z',
            thumbnails: { high: { url: 'https://example.com/upcoming.jpg' } },
          },
        },
        {
          id: 'aired-id',
          snippet: {
            title: '07.19.26 - Proverbs 17:27-18:8, 18:20-21 - Pastor Kelly Graham',
            liveBroadcastContent: 'none',
            publishedAt: '2026-07-20T04:37:48Z',
            thumbnails: { high: { url: 'https://example.com/aired.jpg' } },
          },
          liveStreamingDetails: { actualStartTime: '2026-07-19T14:48:39Z' },
        },
      ],
    };

    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => channelLookup })
      .mockResolvedValueOnce({ ok: true, json: async () => uploads })
      .mockResolvedValueOnce({ ok: true, json: async () => videoDetails });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await youtube.getLatestYouTubeStream();

    expect(result?.id).toBe('aired-id');
    expect(result?.title).toBe('07.19.26 - Proverbs 17:27-18:8, 18:20-21 - Pastor Kelly Graham');
  });
});
