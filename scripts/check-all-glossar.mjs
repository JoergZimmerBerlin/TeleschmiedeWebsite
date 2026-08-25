import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});
const siteUrl = 'sc-domain:teleschmie.de';

const slugs = fs.readFileSync(path.join(__dirname, '..', 'all-glossary.txt'), 'utf8').split('\n').filter(Boolean);
const urls = slugs.map(slug => `https://teleschmie.de/glossar/${slug}/`);

const BATCH_SIZE = 5;
const DELAY_MS = 2000;
async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${i/BATCH_SIZE + 1} of ${Math.ceil(urls.length/BATCH_SIZE)}...`);
    const promises = batch.map(async (url) => {
      try {
        const response = await searchconsole.urlInspection.index.inspect({
          requestBody: { inspectionUrl: url, siteUrl: siteUrl, languageCode: 'de-DE' },
        });
        const idx = response.data.inspectionResult?.indexStatusResult || {};
        const st = idx.coverageState || 'UNKNOWN';
        if (st.toLowerCase().includes("gecrawlt") || st.toLowerCase().includes("crawled") || st.toLowerCase().includes("gefunden") || st.toLowerCase().includes("discovered")) {
            if (idx.verdict !== 'PASS') {
                console.log(`[TARGET] ${url} -> ${st}`);
            }
        }
      } catch (err) {
        console.log(`[ERROR] ${url} -> ${err.message}`);
      }
    });
    await Promise.all(promises);
    await delay(DELAY_MS);
  }
  console.log("Done");
}
run();
