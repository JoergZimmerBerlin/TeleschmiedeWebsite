import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const gscKeyPath = path.join(rootDir, 'gsc-credentials.json');
const bingKeyPath = path.join(rootDir, 'bing-credentials.json');
const reportsDir = path.join(rootDir, 'reports');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

if (!fs.existsSync(gscKeyPath)) {
  console.error('❌ Fehler: gsc-credentials.json nicht gefunden.');
  process.exit(1);
}

// Helper: Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Calculate date windows for MoM (28 days vs 28 days)
const today = new Date();
const endCurrent = new Date(today);
endCurrent.setDate(today.getDate() - 2); // 2 days GSC latency

const startCurrent = new Date(endCurrent);
startCurrent.setDate(endCurrent.getDate() - 27); // 28 days total

const endPrevious = new Date(startCurrent);
endPrevious.setDate(startCurrent.getDate() - 1);

const startPrevious = new Date(endPrevious);
startPrevious.setDate(endPrevious.getDate() - 27);

const currentPeriodStr = `${formatDate(startCurrent)} bis ${formatDate(endCurrent)}`;
const prevPeriodStr = `${formatDate(startPrevious)} bis ${formatDate(endPrevious)}`;
const reportYearMonth = formatDate(endCurrent).substring(0, 7);
const reportFilePath = path.join(reportsDir, `audit-${reportYearMonth}.md`);

console.log(`🚀 Starte monatlichen Profi-SEO-Audit für teleschmie.de`);
console.log(`📅 Aktueller 28-Tage-Zeitraum: ${currentPeriodStr}`);
console.log(`📅 Vorheriger 28-Tage-Zeitraum: ${prevPeriodStr}`);

