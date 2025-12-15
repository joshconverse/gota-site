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

  if (!(clientId && secret)) {
    console.error('No PCO client credentials found in .env.local.');
    process.exit(2);
  }

  const auth = `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`;
  const instancesUrlBase = 'https://api.planningcenteronline.com/calendar/v2/event_instances';
  
  console.log('\n🔍 Testing event_instances endpoint with event_times...\n');

  // Test 1: Without event_times
  console.log('1️⃣  Testing WITHOUT event_times (include=event only):');
  const url1 = `${instancesUrlBase}?filter[future]=true&per_page=5&include=event`;
  try {
    const res1 = await fetch(url1, { 
      headers: { Authorization: auth, Accept: 'application/vnd.api+json' } 
    });
    console.log(`   Status: ${res1.status} ${res1.ok ? '✅' : '❌'}`);
    if (res1.ok) {
      const json1 = await res1.json();
      console.log(`   Data count: ${json1.data?.length ?? 0}`);
      console.log(`   Included count: ${json1.included?.length ?? 0}`);
    } else {
      const txt = await res1.text();
      console.log(`   Error: ${txt.slice(0, 200)}`);
    }
  } catch (err) {
    console.log(`   Error: ${err.message}`);
  }

  console.log('\n2️⃣  Testing WITH event_times (include=event,event_times):');
  const url2 = `${instancesUrlBase}?filter[future]=true&per_page=5&include=event,event_times`;
  try {
    const res2 = await fetch(url2, { 
      headers: { Authorization: auth, Accept: 'application/vnd.api+json' } 
    });
    console.log(`   Status: ${res2.status} ${res2.ok ? '✅' : '❌'}`);
    if (res2.ok) {
      const json2 = await res2.json();
      console.log(`   Data count: ${json2.data?.length ?? 0}`);
      console.log(`   Included count: ${json2.included?.length ?? 0}`);
      
      // Check for EventTime in included
      const eventTimes = json2.included?.filter(i => i.type === 'EventTime') ?? [];
      console.log(`   EventTime count: ${eventTimes.length}`);
      
      if (eventTimes.length > 0) {
        console.log(`\n   Sample EventTime:`);
        console.log(JSON.stringify(eventTimes[0], null, 2));
      }
      
      // Check if any instances have event_times relationships
      const withEventTimes = json2.data?.filter(inst => 
        inst.relationships?.event_times?.data?.length > 0
      ) ?? [];
      console.log(`   Instances with event_times: ${withEventTimes.length}`);
    } else {
      const txt = await res2.text();
      console.log(`   Error: ${txt.slice(0, 200)}`);
    }
  } catch (err) {
    console.log(`   Error: ${err.message}`);
  }

  console.log('\n');
})();
