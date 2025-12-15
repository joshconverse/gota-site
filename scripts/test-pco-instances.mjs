import fs from 'fs';
import path from 'path';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    out[key] = val;
  }
  return out;
}

(async function main() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const env = loadEnvFile(envPath);

  const clientId = env.PLANNING_CENTER_CLIENT_ID;
  const secret = env.PLANNING_CENTER_SECRET;
  const pat = env.PLANNING_CENTER_PAT;

  if (!(clientId && secret) && !pat) {
    console.error('No PCO credentials found in .env.local. Please add PLANNING_CENTER_PAT or CLIENT_ID/SECRET.');
    process.exit(2);
  }

  const clientHeader = clientId && secret ? `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}` : null;
  const patHeader = pat ? `Basic ${Buffer.from(`${pat}:`).toString('base64')}` : null;

  const instancesUrlBase = env.PLANNING_CENTER_EVENT_INSTANCES_URL ?? 'https://api.planningcenteronline.com/calendar/v2/event_instances';
  const batchUrl = `${instancesUrlBase}?filter[future]=true&per_page=400&include=event`;
  const perEventUrl = `${instancesUrlBase}?filter[event]=11961052&filter[future]=true&per_page=100&include=event`;

  async function tryFetch(url, header) {
    try {
      const res = await fetch(url, { headers: { Authorization: header, Accept: 'application/vnd.api+json' } });
      const txt = await res.text();
      let json = null;
      try { json = JSON.parse(txt); } catch { json = null; }
      return { ok: res.ok, status: res.status, json, txt };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  }

  console.log('Testing batch instances URL:', batchUrl);
  if (clientHeader) {
    console.log('Trying client credentials...');
    console.log(await tryFetch(batchUrl, clientHeader));
  }

  if (patHeader) {
    console.log('Trying PAT header...');
    console.log(await tryFetch(batchUrl, patHeader));
  }

  console.log('\nTesting per-event fallback URL:', perEventUrl);
  if (clientHeader) {
    console.log('Trying client credentials...');
    console.log(await tryFetch(perEventUrl, clientHeader));
  }

  // Try a degraded/fallback instances fetch (smaller page, no include)
  const fallbackBatch = `${instancesUrlBase}?filter[future]=true&per_page=100`;
  console.log('\nTesting degraded batch instances URL:', fallbackBatch);
  if (clientHeader) {
    console.log('Trying client credentials on degraded endpoint...');
    console.log(await tryFetch(fallbackBatch, clientHeader));
  }
})();
