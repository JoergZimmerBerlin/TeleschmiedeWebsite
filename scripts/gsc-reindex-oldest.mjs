import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');
const reportPath = path.join(__dirname, '..', 'crawl-report.json');
const indexConfigPath = path.join(__dirname, '..', '.indexing-config.json');

if (!fs.existsSync(keyPath) || !fs.existsSync(reportPath)) {
  console.error('❌ Fehler: gsc-credentials.json oder crawl-report.json nicht gefunden.');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runReindexer() {
  try {
    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const oneMonthAgo = new Date('2026-08-15T00:00:00Z').getTime();

    // 1. URLs, die noch nie gecrawlt wurden (höchste Vernachlässigung)
    const neverCrawled = reportData.filter(item => item.lastCrawlTime === null);

    // 2. URLs, die älter als 1 Monat sind, aufsteigend sortiert (älteste März-URLs zuerst)
    const olderThanOneMonth = reportData
      .filter(item => item.lastCrawlTime !== null && new Date(item.lastCrawlTime).getTime() < oneMonthAgo)
      .sort((a, b) => new Date(a.lastCrawlTime) - new Date(b.lastCrawlTime));

    const targetUrls = [...neverCrawled, ...olderThanOneMonth];

    console.log(`\n======================================================`);
    console.log(`🚀 STARTE RE-INDEXIERUNG & PINGS FÜR DIE ÄLTESTEN URLS`);
    console.log(`   - Unbesuchte URLs (noch nie gecrawlt): ${neverCrawled.length}`);
    console.log(`   - Älter als 1 Monat (vor 15.08.2026):    ${olderThanOneMonth.length}`);
    console.log(`   - Gesamtziel:                            ${targetUrls.length} URLs`);
    console.log(`   - Ältestes Crawl-Datum:                  ${olderThanOneMonth[0]?.lastCrawlTime || 'N/A'}`);
    console.log(`======================================================\n`);

    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    let successCount = 0;
    let failCount = 0;

    console.log(`📡 [1/2] Sende Google Indexing API Pings...`);
    for (let i = 0; i < targetUrls.length; i++) {
      const urlInfo = targetUrls[i];
      const dateStr = urlInfo.lastCrawlTime 
        ? new Date(urlInfo.lastCrawlTime).toLocaleDateString('de-DE') 
        : 'NOCH NIE GECRAWLT';
      
      process.stdout.write(`[${(i+1).toString().padStart(2, ' ')}/${targetUrls.length}] [${dateStr}] ${urlInfo.url} ... `);
      
      try {
        await indexing.urlNotifications.publish({
          requestBody: { url: urlInfo.url, type: 'URL_UPDATED' },
        });
        successCount++;
        console.log(`✅ OK`);
      } catch (pushErr) {
        failCount++;
        if (pushErr.response && pushErr.response.status === 429) {
          console.log(`⚠️ TAGESLIMIT (429) ERREICHT! Breche Google-Pings ab.`);
          break;
        } else {
          console.log(`❌ Fehler: ${pushErr.message}`);
        }
      }

      await delay(400);
    }

    console.log(`\nGoogle Indexing Pushes: ${successCount} erfolgreich, ${failCount} fehlgeschlagen.`);

    // 2. IndexNow Push (Bing / Suchmaschinen-Allianz)
    if (fs.existsSync(indexConfigPath)) {
      console.log(`\n📡 [2/2] Sende alle ${targetUrls.length} URLs per Batch an IndexNow (Bing)...`);
      try {
        const config = JSON.parse(fs.readFileSync(indexConfigPath, 'utf8'));
        const payload = {
          host: config.domain,
          key: config.indexNowKey,
          keyLocation: `https://${config.domain}/${config.indexNowKey}.txt`,
          urlList: targetUrls.map(u => u.url)
        };
        const res = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload)
        });
        if (res.status === 200 || res.status === 202) {
          console.log(`✅ IndexNow erfolgreich empfangen (HTTP ${res.status})!`);
        } else {
          console.log(`⚠️ IndexNow Rückmeldung: HTTP ${res.status}`);
        }
      } catch (inErr) {
        console.error(`❌ IndexNow Fehler:`, inErr.message);
      }
    }

    console.log('\n======================================================');
    console.log(`🎉 FERTIG! Alle Pings erfolgreich abgesetzt.`);
    console.log('======================================================\n');

  } catch (error) {
    console.error(`❌ Kritischer Fehler!`, error);
  }
}

runReindexer();
