/**
 * Lightweight Planning Center Groups API helper for server-side use.
 *
 * Authentication (shared with the events helper in `planningcenter.ts`):
 * - Set `PLANNING_CENTER_PAT` for a Personal Access Token (recommended for a single org)
 * - Or set `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET` for client credentials
 *
 * The token must have access to the Groups product. This module never sends
 * credentials to the browser — use the server API route at
 * `/api/planning-center/groups` to fetch groups from the client.
 */

import fs from 'fs';
import path from 'path';
/* eslint-disable @typescript-eslint/no-explicit-any */

export type PCGroup = {
  id: string;
  name: string;
  description?: string | null;
  /** Human-readable meeting schedule, e.g. "Every other Thursday at 6:30pm". */
  schedule?: string | null;
  /** Public Church Center page for the group — used for the "Join" link. */
  link?: string | null;
  image?: string | null;
  contactEmail?: string | null;
  membershipsCount?: number | null;
  raw?: unknown;
};

const DEFAULT_GROUPS_URL = 'https://api.planningcenteronline.com/groups/v2/groups';

function buildAuthHeader(): string | null {
  const pat = process.env.PLANNING_CENTER_PAT;
  const clientId = process.env.PLANNING_CENTER_CLIENT_ID;
  const clientSecret = process.env.PLANNING_CENTER_SECRET;
  const method = (process.env.PLANNING_CENTER_AUTH_METHOD || 'basic').toLowerCase();

  if (clientId && clientSecret) {
    return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  }

  if (pat) {
    if (method === 'bearer') return `Bearer ${pat}`;
    return `Basic ${Buffer.from(`${pat}:`).toString('base64')}`;
  }

  return null;
}

async function retryFetch(u: string, opts: RequestInit, retries = 2, backoff = 300) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const r = await fetch(u, opts);
      if (!r.ok && r.status >= 500 && attempt < retries) {
        const delay = backoff * Math.pow(2, attempt);
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      return r;
    } catch (err) {
      if (attempt < retries) {
        const delay = backoff * Math.pow(2, attempt);
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      interface PCOError extends Error { status?: number; body?: string }
      const e = new Error('Planning Center groups fetch failed') as PCOError;
      e.status = 503;
      e.body = String(err);
      throw e;
    }
  }
  interface PCOError extends Error { status?: number; body?: string }
  const e = new Error('Planning Center groups fetch failed') as PCOError;
  e.status = 503;
  throw e;
}

/**
 * Fetches groups from the Planning Center Groups API, returning only those that
 * are published to Church Center (i.e. have a public web URL) and not archived.
 * Returns null if the response shape is unexpected. Throws with a `status` of
 * 503 when credentials are not configured so callers can surface a friendly
 * "service unavailable" instead of a 500.
 */
