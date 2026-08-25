import fs from 'fs';
import { execFileSync } from 'child_process';

const config = JSON.parse(fs.readFileSync('.indexing-config.json', 'utf8'));
const urls = fs.readFileSync('missing_urls_clean.txt', 'utf8').split('\n').filter(Boolean);

const payload = {
  host: config.domain,
  key: config.indexNowKey,
  keyLocation: `https://${config.domain}/${config.indexNowKey}.txt`,
  urlList: urls
};

const payloadStr = JSON.stringify(payload);
console.log(`Pushe ${urls.length} URLs an IndexNow...`);

try {
  const output = execFileSync('python3', ['scripts/indexnow_push.py', payloadStr], { encoding: 'utf-8' });
  console.log(`IndexNow Response: ${output.trim()}`);
  if (output.trim() === '200' || output.trim() === '202') {
    console.log('✅ Erfolgreich an IndexNow gepusht!');
  } else {
    console.log('❌ Fehler beim Senden an IndexNow (HTTP error)');
  }
} catch (e) {
  console.log('❌ Ausführungsfehler');
}
