import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');

// Token-freundliche Fehlerbehandlung, wenn Key fehlt
if (!fs.existsSync(keyPath)) {
  console.error('❌ Fehler: gsc-credentials.json nicht gefunden.');
  console.error('Bitte stelle sicher, dass der Google Cloud Service Account Key im Root-Verzeichnis liegt.');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const urlToUpdate = process.argv[2];

if (!urlToUpdate) {
  console.error('❌ Fehler: Bitte eine URL als Argument übergeben.');
  console.error('Beispiel: node scripts/gsc-index.mjs https://teleschmie.de/glossar/ai-txt/');
  process.exit(1);
}

async function submitUrl() {
  try {
    const authClient = await auth.getClient();
    
    // Indexing Client initialisieren
    const indexing = google.indexing({
      version: 'v3',
      auth: authClient,
    });

    // Request an die API senden (URL_UPDATED zwingt Google zum Crawl)
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: urlToUpdate,
        type: 'URL_UPDATED',
      },
    });

    // Token-freundliche Erfolgs-Ausgabe
    if (response.status === 200) {
      console.log(`✅ Erfolg: URL wurde in die Google Indexierungs-Queue eingereiht!`);
      console.log(`🔗 URL: ${urlToUpdate}`);
    } else {
      console.error(`⚠️ Unerwarteter Status-Code von Google: ${response.status}`);
    }
  } catch (error) {
    // Token-freundliche Fehlerausgabe ohne den ganzen JSON-Stacktrace (wo möglich)
    console.error(`❌ API Fehler beim Übermitteln der URL!`);
    
    if (error.response && error.response.data && error.response.data.error) {
       console.error(`Grund: ${error.response.data.error.message}`);
       
       // Hilfestellung für das häufigste Problem (Permission Denied)
       if(error.response.status === 403) {
           console.error(`\nTIPP: Hast du vergessen, den Service Account in der Search Console als "Inhaber" zu berechtigen?`);
           console.error(`Service-Account Email: ${key.client_email}`);
       }
    } else {
       console.error(error.message);
    }
    process.exit(1);
  }
}

submitUrl();
