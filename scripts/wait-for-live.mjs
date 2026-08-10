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
        console.log(`[${i}/${MAX_ATTEMPTS}] Prüfe GitHub Actions Status...`);
        // Abfrage der öffentlichen GitHub API für den Status des letzten Workflows auf 'main'
        const ghRes = await fetch("https://api.github.com/repos/JoergZimmerBerlin/TeleschmiedeWebsite/actions/runs?branch=main&per_page=1", { cache: 'no-store' });
        if (ghRes.ok) {
          const data = await ghRes.json();
          let localSha = '';
          try {
            import('child_process').then(cp => { localSha = cp.execSync('git rev-parse HEAD').toString().trim(); }).catch(()=>{});
            // Da dynamischer import asynchron ist, hier die synchrone Variante:
            // Aber ES Module importiert am besten oben. Wir lesen es einfach synchron:
            const { execSync } = await import('child_process');
            localSha = execSync('git rev-parse HEAD').toString().trim();
          } catch(e) {}

          if (data.workflow_runs && data.workflow_runs.length > 0) {
            const run = data.workflow_runs[0];
            if (localSha && run.head_sha !== localSha) {
              console.log(`⏳ GitHub Action für aktuellen Commit (${localSha}) ist noch nicht der aktuellste in der API...`);
            } else if (run.status === 'completed') {
              if (run.conclusion === 'success') {
                console.log("✅ GitHub Action (Build & Deploy) erfolgreich abgeschlossen!");
                // Gib IONOS noch kurz Zeit zum Synchronisieren, dann melde Erfolg
                console.log("⏳ Warte noch 30 Sekunden auf IONOS-Sync...");
                await new Promise(r => setTimeout(r, 30000));
                console.log("✅ Site ist live!");
                process.exit(0);
              } else {
                console.error(`❌ GitHub Action ist fehlgeschlagen! (Conclusion: ${run.conclusion})`);
                console.error(`🔗 Details: ${run.html_url}`);
                process.exit(1);
              }
            } else {
              console.log(`⏳ GitHub Action läuft noch (Status: ${run.status})...`);
            }
          }
        } else {
           console.log(`⚠️ GitHub API Limit erreicht oder nicht erreichbar. Prüfe stattdessen URL Status: ${url}`);
           const res = await fetch(url, { method: 'HEAD' });
           if (res.ok) {
             console.log(`⏳ Fallback: Warte zur Sicherheit 5 Minuten, da GitHub API nicht antwortet...`);
             await new Promise(r => setTimeout(r, 300000));
             process.exit(0);
           }
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
