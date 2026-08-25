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

const slugs = ['website-relaunch', 'rag', 'sichtbarkeit'];
const urls = slugs.map(slug => `https://teleschmie.de/glossar/${slug}/`);

async function run() {
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  for (const url of urls) {
    try {
      const response = await searchconsole.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl: siteUrl, languageCode: 'de-DE' },
      });
      const idx = response.data.inspectionResult?.indexStatusResult || {};
      console.log(url, idx.verdict, idx.coverageState);
    } catch (err) {
      console.error(url, err.message);
    }
  }
}
run();
