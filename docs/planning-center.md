# Planning Center integration

This project includes a lightweight Planning Center integration to fetch events from Planning Center's Calendar API.

How it works
- Server-side helper: `src/utils/planningcenter.ts` (reads credentials from env vars)
- Server API route: `GET /api/planning-center/events` (server-only; proxies requests to Planning Center)
- Client: `src/app/events/page.tsx` calls the API route and displays events when available

Environment variables
- `PLANNING_CENTER_PAT` - Personal Access Token (recommended for single-org testing)
- Or: `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET` - client credentials
- If both `PLANNING_CENTER_CLIENT_ID`/`PLANNING_CENTER_SECRET` and `PLANNING_CENTER_PAT` are provided, the server will prefer the client credentials (Basic with client id/secret). This often works better for automated server access; you can still force PAT-only behavior by removing client credentials from `.env.local`.
- `PLANNING_CENTER_AUTH_METHOD` - optional: `basic` (default) or `bearer`

Security notes
- Never commit secrets. Use `.env.local` to store the real values and keep `.env.example` in the repo for reference.

Testing locally
1. Copy `.env.example` to `.env.local` and populate `PLANNING_CENTER_PAT` with your PAT value.
2. Run the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000/events` and look for the "Checking external calendar..." message while the integration probes for events. If configured and your PAT has permission, events from Planning Center will appear above the Sanity-backed events.

If you want the server to authenticate with `Bearer` instead of Basic, set `PLANNING_CENTER_AUTH_METHOD=bearer` in `.env.local`.

If you want me to wire additional fields from Planning Center (like links, attendee counts, or image thumbnails), tell me which fields you'd like and I can extend the mapping in `src/utils/planningcenter.ts`.

Troubleshooting
-----------------
- If you see a 500 from `GET /api/planning-center/events` with the message "Planning Center credentials not configured", the dev server process likely doesn't have your `.env.local` values loaded. Restart the dev server after editing `.env.local` and try again.
- In development the API will now return a small, non-sensitive `env` object on errors (for example: `{ hasPat: false, hasClientCreds: true }`) to help quickly verify which credential type the running process can see. This is only returned in non-production environments and does not expose secret values.
