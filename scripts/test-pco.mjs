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

  console.log('Loaded env keys:', Object.keys(env));

  const pat = env.PLANNING_CENTER_PAT;
  const clientId = env.PLANNING_CENTER_CLIENT_ID;
  const secret = env.PLANNING_CENTER_SECRET;
  const authMethod = (env.PLANNING_CENTER_AUTH_METHOD || 'basic').toLowerCase();

  if (!pat && !(clientId && secret)) {
    console.error('No PCO credentials found in .env.local. Please add PLANNING_CENTER_PAT or CLIENT_ID/SECRET.');
    process.exit(2);
  }

  function buildAuthHeader() {
    if (pat) {
      if (authMethod === 'bearer') return `Bearer ${pat}`;
      return `Basic ${Buffer.from(`${pat}:`).toString('base64')}`;
    }
    return `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`;
  }

  const auth = buildAuthHeader();

  console.log('Using auth header type:', auth.split(' ')[0]);

  const url = 'https://api.planningcenteronline.com/calendar/v2/events?per_page=5';

  try {
    // Try a few auth header styles to help diagnose 401s
    const variants = [];
    // Basic with token as username and empty password (token:)
    variants.push(['Basic-token-colon', `Basic ${Buffer.from(`${pat}:`).toString('base64')}`]);
    // Basic with token alone (no colon)
    variants.push(['Basic-token', `Basic ${Buffer.from(pat).toString('base64')}`]);
    // Bearer
    variants.push(['Bearer', `Bearer ${pat}`]);
    // Client credentials Basic
    if (clientId && secret) {
      variants.push(['Basic-client', `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`]);
    }

    for (const [label, header] of variants) {
      console.log('\nTrying:', label);
      const res = await fetch(url, { headers: { Authorization: header, Accept: 'application/vnd.api+json' } });
      console.log('Status:', res.status);
      const text = await res.text();
  try { console.log('Body(JSON):', JSON.parse(text)); } catch { console.log('Body(Text):', text); }
    }
  } catch (err) {
    console.error('Fetch failed:', err);
    process.exit(1);
  }
})();