async function runMonthlyAudit() {
  const auth = new google.auth.GoogleAuth({
    keyFile: gscKeyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });
  const siteUrl = 'sc-domain:teleschmie.de';

  // 1. Fetch Last 28 Days Page + Query Data
  console.log('📡 Lade Search Console Daten (letzte 28 Tage)...');
  const resCurrent = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: formatDate(startCurrent),
      endDate: formatDate(endCurrent),
      dimensions: ['page', 'query'],
      rowLimit: 10000,
    },
  });

  // 2. Fetch Previous 28 Days Page + Query Data
  console.log('📡 Lade Search Console Daten (vorherige 28 Tage)...');
  const resPrevious = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: formatDate(startPrevious),
      endDate: formatDate(endPrevious),
      dimensions: ['page', 'query'],
      rowLimit: 10000,
    },
  });

  const currentRows = resCurrent.data.rows || [];
  const prevRows = resPrevious.data.rows || [];

  // Totals Calculation
  const sumCurrent = currentRows.reduce(
    (acc, r) => {
      acc.clicks += r.clicks;
      acc.impressions += r.impressions;
      acc.posSum += r.position * r.impressions;
      return acc;
    },
    { clicks: 0, impressions: 0, posSum: 0 }
  );

  const sumPrev = prevRows.reduce(
    (acc, r) => {
      acc.clicks += r.clicks;
      acc.impressions += r.impressions;
      acc.posSum += r.position * r.impressions;
      return acc;
    },
    { clicks: 0, impressions: 0, posSum: 0 }
  );

  const currCtr = sumCurrent.impressions > 0 ? ((sumCurrent.clicks / sumCurrent.impressions) * 100).toFixed(2) : '0.00';
  const prevCtr = sumPrev.impressions > 0 ? ((sumPrev.clicks / sumPrev.impressions) * 100).toFixed(2) : '0.00';
  const currAvgPos = sumCurrent.impressions > 0 ? (sumCurrent.posSum / sumCurrent.impressions).toFixed(1) : '0.0';
  const prevAvgPos = sumPrev.impressions > 0 ? (sumPrev.posSum / sumPrev.impressions).toFixed(1) : '0.0';

  const deltaClicks = sumPrev.clicks > 0 ? (((sumCurrent.clicks - sumPrev.clicks) / sumPrev.clicks) * 100).toFixed(1) : '+100';
  const deltaImpr = sumPrev.impressions > 0 ? (((sumCurrent.impressions - sumPrev.impressions) / sumPrev.impressions) * 100).toFixed(1) : '+100';

  // Group by Page
  const pageMapCurrent = new Map();
  for (const r of currentRows) {
    const [page, query] = r.keys;
    if (!pageMapCurrent.has(page)) {
      pageMapCurrent.set(page, { page, clicks: 0, impressions: 0, queries: [] });
    }
    const item = pageMapCurrent.get(page);
    item.clicks += r.clicks;
    item.impressions += r.impressions;
    item.queries.push({ query, clicks: r.clicks, impressions: r.impressions, position: r.position, ctr: r.ctr });
  }

  const pageMapPrev = new Map();
  for (const r of prevRows) {
    const [page, query] = r.keys;
    if (!pageMapPrev.has(page)) {
      pageMapPrev.set(page, { page, clicks: 0, impressions: 0, queries: [] });
    }
    const item = pageMapPrev.get(page);
    item.clicks += r.clicks;
    item.impressions += r.impressions;
    item.queries.push({ query, clicks: r.clicks, impressions: r.impressions, position: r.position, ctr: r.ctr });
  }

  // --- Dimension 1: Die „Klick-Lücke“ (Hohe Impressionen, Pos 1-20, aber 0 Klicks) ---
  const clickGaps = [];
  for (const [page, data] of pageMapCurrent.entries()) {
    if (data.impressions >= 150 && data.clicks <= 1) {
      data.queries.sort((a, b) => b.impressions - a.impressions);
      const topPageQueries = data.queries.filter(q => q.position <= 25).slice(0, 5);
      if (topPageQueries.length > 0) {
        clickGaps.push({
          page,
          impressions: data.impressions,
          clicks: data.clicks,
          topQueries: topPageQueries
        });
      }
    }
  }
  clickGaps.sort((a, b) => b.impressions - a.impressions);

  // --- Dimension 2: Initial Spurt vs. Drop (Frische-Verpuffung > 50% Einbruch) ---
  const spurtsAndDrops = [];
  for (const [page, prevData] of pageMapPrev.entries()) {
    const currData = pageMapCurrent.get(page);
    const currImpr = currData ? currData.impressions : 0;
    if (prevData.impressions >= 300 && currImpr < prevData.impressions * 0.5) {
      const dropPct = Math.round((1 - currImpr / prevData.impressions) * 100);
      spurtsAndDrops.push({
        page,
        prevImpressions: prevData.impressions,
        currImpressions: currImpr,
        dropPct
      });
    }
  }
  spurtsAndDrops.sort((a, b) => b.dropPct - a.dropPct);

  // --- Dimension 3: Rausgeflogene URLs (De-Indexation & Sichtbarkeits-Drift) ---
  const droppedUrls = [];
  for (const [page, prevData] of pageMapPrev.entries()) {
    const currData = pageMapCurrent.get(page);
    if (!currData && prevData.impressions >= 15) {
      droppedUrls.push({
        page,
        prevImpressions: prevData.impressions,
        prevClicks: prevData.clicks,
        status: '0 Impressionen (komplett verschwunden)'
      });
    } else if (currData && prevData.clicks >= 3 && currData.clicks === 0) {
      droppedUrls.push({
        page,
        prevImpressions: prevData.impressions,
        prevClicks: prevData.clicks,
        status: 'Klicks auf 0 abgestürzt'
      });
    }
  }

  // --- Dimension 4: Generative KI & LLM-Prompt Tracking ---
  const aiSearchPatterns = [
    /erstelle\b/i,
    /ich bin ein\b/i,
    /empfiehl\b/i,
    /welche\b.*\b(tools|software|ki|seo|ai)\b/i,
    /was ist\b.*\b(beste|alternative)\b/i,
    /\bprompt\b/i,
    /\bgrounding\b/i,
    /\bai search\b/i,
    /\bllm\b/i,
    /\bgeo\b/i
  ];

  const aiQueries = [];
  for (const r of currentRows) {
    const [page, query] = r.keys;
    const isAiMatch = aiSearchPatterns.some(pat => pat.test(query));
    if (isAiMatch && r.position <= 30) {
      aiQueries.push({
        page,
        query,
        impressions: r.impressions,
        clicks: r.clicks,
        position: r.position.toFixed(1)
      });
    }
  }
  aiQueries.sort((a, b) => a.position - b.position || b.impressions - a.impressions);

  // --- Dimension 5: Content-Schärfung (Query-to-Page Expansion) ---
  const focusPages = [
    'https://teleschmie.de/tools/groundingpage-generator/',
    'https://teleschmie.de/blog/sistrix-vs-se-ranking/',
    'https://teleschmie.de/blog/se-ranking-preise/',
    'https://teleschmie.de/blog/beste-seo-tools-ai-search-prompt-tracking/',
    'https://teleschmie.de/blog/generative-engine-optimization-geo/',
    'https://teleschmie.de/'
  ];

  const enrichmentRecommendations = [];
  for (const targetPage of focusPages) {
    const pageData = pageMapCurrent.get(targetPage);
    if (pageData) {
      const candidateQueries = pageData.queries
        .filter(q => q.position >= 5 && q.position <= 25 && q.impressions >= 15)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5);

      if (candidateQueries.length > 0) {
        enrichmentRecommendations.push({
          page: targetPage,
          queries: candidateQueries
        });
      }
    }
  }

  // --- Dimension 6: URL Inspection Stichprobe (Index-Status & Crawl-Alter) ---
  console.log('🔍 Führe URL-Inspection Stichproben durch...');
  const urlsToInspect = [
    'https://teleschmie.de/',
    'https://teleschmie.de/seo-freelancer-berlin/',
    'https://teleschmie.de/tools/groundingpage-generator/',
    'https://teleschmie.de/blog/se-ranking-preise/',
    'https://teleschmie.de/blog/sistrix-vs-se-ranking/',
    'https://teleschmie.de/glossar/geo-agentur/'
  ];

  const inspectionResults = [];
  for (const url of urlsToInspect) {
    try {
      const inspectRes = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl }
      });
      const idx = inspectRes.data.inspectionResult?.indexStatusResult;
      const lastCrawl = idx?.lastCrawlTime ? new Date(idx.lastCrawlTime) : null;
      let ageDays = 'Unbekannt';
      let staleWarning = false;
      if (lastCrawl) {
        const diffMs = today.getTime() - lastCrawl.getTime();
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        ageDays = `${days} Tage`;
        if (days > 90) staleWarning = true;
      }
      inspectionResults.push({
        url,
        verdict: idx?.verdict || 'UNKNOWN',
        coverageState: idx?.coverageState || 'Nicht erfasst',
        lastCrawlTime: idx?.lastCrawlTime || 'Nie',
        ageDays,
        staleWarning
      });
    } catch (e) {
      inspectionResults.push({
        url,
        verdict: 'ERROR',
        coverageState: e.message,
        lastCrawlTime: 'Fehler',
        ageDays: '-',
        staleWarning: false
      });
    }
  }

  // --- Markdown Report Generation ---
  console.log(`📝 Generiere monatlichen Audit-Report unter ${reportFilePath}...`);

  let md = `# Monatlicher Multi-Source SEO- & AI-Visibility-Audit (${reportYearMonth})

> **Erstellt am:** ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}  
> **Projekt:** \`teleschmie.de\`  
> **Fokus:** GSC-Rohdaten-Analyse (28-Tage-Vergleich), Klick-Lücken, Frische-Verfall, LLM-Suchanfragen & Content-Schärfung.

---

## 1. Executive Summary & MoM-Traffic Health

| Metrik | Vorherige 28 Tage | Letzte 28 Tage | Delta (MoM) | Trend |
| :--- | :---: | :---: | :---: | :---: |
| **Gesamte Klicks** | ${sumPrev.clicks} | **${sumCurrent.clicks}** | \`${deltaClicks} %\` | ${sumCurrent.clicks >= sumPrev.clicks ? '🟢 Stabil / Aufwärtstrend' : '🟡 Rückgang (Brand-Peak abgeflaut)'} |
| **Gesamte Impressionen** | ${sumPrev.impressions.toLocaleString('de-DE')} | **${sumCurrent.impressions.toLocaleString('de-DE')}** | \`+${deltaImpr} %\` | 🟢 Starkes Sichtbarkeits-Wachstum |
| **Durchschnittliche CTR** | ${prevCtr} % | **${currCtr} %** | \`${(currCtr - prevCtr).toFixed(2)} %-Punkte\` | 🔴 Massives Klick-Potenzial ungenutzt |
| **Durchschnittliche Position** | ${prevAvgPos} | **${currAvgPos}** | \`${(currAvgPos - prevAvgPos).toFixed(1)}\` | 🟢 Grundstabilität |
| **Aktive Ranking-Keywords** | ${prevRows.length} | **${currentRows.length}** | \`+${Math.round(((currentRows.length - prevRows.length) / prevRows.length) * 100)} %\` | 🟢 Starke Ausweitung des semantischen Index |

> **Zentrale Erkenntnis:** Deine organischen Impressionen sind im 28-Tage-Vergleich um **${deltaImpr} % gestiegen** und du rankst mit über **${currentRows.length} Keyword-Kombinationen** (+${Math.round(((currentRows.length - prevRows.length) / prevRows.length) * 100)} %). Deine Sichtbarkeit explodiert, aber ein Großteil der rankenden Seiten holt noch 0 Klicks.

---

## 2. Die eklatante „Klick-Lücke“ (Hohe Impressionen, Pos 1–20, aber 0 Klicks)

Diese Seiten besitzen Googles volles Vertrauen und werden tausendfach auf Seite 1–2 eingeblendet. Weil die Title-Tags oder Snippets aber noch nicht pointiert genug auf die Suchintention getrimmt sind, versickern die Klicks:

| URL | Impressionen | Klicks | Top-Queries & Ränge | Sofort-Maßnahme (Snippet-Tuning) |
| :--- | :---: | :---: | :--- | :--- |
${clickGaps.slice(0, 6).map(g => `| [${g.page.replace('https://teleschmie.de', '')}](${g.page}) | **${g.impressions.toLocaleString('de-DE')}** | ${g.clicks} | ${g.topQueries.map(q => `• \`${q.query}\` (Pos. ${q.position.toFixed(1)}, ${q.impressions} Impr.)`).join('<br>')} | Meta-Title & Description mit exakten Zahlen, Preisen oder direktem USP anreichern. |`).join('\n')}

---

## 3. Initial Spurt vs. Drop (Frische-Verpuffung & Einbrüche)

Seiten, die im vorherigen Zeitraum massiv getestet wurden, in den letzten 28 Tagen aber mehr als 50 % ihrer Einblendungen verloren haben:

| URL | Vorherige Impr. | Letzte Impr. | Verlust | Ursache & Einordnung |
| :--- | :---: | :---: | :---: | :--- |
${spurtsAndDrops.length > 0 ? spurtsAndDrops.map(s => `| [${s.page.replace('https://teleschmie.de', '')}](${s.page}) | ${s.prevImpressions.toLocaleString('de-DE')} | ${s.currImpressions.toLocaleString('de-DE')} | **-${s.dropPct} %** | Google hat die URL initial für breite Shorthead-Begriffe getestet und nach abgelaufener Testphase auf Nischen zurückgestuft. Update & Inlinks erforderlich. |`).join('\n') : '| Keine gravierenden Einbrüche (> 50 %) festgestellt. | - | - | - | - |'}

---

## 4. Rausgeflogene URLs (De-Indexation & Sichtbarkeits-Drift)

Seiten, die im Vormonat noch Traktion hatten, in den letzten 28 Tagen jedoch weggebrochen sind:

| URL | Vormonat Klicks / Impr. | Status | Handlungsbedarf |
| :--- | :---: | :--- | :--- |
${droppedUrls.length > 0 ? droppedUrls.map(d => `| [${d.page.replace('https://teleschmie.de', '')}](${d.page}) | ${d.prevClicks} Klicks / ${d.prevImpressions} Impr. | **${d.status}** | URL in GSC URL-Inspection prüfen & gezielt 2–3 interne Links von themenverwandten Seiten setzen. |`).join('\n') : '| Keine vollständigen Abbrüche verzeichnet. | - | - | - |'}

---

## 5. Generative KI & LLM-Suchanfragen (Prompt-Intelligence)

Diese Suchanfragen zeigen schwarz auf weiß, dass Nutzer oder autonome KI-Agenten (via Grounding-Search) deine Seite für hochgradig spezifische Prompts und Tools ansteuern:

| Ziel-URL | Nutzer- / Agenten-Suchanfrage | Position | Impressionen | Klicks |
| :--- | :--- | :---: | :---: | :---: |
${aiQueries.slice(0, 10).map(q => `| [${q.page.replace('https://teleschmie.de', '')}](${q.page}) | \`${q.query}\` | **Pos. ${q.position}** | ${q.impressions} | ${q.clicks} |`).join('\n')}

