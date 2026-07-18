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
const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap-0.xml');

// Die 6 heute eingereichten URLs explizit hinzufügen
const explicitUrls = [
  "https://teleschmie.de/glossar/api-catalog/",
  "https://teleschmie.de/glossar/http-message-signatures/",
  "https://teleschmie.de/glossar/identity-json/",
  "https://teleschmie.de/glossar/sovp-protocol/",
  "https://teleschmie.de/glossar/dns-sovereignty/",
  "https://teleschmie.de/glossar/rfc-8288-link-headers/"
];

let urlsToInspect = new Set(explicitUrls);

if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urlsToInspect.add(match[1]);
  }
} else {
  console.log("⚠️ Warnung: dist/sitemap-0.xml nicht gefunden. Nutze nur explizite URLs.");
}

const urls = Array.from(urlsToInspect);
console.log(`Starte Crawl-Analyse für ${urls.length} URLs...`);

const BATCH_SIZE = 5;
const DELAY_MS = 2000;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  const results = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`Verarbeite Batch ${Math.floor(i / BATCH_SIZE) + 1} von ${Math.ceil(urls.length / BATCH_SIZE)}...`);
    
    const promises = batch.map(async (url) => {
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
          lastCrawlTime: indexStatusResult.lastCrawlTime || null
        };
      } catch (err) {
        return {
          url: url,
          verdict: 'ERROR',
          lastCrawlTime: null,
          error: err.message
        };
      }
    });

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    // Kurze Pause
    await delay(DELAY_MS);
  }

  // Sortierung
  results.sort((a, b) => {
    if (!a.lastCrawlTime && !b.lastCrawlTime) return 0;
    if (!a.lastCrawlTime) return 1;
    if (!b.lastCrawlTime) return -1;
    return new Date(b.lastCrawlTime) - new Date(a.lastCrawlTime);
  });

  const outputPath = path.join(__dirname, '..', 'crawl-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`✅ Crawl Report gespeichert unter ${outputPath}`);
}

run();
