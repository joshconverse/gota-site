/**
 * Lightweight Planning Center API helper for server-side use.
 *
 * Authentication:
 * - Set `PLANNING_CENTER_PAT` for a Personal Access Token (recommended for a single org)
 * - Or set `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET` for client credentials
 *
 * This module intentionally does not send credentials to the browser. Use the server
 * API route at `/api/planning-center/events` to fetch events from the client.
 */

import fs from 'fs';
import path from 'path';
/* eslint-disable @typescript-eslint/no-explicit-any */

export type PCEventTime = {
  id?: string;
  name?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
};

export type PCEvent = {
  id: string;
  title: string;
  startsAt?: string | null;
  endsAt?: string | null;
  location?: string | null;
  link?: string | null;
  image?: string | null;
  description?: string | null;
  visible?: boolean;
  // Event times associated with this event (if any)
  eventTimes?: PCEventTime[];
  // The earliest upcoming instance start that we determined for this event
  // (may be populated via a batch or per-event instance lookup).
  nextInstanceStartsAt?: string | null;
  // A small list of upcoming instances (start/end) for the event, sorted
  // ascending by start date. Each item is the instance attributes we found
  // for display or further processing.
  instances?: Array<{ 
    id?: string; 
    startAt: string; 
    endAt?: string | null; 
    raw?: unknown; 
    recurrence?: string | null;
    eventTimes?: PCEventTime[];
  }>;
  raw?: unknown;
};

const DEFAULT_EVENTS_URL = 'https://api.planningcenteronline.com/calendar/v2/events';

function buildAuthHeader(): string | null {
  const pat = process.env.PLANNING_CENTER_PAT;
  const clientId = process.env.PLANNING_CENTER_CLIENT_ID;
  const clientSecret = process.env.PLANNING_CENTER_SECRET;
  const method = (process.env.PLANNING_CENTER_AUTH_METHOD || 'basic').toLowerCase();

  // Prefer client credentials (clientId:clientSecret) when provided. They are
  // supported by the Planning Center API and often allow more scoped access.
  if (clientId && clientSecret) {
    return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  }

  if (pat) {
    if (method === 'bearer') return `Bearer ${pat}`;
    // Default to Basic auth with token as username and empty password (token:)
    return `Basic ${Buffer.from(`${pat}:`).toString('base64')}`;
  }

  return null;
}

/**
 * Fetches upcoming events from the Planning Center Calendar API.
 * Returns null if not configured or on error.
 */
