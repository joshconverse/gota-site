import { NextResponse } from 'next/server';
import getPlanningCenterEvents from '@/utils/planningcenter';

export async function GET() {
  try {
    const events = await getPlanningCenterEvents({ perPage: 12 });
    return NextResponse.json({ events }, {
      status: 200,
      headers: {
        // Match the upstream Data Cache TTL in `utils/planningcenter`. Without
        // this the CDN revalidated on every hit, so each request paid for a
        // fresh function invocation.
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600', // 6 hours
      },
    });
  } catch (err) {
    interface APIError extends Error { status?: number; body?: string }
    const e = err as APIError;
    const status = e?.status ?? 500;
    const body = process.env.NODE_ENV !== 'production' ? (e?.body ?? e?.message ?? 'unknown') : 'Planning Center request failed';

    // In development, include a small, non-sensitive hint about whether the
    // runtime has PCO credentials configured so it's faster to diagnose 500s
    // that are caused by missing secrets. Do NOT include actual secret values.
    if (process.env.NODE_ENV !== 'production') {
      const hasPat = Boolean(process.env.PLANNING_CENTER_PAT);
      const hasClientCreds = Boolean(process.env.PLANNING_CENTER_CLIENT_ID && process.env.PLANNING_CENTER_SECRET);
      const authMethod = process.env.PLANNING_CENTER_AUTH_METHOD ?? null;
      const stack = e?.stack ? (e.stack.split('\n').slice(0, 6)) : undefined;

      return NextResponse.json({ error: true, status, body, env: { hasPat, hasClientCreds, authMethod }, stack }, { status });
    }

    return NextResponse.json({ error: true, status, body }, { status });
  }
}
