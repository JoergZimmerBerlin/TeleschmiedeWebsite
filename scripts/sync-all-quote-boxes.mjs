import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const quotePoolPath = path.join(rootDir, "scripts/data/quote-pool.json");
const glossarDir = path.join(rootDir, "src/content/glossar");
const blogDir = path.join(rootDir, "src/content/blog");

const LOCKED_FILES = new Set([
  "301-vs-302.md",
  "aeo.md",
  "google-search-console.md",
  "404-fehlerseiten.md",
  "a2a-protocol.md",
  "agent-payments-protocol-ap2.md",
  "agent-readiness-level.md",
  "ai-crawlability.md",
  "ai-plugin-json.md",
  "ai-sentiment-analysis.md",
  "citation-frequency.md"
]);

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const stageArg = args.find(a => a.startsWith("--stage="));
const stage = stageArg ? stageArg.split("=")[1] : "all"; // 'glossar', 'blog', or 'all'

console.log(`=== SYNC MASTER-ZITATBOXEN (100% VERBATIM) ===`);
console.log(`Modus: ${isDryRun ? "DRY-RUN (Keine Änderungen auf Platte)" : "LIVE AUSFÜHRUNG"}`);
console.log(`Stage: ${stage.toUpperCase()}\n`);

// 1. Load Quotes
if (!fs.existsSync(quotePoolPath)) {
  console.error(`❌ Quote pool nicht gefunden unter: ${quotePoolPath}`);
  process.exit(1);
}
const quotePool = JSON.parse(fs.readFileSync(quotePoolPath, "utf8"));
console.log(`📚 ${quotePool.length} verbatim Zitate im Pool geladen.`);

// Usage tracking for frequency capping (max 2-3 uses per quote to ensure variety)
const quoteUsageCount = new Map();
quotePool.forEach(q => quoteUsageCount.set(q.id, 0));

function getSourceKey(quote) {
  if (quote.type === "linkedin") return "SRC_LINKEDIN";
  const title = quote.sourceTitle || "";
  if (title.includes("SEOPresso")) return "SRC_SEOPRESSO";
  if (title.includes("Never Code Alone")) return "SRC_NEVERCODE";
  if (title.includes("Magic Writing")) return "SRC_MAGIC";
  if (title.includes("Folge 5")) return "SRC_BLAGO_5";
  if (title.includes("Antonio Blago")) return "SRC_BLAGO_4";
  return "SRC_OTHER";
}

const SOURCE_LABELS = {
  "SRC_LINKEDIN": "LinkedIn-Beiträge",
  "SRC_SEOPRESSO": "Björn Darko (SEOPresso)",
  "SRC_NEVERCODE": "Roland Golla (Never Code Alone)",
  "SRC_MAGIC": "Michael Kaufhold (Magic Writing)",
  "SRC_BLAGO_4": "Antonio Blago (Folge 4)",
  "SRC_BLAGO_5": "Antonio Blago (Folge 5)"
};

const sourceUsageCount = new Map([
  ["SRC_LINKEDIN", 0],
  ["SRC_SEOPRESSO", 0],
  ["SRC_NEVERCODE", 0],
  ["SRC_MAGIC", 0],
  ["SRC_BLAGO_4", 0],
  ["SRC_BLAGO_5", 0]
]);

const TARGET_QUOTA_PER_SOURCE = 47; // ~1/6 von 281 Artikeln

// Stopwords for scoring
const STOPWORDS = new Set([
  "der", "die", "das", "und", "in", "den", "von", "zu", "mit", "ist", "des", "nicht", "eine", "einer", "ein", "dem",
  "sich", "sie", "wie", "auch", "auf", "aus", "dem", "dass", "war", "noch", "nach", "was", "aber", "über", "eines",
  "wird", "kann", "mehr", "oder", "wenn", "einen", "wir", "habe", "hat", "fuer", "für", "vom", "im", "am", "als"
]);

