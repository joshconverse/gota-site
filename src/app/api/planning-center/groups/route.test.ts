import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';

// Mock the groups helper so we can simulate errors and success cases
vi.mock('@/utils/planningcenterGroups', () => ({ default: vi.fn() }));

import { GET } from './route';
import getPlanningCenterGroups from '@/utils/planningcenterGroups';

describe('GET /api/planning-center/groups', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns 503 when planning center credentials are missing', async () => {
    (getPlanningCenterGroups as unknown as Mock).mockImplementation(() => {
      const err = Object.assign(new Error('Planning Center credentials not configured'), { status: 503 });
      throw err as { status?: number; message?: string };
    });

    const res = (await GET()) as unknown as { status: number; json: () => Promise<Record<string, unknown>> };
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toBe(true);
    expect(json.status).toBe(503);
  });

  it('returns 200 with groups on success', async () => {
    (getPlanningCenterGroups as unknown as Mock).mockResolvedValue([
      { id: '1', name: 'Downtown Group', link: 'https://gotachurch.churchcenteronline.com/groups/1' },
    ]);

    const res = (await GET()) as unknown as { status: number; json: () => Promise<Record<string, unknown>> };
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json.groups)).toBe(true);
    expect((json.groups as unknown[]).length).toBe(1);
  });
});
