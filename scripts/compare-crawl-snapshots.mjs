import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const snapshotsDir = path.join(__dirname, '..', 'data', 'gsc-snapshots');

// Argumente: node scripts/compare-crawl-snapshots.mjs [baselineFile] [newFile]
const args = process.argv.slice(2);

let baselinePath = args[0] 
  ? (path.isAbsolute(args[0]) ? args[0] : path.join(process.cwd(), args[0]))
  : path.join(snapshotsDir, 'snapshot-2026-09-15.json');

let newPath = args[1]
  ? (path.isAbsolute(args[1]) ? args[1] : path.join(process.cwd(), args[1]))
  : path.join(snapshotsDir, 'latest.json');

if (!fs.existsSync(baselinePath)) {
  console.error(`❌ Baseline-Snapshot nicht gefunden: ${baselinePath}`);
  process.exit(1);
}

if (!fs.existsSync(newPath)) {
  console.error(`❌ Neuer Snapshot nicht gefunden: ${newPath}`);
  process.exit(1);
}

function loadData(filePath) {
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const items = Array.isArray(raw) ? raw : (raw.items || []);
  const meta = raw.metadata || {};
  const map = new Map();
  items.forEach(item => map.set(item.url, item));
  return { meta, items, map, file: path.basename(filePath) };
}

const base = loadData(baselinePath);
const current = loadData(newPath);

console.log(`\n======================================================`);
console.log(`🔍 GSC CRAWL-VERGLEICHS-ANALYSE`);
console.log(`   Baseline: ${base.file} (${base.items.length} URLs)`);
console.log(`   Aktuell:  ${current.file} (${current.items.length} URLs)`);
console.log(`======================================================\n`);

const recrawled = [];
const firstCrawled = [];
const statusUpgrades = [];
const statusDowngrades = [];
const unchanged = [];
const newlyAddedUrls = [];

current.items.forEach(currItem => {
  const baseItem = base.map.get(currItem.url);

  if (!baseItem) {
    newlyAddedUrls.push(currItem);
    return;
  }

  // 1. First Crawl
  if (!baseItem.lastCrawlTime && currItem.lastCrawlTime) {
    firstCrawled.push({
      url: currItem.url,
      newCrawl: currItem.lastCrawlTime,
      oldCoverage: baseItem.coverageState,
      newCoverage: currItem.coverageState,
      verdict: currItem.verdict
    });
    return;
  }

  // 2. Recrawl
  if (baseItem.lastCrawlTime && currItem.lastCrawlTime) {
    const oldDate = new Date(baseItem.lastCrawlTime).getTime();
    const newDate = new Date(currItem.lastCrawlTime).getTime();
    if (newDate > oldDate) {
      const daysDiff = Math.round((newDate - oldDate) / (1000 * 60 * 60 * 24));
      recrawled.push({
        url: currItem.url,
        oldDate: baseItem.lastCrawlTime,
        newDate: currItem.lastCrawlTime,
        daysDiff,
        oldVerdict: baseItem.verdict,
        newVerdict: currItem.verdict,
        oldCoverage: baseItem.coverageState,
        newCoverage: currItem.coverageState
      });
    } else {
      unchanged.push(currItem);
    }
  } else {
    unchanged.push(currItem);
  }

  // 3. Status Change
  if (baseItem.verdict !== currItem.verdict || baseItem.coverageState !== currItem.coverageState) {
    if (baseItem.verdict !== 'PASS' && currItem.verdict === 'PASS') {
      statusUpgrades.push({ url: currItem.url, from: baseItem.coverageState, to: currItem.coverageState });
    } else if (baseItem.verdict === 'PASS' && currItem.verdict !== 'PASS') {
      statusDowngrades.push({ url: currItem.url, from: baseItem.coverageState, to: currItem.coverageState });
    }
  }
});

function fmt(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

console.log(`📈 ERGEBNIS-ZUSAMMENFASSUNG:`);
console.log(`   - URLs mit neuem Crawl (Recrawled):    ${recrawled.length} (${Math.round((recrawled.length / current.items.length) * 100)}%)`);
console.log(`   - URLs zum ALLERERSTEN Mal gecrawlt:   ${firstCrawled.length}`);
console.log(`   - Status-Upgrades (neu im Index):       ${statusUpgrades.length}`);
console.log(`   - Status-Downgrades (aus Index raus):   ${statusDowngrades.length}`);
console.log(`   - Unverändert (kein neuer Crawl):       ${unchanged.length} (${Math.round((unchanged.length / current.items.length) * 100)}%)`);
if (newlyAddedUrls.length > 0) {
  console.log(`   - Neu hinzugekommene URLs:              ${newlyAddedUrls.length}`);
}
console.log('');

if (firstCrawled.length > 0) {
  console.log(`🎉 ZUM ERSTEN MAL VOM GOOGLEBOT BESUCHT (${firstCrawled.length} URLs):`);
  firstCrawled.forEach((item, idx) => {
    console.log(`   ${idx + 1}. [${fmt(item.newCrawl)}] (${item.verdict}) ${item.url} (vorher: ${item.oldCoverage})`);
  });
  console.log('');
}

if (statusUpgrades.length > 0) {
  console.log(`🚀 NEU INDEXIERT (Status-Upgrade auf PASS) (${statusUpgrades.length} URLs):`);
  statusUpgrades.forEach((item, idx) => {
    console.log(`   ${idx + 1}. ${item.url}: "${item.from}" ➔ "${item.to}"`);
  });
  console.log('');
}

if (statusDowngrades.length > 0) {
  console.log(`⚠️ INDEX-VERLUST (Status-Downgrade) (${statusDowngrades.length} URLs):`);
  statusDowngrades.forEach((item, idx) => {
    console.log(`   ${idx + 1}. ${item.url}: "${item.from}" ➔ "${item.to}"`);
  });
  console.log('');
}

if (recrawled.length > 0) {
  console.log(`🔄 RE-CRAWLT: TOP 20 AKTIVSTE AKTUALISIERUNGEN:`);
  recrawled.sort((a, b) => new Date(b.newDate) - new Date(a.newDate)).slice(0, 20).forEach((item, idx) => {
    console.log(`   ${(idx + 1).toString().padStart(2, ' ')}. [${fmt(item.newDate)}] (+${item.daysDiff}d seit letztem Crawl) ${item.url}`);
  });
  console.log('');
}