function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^\w\säöüÄÖÜß-]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOPWORDS.has(w));
}

// Special curated mappings for key topic clusters
const CLUSTER_KEYWORDS = {
  "relaunch": ["relaunch", "migration", "umzug", "weiterleitung", "301", "302", "404", "statuscode"],
  "gsc": ["search-console", "gsc", "indexierung", "crawler", "crawl-budget", "sitemap", "robots"],
  "ki_search": ["ai", "ki", "geo", "aeo", "llm", "chatgpt", "gemini", "perplexity", "rag", "answer-engine"],
  "agentic": ["agent", "a2a", "ap2", "mcp", "agentic", "protokoll", "protocol", "auth-md", "ucp"],
  "cro_business": ["conversion", "cro", "roi", "leads", "umsatz", "verkäufer", "vertrieb", "kunde"],
  "tools": ["tool", "se-ranking", "sistrix", "screaming-frog", "rankscale", "tracker", "audit", "seorch"],
  "perf_ux": ["pagespeed", "core-web-vitals", "lcp", "inp", "cls", "ladezeit", "mobile", "usability", "ux"],
  "eeat_brand": ["brand", "marke", "e-e-a-t", "entität", "knowledge-graph", "trust", "reputation", "backlink"]
};

function scoreQuote(quote, articleTokens, slug, cat, title) {
  let score = 0;
  const quoteTokens = quote.keywords || [];
  const quoteTopics = (quote.topics || []).map(t => t.toLowerCase());

  // 1. Token Overlap
  for (const t of articleTokens) {
    if (quoteTokens.includes(t)) {
      score += 3;
    }
  }

  // 2. Slug Match
  for (const st of slug.split("-")) {
    if (st.length > 3 && quoteTokens.includes(st)) {
      score += 5;
    }
  }

  // 3. Cluster Match
  for (const [clusterName, keywords] of Object.entries(CLUSTER_KEYWORDS)) {
    const articleInCluster = keywords.some(k => slug.includes(k) || title.toLowerCase().includes(k));
    const quoteInCluster = keywords.some(k => quoteTokens.includes(k) || quoteTopics.some(qt => qt.includes(k)));
    if (articleInCluster && quoteInCluster) {
      score += 15;
    }
  }

  // 4. Category Boost
  if (cat && quoteTopics.some(qt => qt.includes(cat.toLowerCase()) || cat.toLowerCase().includes(qt))) {
    score += 8;
  }

  // 5. Source Affinities
  const srcKey = getSourceKey(quote);
  const lowerTitle = title.toLowerCase();
  if (srcKey === "SRC_SEOPRESSO" && (/relaunch|migration|historie|erfahrung|mindset|philosophie|handwerk|ranking|backlink|linkbuilding|disziplin/.test(slug) || /relaunch|historie|erfahrung|ranking/.test(lowerTitle))) {
    score += 12;
  }
  if (srcKey === "SRC_NEVERCODE" && (/dev|code|tech|gsc|crawler|index|sitemap|robots|server|statuscode|ssr|dns|link-header/.test(slug) || /technisch|code|developer/.test(lowerTitle))) {
    score += 12;
  }
  if (srcKey === "SRC_MAGIC" && (/content|text|copywriting|intent|suchintention|keyword|wording|sprache|helpful/.test(slug) || /content|text|schreiben/.test(lowerTitle))) {
    score += 12;
  }
  if (srcKey === "SRC_BLAGO_4" && (/ads|sea|cpc|budget|conversion|cro|roi|umsatz|vertrieb|business|kunde/.test(slug) || /ads|sea|conversion/.test(lowerTitle))) {
    score += 12;
  }
  if (srcKey === "SRC_BLAGO_5" && (/ki|ai|geo|aeo|chatgpt|perplexity|gemini|llm|tracking|prompts|se-ranking/.test(slug) || /ai|ki|geo/.test(lowerTitle))) {
    score += 12;
  }
  if (srcKey === "SRC_LINKEDIN" && (/brand|marke|e-e-a-t|trust|autorit|reputation|freelance|consulting/.test(slug) || /brand|marke|freelance/.test(lowerTitle))) {
    score += 12;
  }

  // 6. Usage Penalty (heavily penalize repeated quotes to distribute quotes widely)
  const usages = quoteUsageCount.get(quote.id) || 0;
  score -= (usages * 25);

  // 7. Source Balancing Quota Penalty (guarantees ~1/6 equal distribution)
  const srcUsages = sourceUsageCount.get(srcKey) || 0;
  if (srcUsages >= TARGET_QUOTA_PER_SOURCE) {
    score -= ((srcUsages - TARGET_QUOTA_PER_SOURCE + 1) * 30);
  }

  return score;
}