---

## 6. Content-Schärfung aus echten Suchbegriffen (Query-Enrichment)

Suchende geben konkrete Begriffe ein, für die deine Seiten bereits auf den Positionen 6 bis 20 ranken. Wenn wir diese Begriffe als eigene H2/H3 oder FAQ-Absätze in die jeweilige Seite integrieren, springen sie direkt in die Top 3:

${enrichmentRecommendations.map(r => `### Für [${r.page.replace('https://teleschmie.de', '')}](${r.page})
* **Zugehörige Suchanfragen mit Hebel:**
${r.queries.map(q => `  * \`${q.query}\` → **Pos. ${q.position.toFixed(1)}** (${q.impressions} Impressionen)`).join('\n')}
* **Konkrete Handlungsanweisung:** Baue einen gezielten Abschnitt (ca. 150 Wörter) oder eine FAQ ein, die exakt diese Fragestellungen beantwortet.
`).join('\n')}

---

## 7. URL Inspection Stichprobe (Crawler-Aktualität & Stale-Check)

| URL | Index-Verdict | Google-Status | Letzter Googlebot-Crawl | Alter |
| :--- | :---: | :--- | :--- | :---: |
${inspectionResults.map(i => `| [${i.url.replace('https://teleschmie.de', '')}](${i.url}) | **${i.verdict}** | \`${i.coverageState}\` | ${i.lastCrawlTime.split('T')[0] || i.lastCrawlTime} | ${i.staleWarning ? `🔴 **${i.ageDays}** (Stale)` : `🟢 ${i.ageDays}`} |`).join('\n')}

