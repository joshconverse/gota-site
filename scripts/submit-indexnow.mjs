#!/usr/bin/env node
// submit-indexnow.mjs
//
// Notify IndexNow-participating search engines (Bing, Yandex, etc.) that the
// site should be re-crawled. Google does NOT use IndexNow — this only helps
// the IndexNow ecosystem.
//
// How it works:
//   1. Fetch the live sitemap and parse every <loc> URL → urlList.
//   2. Derive the canonical host from those URLs (currently
//      graceontheashley.org). IndexNow requires host + keyLocation + every
//      submitted URL to share the same host, so we take it from the sitemap
//      rather than hardcoding — it stays correct if the domain changes.
//   3. Read the public IndexNow key from public/<key>.txt.
//   4. POST the key + urlList to https://api.indexnow.org/indexnow.
//
// The key file is intentionally public (that's how IndexNow proves ownership).
// No secrets are required.
//
// Usage:
//   node scripts/submit-indexnow.mjs            # submit to IndexNow
//   node scripts/submit-indexnow.mjs --dry-run  # parse + print payload only

import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Domain used only to fetch the sitemap. The host actually submitted to
// IndexNow is derived from the sitemap's <loc> URLs below.
const SITEMAP_URL = "https://graceontheashley.org/sitemap.xml";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const DRY_RUN = process.argv.includes("--dry-run");

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

async function readKey() {
  const entries = await readdir(PUBLIC_DIR);
  // The IndexNow key file is a 32-char lowercase hex name ending in .txt.
  const keyFile = entries.find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  if (!keyFile) {
    throw new Error(`No IndexNow key file (public/<32-hex>.txt) found in ${PUBLIC_DIR}`);
  }
  const key = (await readFile(join(PUBLIC_DIR, keyFile), "utf8")).trim();
  return { key, keyFile };
}

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status} ${res.statusText})`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) {
    throw new Error("Sitemap contained no <loc> URLs");
  }
  return urls;
}

async function main() {
  const [{ key, keyFile }, urlList] = await Promise.all([
    readKey(),
    fetchSitemapUrls(),
  ]);

  const host = new URL(urlList[0]).host;
  const keyLocation = `https://${host}/${keyFile}`;

  const payload = { host, key, keyLocation, urlList };

  console.log(`Parsed ${urlList.length} URL(s) from ${SITEMAP_URL}`);
  console.log(`Host: ${host}`);
  console.log(`Key location: ${keyLocation}`);

  if (DRY_RUN) {
    console.log("--dry-run: not submitting. Payload:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // 200 = accepted, 202 = accepted/pending. 403/422 usually mean the key file
  // isn't live yet (e.g. racing a fresh Vercel deploy) — treat as soft.
  const ok = res.status === 200 || res.status === 202;
  console.log(`IndexNow responded ${res.status} ${res.statusText} — ${ok ? "success" : "not accepted (key file may not be live yet)"}`);
  if (!ok) {
    const body = await res.text().catch(() => "");
    if (body) console.log(`Response body: ${body.slice(0, 500)}`);
  }
}

main().catch((err) => {
  // Non-zero exit on a real error (network failure, missing key, empty sitemap).
  console.error(`IndexNow submission failed: ${err.message}`);
  process.exit(1);
});