export async function getPlanningCenterEvents({ perPage = 12 } = {}): Promise<PCEvent[] | null> {
  const auth = buildAuthHeader();
  if (!auth) {
    // Not configured — provide a small development-only log to make this
    // obvious in server logs (do not print secrets).
    if (process.env.NODE_ENV !== 'production') {
      console.error('[PlanningCenter] credentials not configured', {
        hasPat: Boolean(process.env.PLANNING_CENTER_PAT),
        hasClientCreds: Boolean(process.env.PLANNING_CENTER_CLIENT_ID && process.env.PLANNING_CENTER_SECRET),
      });
    }

    // Throw an error with an explicit 503 status so callers (and our API
    // route) can surface a friendly "service unavailable" when the
    // runtime is missing configuration rather than returning a 500.
    interface PCOError extends Error { status?: number }
    const err = new Error('Planning Center credentials not configured') as PCOError;
    err.status = 503;
    throw err;
  }

  const baseUrl = process.env.PLANNING_CENTER_EVENTS_URL ?? DEFAULT_EVENTS_URL;
  // Request only events that are visible in Church Center to minimize
  // transferred data and reduce client-side filtering. Also include event_times
  // to get detailed timing information for each event.
  const visibilityFilter = 'filter[visible_in_church_center]=true';
  const url = baseUrl.includes('?')
    ? `${baseUrl}&${visibilityFilter}&per_page=${perPage}&include=event_times`
    : `${baseUrl}?${visibilityFilter}&per_page=${perPage}&include=event_times`;

  // Debugging: print which URL and auth style we're using (do not log secrets)
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[PlanningCenter] fetching', url, 'auth=', auth.split(' ')[0]);
  }

  // Check cache first - if fresh (< 6 hours old), return cached data
  const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  try {
    const cachePath = path.join(process.cwd(), 'logs', 'pco-events-cache.json');
    if (fs.existsSync(cachePath)) {
      const txt = fs.readFileSync(cachePath, 'utf8');
      const parsed = JSON.parse(txt);
      if (parsed && parsed.ts && Array.isArray(parsed.events)) {
        const cacheAge = Date.now() - new Date(parsed.ts).getTime();
        if (cacheAge < CACHE_TTL_MS) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[PlanningCenter] returning fresh cached events', { 
              cacheTs: parsed.ts, 
              ageMinutes: Math.round(cacheAge / 60000),
              ttlMinutes: Math.round(CACHE_TTL_MS / 60000)
            });
          }
          return parsed.events as PCEvent[];
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[PlanningCenter] cache expired, fetching fresh data', { 
              cacheTs: parsed.ts, 
              ageMinutes: Math.round(cacheAge / 60000),
              ttlMinutes: Math.round(CACHE_TTL_MS / 60000)
            });
          }
        }
      }
    }
  } catch (cacheErr) {
    if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenter] failed to read cache', cacheErr);
  }

  try {
    // Use a small retry wrapper to make the helper resilient to
    // transient network errors from the remote API.
    async function retryFetch(u: string, opts: RequestInit, retries = 2, backoff = 300) {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const r = await fetch(u, opts);

          // If the server returns 5xx, we may retry a few times as it's
          // often a transient backend issue. Don't retry on 4xx.
          if (!r.ok && r.status >= 500 && attempt < retries) {
            const delay = backoff * Math.pow(2, attempt);
            if (process.env.NODE_ENV !== 'production') console.debug('[PlanningCenter] retrying fetch due to status', r.status, { url: u, attempt, delay });
            await new Promise((res) => setTimeout(res, delay));
            continue;
          }

          return r;
        } catch (err) {
          // Network/connection errors (e.g., DNS, TLS) manifest as thrown
          // exceptions; retry a couple times and then throw a 503 so the
          // API route can surface a friendly service-unavailable message.
          if (attempt < retries) {
            const delay = backoff * Math.pow(2, attempt);
            if (process.env.NODE_ENV !== 'production') console.debug('[PlanningCenter] fetch attempt failed, retrying', { url: u, attempt, err: String(err), delay });
            await new Promise((res) => setTimeout(res, delay));
            continue;
          }
          interface PCOError extends Error { status?: number; body?: string }
          const e = new Error('Planning Center fetch failed') as PCOError;
          e.status = 503;
          e.body = String(err);
          throw e;
        }
      }

      // Shouldn't reach here
      interface PCOError extends Error { status?: number; body?: string }
      const e = new Error('Planning Center fetch failed') as PCOError;
      e.status = 503;
      throw e;
    }

    const res = await retryFetch(url, {
      headers: {
        Authorization: auth,
        Accept: 'application/vnd.api+json',
      },
    });

    if (!res.ok) {
      const body = await res.text();
      if (process.env.NODE_ENV !== 'production') {
        // Log a truncated body to help debugging without spamming logs
        const truncated = body?.toString().slice(0, 1000);
        console.error('[PlanningCenter] API returned non-ok status', { status: res.status, body: truncated });
      }
      interface PCOError extends Error { status?: number; body?: string }
      const err = new Error('Planning Center API error') as PCOError;
      err.status = res.status;
      err.body = body;
      throw err;
    }

    const json = await res.json();
    if (!json?.data) return null;

    // Defensive: ensure the `data` key is an array; if it's not, avoid
    // calling Array methods on it and fail gracefully with a helpful log.
    if (!Array.isArray(json.data)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[PlanningCenter] unexpected response shape: data is not an array', { dataType: typeof json.data, sample: JSON.stringify(json.data).slice(0, 1000) });
      }
      return null;
    }

    // Parse event_times from the included array if present
    const included: any[] = json.included ?? [];
    const eventTimesById = new Map<string, PCEventTime>();
    for (const inc of included) {
      if (inc.type === 'EventTime') {
        eventTimesById.set(inc.id, {
          id: inc.id,
          name: inc.attributes?.name ?? null,
          startsAt: inc.attributes?.starts_at ?? null,
          endsAt: inc.attributes?.ends_at ?? null,
        });
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('[PlanningCenter] parsed event_times from events endpoint', { 
        eventTimesCount: eventTimesById.size, 
        includedCount: included.length,
        includedTypes: included.map(i => i.type),
        sampleEvent: json.data[0] ? {
          id: json.data[0].id,
          hasEventTimesRel: !!json.data[0].relationships?.event_times,
          eventTimesRelData: json.data[0].relationships?.event_times?.data
        } : null,
        allEventTimeIds: Array.from(eventTimesById.keys())
      });
    }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Only include events that are visible in Church Center (public-facing)
  // and exclude a small set of administrative or internal event types we
  // don't want to surface on the public site (e.g., elections, rehearsals, verticals).
  const forbiddenKeywords = ['election', 'elections', 'rehearsal', 'rehearsals', 'vertical'];

  function hasForbiddenKeyword(d: any) {
      try {
        const parts = [
          d.attributes?.name,
          d.attributes?.title,
          d.attributes?.summary,
          d.attributes?.description,
          d.attributes?.notes,
          d.attributes?.category,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return forbiddenKeywords.some((kw) => parts.includes(kw));
      } catch (err) {
        // Never throw from the predicate - if an unexpected shape causes
        // an exception, log a dev-only warning and treat it as "not
        // forbidden" so we don't accidentally drop legitimate events or
        // crash the entire request.
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[PlanningCenter] failed to evaluate forbidden keyword predicate for event', { id: d?.id, attrs: d?.attributes, err });
        }
        return false;
      }
    }

  const rawEvents: any[] = (json.data as any[]).filter((d: any) => (d.attributes?.visible_in_church_center === true && !hasForbiddenKeyword(d)));

    // Map with a try/catch per item so a single malformed event doesn't
    // blow up the whole response. Log relevant details in development.
    const mapped: Array<PCEvent | null> = rawEvents.map((d: any) => {
      try {
        // Extract event_times for this event from relationships
        const eventTimes: PCEventTime[] = [];
        const eventTimesRel = d.relationships?.event_times?.data;
        if (Array.isArray(eventTimesRel)) {
          for (const etRef of eventTimesRel) {
            const et = eventTimesById.get(etRef.id);
            if (et) eventTimes.push(et);
          }
        }

        const event = {
          id: d.id,
          title: d.attributes?.name ?? d.attributes?.title ?? '',
          startsAt: d.attributes?.starts_at ?? d.attributes?.start_at ?? null,
          endsAt: d.attributes?.ends_at ?? d.attributes?.end_at ?? null,
          location: d.attributes?.location_name ?? d.attributes?.location ?? null,
          link: d.links?.html ?? null,
          image: d.attributes?.image_url ?? null,
          description: d.attributes?.summary ?? d.attributes?.description ?? null,
          visible: Boolean(d.attributes?.visible_in_church_center),
          eventTimes: eventTimes.length > 0 ? eventTimes : undefined,
          raw: d,
        };
        
        if (process.env.NODE_ENV !== 'production' && eventTimes.length > 0) {
          console.log('[PlanningCenter] event has event_times!', {
            eventId: event.id,
            eventTitle: event.title,
            eventTimesCount: eventTimes.length,
            eventTimes: eventTimes
          });
        }
        
        return event;
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[PlanningCenter] failed to map event to PCEvent', { id: d?.id, attrs: d?.attributes, err });
        }
        return null;
      }
    });

    let events: PCEvent[] = mapped.filter(Boolean) as PCEvent[];

    // Fetch upcoming event instances to get the next start date for each event.
    console.log('[PlanningCenter] about to fetch event_instances', { eventCount: events.length });
    try {
  const instancesUrlBase = process.env.PLANNING_CENTER_EVENT_INSTANCES_URL ?? 'https://api.planningcenteronline.com/calendar/v2/event_instances';
  // Include related event resources and event_times to get detailed timing
  // information for each instance. Request a larger page so we can map many
  // upcoming instances in a single request when possible.
  // Use where[starts_at][gte] to filter for instances starting from today
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const instancesUrl = `${instancesUrlBase}?filter=approved&where[starts_at][gte]=${today}&per_page=400&order=starts_at&include=event_times,event`;
    if (process.env.NODE_ENV !== 'production') {
      console.log('[PlanningCenter] fetching event_instances', { url: instancesUrl });
    }
    const ir = await retryFetch(instancesUrl, { headers: { Authorization: auth, Accept: 'application/vnd.api+json' } });
    if (process.env.NODE_ENV !== 'production') {
      console.log('[PlanningCenter] event_instances fetch response', { status: ir.status, ok: ir.ok });
    }
  const earliestByEvent = new Map<string, string>();
  const instancesByEvent = new Map<string, Array<{ id?: string; start: string; end?: string | null; raw?: any; recurrence?: string | null; eventTimes?: PCEventTime[] }>>();

      let instJson: any = null;
      if (ir.ok) {
        instJson = await ir.json();
        if (process.env.NODE_ENV !== 'production') {
          console.log('[PlanningCenter] event_instances JSON parsed', { hasData: !!instJson?.data, dataLength: instJson?.data?.length });
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          const text = await ir.text().catch(() => '');
          console.warn('[PlanningCenter] event_instances fetch returned non-ok', { status: ir.status, body: text.slice(0, 400) });
        }

        // If the batch instances fetch returned a 5xx, try a degraded
        // fallback (smaller page size and without `include=event`) to
        // reduce server load and bypass server errors in some cases.
        if (ir.status >= 500) {
          const fallbackUrl = `${instancesUrlBase}?filter=approved&where[starts_at][gte]=${today}&per_page=100&order=starts_at`;
          if (process.env.NODE_ENV !== 'production') console.debug('[PlanningCenter] attempting degraded instances fetch', { fallbackUrl });
          try {
            const fr = await retryFetch(fallbackUrl, { headers: { Authorization: auth, Accept: 'application/vnd.api+json' } });
            if (fr.ok) instJson = await fr.json();
            else if (process.env.NODE_ENV !== 'production') {
              const t2 = await fr.text().catch(() => '');
              console.warn('[PlanningCenter] degraded instances fetch returned non-ok', { status: fr.status, body: t2.slice(0, 400) });
            }
          } catch (err) {
            if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenter] degraded instances fetch failed', { err });
          }
        }
      }

      const instances: any[] = instJson?.data ?? [];
        const included: any[] = instJson?.included ?? [];

        if (process.env.NODE_ENV !== 'production') {
          console.log('[PlanningCenter] event_instances response summary', {
            instanceCount: instances.length,
            includedCount: included.length,
            eventTimeCount: included.filter((i: any) => i.type === 'EventTime').length,
            sampleInstance: instances[0] ? {
              id: instances[0].id,
              name: instances[0].attributes?.name,
              starts_at: instances[0].attributes?.starts_at,
              hasEventTimesRel: !!instances[0].relationships?.event_times
            } : null
          });
        }

        // Build a map of event_times by their ID for quick lookup
        const eventTimesById = new Map<string, PCEventTime>();
        for (const inc of included) {
          if (inc.type === 'EventTime') {
            eventTimesById.set(inc.id, {
              id: inc.id,
              name: inc.attributes?.name ?? null,
              startsAt: inc.attributes?.starts_at ?? null,
              endsAt: inc.attributes?.ends_at ?? null,
            });
          }
        }

        // Map event id -> array of instance objects (sorted ascending)
        for (const inst of instances) {
          const evId = inst.relationships?.event?.data?.id;
          const start = inst.attributes?.start_at ?? inst.attributes?.starts_at ?? null;
          const end = inst.attributes?.end_at ?? inst.attributes?.ends_at ?? null;
          const recurrence = inst.attributes?.rrule ?? inst.attributes?.recurrence ?? inst.attributes?.recurrence_rule ?? null;
          if (!evId || !start) continue;

          // Extract event_times for this instance from relationships
          const eventTimes: PCEventTime[] = [];
          const eventTimesRel = inst.relationships?.event_times?.data;
          if (Array.isArray(eventTimesRel)) {
            for (const etRef of eventTimesRel) {
              const et = eventTimesById.get(etRef.id);
              if (et) eventTimes.push(et);
            }
          }

          const arr = instancesByEvent.get(evId) ?? [];
          arr.push({ id: inst.id, start, end, raw: inst, recurrence, eventTimes: eventTimes.length > 0 ? eventTimes : undefined });
          instancesByEvent.set(evId, arr);
        }

        // Sort arrays and keep only a small number of instances per event
        for (const [evId, arr] of instancesByEvent.entries()) {
          arr.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
          instancesByEvent.set(evId, arr.slice(0, 6));

          // set earliest (first) as a candidate for next instance
          const first = arr[0];
          if (first && first.start) {
            const cur = earliestByEvent.get(evId);
            if (!cur || new Date(first.start) < new Date(cur)) earliestByEvent.set(evId, first.start);
          }
        }
      

  // For any events that still don't have a next instance found, perform a
  // per-event instance lookup. This is heavier but helps surface dates for
  // recurring templates or cases where the batch query doesn't return
  // everything.
  const now = new Date();
  const missing = events.filter((e) => !earliestByEvent.has(e.id));
      if (missing.length > 0) {
        if (process.env.NODE_ENV !== 'production') {
          console.debug('[PlanningCenter] falling back to per-event instance lookup', { missingCount: missing.length });
        }

        for (const ev of missing) {
          try {
            const perUrl = `${instancesUrlBase}?filter[event]=${encodeURIComponent(ev.id)}&filter=approved&where[starts_at][gte]=${today}&per_page=100&order=starts_at&include=event_times,event`;
            const pr = await retryFetch(perUrl, { headers: { Authorization: auth, Accept: 'application/vnd.api+json' } });
            if (!pr.ok) {
              if (process.env.NODE_ENV !== 'production') {
                const txt = await pr.text().catch(() => '');
                console.debug('[PlanningCenter] per-event instances fetch non-ok', { id: ev.id, status: pr.status, body: txt.slice(0, 400) });
              }
              continue;
            }

            const pj = await pr.json();
            const pinst: any[] = pj.data ?? [];
            const pincluded: any[] = pj.included ?? [];

            // Build a map of event_times from included for this per-event lookup
            const perEventTimesById = new Map<string, PCEventTime>();
            for (const inc of pincluded) {
              if (inc.type === 'EventTime') {
                perEventTimesById.set(inc.id, {
                  id: inc.id,
                  name: inc.attributes?.name ?? null,
                  startsAt: inc.attributes?.starts_at ?? null,
                  endsAt: inc.attributes?.ends_at ?? null,
                });
              }
            }

            // Build per-event instances array; prefer future instances but
            // signal earliest overall if no future instances exist.
            const arr = [] as Array<{ id?: string; start: string; end?: string | null; raw?: any; recurrence?: string | null; eventTimes?: PCEventTime[] }>;
            for (const inst of pinst) {
              const start = inst.attributes?.start_at ?? inst.attributes?.starts_at ?? null;
              const end = inst.attributes?.end_at ?? inst.attributes?.ends_at ?? null;
              const recurrence = inst.attributes?.rrule ?? inst.attributes?.recurrence ?? inst.attributes?.recurrence_rule ?? null;
              if (!start) continue;

              // Extract event_times for this instance
              const eventTimes: PCEventTime[] = [];
              const eventTimesRel = inst.relationships?.event_times?.data;
              if (Array.isArray(eventTimesRel)) {
                for (const etRef of eventTimesRel) {
                  const et = perEventTimesById.get(etRef.id);
                  if (et) eventTimes.push(et);
                }
              }

              arr.push({ id: inst.id, start, end, raw: inst, recurrence, eventTimes: eventTimes.length > 0 ? eventTimes : undefined });
            }

            // take upcoming instances first, else earliest overall; sort ascending
            arr.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
            const upcoming = arr.filter((x) => new Date(x.start) >= now);
            const chosenList = (upcoming.length ? upcoming : arr).slice(0, 6);
            if (chosenList.length > 0) {
              earliestByEvent.set(ev.id, chosenList[0].start);
            }

            // attach to instancesByEvent map so it can be used later
            const existing = instancesByEvent.get(ev.id) ?? [];
            instancesByEvent.set(ev.id, (existing.concat(chosenList)).slice(0, 6));
            if (process.env.NODE_ENV !== 'production' && chosenList.length) {
              console.debug('[PlanningCenter] per-event instance chosen', { id: ev.id, chosen: chosenList[0].start });
            }
          } catch (err) {
            if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenter] per-event instance lookup failed', { id: ev.id, err });
          }
        }
      }

      // Apply instances and nextInstanceStartsAt to events and use them to
      // fill startsAt when missing
      events = events.map((e) => {
        const insts: Array<{ id?: string; start: string; end?: string | null; raw?: any; recurrence?: string | null; eventTimes?: PCEventTime[] }> = instancesByEvent.get(e.id) ?? [];
        return {
          ...e,
          instances: insts.map((it) => ({ 
            id: it.id, 
            startAt: it.start, 
            endAt: it.end ?? null, 
            raw: it.raw, 
            recurrence: it.recurrence ?? null,
            eventTimes: it.eventTimes 
          })),
          nextInstanceStartsAt: earliestByEvent.get(e.id) ?? (insts[0]?.start ?? null),
          startsAt: e.startsAt ?? earliestByEvent.get(e.id) ?? (insts[0]?.start ?? null),
        };
      });
    } catch (err) {
      // Don't fail if instances fetch fails; we still return events without instance dates
      console.warn('Planning Center: failed to fetch event instances', err);
    }

    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Persist a small cache of the last-successful events so we can
    // continue to serve reasonable content if the external API is
    // temporarily unavailable.
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      fs.mkdirSync(logsDir, { recursive: true });
      const cachePath = path.join(logsDir, 'pco-events-cache.json');
      fs.writeFileSync(cachePath, JSON.stringify({ ts: new Date().toISOString(), events }));
    } catch (writeErr) {
      if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenter] failed to write events cache', writeErr);
    }

    // Filter to future events since filter=approved doesn't filter by date
    const now = new Date();
    const futureEvents = events.filter(e => {
      if (!e.startsAt) return false;
      return new Date(e.startsAt) >= now;
    });
    
    if (process.env.NODE_ENV !== 'production') {
      const pastEvent = events.find(e => e.startsAt && new Date(e.startsAt) < now);
      console.log('[PlanningCenter] event filtering summary', {
        totalEvents: events.length,
        futureEvents: futureEvents.length,
        filteredOutCount: events.length - futureEvents.length,
        now: now.toISOString(),
        samplePastEvent: pastEvent ? {
          title: pastEvent.title,
          startsAt: pastEvent.startsAt
        } : null,
        allEventDates: events.slice(0, 5).map(e => ({ title: e.title, startsAt: e.startsAt }))
      });
    }
    
    return futureEvents;
  } catch (err) {
    // If the fetch failed for reasons other than missing credentials
    // (network issues or 5xx), try to return a cached copy even if expired
    // as a fallback to keep the site functional.
    console.error('Planning Center fetch failed', err);

    try {
      const cachePath = path.join(process.cwd(), 'logs', 'pco-events-cache.json');
      if (fs.existsSync(cachePath)) {
        const txt = fs.readFileSync(cachePath, 'utf8');
        const parsed = JSON.parse(txt);
        if (parsed && Array.isArray(parsed.events)) {
          const cacheAge = parsed.ts ? Date.now() - new Date(parsed.ts).getTime() : Infinity;
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[PlanningCenter] returning cached events (possibly stale) due to fetch failure', { 
              cacheTs: parsed.ts,
              ageMinutes: parsed.ts ? Math.round(cacheAge / 60000) : 'unknown'
            });
          }
          return parsed.events as PCEvent[];
        }
      }
    } catch (cacheErr) {
      if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenter] failed to read events cache', cacheErr);
    }

    throw err;
  }
}

export default getPlanningCenterEvents;
