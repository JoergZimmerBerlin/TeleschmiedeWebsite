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

const CONCURRENCY = 5;
const TIMEOUT_MS = 15_000;

function getSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");

  try {
    const cfg = readFileSync(resolve("astro.config.mjs"), "utf-8");
    // Handhabt auch ternaere Ausdruecke oder komplexe Configs
    const m = cfg.match(/site:\s*['"]([^'"]+)['"]/) || cfg.match(/site:\s*.*?\?\s*['"]([^'"]+)['"]/);
    if (m) return (m[1] || m[2]).replace(/\/+$/, "");
  } catch { /* ignore */ }

  console.error("Keine Site-URL gefunden. Setze SITE_URL.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Fetch Logik
// ---------------------------------------------------------------------------

async function fetchInternal(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const headers = { "User-Agent": "Teleschmiede-Bot/2.0" };

  if (process.env.SITE_USER && process.env.SITE_PASS) {
    const cred = Buffer.from(`${process.env.SITE_USER}:${process.env.SITE_PASS}`).toString("base64");
    headers["Authorization"] = `Basic ${cred}`;
  }

  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal, headers });
    const isHtml = res.headers.get("content-type")?.includes("text/html");
    const html = (res.ok && isHtml) ? await res.text() : "";
    return { url, status: res.status, ok: res.ok, html };
  } catch (err) {
    return { url, status: 0, ok: false, html: "", error: err.name === "AbortError" ? "TIMEOUT" : err.message };
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Link-Extraktion
// ---------------------------------------------------------------------------

function extractLinks(html, baseUrl) {
  const found = new Set();
  const regex = /(?:href|src)=["']([^"'\s#]+?)["']/g;
  let m;

  while ((m = regex.exec(html)) !== null) {
    let raw = m[1].trim();
    if (/^(mailto:|tel:|javascript:|data:|\$\{)/.test(raw)) continue;

    let fullUrl;
    if (raw.startsWith("/")) {
      fullUrl = baseUrl + raw;
    } else if (raw.startsWith("http")) {
      if (!raw.startsWith(baseUrl)) continue;
      fullUrl = raw;
    } else {
      continue; // Relative Pfade ohne / werden ignoriert (nicht Standard in Astro)
    }

    // Clean URL
    fullUrl = fullUrl.split("?")[0].split("#")[0];
    
    // Trailing Slash Logik: Nur für URLs ohne Dateiendung
    const isFile = /\.[a-z0-9]{2,10}$/i.test(fullUrl);
    if (!isFile && !fullUrl.endsWith("/")) {
      fullUrl += "/";
    }

    found.add(fullUrl);
  }
  return found;
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

async function main() {
  const siteUrl = getSiteUrl();
  console.log(`\n🚀 Starte Link-Check fuer: ${siteUrl}`);

  const visited = new Map();
  const queue = [siteUrl + "/"];
  const results = [];

  while (queue.length > 0) {
    const batch = queue.splice(0, CONCURRENCY);
    const promises = batch.map(async (url) => {
      if (visited.has(url)) return;
      visited.set(url, "processing");

      process.stdout.write(`  Pruefe: ${url.replace(siteUrl, "") || "/"} ... `);
      const res = await fetchInternal(url);
      console.log(res.ok ? "✅" : `❌ (${res.status || res.error})`);
      
      results.push(res);
      visited.set(url, res.ok ? "ok" : "fail");

      if (res.ok && res.html) {
        const found = extractLinks(res.html, siteUrl);
        for (const link of found) {
          if (!visited.has(link)) queue.push(link);
        }
      }
    });

    await Promise.all(promises);
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