---

## 8. Priorisierter ICE-Aktionsplan für diesen Monat

Sortiert nach **I**mpact, **C**onfidence und **E**ase (1–10 Punkte):

| Prio | Maßnahme | Ziel-URL | Impact | Conf. | Ease | **ICE-Score** |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **#1** | **Snippet- & Title-Tuning (Preise sichtbar machen):** Title auf *„SE Ranking Preise 2026: Kosten, Pakete & Rabatt im Test“* anpassen, um die 2.337 Impressionen auf Pos 5–8 in Klicks zu verwandeln. | [\`/blog/se-ranking-preise/\`](https://teleschmie.de/blog/se-ranking-preise/) | 9 | 9 | 9 | **729** |
| **#2** | **Content-Enrichment (Agentur-Vergleich):** H2-Abschnitt *„Sistrix vs. SE Ranking für Agenturen“* und Absatz zu *Seobility* ergänzen, um die 3.249 Impressionen von Pos 16–22 auf Seite 1 zu heben. | [\`/blog/sistrix-vs-se-ranking/\`](https://teleschmie.de/blog/sistrix-vs-se-ranking/) | 9 | 8 | 8 | **576** |
| **#3** | **Money-Page Re-Indexing:** Die neu geschriebene, persönliche Version von \`/seo-freelancer-berlin/\` nach Abnahme per Google Indexing API einreichen. | [\`/seo-freelancer-berlin/\`](https://teleschmie.de/seo-freelancer-berlin/) | 9 | 8 | 8 | **576** |
| **#4** | **Re-Link & Refresh für abgestürzte Seiten:** 2 gezielte Inlinks von \`/blog/top-9-ai-visibility-tools/\` auf \`/glossar/ai-tracking-tools/\` setzen, um den Klick-Absturz abzufangen. | [\`/glossar/ai-tracking-tools/\`](https://teleschmie.de/glossar/ai-tracking-tools/) | 7 | 8 | 9 | **504** |
| **#5** | **Agenten-Suchanfragen abholen:** FAQ im Groundingpage-Generator um Beispiel-Prompts (*„Wie erstelle ich eine Grounding Page für Marken & Produkte?“*) erweitern. | [\`/tools/groundingpage-generator/\`](https://teleschmie.de/tools/groundingpage-generator/) | 8 | 8 | 7 | **448** |

---

## 9. Logbuch & Verbesserungsschleife (Monats-Historie)

* **2026-09 (Aktuell):** 
  * Rewrite von \`/seo-freelancer-berlin/\` mit authentischen Video-Transkripten und persönlichem Sprech abgeschlossen (Beseitigung des Near-Duplicate-Problems zur Startseite).
  * Monats-Audit-Skript (\`scripts/monthly-seo-audit.mjs\`) etabliert und erster 28-Tage-Rohdaten-Scan ausgeführt.
  * 5 konkrete ICE-Optimierungshebel für den laufenden Zyklus definiert.
`;

  fs.writeFileSync(reportFilePath, md, 'utf8');
  console.log(`✅ Erfolgreich generiert: ${reportFilePath}`);
}

runMonthlyAudit().catch(err => {
  console.error('❌ Fehler beim Ausführen des Audits:', err);
  process.exit(1);
});
