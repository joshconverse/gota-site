import { NextResponse } from 'next/server';
import getPlanningCenterGroups from '@/utils/planningcenterGroups';

export async function GET() {
  try {
    const groups = await getPlanningCenterGroups({ perPage: 100 });
    return NextResponse.json({ groups }, { status: 200 });
  } catch (err) {
    interface APIError extends Error { status?: number; body?: string }
    const e = err as APIError;
    const status = e?.status ?? 500;
    const body = process.env.NODE_ENV !== 'production' ? (e?.body ?? e?.message ?? 'unknown') : 'Planning Center request failed';

    if (process.env.NODE_ENV !== 'production') {
      const hasPat = Boolean(process.env.PLANNING_CENTER_PAT);
      const hasClientCreds = Boolean(process.env.PLANNING_CENTER_CLIENT_ID && process.env.PLANNING_CENTER_SECRET);
      const authMethod = process.env.PLANNING_CENTER_AUTH_METHOD ?? null;
      return NextResponse.json({ error: true, status, body, env: { hasPat, hasClientCreds, authMethod } }, { status });
    }

    return NextResponse.json({ error: true, status, body }, { status });
  }
}
