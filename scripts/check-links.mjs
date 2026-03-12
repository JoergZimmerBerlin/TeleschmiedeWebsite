#!/usr/bin/env node

/**
 * Post-Deploy Link-Check
 *
 * Crawlt die Live-Site, extrahiert alle internen Links und prueft HTTP-Status.
 * Generisch fuer alle Astro-Projekte die site.config.ts / astro.config.mjs nutzen.
 *
 * Nutzung:
 *   node scripts/check-links.mjs                  # Domain aus Config
 *   SITE_URL=https://example.com node scripts/check-links.mjs  # Explizit
 *
 * HTTP Basic Auth (fuer passwortgeschuetzte Sites):
 *   SITE_USER=admin SITE_PASS=geheim node scripts/check-links.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Domain ermitteln
// ---------------------------------------------------------------------------

function getSiteUrl() {
  // 1. Env-Variable (hoechste Prioritaet — fuer CI)
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, "");
  }

  // 2. astro.config.mjs → site: '...'
  try {
    const cfg = readFileSync(resolve("astro.config.mjs"), "utf-8");
    const m = cfg.match(/site:\s*['"]([^'"]+)['"]/);
    if (m) return m[1].replace(/\/+$/, "");
  } catch {
    /* ignore */
  }

  // 3. src/site.config.ts → domain: '...'
  try {
    const cfg = readFileSync(resolve("src/site.config.ts"), "utf-8");
    const m = cfg.match(/domain:\s*['"]([^'"]+)['"]/);
    if (m) return m[1].replace(/\/+$/, "");
  } catch {
    /* ignore */
  }

  console.error("Keine Site-URL gefunden. Setze SITE_URL oder pruefe astro.config.mjs");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Fetch mit Timeout
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url, timeoutMs = 10_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers = { "User-Agent": "poliSYS-LinkChecker/1.0" };

  // HTTP Basic Auth (fuer .htpasswd-geschuetzte Sites)
  if (process.env.SITE_USER && process.env.SITE_PASS) {
    const cred = Buffer.from(`${process.env.SITE_USER}:${process.env.SITE_PASS}`).toString("base64");
    headers["Authorization"] = `Basic ${cred}`;
  }

  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers,
    });
    const html = res.ok ? await res.text() : "";
    return { url, status: res.status, ok: res.ok, html };
  } catch (err) {
    const msg = err.name === "AbortError" ? "TIMEOUT" : err.message;
    return { url, status: 0, ok: false, html: "", error: msg };
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Interne Links extrahieren
// ---------------------------------------------------------------------------

function extractLinksAndAssets(html, baseUrl) {
  const links = new Set();
  const assets = new Set();
  
  // Extract <a> hrefs
  const hrefRegex = /href=["']([^"'#\s]+?)["']/g;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    let href = match[1].trim();
    if (/^(mailto:|tel:|javascript:)/.test(href)) continue;
    if (href.includes("${")) continue;
    if (href.startsWith("http") && !href.startsWith(baseUrl)) continue;

    if (href.startsWith("/")) {
      href = baseUrl + href;
    } else if (!href.startsWith("http")) {
      continue;
    }

    href = href.split("?")[0].split("#")[0];
    
    // Distinguish between pages and binary assets
    if (/\.(png|jpe?g|gif|svg|webp|ico|pdf|xml|txt|json)$/i.test(href)) {
      assets.add(href);
    } else if (!/\.(css|js|map)$/i.test(href)) {
      if (!href.endsWith("/")) href += "/";
      links.add(href);
    }
  }

  // Extract <img> srcs
  const srcRegex = /src=["']([^"'\s]+?)["']/g;
  while ((match = srcRegex.exec(html)) !== null) {
    let src = match[1].trim();
    if (src.startsWith("data:")) continue;
    if (src.startsWith("/")) {
      src = baseUrl + src;
    } else if (!src.startsWith("http")) {
      continue;
    }
    src = src.split("?")[0].split("#")[0];
    assets.add(src);
  }

  return { links, assets };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const siteUrl = getSiteUrl();
  console.log(`\n  Link-Check: ${siteUrl}\n`);

  // Initial delay for deployment propagation
  const INITIAL_WAIT = 15_000;
  console.log(`Warte ${INITIAL_WAIT/1000}s auf Propagation...`);
  await new Promise(r => setTimeout(r, INITIAL_WAIT));

  let visited = new Set();
  let queue = [siteUrl + "/"];
  let results = [];
  let retryCount = 0;
  const MAX_RETRIES = 2;

  while (queue.length > 0) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    let result = await fetchWithTimeout(url);
    
    if (!result.ok && retryCount < MAX_RETRIES) {
      console.log(`Warnung: Fetch fehlgeschlagen fuer ${url}. Retry ${retryCount+1}/2 in 5s...`);
      await new Promise(r => setTimeout(r, 5000));
      result = await fetchWithTimeout(url);
    }

    results.push(result);

    if (result.ok && result.html) {
      const { links, assets } = extractLinksAndAssets(result.html, siteUrl);
      
      // Add pages to crawl queue
      for (const link of links) {
        if (!visited.has(link)) queue.push(link);
      }
      
      // Check assets (but don't crawl them)
      for (const asset of assets) {
        if (!visited.has(asset)) {
          visited.add(asset);
          let assetRes = await fetchWithTimeout(asset);
          if (!assetRes.ok) {
             // Retry asset too
             await new Promise(r => setTimeout(r, 2000));
             assetRes = await fetchWithTimeout(asset);
          }
          results.push(assetRes);
        }
      }
    }
  }

  // --- Ergebnis-Tabelle ---
  const colUrl = 50;
  const colStatus = 8;
  const line = "\u2500".repeat(colUrl + colStatus + 12);

  console.log(line);
  console.log(`${"URL".padEnd(colUrl)} ${"Status".padEnd(colStatus)} Ergebnis`);
  console.log(line);

  let errors = 0;

  for (const r of results.sort((a, b) => a.url.localeCompare(b.url))) {
    const short = r.url.replace(siteUrl, "") || "/";
    const status = r.error || String(r.status);
    const label = r.ok ? "OK" : "FEHLER";

    if (!r.ok) errors++;

    console.log(`${short.padEnd(colUrl)} ${status.padEnd(colStatus)} ${label}`);
  }

  console.log(line);
  console.log(`\n  ${results.length} Links geprueft, ${errors} Fehler\n`);

  if (errors > 0) {
    console.error("Link-Check fehlgeschlagen — siehe Fehler oben.");
    process.exit(1);
  }

  console.log("Alle Links OK.");
}

main();
