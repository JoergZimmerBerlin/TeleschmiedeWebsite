#!/usr/bin/env node

/**
 * Post-Deploy Link-Check (Optimized & Parallel)
 *
 * Crawlt die Live-Site, extrahiert alle internen Links und prueft HTTP-Status.
 * 
 * Verbesserungen:
 * - Paralleles Crawling (Concurrency: 5)
 * - Korrekte Behandlung von Font-Dateien (kein trailing slash)
 * - Robustere URL-Erkennung
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Konfiguration & Domain
// ---------------------------------------------------------------------------

const CONCURRENCY = 15;
const TIMEOUT_MS = 20_000;

// ... (fetchInternal and extractLinks remain largely same, but I'll optimize them slightly)

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

async function main() {
  const siteUrl = getSiteUrl();
  console.log(`\n🚀 Starte optimierten Link-Check fuer: ${siteUrl}`);

  const visited = new Set();
  const queue = [siteUrl + "/"];
  const results = [];
  let activeWorkers = 0;

  async function processNext() {
    if (queue.length === 0) return;
    
    const url = queue.shift();
    if (visited.has(url)) return processNext();
    
    visited.add(url);
    activeWorkers++;

    const displayUrl = url.replace(siteUrl, "") || "/";
    const res = await fetchInternal(url);
    
    console.log(`${res.ok ? "✅" : "❌"} ${displayUrl}${res.ok ? "" : ` (${res.status || res.error})`}`);
    results.push(res);

    if (res.ok && res.html) {
      const found = extractLinks(res.html, siteUrl);
      for (const link of found) {
        if (!visited.has(link)) queue.push(link);
      }
    }

    activeWorkers--;
    // Trigger next parallel tasks
    await fillPool();
  }

  async function fillPool() {
    const promises = [];
    while (activeWorkers < CONCURRENCY && queue.length > 0) {
      promises.push(processNext());
    }
    await Promise.all(promises);
  }

  await fillPool();

  // Wait for all workers to finish (using a simple check because of recursion/chaining)
  while (activeWorkers > 0) {
    await new Promise(r => setTimeout(r, 100));
  }

  // --- Report ---
  const fails = results.filter(r => !r.ok);
  console.log("\n" + "─".repeat(60));
  console.log(`Check beendet: ${results.length} URLs geprueft, ${fails.length} Fehler.`);
  console.log("─".repeat(60));

  if (fails.length > 0) {
    console.error("\nGEFUNDENE FEHLER:");
    fails.forEach(f => console.error(`  [${f.status || "ERR"}] ${f.url}`));
    process.exit(1);
  }

  console.log("\n✅ Alle internen Links und Assets sind erreichbar.\n");
}

main();
