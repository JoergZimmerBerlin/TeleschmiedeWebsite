import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

const configPath = path.join(cwd, '.indexing-config.json');
if (!fs.existsSync(configPath)) {
  console.error('❌ Fehler: .indexing-config.json nicht gefunden.');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const keyPath = path.join(cwd, 'gsc-credentials.json');
if (!fs.existsSync(keyPath)) {
  console.error('❌ Fehler: gsc-credentials.json nicht gefunden.');
  process.exit(1);
}

const sitemapPath = path.join(cwd, config.sitemapPath);
if (!fs.existsSync(sitemapPath)) {
  console.error(`❌ Fehler: Sitemap nicht gefunden unter ${sitemapPath}.`);
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/indexing'
  ],
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runBulkIndexer() {
  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const matches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map(m => m[1]);
    
    console.log(`🚀 Starte Universal Bulk-Indexer. ${urls.length} URLs in der Sitemap gefunden.`);

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    let unindexedGoogle = 0;
    let pushedGoogle = 0;
    const indexNowUrls = [];
    
    const reportData = [];
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`[${i+1}/${urls.length}] Prüfe: ${url}`);
      let googleStatus = 'UNKNOWN';
      let bingStatus = 'UNKNOWN';
      let bingDateStr = 'Nie';
      let isBingOrphan = false;
      let isBingMissing = false;
      
      // --- Google Check ---
      try {
        const response = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: config.siteUrl, 
            languageCode: 'de-DE'
          },
        });

        const result = response.data.inspectionResult;
        if (result) {
          const verdict = result.indexStatusResult.verdict; 
          
          if (verdict !== 'PASS') {
            unindexedGoogle++;
            googleStatus = `Nicht im Index (${result.indexStatusResult.coverageState})`;
            
            try {
              await indexing.urlNotifications.publish({
                requestBody: { url: url, type: 'URL_UPDATED' },
              });
              pushedGoogle++;
            } catch (pushErr) {
              googleStatus += ' (Push fehlgeschlagen)';
            }
          } else {
            googleStatus = 'Indexiert';
          }
        }
      } catch (checkErr) {
        googleStatus = 'API Fehler';
      }

      // --- Bing Check via Python ---
      try {
        const bingApiUrl = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlInfo?siteUrl=${config.bingSiteUrl}&url=${url}&apikey=${config.bingApiKey}`;
        const { execFileSync } = await import('child_process');
        const pyScriptPath = path.join(__dirname, 'bing_check.py');
        const output = execFileSync('python3', [pyScriptPath, bingApiUrl], { encoding: 'utf-8' });
        
        const bingData = JSON.parse(output);
        if (bingData && bingData.d) {
          const lastCrawled = bingData.d.LastCrawledDate;
          
          if (lastCrawled === "/Date(-62135568000000-0800)/" || !lastCrawled) {
            bingStatus = 'Fehlend';
            isBingMissing = true;
            indexNowUrls.push(url);
          } else {
            const timestamp = parseInt(lastCrawled.match(new RegExp("\\\\/Date\\\\((-?\\\\d+)[-+]\\\\d+\\\\)\\\\/"))?.[1] || 0);
            if (timestamp > 0) {
              const crawlDate = new Date(timestamp);
              bingDateStr = crawlDate.toLocaleDateString();
              
              if (crawlDate < ninetyDaysAgo) {
                bingStatus = 'Verwaist (>90 Tage)';
                isBingOrphan = true;
              } else {
                bingStatus = 'Aktuell';
              }
            } else {
              bingStatus = 'Unbekannt';
            }
          }
        } else {
          bingStatus = 'API Fehler';
        }
      } catch (bingErr) {
        bingStatus = 'Netzwerkfehler';
      }

      reportData.push({
        url,
        googleStatus,
        bingStatus,
        bingDateStr,
        isBingMissing,
        isBingOrphan
      });

      // Rate Limit respektieren
      await delay(1500);
    }

    // --- IndexNow Batch Push ---
    if (indexNowUrls.length > 0) {
      console.log(`\n🚀 [IndexNow Bulk-Push] Sende ${indexNowUrls.length} fehlende URLs gebündelt an Bing...`);
      const payload = {
        host: config.domain,
        key: config.indexNowKey,
        keyLocation: `https://${config.domain}/${config.indexNowKey}.txt`,
        urlList: indexNowUrls
      };

      try {
        const payloadStr = JSON.stringify(payload);
        const { execFileSync } = await import('child_process');
        const pyScriptPath = path.join(__dirname, 'indexnow_push.py');
        const status = execFileSync('python3', [pyScriptPath, payloadStr], { encoding: 'utf-8' }).trim();
        
        if (status === '200' || status === '202') {
          console.log(`   ✅ Alle ${indexNowUrls.length} URLs erfolgreich an IndexNow gesendet`);
        } else {
          console.error(`   ❌ Fehler beim Senden an IndexNow (HTTP ${status})`);
        }
      } catch (err) {
        console.error('❌ IndexNow Netzwerkfehler:', err.message);
      }
    }
    
    // --- Markdown Report Generierung ---
    let reportMd = `# 🤖 Universal Indexing Report\n\n`;
    reportMd += `**Domain:** ${config.domain}\n`;
    reportMd += `**Geprüfte URLs:** ${urls.length}\n`;
    reportMd += `**Google (Nicht Indexiert):** ${unindexedGoogle} (${pushedGoogle} erfolgreich gepusht)\n`;
    reportMd += `**Bing (Fehlend):** ${indexNowUrls.length} (an IndexNow gesendet)\n\n`;
    
    reportMd += `## 🔴 Fehlende / Verwaiste Seiten bei Bing\n\n`;
    reportMd += `| URL | Bing Status | Letzter Crawl |\n`;
    reportMd += `|---|---|---|\n`;
    
    const problemUrls = reportData.filter(r => r.isBingMissing || r.isBingOrphan);
    if (problemUrls.length > 0) {
      problemUrls.forEach(r => {
        reportMd += `| ${r.url} | ${r.bingStatus} | ${r.bingDateStr} |\n`;
      });
    } else {
      reportMd += `| (Alles perfekt!) | - | - |\n`;
    }
    
    fs.writeFileSync(path.join(cwd, 'indexing-report.md'), reportMd);
    console.log(`✅ Report gespeichert unter indexing-report.md`);

    console.log('\n=========================================');
    console.log(`🎉 FERTIG!`);
    console.log('=========================================\n');

  } catch (error) {
    console.error(`❌ Kritischer Fehler!`, error);
  }
}

runBulkIndexer();
