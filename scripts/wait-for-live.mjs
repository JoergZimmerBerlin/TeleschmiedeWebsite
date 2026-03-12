import { readFileSync } from 'fs';
import { resolve } from 'path';

const url = process.argv[2];
if (!url) {
  console.error("URL required");
  process.exit(1);
}

// Get local build ID
let localBuildId = '';
try {
  localBuildId = readFileSync(resolve('dist/build.txt'), 'utf-8').trim();
} catch (e) {
  console.log("Kein lokales build.txt gefunden. Nutze Standard-Verhalten.");
}

const MAX_ATTEMPTS = 15;
const DELAY = 10000; // 10s

async function check() {
  const buildUrl = url.replace(/\/+$/, "") + "/build.txt";
  
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    try {
      console.log(`Prüfe Deployment-Status: ${url} (Versuch ${i}/${MAX_ATTEMPTS})...`);
      
      if (localBuildId) {
        const res = await fetch(buildUrl, { cache: 'no-store' });
        if (res.ok) {
          const remoteBuildId = (await res.text()).trim();
          if (remoteBuildId === localBuildId) {
            console.log("Build-ID Match! Neues Deployment ist live.");
            process.exit(0);
          } else {
            console.log(`Warte auf Propagation... (Remote: ${remoteBuildId}, Local: ${localBuildId})`);
          }
        } else {
          console.log(`build.txt nicht erreichbar (Status: ${res.status}).`);
        }
      } else {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          console.log("Site ist live!");
          process.exit(0);
        }
      }
    } catch (err) {
      console.log(`Verbindungsfehler: ${err.message}.`);
    }
    await new Promise(r => setTimeout(r, DELAY));
  }
  console.error("Timeout: Deployment wurde nicht rechtzeitig erkannt.");
  process.exit(1);
}

check();