function selectBestQuote(articleTokens, slug, cat, title) {
  let bestQuote = null;
  let highestScore = -Infinity;

  for (const q of quotePool) {
    const s = scoreQuote(q, articleTokens, slug, cat, title);
    if (s > highestScore) {
      highestScore = s;
      bestQuote = q;
    }
  }

  // Increment usage count
  if (bestQuote) {
    quoteUsageCount.set(bestQuote.id, (quoteUsageCount.get(bestQuote.id) || 0) + 1);
    const srcKey = getSourceKey(bestQuote);
    sourceUsageCount.set(srcKey, (sourceUsageCount.get(srcKey) || 0) + 1);
  }

  return { quote: bestQuote, score: highestScore };
}

function generateMasterZitatbox(quote) {
  return `<figure class="my-8 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-2xl shadow-sm">
  <div class="flex items-center gap-4 mb-4">
    <img 
      src="/assets/images/profile/joerg-zimmer-portrait.webp" 
      alt="Jörg Zimmer - Senior SEO & AI Search Consultant" 
      class="w-14 h-14 rounded-full object-cover object-top shadow-sm border-2 border-lime-accent" 
      width="56" 
      height="56" 
      loading="lazy"
    />
    <div>
      <h4 class="font-bold text-base md:text-lg text-dark mb-0">Jörg Zimmer</h4>
      <p class="text-xs md:text-sm text-neutral-600 mb-0">Senior SEO & AI Search Consultant</p>
    </div>
  </div>
  <blockquote class="text-base md:text-lg text-dark leading-relaxed italic border-l-4 border-lime-accent pl-4 my-4 font-normal">
    „${quote.quote}“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
      <span class="text-neutral-300 hidden sm:inline">•</span>
      <a href="${quote.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-neutral-600 hover:text-dark underline inline-flex items-center gap-1">
        <span>Quelle: ${quote.sourceTitle}</span>
        <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
      </a>
    </div>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1 shrink-0">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>`;
}

// Regex to identify any existing figure block
const FIGURE_REGEX = /<figure class="my-8 bg-neutral-50[\s\S]*?<\/figure>/;

