import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'pco-instances.log');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function appendLog(obj) {
  const line = `${new Date().toISOString()} ${JSON.stringify(obj)}\n`;
  fs.appendFileSync(LOG_FILE, line);
}

function buildAuthHeader() {
  const pat = process.env.PLANNING_CENTER_PAT;
  const clientId = process.env.PLANNING_CENTER_CLIENT_ID;
  const clientSecret = process.env.PLANNING_CENTER_SECRET;

  if (clientId && clientSecret) {
    return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  }
  if (pat) return `Basic ${Buffer.from(`${pat}:`).toString('base64')}`;
  return null;
}

async function probeEventInstances(eventIds = []) {
  const auth = buildAuthHeader();
  if (!auth) throw new Error('Planning Center credentials not configured (PLANNING_CENTER_PAT or client creds)');

  const instancesUrlBase = process.env.PLANNING_CENTER_EVENT_INSTANCES_URL ?? 'https://api.planningcenteronline.com/calendar/v2/event_instances';

  for (const id of eventIds) {
    try {
      const url = `${instancesUrlBase}?filter[event]=${encodeURIComponent(id)}&filter[future]=true&per_page=100`;
      const res = await fetch(url, { headers: { Authorization: auth, Accept: 'application/vnd.api+json' } });
      const bodyText = await res.text();
      let body = null;
      try { body = JSON.parse(bodyText); } catch { body = bodyText; }

      // If instances are present, log the first instance's start/end for quick inspection
      let firstStart = null;
      let firstEnd = null;
      if (Array.isArray(body?.data) && body.data.length > 0) {
        const inst = body.data[0];
        firstStart = inst?.attributes?.start_at ?? inst?.attributes?.starts_at ?? null;
        firstEnd = inst?.attributes?.end_at ?? inst?.attributes?.ends_at ?? null;
      }

      appendLog({ eventId: id, status: res.status, url, firstStart, firstEnd, body });
      console.log(`event ${id} status=${res.status} items=${Array.isArray(body?.data) ? body.data.length : 'n/a'} firstStart=${firstStart} firstEnd=${firstEnd}`);
    } catch (err) {
      appendLog({ eventId: id, error: String(err) });
      console.error(`Failed to fetch instances for event ${id}:`, err);
    }
  }
}

(async () => {
  // Default list of event IDs you mentioned (Comfort Covers, Men's Book Study, Faith & Practice, Sunday Worship)
  const ids = (process.env.PCO_INSTANCE_IDS || '11961052,11961367,11950589,11950436').split(',').map(s => s.trim()).filter(Boolean);
  console.log('Probing instances for:', ids);
  try {
    await probeEventInstances(ids);
    console.log('Done. See', LOG_FILE);
  } catch (err) {
    console.error('Probe failed:', err);
  }
})();
