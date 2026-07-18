import { execSync } from 'child_process';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');

if (!fs.existsSync(keyPath)) {
  console.error('❌ Fehler: gsc-credentials.json nicht gefunden. Auto-Push übersprungen.');
  process.exit(0);
}

// 1. Hole geänderte Dateien aus dem letzten Commit
let changedFiles = [];
try {
  // Gibt exakt die Dateipfade aus, die im HEAD Commit geändert/erstellt wurden
  const output = execSync('git diff-tree --no-commit-id --name-only -r HEAD', { encoding: 'utf-8' });
  changedFiles = output.split('\n').filter(Boolean);
} catch (e) {
  console.error('⚠️ Fehler beim Lesen der Git-Änderungen. Auto-Push übersprungen.');
  process.exit(0);
}

// 2. Filtere auf relevante Content-Pfade
const urlsToPush = [];
for (const file of changedFiles) {
  if (file.startsWith('src/content/blog/') && (file.endsWith('.md') || file.endsWith('.mdx'))) {
    const slug = path.basename(file, path.extname(file));
    urlsToPush.push(`https://teleschmie.de/blog/${slug}/`);
  } else if (file.startsWith('src/content/glossar/') && (file.endsWith('.md') || file.endsWith('.mdx'))) {
    const slug = path.basename(file, path.extname(file));
    urlsToPush.push(`https://teleschmie.de/glossar/${slug}/`);
  } else if (file.startsWith('src/pages/') && file.endsWith('.astro')) {
     const basename = path.basename(file, '.astro');
     if (basename === 'index') {
        urlsToPush.push('https://teleschmie.de/');
     } else if (!basename.includes('[')) { // dynamische Routen ignorieren
        urlsToPush.push(`https://teleschmie.de/${basename}/`);
     }
  }
}

if (urlsToPush.length === 0) {
  console.log('ℹ️ Keine URL-relevanten Content-Dateien im letzten Commit gefunden. GSC Push nicht nötig.');
  process.exit(0);
}

console.log(`🚀 Sende geänderte URLs an Google Indexing API (${urlsToPush.length} Stück):`);
urlsToPush.forEach(u => console.log(` - ${u}`));

// 3. Pushe via Indexing API
async function pushToGSC() {
  try {
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    let successCount = 0;
    for (const url of urlsToPush) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: { url: url, type: 'URL_UPDATED' },
        });
        console.log(`   ✅ Erfolgreich an GSC gepusht: ${url}`);
        successCount++;
      } catch (err) {
        console.error(`   ❌ Fehler beim Pushen von ${url}:`, err.message);
      }
      
      // Kurze Pause zwischen den Requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(`🎉 Auto-Push beendet! ${successCount}/${urlsToPush.length} an Google gemeldet.`);
  } catch (error) {
    console.error('❌ GSC Authentifizierungsfehler:', error.message);
  }
}

pushToGSC();
