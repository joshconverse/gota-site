import { describe, it, expect, beforeEach, afterEach } from 'vitest';
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
