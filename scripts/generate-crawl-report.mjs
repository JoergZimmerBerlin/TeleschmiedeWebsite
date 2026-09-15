import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');

if (!fs.existsSync(keyPath)) {
  console.error('❌ Fehler: gsc-credentials.json nicht gefunden.');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const siteUrl = 'sc-domain:teleschmie.de';
const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');

// Die 6 heute eingereichten URLs explizit hinzufügen
const explicitUrls = [
  "https://teleschmie.de/glossar/api-catalog/",
  "https://teleschmie.de/glossar/http-message-signatures/",
  "https://teleschmie.de/glossar/identity-json/",
  "https://teleschmie.de/glossar/sovp-protocol/",
  "https://teleschmie.de/glossar/dns-sovereignty/",
  "https://teleschmie.de/glossar/rfc-8288-link-headers/"
];

let urlsToInspect = new Set();

if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urlsToInspect.add(match[1]);
  }
} else {
  console.log("⚠️ Warnung: dist/sitemap.xml nicht gefunden.");
}

const urls = Array.from(urlsToInspect);
console.log(`🚀 Starte vollständige GSC Crawl-Analyse für ${urls.length} URLs aus der Sitemap...`);

const BATCH_SIZE = 6;
const DELAY_MS = 1000;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function inspectWithRetry(searchconsole, url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: siteUrl,
          languageCode: 'de-DE'
        },
      });
      const indexStatusResult = response.data.inspectionResult?.indexStatusResult || {};
      return {
        url: url,
        verdict: indexStatusResult.verdict || 'UNKNOWN',
        lastCrawlTime: indexStatusResult.lastCrawlTime || null,
        coverageState: indexStatusResult.coverageState || "UNKNOWN",
        crawledAs: indexStatusResult.crawledAs || null,
        indexingState: indexStatusResult.indexingState || null,
        pageFetchState: indexStatusResult.pageFetchState || null,
        robotsTxtState: indexStatusResult.robotsTxtState || null
      };
    } catch (err) {
      if (err.response && err.response.status === 429 && attempt < retries) {
        console.warn(`   ⚠️ 429 Rate Limit bei ${url}, warte 5s vor Retry...`);
        await delay(5000);
        continue;
      }
      return {
        url: url,
        verdict: 'ERROR',
        lastCrawlTime: null,
        coverageState: 'ERROR',
        error: err.message
      };
    }
  }
}

async function run() {
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / BATCH_SIZE);
    
    if (batchNum % 5 === 0 || batchNum === 1 || batchNum === totalBatches) {
      console.log(`[${Math.round((i / urls.length) * 100)}%] Batch ${batchNum}/${totalBatches} (${results.length}/${urls.length} URLs verarbeitet)...`);
    }

    const batchResults = await Promise.all(batch.map(url => inspectWithRetry(searchconsole, url)));
    results.push(...batchResults);
    
    await delay(DELAY_MS);
  }

  const durationSec = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n✅ Alle ${results.length} URLs in ${durationSec}s verarbeitet.`);

  const outputPath = path.join(__dirname, '..', 'crawl-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`📁 Vollständiger Report gespeichert: ${outputPath}`);
}

run();