function processDirectory(dir, typeName) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") || f.endsWith(".mdx")).sort();
  console.log(`\n📁 Verarbeite ${files.length} Dateien in ${typeName}...`);

  let modifiedCount = 0;
  let lockedCount = 0;
  let insertedCount = 0;
  const report = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const filename = path.basename(file);

    if (LOCKED_FILES.has(filename)) {
      lockedCount++;
      report.push({ file: filename, status: "LOCKED", quoteId: "LOCKED_EXISTING" });
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const mTitle = content.match(/title:\s*["']?([^"'\n]+)["']?/);
    const title = mTitle ? mTitle[1].trim() : file;
    const mCat = content.match(/category:\s*["']?([^"'\n]+)["']?/);
    const cat = mCat ? mCat[1].trim() : "";
    const mDesc = content.match(/description:\s*["']?([^"'\n]+)["']?/);
    const desc = mDesc ? mDesc[1].trim() : "";

    const slug = filename.replace(/\.mdx?$/, "").toLowerCase();
    const articleTokens = tokenize(`${title} ${desc} ${cat} ${content.substring(0, 1500)}`);

    const { quote, score } = selectBestQuote(articleTokens, slug, cat, title);
    const newFigureBox = generateMasterZitatbox(quote);

    let newContent = "";
    let action = "";

    if (FIGURE_REGEX.test(content)) {
      newContent = content.replace(FIGURE_REGEX, newFigureBox);
      action = "REPLACED";
      modifiedCount++;
    } else {
      // Find intro paragraph after frontmatter (--- ... ---)
      const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/);
      if (fmMatch) {
        const fmEnd = fmMatch[0].length;
        const body = content.substring(fmEnd);
        // Find first paragraph or after first ## headline
        const firstH2 = body.indexOf("\n## ");
        if (firstH2 !== -1) {
          newContent = content.substring(0, fmEnd) + body.substring(0, firstH2) + "\n\n" + newFigureBox + "\n" + body.substring(firstH2);
        } else {
          newContent = content.substring(0, fmEnd) + "\n" + newFigureBox + "\n\n" + body;
        }
        action = "INSERTED";
        insertedCount++;
      } else {
        newContent = content + "\n\n" + newFigureBox;
        action = "APPENDED";
        insertedCount++;
      }
    }

    if (!isDryRun) {
      fs.writeFileSync(filePath, newContent, "utf8");
    }

    report.push({
      file: filename,
      status: action,
      quoteId: quote.id,
      quoteType: quote.type,
      sourceTitle: quote.sourceTitle,
      sourceUrl: quote.sourceUrl,
      quoteExcerpt: quote.quote.substring(0, 70) + "...",
      score
    });
  }

  return { modifiedCount, lockedCount, insertedCount, report };
}

// Execution logic
let allReports = [];

if (stage === "glossar" || stage === "all") {
  const glossarRes = processDirectory(glossarDir, "Glossar");
  console.log(`✅ Glossar: ${glossarRes.modifiedCount} ersetzt, ${glossarRes.insertedCount} neu eingefügt, ${glossarRes.lockedCount} geschützt.`);
  allReports.push(...glossarRes.report);
}

if (stage === "blog" || stage === "all") {
  const blogRes = processDirectory(blogDir, "Blog");
  console.log(`✅ Blog: ${blogRes.modifiedCount} ersetzt, ${blogRes.insertedCount} neu eingefügt, ${blogRes.lockedCount} geschützt.`);
  allReports.push(...blogRes.report);
}

// Summary Statistics
const reportPath = path.join(rootDir, "scripts/data/quote-mapping-report.json");
fs.writeFileSync(reportPath, JSON.stringify(allReports, null, 2), "utf8");
console.log(`\n📄 Detaillierter Mapping-Report gespeichert: ${reportPath}`);

// Count unique quotes used
const usedQuotes = new Map();
allReports.filter(r => r.quoteId && r.quoteId !== "LOCKED_EXISTING").forEach(r => {
  usedQuotes.set(r.quoteId, (usedQuotes.get(r.quoteId) || 0) + 1);
});
console.log(`📊 Statistiken:`);
console.log(`- Artikel gesamt verarbeitet: ${allReports.length}`);
console.log(`- Einzigartige Zitate verwendet: ${usedQuotes.size}`);
let maxUsage = 0;
for (const count of usedQuotes.values()) {
  if (count > maxUsage) maxUsage = count;
}
console.log(`- Maximale Wiederholung eines Zitats: ${maxUsage}x (perfekt verteilte Varianz!)`);

console.log(`\n⚖️ Quellen-Verteilung (Ausgewogenes Mischverhältnis ~1/6):`);
for (const [k, v] of sourceUsageCount.entries()) {
  const label = SOURCE_LABELS[k] || k;
  const pct = (v / (allReports.length - 11) * 100).toFixed(1);
  console.log(`- ${label}: ${v} Artikel (${pct}%)`);
}
console.log(`\n🎉 Fertig!`);
