import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');
const reportPath = path.join(__dirname, '..', 'crawl-report.json');

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
    
    // Filtere URLs, die schon mal gecrawlt wurden
    let crawledUrls = reportData.filter(item => item.lastCrawlTime !== null);
    
    // Aufsteigend sortieren: Die ältesten Daten (z.B. Februar) nach oben
    crawledUrls.sort((a, b) => new Date(a.lastCrawlTime) - new Date(b.lastCrawlTime));

    // Die ersten 180 nehmen, da wir schon 6 API Calls verbraucht haben 
    // und das Limit meist bei 200 pro Tag liegt.
    const DAILY_LIMIT_REMAINING = 180; 
    const targetUrls = crawledUrls.slice(0, DAILY_LIMIT_REMAINING);

    console.log(`🚀 Starte Re-Indexierung der ältesten URLs.`);
    console.log(`Gefunden: ${crawledUrls.length} bereits gecrawlte URLs.`);
    console.log(`Limitiere auf die ältesten ${targetUrls.length} URLs für heute...`);
    console.log(`Ältester Crawl: ${targetUrls[0].lastCrawlTime}`);

    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < targetUrls.length; i++) {
      const urlInfo = targetUrls[i];
      const dateStr = new Date(urlInfo.lastCrawlTime).toLocaleDateString('de-DE');
      
      console.log(`[${i+1}/${targetUrls.length}] Pushe URL (Letzter Crawl: ${dateStr}): ${urlInfo.url}`);
      
      try {
        await indexing.urlNotifications.publish({
          requestBody: { url: urlInfo.url, type: 'URL_UPDATED' },
        });
        successCount++;
      } catch (pushErr) {
        failCount++;
        if (pushErr.response && pushErr.response.status === 429) {
          console.error(`   ⚠️ TAGESLIMIT ERREICHT! Breche ab.`);
          break;
        } else {
           console.error(`   ⚠️ Fehler:`, pushErr.message);
        }
      }

      // Kurze Pause
      await delay(500);
    }

    console.log('\n=========================================');
    console.log(`🎉 FERTIG!`);
    console.log(`Erfolgreich in die GSC Queue geschoben: ${successCount}`);
    console.log(`Fehlgeschlagen: ${failCount}`);
    console.log('=========================================\n');

  } catch (error) {
    console.error(`❌ Kritischer Fehler!`, error);
  }
}

runReindexer();
