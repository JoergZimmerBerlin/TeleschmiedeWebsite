import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');
const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');

if (!fs.existsSync(keyPath)) {
  console.error('❌ Fehler: gsc-credentials.json nicht gefunden.');
  process.exit(1);
}

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ Fehler: sitemap-0.xml nicht in dist/ gefunden. Bitte erst builden.');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// Wir brauchen BEIDE Scopes: Webmasters für den Check, Indexing für den Push
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/indexing'
  ],
});

const siteUrl = 'sc-domain:teleschmie.de';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runBulkIndexer() {
  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    // Einfaches Regex um alle <loc> Tags zu extrahieren
    const matches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map(m => m[1]);
    
    console.log(`🚀 Starte Bulk-Indexer. ${urls.length} URLs in der Sitemap gefunden.`);

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    let unindexedCount = 0;
    let successCount = 0;

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`[${i+1}/${urls.length}] Prüfe: ${url}`);
      
      try {
        const response = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: siteUrl, 
            languageCode: 'de-DE'
          },
        });

        const result = response.data.inspectionResult;
        if (!result) continue;

        const verdict = result.indexStatusResult.verdict; 
        
        if (verdict !== 'PASS') {
          unindexedCount++;
          console.log(`   ❌ Nicht im Index (${result.indexStatusResult.coverageState}). Pushe zur Indexing API...`);
          
          try {
            await indexing.urlNotifications.publish({
              requestBody: { url: url, type: 'URL_UPDATED' },
            });
            console.log(`   ✅ Erfolgreich gepusht!`);
            successCount++;
          } catch (pushErr) {
            console.error(`   ⚠️ Push fehlgeschlagen:`, pushErr.message);
          }
        } else {
          console.log(`   ✅ Bereits indexiert.`);
        }

      } catch (checkErr) {
        console.error(`   ⚠️ Check fehlgeschlagen:`, checkErr.message);
      }

      // 1.5 Sekunden Pause um GSC Rate Limits zu respektieren (QPS Limit)
      await delay(1500);
    }

    console.log('\n=========================================');
    console.log(`🎉 FERTIG!`);
    console.log(`Gescannt: ${urls.length} URLs`);
    console.log(`Davon nicht indexiert: ${unindexedCount}`);
    console.log(`Erfolgreich zur Indexierung gepusht: ${successCount}`);
    console.log('=========================================\n');

  } catch (error) {
    console.error(`❌ Kritischer Fehler!`, error);
  }
}

runBulkIndexer();
