#!/usr/bin/env node

/**
 * Post-Deploy Link-Check (Optimized & Parallel)
 *
 * Crawlt die Live-Site, extrahiert alle internen Links und prueft HTTP-Status.
 * 
 * Verbesserungen:
 * - Paralleles Crawling (Concurrency: 15)
 * - Korrekte Behandlung von Absolute/Relative Links
 * - Robuste URL-Erkennung
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Konfiguration & Domain
// ---------------------------------------------------------------------------

const CONCURRENCY = 15;
const TIMEOUT_MS = 20_000;

function getSiteUrl() {
  const url = process.env.SITE_URL || "https://teleschmie.de";
  return url.replace(/\/+$/, "");
}

async function fetchInternal(url) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    
    if (res.ok && res.headers.get("content-type")?.includes("text/html")) {
      return { ok: true, status: res.status, url, html: await res.text() };
    }
    return { ok: res.ok, status: res.status, url };
  } catch (error) {
    return { ok: false, error: error.message, url };
  }
}

function extractLinks(html, siteUrl) {
  const links = new Set();
  const regex = /href=["']([^"'\s#]+?)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let href = match[1];
    
    // Normalize relative links
    if (href.startsWith("/") && !href.startsWith("//")) {
      href = siteUrl + href;
    }
    
    // Only check internal links
    if (href.startsWith(siteUrl)) {
      // Normalize: ensure trailing slash ONLY for routes, NOT for assets
      const isAsset = /\.(webp|png|jpg|jpeg|svg|pdf|css|js|woff2?|ico|xml|txt)$/i.test(href);
      const normalized = isAsset ? href.replace(/\/+$/, "") : (href.replace(/\/+$/, "") + "/");
      links.add(normalized);
    }
  }
  return Array.from(links);
}

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
    if (visited.has(url)) return;
    
    visited.add(url);
    activeWorkers++;

    const displayUrl = url.replace(siteUrl, "") || "/";
    const res = await fetchInternal(url);
    
    console.log(`${res.ok ? "✅" : "❌"} ${displayUrl}${res.ok ? "" : ` (${res.status || res.error})`}`);
    results.push(res);

    if (res.ok && res.html) {
      const found = extractLinks(res.html, siteUrl);
      for (const link of found) {
        if (!visited.has(link)) {
          queue.push(link);
        }
      }
    }

    activeWorkers--;
    // Trigger next batch
    fillPool();
  }

  function fillPool() {
    while (activeWorkers < CONCURRENCY && queue.length > 0) {
      processNext();
    }
  }

  // Initial fill
  fillPool();

  // Wait for all workers and queue to clear
  while (activeWorkers > 0 || queue.length > 0) {
    await new Promise(r => setTimeout(r, 500));
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
