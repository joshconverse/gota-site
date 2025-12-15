import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';

// Mock the planningcenter helper so we can simulate errors and success cases
vi.mock('@/utils/planningcenter', () => ({ default: vi.fn() }));

import { GET } from './route';
import getPlanningCenterEvents from '@/utils/planningcenter';

describe('GET /api/planning-center/events', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns 503 when planning center credentials are missing', async () => {
    (getPlanningCenterEvents as unknown as Mock).mockImplementation(() => {
      const err = Object.assign(new Error('Planning Center credentials not configured'), { status: 503 });
      throw err as { status?: number; message?: string };
    });

    const res = (await GET()) as unknown as { status: number; json: () => Promise<Record<string, unknown>> };
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toBe(true);
    expect(json.status).toBe(503);
  });
});
