import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportPath = path.join(__dirname, '..', 'crawl-report.json');

if (!fs.existsSync(reportPath)) {
  console.error('❌ crawl-report.json nicht gefunden.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

console.log(`\n======================================================`);
console.log(`📊 GSC CRAWL REPORT ANALYSE: ${data.length} URLs`);
console.log(`======================================================\n`);

// Filter categories
const crawled = data.filter(d => d.lastCrawlTime !== null);
const notCrawled = data.filter(d => d.lastCrawlTime === null);

// Verdicts
const passCount = data.filter(d => d.verdict === 'PASS').length;
const neutralCount = data.filter(d => d.verdict === 'NEUTRAL').length;
const failCount = data.filter(d => d.verdict === 'FAIL').length;
const errorCount = data.filter(d => d.verdict === 'ERROR').length;

// Coverage states
const coverageBreakdown = {};
data.forEach(d => {
  const state = d.coverageState || 'UNKNOWN';
  coverageBreakdown[state] = (coverageBreakdown[state] || 0) + 1;
});

console.log('📌 STATUS-VERTEILUNG:');
console.log(`   - Indexiert (PASS): ${passCount}`);
console.log(`   - Neutral/Warteschlange (NEUTRAL): ${neutralCount}`);
console.log(`   - Fehler/Abgelehnt (FAIL): ${failCount}`);
if (errorCount > 0) console.log(`   - API-Fehler (ERROR): ${errorCount}`);
console.log(`   - Bereits gecrawlt: ${crawled.length} (${Math.round(crawled.length / data.length * 100)}%)`);
console.log(`   - Noch nie gecrawlt: ${notCrawled.length} (${Math.round(notCrawled.length / data.length * 100)}%)\n`);

console.log('📌 GOOGLE COVERAGE STATES:');
for (const [state, count] of Object.entries(coverageBreakdown)) {
  console.log(`   - ${state}: ${count}`);
}
console.log('');

// Sort by crawl date
const sortedCrawled = [...crawled].sort((a, b) => new Date(b.lastCrawlTime) - new Date(a.lastCrawlTime));

// Date buckets
const now = Date.now();
const days7 = 7 * 24 * 60 * 60 * 1000;
const days30 = 30 * 24 * 60 * 60 * 1000;
const days60 = 60 * 24 * 60 * 60 * 1000;
const days90 = 90 * 24 * 60 * 60 * 1000;

let c7 = 0, c30 = 0, c60 = 0, c90 = 0, cOlder = 0;
sortedCrawled.forEach(item => {
  const diff = now - new Date(item.lastCrawlTime).getTime();
  if (diff <= days7) c7++;
  else if (diff <= days30) c30++;
  else if (diff <= days60) c60++;
  else if (diff <= days90) c90++;
  else cOlder++;
});

console.log('⏱️ CRAWL-AKTUALITÄTSVERTEILUNG (Wann war der Bot da?):');
console.log(`   - Letzte 7 Tage:     ${c7} URLs (${Math.round(c7/data.length*100)}%)`);
console.log(`   - 8 bis 30 Tage:     ${c30} URLs (${Math.round(c30/data.length*100)}%)`);
console.log(`   - 31 bis 60 Tage:    ${c60} URLs (${Math.round(c60/data.length*100)}%)`);
console.log(`   - 61 bis 90 Tage:    ${c90} URLs (${Math.round(c90/data.length*100)}%)`);
console.log(`   - Vor > 90 Tagen:    ${cOlder} URLs (${Math.round(cOlder/data.length*100)}%)`);
console.log(`   - Noch nie gecrawlt: ${notCrawled.length} URLs (${Math.round(notCrawled.length/data.length*100)}%)\n`);

// Format date helper
function fmtDate(iso) {
  if (!iso) return 'Noch nie';
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// TOP 30 FRISCHESTE
console.log('======================================================');
console.log('🟢 TOP 30: DIE ZULETZT GECRAWLTEN SEITEN (Frischeste Aktivität)');
console.log('======================================================');
const top30Fresh = sortedCrawled.slice(0, 30);
top30Fresh.forEach((item, idx) => {
  const num = (idx + 1).toString().padStart(2, ' ');
  console.log(`${num}. [${fmtDate(item.lastCrawlTime)}] (${item.verdict}) ${item.url}`);
});

// TOP 30 ÄLTESTE
console.log('\n======================================================');
console.log('🔴 TOP 30: AM LÄNGSTEN NICHT GECRAWLT (Älteste Aktualisierung)');
console.log('======================================================');
const oldestCrawled = [...sortedCrawled].reverse().slice(0, 30);
oldestCrawled.forEach((item, idx) => {
  const num = (idx + 1).toString().padStart(2, ' ');
  console.log(`${num}. [${fmtDate(item.lastCrawlTime)}] (${item.verdict}) ${item.url}`);
});

// UNBESUCHTE SEITEN
if (notCrawled.length > 0) {
  console.log('\n======================================================');
  console.log(`⚠️ SEITEN, DIE NOCH NIE GECRAWLT WURDEN (${notCrawled.length} URLs)`);
  console.log('======================================================');
  notCrawled.slice(0, 30).forEach((item, idx) => {
    const num = (idx + 1).toString().padStart(2, ' ');
    console.log(`${num}. [${item.coverageState}] ${item.url}`);
  });
  if (notCrawled.length > 30) {
    console.log(`   ... und ${notCrawled.length - 30} weitere.`);
  }
}
