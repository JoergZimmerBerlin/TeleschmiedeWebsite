import { execSync } from 'child_process';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '..', 'gsc-credentials.json');
const tempFilePath = path.join(__dirname, '..', '.gsc-urls.tmp');

const mode = process.argv[2];

if (mode !== '--prepare' && mode !== '--execute') {
  console.error('❌ Bitte Modus angeben: --prepare oder --execute');
  process.exit(1);
}

if (mode === '--prepare') {
  console.log('🔍 [GSC Auto-Push] Bereite URLs vor...');
  
  let changedFiles = [];
  try {
    // Finde alle Dateien, die lokal anders sind als auf dem Remote-Server
    // (git diff zwischen origin/main und HEAD)
    const output = execSync('git diff --name-only origin/main HEAD', { encoding: 'utf-8' });
    changedFiles = output.split('\n').filter(Boolean);
  } catch (e) {
    console.error('⚠️ Fehler beim Lesen der Git-Änderungen. Auto-Push übersprungen.');
    process.exit(0);
  }

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
    console.log('ℹ️ Keine relevanten URLs gefunden. Nichts zu tun.');
    // Temp-Datei sicherheitshalber löschen
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    process.exit(0);
  }

  // URLs zwischenspeichern
  fs.writeFileSync(tempFilePath, urlsToPush.join('\n'));
  console.log(`✅ ${urlsToPush.length} URL(s) zwischengespeichert. Warten auf Push & Live-Gang...`);
  urlsToPush.forEach(u => console.log(` - ${u}`));
  process.exit(0);
}

if (mode === '--execute') {
  if (!fs.existsSync(tempFilePath)) {
    console.log('ℹ️ Keine .gsc-urls.tmp gefunden. Nichts an GSC zu senden.');
    process.exit(0);
  }

  const urlsToPush = fs.readFileSync(tempFilePath, 'utf8').split('\n').filter(Boolean);
  
  // Datei direkt löschen, damit sie bei Fehler nicht beim nächsten Mal nochmal gesendet wird
  fs.unlinkSync(tempFilePath);

  if (urlsToPush.length === 0) {
    process.exit(0);
  }

  if (!fs.existsSync(keyPath)) {
    console.error('❌ Fehler: gsc-credentials.json nicht gefunden. Push abgebrochen.');
    process.exit(0);
  }

  console.log(`🚀 [GSC Auto-Push] Sende ${urlsToPush.length} URLs an Google Indexing API...`);

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
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      console.log(`🎉 Auto-Push beendet! ${successCount}/${urlsToPush.length} erfolgreich.`);
    } catch (error) {
      console.error('❌ GSC Authentifizierungsfehler:', error.message);
    }
  }

  pushToGSC();
}
