import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import getPlanningCenterEvents from '@/utils/planningcenter';

export async function GET() {
  try {
    const events = await getPlanningCenterEvents({ perPage: 12 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
      interface APIError extends Error { status?: number; body?: string }
      const e = err as APIError;
  const status = e?.status ?? 500;
  const body = process.env.NODE_ENV !== 'production' ? (e?.body ?? e?.message ?? 'unknown') : 'Planning Center request failed';

      // In development, include a small, non-sensitive hint about whether the
      // runtime has PCO credentials configured so it's faster to diagnose 500s
      // that are caused by missing secrets. Do NOT include actual secret
      // values.
      if (process.env.NODE_ENV !== 'production') {
        const hasPat = Boolean(process.env.PLANNING_CENTER_PAT);
        const hasClientCreds = Boolean(process.env.PLANNING_CENTER_CLIENT_ID && process.env.PLANNING_CENTER_SECRET);
        const authMethod = process.env.PLANNING_CENTER_AUTH_METHOD ?? null;
        const stack = e?.stack ? (e.stack.split('\n').slice(0, 6)) : undefined;

        // If this is a server-side error (5xx), append a small, non-sensitive
        // diagnostic entry to logs/pco-errors.log so we can catch intermittent
        // failures that may be hard to reproduce in a short probe window.
        try {
          if (status >= 500) {
            const logsDir = path.join(process.cwd(), 'logs');
            fs.mkdirSync(logsDir, { recursive: true });
            const logPath = path.join(logsDir, 'pco-errors.log');
            const entry = {
              ts: new Date().toISOString(),
              status,
              body: typeof body === 'string' ? body.slice(0, 2000) : body,
              env: { hasPat, hasClientCreds, authMethod },
              stack,
            };
            fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');
          }
        } catch (writeErr) {
          // Non-fatal; write errors shouldn't block the response.
          console.warn('[PlanningCenter] failed to append error log', writeErr);
        }

        return NextResponse.json({ error: true, status, body, env: { hasPat, hasClientCreds, authMethod }, stack }, { status });
      }

      return NextResponse.json({ error: true, status, body }, { status });
    }
}