export async function getPlanningCenterGroups({ perPage = 100 } = {}): Promise<PCGroup[] | null> {
  const auth = buildAuthHeader();
  if (!auth) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[PlanningCenterGroups] credentials not configured', {
        hasPat: Boolean(process.env.PLANNING_CENTER_PAT),
        hasClientCreds: Boolean(process.env.PLANNING_CENTER_CLIENT_ID && process.env.PLANNING_CENTER_SECRET),
      });
    }
    interface PCOError extends Error { status?: number }
    const err = new Error('Planning Center credentials not configured') as PCOError;
    err.status = 503;
    throw err;
  }

  const baseUrl = process.env.PLANNING_CENTER_GROUPS_URL ?? DEFAULT_GROUPS_URL;
  const url = baseUrl.includes('?')
    ? `${baseUrl}&per_page=${perPage}&order=name`
    : `${baseUrl}?per_page=${perPage}&order=name`;

  const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
  const cachePath = path.join(process.cwd(), 'logs', 'pco-groups-cache.json');

  // Serve fresh cache if available.
  try {
    if (fs.existsSync(cachePath)) {
      const parsed = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (parsed && parsed.ts && Array.isArray(parsed.groups)) {
        const age = Date.now() - new Date(parsed.ts).getTime();
        if (age < CACHE_TTL_MS) return parsed.groups as PCGroup[];
      }
    }
  } catch (cacheErr) {
    if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenterGroups] failed to read cache', cacheErr);
  }

  try {
    const res = await retryFetch(url, {
      headers: { Authorization: auth, Accept: 'application/vnd.api+json' },
    });

    if (!res.ok) {
      const body = await res.text();
      if (process.env.NODE_ENV !== 'production') {
        console.error('[PlanningCenterGroups] API returned non-ok status', { status: res.status, body: body.slice(0, 1000) });
      }
      interface PCOError extends Error { status?: number; body?: string }
      const err = new Error('Planning Center Groups API error') as PCOError;
      err.status = res.status;
      err.body = body;
      throw err;
    }

    const json = await res.json();
    if (!json?.data) return null;
    if (!Array.isArray(json.data)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[PlanningCenterGroups] unexpected response shape: data is not an array', { dataType: typeof json.data });
      }
      return null;
    }

    // Follow pagination so a group isn't dropped just because it sorted past
    // the first page. Bounded to guard against a runaway loop.
    let nextUrl: string | null = json.links?.next ?? null;
    let pageCount = 1;
    const MAX_PAGES = 10;
    while (nextUrl && pageCount < MAX_PAGES) {
      const pageRes = await retryFetch(nextUrl, {
        headers: { Authorization: auth, Accept: 'application/vnd.api+json' },
      });
      if (!pageRes.ok) break;
      const pageJson = await pageRes.json();
      if (!Array.isArray(pageJson?.data)) break;
      json.data = json.data.concat(pageJson.data);
      nextUrl = pageJson.links?.next ?? null;
      pageCount++;
    }

    const mapped: Array<PCGroup | null> = (json.data as any[]).map((d: any) => {
      try {
        const attrs = d.attributes ?? {};
        // Only surface groups that are published to Church Center and not archived.
        const publicUrl = attrs.public_church_center_web_url ?? null;
        if (!publicUrl || attrs.archived_at) return null;

        const header = attrs.header_image ?? {};
        const image = header.medium ?? header.original ?? header.thumbnail ?? null;

        return {
          id: d.id,
          name: attrs.name ?? '',
          description: attrs.description ?? null,
          schedule: attrs.schedule ?? null,
          link: publicUrl,
          image,
          contactEmail: attrs.contact_email ?? null,
          membershipsCount: typeof attrs.memberships_count === 'number' ? attrs.memberships_count : null,
          raw: d,
        } as PCGroup;
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[PlanningCenterGroups] failed to map group', { id: d?.id, err });
        }
        return null;
      }
    });

    const groups: PCGroup[] = (mapped.filter(Boolean) as PCGroup[]).sort((a, b) =>
      (a.name ?? '').localeCompare(b.name ?? '')
    );

    // Persist a cache so we can keep serving content if the API is briefly down.
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      fs.mkdirSync(logsDir, { recursive: true });
      fs.writeFileSync(cachePath, JSON.stringify({ ts: new Date().toISOString(), groups }));
    } catch (writeErr) {
      if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenterGroups] failed to write cache', writeErr);
    }

    return groups;
  } catch (err) {
    console.error('Planning Center groups fetch failed', err);
    // Fall back to a cached copy, even if stale, to keep the page functional.
    try {
      if (fs.existsSync(cachePath)) {
        const parsed = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        if (parsed && Array.isArray(parsed.groups)) return parsed.groups as PCGroup[];
      }
    } catch (cacheErr) {
      if (process.env.NODE_ENV !== 'production') console.warn('[PlanningCenterGroups] failed to read cache', cacheErr);
    }
    throw err;
  }
}

export default getPlanningCenterGroups;
