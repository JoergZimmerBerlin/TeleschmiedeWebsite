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

// Für die URL Inspection API brauchen wir den Webmasters Scope
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const urlToCheck = process.argv[2];
const siteUrl = 'sc-domain:teleschmie.de'; // Probieren wir Domain-Property

if (!urlToCheck) {
  console.error('❌ Fehler: Bitte eine URL als Argument übergeben.');
  console.error('Beispiel: node scripts/gsc-check.mjs https://teleschmie.de/glossar/ai-txt/');
  process.exit(1);
}

async function checkIndexStatus() {
  try {
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient,
    });

    console.log(`🔍 Frage Google nach dem Live-Status für: ${urlToCheck}...`);

    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: urlToCheck,
        siteUrl: siteUrl, 
        languageCode: 'de-DE'
      },
    });

    const result = response.data.inspectionResult;
    
    if (!result) {
      console.log('⚠️ Keine Daten von Google zurückgegeben.');
      return;
    }

    const indexStatusResult = result.indexStatusResult;
    const verdict = indexStatusResult.verdict; // PASS, FAIL, PARTIAL, NEUTRAL
    const coverageState = indexStatusResult.coverageState; 

    console.log('\n=========================================');
    if (verdict === 'PASS') {
      console.log('✅ STATUS: Die URL ist auf Google! (Indexiert)');
    } else {
      console.log('❌ STATUS: Die URL ist aktuell NICHT auf Google.');
    }
    console.log(`📌 Google Coverage Detail: ${coverageState}`);
    console.log(`⏱️ Letzter Crawl-Versuch: ${indexStatusResult.lastCrawlTime || 'Noch nie'}`);
    console.log('=========================================\n');

  } catch (error) {
    console.error(`❌ API Fehler beim Abfragen des Status!`);
    if (error.response && error.response.data && error.response.data.error) {
       console.error(`Grund: ${error.response.data.error.message}`);
    } else {
       console.error(error.message);
    }
    process.exit(1);
  }
}

checkIndexStatus();
