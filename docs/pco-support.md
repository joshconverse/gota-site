# Planning Center Support: event_instances 500 (internal server error)

Summary
-------
Our site (Grace on the Ashley) is experiencing repeated 500 Internal Server Errors when querying the Planning Center `event_instances` endpoint. The `events` endpoint responds successfully (200), but `event_instances` (both batch and per-event queries) returns 500 and a JSON errors body. This prevents us from surfacing concrete start/end datetimes for events.

Why we are contacting you
-------------------------
We believe this is an internal server error on Planning Center's side. It occurs for the following requests made using Basic auth (client credentials):

- Batch instances request (includes `include=event` and larger page size):
  GET https://api.planningcenteronline.com/calendar/v2/event_instances?filter[future]=true&per_page=400&include=event

- Per-event fallback (example for event `11961052`):
  GET https://api.planningcenteronline.com/calendar/v2/event_instances?filter[event]=11961052&filter[future]=true&per_page=100&include=event

What we observed
-----------------
- The `events` endpoint succeeds with client credentials (200 OK) and returns valid events.
- The `event_instances` endpoints above consistently return 500 with body like:

```
{"errors":[{"status":"500","title":"Internal Server Error","detail":"An internal server error occurred on our end and we've been notified. Please contact support if the issue persists."}]}
```

- We also tried a degraded batch request (smaller page size and *without* `include=event`):
  GET https://api.planningcenteronline.com/calendar/v2/event_instances?filter[future]=true&per_page=100
  — this also returned 500.

- Using a PAT (Personal Access Token) for `event_instances` returned 401 (HTTP Basic: Access denied) — we are using client credentials for server-to-server calls.

What we've done locally to diagnose
-----------------------------------
- Confirmed client credentials authenticate successfully for `events` using the `scripts/test-pco.mjs` script. `events` returned 200 and sample results.
- Used `scripts/test-pco-instances.mjs` to probe instance endpoints and confirmed the 500 responses for the three variants above.
- Added temporary retries and a degraded fallback in our code to try smaller page sizes or remove `include=event` to mitigate, but these also return 500.

Relevant logs (timestamps are approximate)
-----------------------------------------
- Instance batch call (2025-12-15T20:17:40Z): status 500, body:
  {"errors":[{"status":"500","title":"Internal Server Error","detail":"An internal server error occurred on our end and we've been notified. Please contact support if the issue persists."}]}

- Per-event fallback (event 11961052): status 500, same body as above.

What we'd like help with
------------------------
1. Can you check why `GET /calendar/v2/event_instances` is returning 500 for our org when called with client credentials? We can provide request timestamps and headers (minus secrets) if useful.
2. Are there known issues with `include=event` or very large `per_page` values on that endpoint that would cause an internal error? Is there a recommended query pattern we should use instead?
3. If you'd like a specific request we can supply (timestamp, offset, request-id headers), let us know and we'll forward the exact details from our logs.

Notes and contact
-----------------
- Our local debugging scripts are under `scripts/test-pco.mjs` and `scripts/test-pco-instances.mjs` — they hit the endpoints described above (they read `.env.local` for credentials).
- We prefer client credential (Basic) authentication for server-to-server calls. We can also test PAT-based requests on request.

Thank you — please let us know if you need additional trace IDs, sample timestamps, or permission to run more targeted tests from our side.
