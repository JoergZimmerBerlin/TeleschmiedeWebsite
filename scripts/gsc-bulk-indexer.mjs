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

const bingKeyPath = path.join(__dirname, '..', 'bing-credentials.json');
if (!fs.existsSync(bingKeyPath)) {
  console.error('❌ Fehler: bing-credentials.json nicht gefunden.');
  process.exit(1);
}
const bingKey = JSON.parse(fs.readFileSync(bingKeyPath, 'utf8')).BING_WEBMASTER_API_KEY;

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
    const indexNowUrls = [];

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
          console.log(`   ❌ [Google] Nicht im Index (${result.indexStatusResult.coverageState}). Pushe zur Indexing API...`);
          
          try {
            await indexing.urlNotifications.publish({
              requestBody: { url: url, type: 'URL_UPDATED' },
            });
            console.log(`   ✅ [Google] Erfolgreich gepusht!`);
            successCount++;
          } catch (pushErr) {
            console.error(`   ⚠️ [Google] Push fehlgeschlagen:`, pushErr.message);
          }
        } else {
          console.log(`   ✅ [Google] Bereits indexiert.`);
        }

      } catch (checkErr) {
        console.error(`   ⚠️ [Google] Check fehlgeschlagen:`, checkErr.message);
      }

      // --- Bing Check ---
      try {
        const bingApiUrl = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlInfo?siteUrl=https://teleschmie.de/&url=${url}&apikey=${bingKey}`;
        const bingRes = await fetch(bingApiUrl);
        if (bingRes.ok) {
          const bingData = await bingRes.json();
          const lastCrawled = bingData?.d?.LastCrawledDate;
          
          if (lastCrawled === "/Date(-62135568000000-0800)/" || !lastCrawled) {
            console.log(`   ❌ [Bing] Nie gecrawlt. Merke für IndexNow vor...`);
            indexNowUrls.push(url);
          } else {
            // Optional: Datum lesbar machen für den Log
            const timestamp = parseInt(lastCrawled.match(/\\/Date\\((-?\\d+)[-\\+]\\d+\\)\\//)?.[1] || 0);
            const dateStr = timestamp > 0 ? new Date(timestamp).toLocaleDateString() : "Unbekannt";
            console.log(`   ✅ [Bing] Bereits gecrawlt (Zuletzt: ${dateStr}).`);
          }
        } else {
          console.error(`   ⚠️ [Bing] Check API Fehler (HTTP ${bingRes.status})`);
        }
      } catch (bingErr) {
        console.error(`   ⚠️ [Bing] Check fehlgeschlagen:`, bingErr.message);
      }

      // 1.5 Sekunden Pause um GSC Rate Limits zu respektieren (QPS Limit)
      await delay(1500);
    }

    // --- IndexNow Batch Push ---
    if (indexNowUrls.length > 0) {
      console.log(`\n🚀 [IndexNow Bulk-Push] Sende ${indexNowUrls.length} fehlende URLs gebündelt an Bing...`);
      const payload = {
        host: "teleschmie.de",
        key: "b0664caa2c95554fd86ef4e236fb1b82",
        keyLocation: "https://teleschmie.de/b0664caa2c95554fd86ef4e236fb1b82.txt",
        urlList: indexNowUrls
      };

      try {
        const response = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          console.log(`   ✅ Alle ${indexNowUrls.length} URLs erfolgreich an IndexNow gesendet (HTTP ${response.status})`);
        } else if (response.status === 429) {
          console.warn(`   ⚠️ IndexNow Rate Limit erreicht (HTTP 429).`);
        } else {
          console.error(`   ❌ Fehler beim Senden an IndexNow (HTTP ${response.status})`);
        }
      } catch (err) {
        console.error('❌ IndexNow Netzwerkfehler:', err.message);
      }
    }

    console.log('\n=========================================');
    console.log(`🎉 FERTIG!`);
    console.log(`Gescannt: ${urls.length} URLs`);
    console.log(`Davon nicht in GSC: ${unindexedCount}`);
    console.log(`Davon an GSC gepusht: ${successCount}`);
    console.log(`An IndexNow gesendet: ${indexNowUrls.length}`);
    console.log('=========================================\n');

  } catch (error) {
    console.error(`❌ Kritischer Fehler!`, error);
  }
}

runBulkIndexer();
