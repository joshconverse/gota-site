import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'pco-probe.log');
const URL = process.env.PCO_PROBE_URL || 'http://localhost:3000/api/planning-center/events';

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function appendLog(obj) {
  const line = `${new Date().toISOString()} ${JSON.stringify(obj)}\n`;
  fs.appendFileSync(LOG_FILE, line);
}

async function probe({ attempts = 60, intervalMs = 500 } = {}) {
  console.log(`Probing ${URL} up to ${attempts} times (interval ${intervalMs}ms). Logs: ${LOG_FILE}`);

  for (let i = 0; i < attempts; i++) {
    let status = null;
    let body = null;
    try {
      const res = await fetch(URL);
      status = res.status;
      const text = await res.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
      appendLog({ attempt: i + 1, status, body });
      console.log(`#${i + 1} status=${status}`);
      if (status >= 500) {
        console.error('Got server error (>=500), captured response in log and printing now:');
        console.error(JSON.stringify(body, null, 2));
        return { status, body, attempts: i + 1 };
      }
    } catch (err) {
      appendLog({ attempt: i + 1, error: String(err) });
      console.warn(`#${i + 1} fetch failed:`, err);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }

  console.log('Finished probing without seeing a 500 (see log for details).');
  return { status: 'no-500', attempts };
}

(async () => {
  const result = await probe({ attempts: 60, intervalMs: 500 });
  console.log('Probe result:', result);
})();
