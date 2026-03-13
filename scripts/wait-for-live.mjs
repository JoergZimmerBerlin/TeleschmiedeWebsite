import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * wait-for-live.mjs
 * Wartet, bis das Deployment auf dem Live-Server erkannt wird.
 * Vergleicht die lokale Build-ID mit der remote Build-ID unter /build.txt.
 */

const rawUrl = process.argv[2];
if (!rawUrl) {
  console.error("URL required (e.g. node scripts/wait-for-live.mjs https://teleschmie.de)");
  process.exit(1);
}

const url = rawUrl.replace(/\/+$/, "");

// Lokale Build-ID laden (wird im 'deploy' Job generiert)
let localBuildId = '';
try {
  localBuildId = readFileSync(resolve('dist/build.txt'), 'utf-8').trim();
} catch (e) {
  console.log("⚠️ Kein lokales build.txt gefunden. Prüfe nur auf Erreichbarkeit.");
}

const MAX_ATTEMPTS = 45;
const DELAY = 10000; // 10s -> max 7.5 Minuten

async function check() {
  const buildUrl = `${url}/build.txt`;
  
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    try {
      if (localBuildId) {
        console.log(`[${i}/${MAX_ATTEMPTS}] Prüfe Build-ID: ${buildUrl}...`);
        const res = await fetch(buildUrl, { cache: 'no-store' });
        
        if (res.ok) {
          const remoteBuildId = (await res.text()).trim();
          if (remoteBuildId === localBuildId) {
            console.log("✅ Build-ID Match! Neues Deployment ist live.");
            
            // Kurzer Health-Check der Hauptseite
            const health = await fetch(url);
            if (health.ok) {
              console.log("✅ Site Health Check OK.");
              process.exit(0);
            } else {
              console.log(`⚠️ Build-ID passt, aber Homepage liefert Status ${health.status}. Warte...`);
            }
          } else {
            console.log(`⌛ Propagation... (Remote: ${remoteBuildId}, Local: ${localBuildId})`);
          }
        } else {
          console.log(`❌ build.txt noch nicht erreichbar (${res.status}).`);
        }
      } else {
        console.log(`[${i}/${MAX_ATTEMPTS}] Prüfe Site-Status: ${url}...`);
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          console.log("✅ Site ist live!");
          process.exit(0);
        }
      }
    } catch (err) {
      console.log(`🚫 Verbindungsfehler: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, DELAY));
  }

  console.error("\n🔴 TIMEOUT: Deployment wurde nicht rechtzeitig erkannt.");
  process.exit(1);
}

check();
