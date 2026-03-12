#!/usr/bin/env node

/**
 * Wait for site to be live before links check.
 * Usage: node scripts/wait-for-live.mjs https://example.com
 */

const url = process.argv[2];
if (!url) {
  console.error("URL required");
  process.exit(1);
}

const MAX_ATTEMPTS = 10;
const DELAY = 10000; // 10s

async function check() {
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    try {
      console.log(`Prüfe ob Site live ist: ${url} (Versuch ${i}/${MAX_ATTEMPTS})...`);
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        console.log("Site ist live! Starte Link-Check.");
        process.exit(0);
      }
      console.log(`Status: ${res.status}. Warte ${DELAY/1000}s...`);
    } catch (err) {
      console.log(`Verbindungsfehler: ${err.message}. Warte ${DELAY/1000}s...`);
    }
    await new Promise(r => setTimeout(r, DELAY));
  }
  console.error("Site wurde nicht rechtzeitig live geschaltet.");
  process.exit(1);
}

check();
