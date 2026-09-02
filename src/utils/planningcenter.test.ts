import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import getPlanningCenterEvents from './planningcenter';

describe('getPlanningCenterEvents', () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
    process.env.PLANNING_CENTER_PAT = 'test-token';
    process.env.PLANNING_CENTER_EVENTS_URL = 'https://api.test/events';
    process.env.PLANNING_CENTER_EVENT_INSTANCES_URL = 'https://api.test/event_instances';
    // Stub global Date so `new Date()` and `Date.now()` return a fixed date
    class MockDate extends Date {
      constructor(...args: ConstructorParameters<typeof Date>) {
        if (args.length === 0) {
          super('2025-01-01T00:00:00Z');
        } else if (args.length === 1) {
          super(args[0]);
        } else {
          // support a couple of args; tests won't exercise exotic signatures
          super(args[0] as number, args[1] as number);
        }
      }
      static now() { return new Date('2025-01-01T00:00:00Z').getTime(); }
    }
    vi.stubGlobal('Date', MockDate as unknown as typeof Date);
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
    // Restore any global stubs
    vi.unstubAllGlobals();
  });

  it('filters only visible events and applies earliest instance start date', async () => {
    const eventsData = {
      data: [
        {
          id: 'e1',
          attributes: {
            visible_in_church_center: true,
            name: 'Approved Event',
            starts_at: null,
            summary: 'Approved summary',
          },
          links: { html: 'https://example.com/e1' },
        },
        {
          id: 'e2',
          attributes: { name: 'Pending Event' },
        },
      ],
    };

    const instancesData = {
      data: [
        {
          id: 'i1',
          attributes: { start_at: '2025-01-02T10:00:00Z' },
          relationships: { event: { data: { id: 'e1' } } },
        },
      ],
    };

    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('event_instances')) {
        return { ok: true, json: async () => instancesData } as Response;
      }
      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 10 });
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
    const e = res![0];
    expect(e.id).toBe('e1');
    expect(e.title).toBe('Approved Event');
    expect(e.startsAt).toBe('2025-01-02T10:00:00Z');
    expect(e.description).toBe('Approved summary');
    expect(e.visible).toBe(true);
  });

  it('includes visible_in_church_center filter in events request URL', async () => {
    const eventsData = { data: [] };
    const instancesData = { data: [] };

    const fetchFn = vi.fn(async (url: string) => {
      if (url.includes('event_instances')) return { ok: true, json: async () => instancesData } as Response;
      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    global.fetch = fetchFn;
    await getPlanningCenterEvents({ perPage: 5 });

  const firstCallUrl = (fetchFn as unknown as { mock: { calls: unknown[][] } }).mock.calls[0][0] as string;
    expect(firstCallUrl).toContain('where[visible_in_church_center]=true');
  });

  it('follows links.next to fetch events beyond the first page', async () => {
    const page1 = {
      data: [
        { id: 'e1', attributes: { visible_in_church_center: true, name: 'Event 1', starts_at: '2025-02-01T10:00:00Z' }, links: { html: 'https://example.com/e1' } },
      ],
      links: { next: 'https://api.test/events?offset=1' },
    };
    const page2 = {
      data: [
        { id: 'e2', attributes: { visible_in_church_center: true, name: 'Event 2', starts_at: '2025-02-02T10:00:00Z' }, links: { html: 'https://example.com/e2' } },
      ],
    };

    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('event_instances')) return { ok: true, json: async () => ({ data: [] }) } as Response;
      if (url.includes('offset=1')) return { ok: true, json: async () => page2 } as Response;
      return { ok: true, json: async () => page1 } as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 1 });
    expect(res).not.toBeNull();
    const ids = res!.map((e) => e.id).sort();
    expect(ids).toEqual(['e1', 'e2']);
  });

  it('returns null or empty when API does not return data', async () => {
    global.fetch = vi.fn(async () => ({ ok: true, json: async () => ({}) })) as unknown as typeof fetch;
    const res = await getPlanningCenterEvents({ perPage: 5 });
    expect(res).toBeNull();
  });

  it('filters out events containing forbidden keywords', async () => {
    const eventsData = {
      data: [
        { id: 'e1', attributes: { visible_in_church_center: true, name: 'Church Elections', summary: 'Annual elections' }, links: { html: 'https://example.com/e1' } },
        { id: 'e2', attributes: { visible_in_church_center: true, name: 'Choir Rehearsal', summary: 'Weekly rehearsal' }, links: { html: 'https://example.com/e2' } },
        { id: 'e3', attributes: { visible_in_church_center: true, name: 'Vertical Retreat', summary: 'Leadership vertical' }, links: { html: 'https://example.com/e3' } },
        { id: 'e4', attributes: { visible_in_church_center: true, name: 'Community Service', summary: 'Serve our neighbors' }, links: { html: 'https://example.com/e4' } },
      ],
    };

    global.fetch = vi.fn(async (url: string) => {
      // Provide a per-event fallback instance for e4 so it isn't dropped by
      // the final filtering step (tests expect non-forbidden events to remain).
      if (url.includes('/events/e4/event_instances')) {
        return { ok: true, json: async () => ({ data: [ { attributes: { start_at: '2025-03-03T10:00:00Z' }, relationships: { event: { data: { id: 'e4' } } } } ] }) } as unknown as Response;
      }

      if (url.includes('event_instances')) return { ok: true, json: async () => ({ data: [] }) } as unknown as Response;
      return { ok: true, json: async () => eventsData } as unknown as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 10 });
    expect(res).not.toBeNull();
    // Only e4 should remain
    const ids = res!.map((r) => r.id);
    expect(ids).toEqual(['e4']);
  });

  it('falls back to per-event instance fetch when batch instances are empty', async () => {
    const eventsData = {
      data: [
        {
          id: 'e1',
          attributes: {
            approval_status: 'A',
            name: 'Recurring Event',
            starts_at: null,
            summary: 'A recurring event',
            visible_in_church_center: true,
          },
          links: { html: 'https://example.com/e1' },
        },
      ],
    };

    // Batch instances fetch returns no data, but ensure per-event fetch is
    // matched first so it can return instance details for the fallback.
    global.fetch = vi.fn(async (url: string) => {
      // Per-event fetch will return a future instance for e1
      if (url.includes('/events/e1/event_instances')) {
        return { ok: true, json: async () => ({ data: [ { attributes: { start_at: '2025-02-02T09:00:00Z' }, relationships: { event: { data: { id: 'e1' } } } } ] }) } as Response;
      }

      if (url.includes('event_instances') && url.includes('where[starts_at]')) {
        return { ok: true, json: async () => ({ data: [] }) } as Response;
      }

      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 10 });
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
    const e = res![0];
    expect(e.id).toBe('e1');
    expect(e.nextInstanceStartsAt).toBe('2025-02-02T09:00:00Z');
    expect(e.startsAt).toBe('2025-02-02T09:00:00Z');
  });

  it('includes include=event in instances batch request and per-event fallback uses filter[future]', async () => {
    const eventsData = { data: [ { id: 'e9', attributes: { visible_in_church_center: true, name: 'Event 9' }, links: { html: 'https://example.com/e9' } } ] };

    const fetchFn = vi.fn(async (url: string) => {
      // Per-event fallback should also include filter[future]
      if (url.includes('/events/e9/event_instances')) {
        // Implementation uses a where[starts_at][gte] query param to restrict
        // to future instances; assert that instead of the old
        // filter[future] form.
        expect(url).toContain('where[starts_at]');
        return { ok: true, json: async () => ({ data: [ { attributes: { start_at: '2025-12-18T10:00:00Z' }, relationships: { event: { data: { id: 'e9' } } } } ] }) } as Response;
      }

      // Instances batch should include include=event
      if (url.includes('event_instances') && url.includes('where[starts_at]')) {
        return { ok: true, json: async () => ({ data: [] }) } as Response;
      }

      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    global.fetch = fetchFn;
    const res = await getPlanningCenterEvents({ perPage: 10 });
    expect(res).not.toBeNull();
    expect(res![0].startsAt).toBe('2025-12-18T10:00:00Z');
    // assert instances batch request included include=event
  const calls = (fetchFn as unknown as { mock: { calls: unknown[][] } }).mock.calls.map((c: unknown[]) => c[0] as string);
    expect(calls.some((u: string) => u.includes('event_instances') && u.includes('include=event'))).toBe(true);
  });

  it('prefers the next future instance over past instances in per-event lookup', async () => {
  const eventsData = { data: [ { id: 'e2', attributes: { visible_in_church_center: true, name: 'Event 2' }, links: { html: 'https://example.com/e2' } } ] };

    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('/events/e2/event_instances')) {
        return { ok: true, json: async () => ({ data: [
          { attributes: { start_at: '2024-01-01T09:00:00Z' }, relationships: { event: { data: { id: 'e2' } } } },
          { attributes: { start_at: '2026-05-05T14:30:00Z' }, relationships: { event: { data: { id: 'e2' } } } },
        ] }) } as Response;
      }

      if (url.includes('event_instances') && url.includes('where[starts_at]')) {
        return { ok: true, json: async () => ({ data: [] }) } as Response;
      }

      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 10 });
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
    const e = res![0];
    // Should choose the 2026 future instance
    expect(e.nextInstanceStartsAt).toBe('2026-05-05T14:30:00Z');
    expect(e.startsAt).toBe('2026-05-05T14:30:00Z');
  });

  it('populates instances array and preserves ordering and recurrence', async () => {
    const eventsData = { data: [ { id: 'e3', attributes: { visible_in_church_center: true, name: 'Event 3' }, links: { html: 'https://example.com/e3' } } ] };

    const instancesData = {
      data: [
        { id: 'i3b', attributes: { start_at: '2025-12-01T10:00:00Z', rrule: 'FREQ=MONTHLY' }, relationships: { event: { data: { id: 'e3' } } } },
        { id: 'i3a', attributes: { start_at: '2025-01-01T09:00:00Z' }, relationships: { event: { data: { id: 'e3' } } } },
        { id: 'i3c', attributes: { start_at: '2025-06-15T14:00:00Z' }, relationships: { event: { data: { id: 'e3' } } } },
      ],
    };

    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('event_instances') && url.includes('where[starts_at]')) {
        return { ok: true, json: async () => instancesData } as Response;
      }
      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 10 });
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
    const e = res![0];
    expect(e.instances).toBeDefined();
    expect(e.instances!.length).toBe(3);
    // instances should be sorted ascending by start
    expect(e.instances![0].startAt).toBe('2025-01-01T09:00:00Z');
    expect(e.instances![1].startAt).toBe('2025-06-15T14:00:00Z');
    expect(e.instances![2].startAt).toBe('2025-12-01T10:00:00Z');
    // recurrence should be preserved where present
    expect(e.instances![2].recurrence).toBe('FREQ=MONTHLY');
    expect(e.instances![0].recurrence).toBeNull();
  });

  it('retries on transient network errors and succeeds when a later attempt returns data', async () => {
    const eventsData = {
      data: [ { id: 'e1', attributes: { visible_in_church_center: true, name: 'Retry Event' }, links: { html: 'https://example.com/e1' } } ]
    };

    const instancesData = { data: [ { id: 'i1', attributes: { start_at: '2025-08-01T10:00:00Z' }, relationships: { event: { data: { id: 'e1' } } } } ] };

    let call = 0;
    global.fetch = vi.fn(async (url: string) => {
      call += 1;
      // First attempt (events fetch) fails with a network error
      if (call === 1) throw new TypeError('network failure');
      // Second attempt returns events
      if (url.includes('events')) return { ok: true, json: async () => eventsData } as Response;
      // Instances batch returns data
      if (url.includes('event_instances')) return { ok: true, json: async () => instancesData } as Response;
      return { ok: true, json: async () => eventsData } as Response;
    }) as unknown as typeof fetch;

    const res = await getPlanningCenterEvents({ perPage: 5 });
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
    expect(res![0].startsAt).toBe('2025-08-01T10:00:00Z');
  });

  it('throws a 503 when fetch consistently fails after retries', async () => {
    // Ensure no cached events are present from other tests
    const fs = await import('fs');
    const cachePath = 'logs/pco-events-cache.json';
    if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);

    global.fetch = vi.fn(async () => { throw new TypeError('network unreachable'); }) as unknown as typeof fetch;

    try {
      await getPlanningCenterEvents({ perPage: 3 });
      throw new Error('Expected getPlanningCenterEvents to throw');
    } catch (err) {
      const e = err as unknown as { status?: number; message?: string };
      if (typeof e.status !== 'undefined') expect(e.status).toBe(503);
      expect(e.message).toContain('Planning Center fetch failed');
    }
  });

  // Every upstream request must opt into Next's Data Cache. Without this the
  // homepage's Planning Center fan-out (paginated events + a per-event instance
  // lookup for anything unresolved) re-ran on every single request, and the
  // uncached `fetch` also forced the route to be dynamically rendered — which
  // is what was burning Vercel Fluid Active CPU.
  it('issues every request with a revalidate window so responses are cached', async () => {
    const events = { data: [{ id: 'e1', attributes: { name: 'Event 1', starts_at: '2025-06-01T10:00:00Z', visible_in_church_center: true } }] };
    const fetchFn = vi.fn(async () => ({ ok: true, json: async () => events } as Response));
    global.fetch = fetchFn as unknown as typeof fetch;

    await getPlanningCenterEvents({ perPage: 3 });

    expect(fetchFn.mock.calls.length).toBeGreaterThan(0);
    for (const call of fetchFn.mock.calls) {
      const init = (call as unknown[])[1] as { next?: { revalidate?: number } } | undefined;
      expect(init?.next?.revalidate).toBeGreaterThan(0);
    }
  });

  it('throws when the external fetch fails rather than serving a stale file cache', async () => {
    // The old behaviour read a last-known-good copy from `logs/`, which never
    // survived on Vercel's ephemeral filesystem. Callers degrade instead: the
    // homepage catches and renders without events.
    global.fetch = vi.fn(async () => { throw new TypeError('network unreachable'); }) as unknown as typeof fetch;

    await expect(getPlanningCenterEvents({ perPage: 3 })).rejects.toThrow();
  });

  it('throws a 503 when credentials are not configured', async () => {
    // Remove any configured credentials to simulate a misconfigured runtime
    delete process.env.PLANNING_CENTER_PAT;
    delete process.env.PLANNING_CENTER_CLIENT_ID;
    delete process.env.PLANNING_CENTER_SECRET;

    try {
      await getPlanningCenterEvents({ perPage: 3 });
      throw new Error('Expected getPlanningCenterEvents to throw');
    } catch (err) {
      const e = err as unknown as { status?: number; message?: string };
      expect(e.status).toBe(503);
      expect(e.message).toContain('credentials not configured');
    }
  });
});
