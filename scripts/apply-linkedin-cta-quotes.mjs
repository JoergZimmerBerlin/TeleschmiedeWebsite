import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const quotesPath = path.join(rootDir, "src/data/joerg-quotes.json");
const glossarDir = path.join(rootDir, "src/content/glossar");

// 1. Load quotes
const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));

quotes.forEach((q, idx) => {
  q.id = idx;
  if (q.quote.startsWith("Zusammenfassend ist es wichtig")) {
    q.quote = q.quote.replace(/^Zusammenfassend ist es wichtig/, "Wichtig ist");
  }
  q.quote = q.quote.replace(/^[„"']+|[“"']+$/g, "").trim();
});

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function getThematicQuote(filename, title, cat, body) {
  const slug = filename.replace(/\.mdx?$/, "").toLowerCase();
  const lowerTitle = title.toLowerCase();

  // Tier 1: Exact 1:1 Special Matches
  if (slug.includes("youtube")) return quotes[33];
  if (slug === "markenaufbau-mit-seo" || slug === "brand-share" || slug === "brand-mentions" || slug === "mention" || slug === "citation") return quotes[90];
  if (slug === "rankingfaktoren") return quotes[76];
  if (slug === "seo-beratung") return quotes[91];
  if (slug === "301-vs-302" || slug === "trailing-slashes" || slug === "canonical-tag") return quotes[106];
  if (slug === "website-relaunch") return quotes[103];
  if (slug === "404-fehlerseiten") return quotes[85];
  if (slug === "google-search-console" || slug === "google-search-console-einrichtung") return quotes[20];
  if (slug.includes("search-console") || slug.includes("gsc")) return quotes[39];
  if (slug === "pagespeed" || slug === "core-web-vitals" || slug.includes("lcp") || slug.includes("inp") || slug.includes("cls")) return quotes[21];
  if (slug === "usability") return quotes[43];
  if (slug === "conversion-rate" || slug.includes("conversion") || slug.includes("cro")) return quotes[3];
  if (slug === "cpc") return quotes[10];
  if (slug === "traffic") return quotes[47];
  if (slug === "interne-verlinkung") return quotes[105];
  if (slug === "seo-agentur" || slug === "seo-consulting" || slug === "seo-coaching") return quotes[30];
  if (slug === "campixx-berlin" || slug === "seo-stammtisch-berlin" || slug === "ueberstunde-berlin") return quotes[15];
  if (slug === "freelancing") return quotes[0];
  if (slug.includes("se-ranking") || slug.includes("sistrix")) return quotes[4];
  if (slug === "seorch-ai-check") return quotes[80];
  if (slug.includes("visibility-index") || slug === "sichtbarkeitsindex" || slug === "sichtbarkeit") return quotes[89];
  if (slug === "sichtbarkeitsmanagement") return quotes[99];
  if (slug === "e-e-a-t" || slug.includes("eeat") || slug === "topical-authority") return quotes[64];
  if (slug === "keywoerter" || slug === "keywordrecherche" || slug === "money-keyword" || slug === "suchvolumen") return quotes[75];

  // Tier 2: Thematic Sub-Clusters
  if (/301|302|404|redirect|weiterleit|relaunch|statuscode|migration/.test(slug)) {
    const pool = [106, 85, 77, 103, 82, 18, 88, 109];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (/speed|perf|lcp|cls|inp|cwv|ladezeit|mobile|ttfb|hydration|responsive|ux/.test(slug)) {
    const pool = [21, 6, 43, 51, 79, 96, 8];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (/index|crawl|sitemap|robots|technisch|schema|markup|dns|orphan|verlink|budget|render|crawler|bot|ssr|ssg|firewall|link-header/.test(slug)) {
    const pool = [100, 9, 39, 20, 81, 102, 34, 83];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (/tool|track|analyt|daten|kpi|audit|radar|messung|metrik/.test(slug) || lowerTitle.includes("tool") || lowerTitle.includes("tracker") || lowerTitle.includes("audit")) {
    const pool = [4, 80, 108, 1, 42, 50, 52, 67, 89];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (cat === "E-E-A-T & Offpage" || /brand|marke|entit|knowledge-graph|wikidata|e-e-a-t|vertrau|reputat|backlink|linkbuild|offpage|autorit|citation|mention|experience|expertise|author/.test(slug)) {
    const pool = [12, 25, 90, 64, 76, 2, 89];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (/content|intent|suchintention|keyword|suchwort|suchbegriff|helpful|text|pillar|cluster|wording|onpage/.test(slug) || cat === "SEO Basics & Onpage") {
    const pool = [24, 49, 66, 69, 97, 75];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (/conversion|cro|lead|umsatz|verkäuf|business|kunde|cta|ecommerce|shop|checkout|roi/.test(slug)) {
    const pool = [3, 8, 28, 54, 63, 75];
    return quotes[pool[hash(slug) % pool.length]];
  }

  if (/protocol|protokoll|agent|card|auth|mcp|llms|schema|api/.test(slug)) {
    const pool = [37, 86, 99, 81, 84, 107];
    return quotes[pool[hash(slug) % pool.length]];
  }

  const pool = [37, 86, 99, 87, 107, 41, 81, 84, 5, 23, 70, 71, 78, 105, 110];
  return quotes[pool[hash(slug) % pool.length]];
}

const files = fs.readdirSync(glossarDir).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
console.log("🚀 Starte LinkedIn CTA Quote Injection fuer " + files.length + " Glossar-Dateien...\n");

let updatedCount = 0;
const report = [];

for (const file of files) {
  const filePath = path.join(glossarDir, file);
  const content = fs.readFileSync(filePath, "utf8");

  const mTitle = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = mTitle ? mTitle[1].trim() : file;
  const mCat = content.match(/category:\s*["']?([^"'\n]+)["']?/);
  const cat = mCat ? mCat[1].trim() : "";

  const matchedQuote = getThematicQuote(file, title, cat, content);

  const newCtaBox = `<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „${matchedQuote.quote}“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="${matchedQuote.url}" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>`;

  // Exact CTA box regex matching ONLY the CTA container (from my-8/10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md to </div>)
  const ctaRegex = /<div class="my-(?:8|10) bg-dark text-white p-8 rounded-3xl border border-white\/10 text-center shadow-md(?: not-prose)?">[\s\S]*?<\/div>/;

  if (ctaRegex.test(content)) {
    const updatedContent = content.replace(ctaRegex, newCtaBox);
    fs.writeFileSync(filePath, updatedContent, "utf8");
    updatedCount++;
    report.push({ file, quoteId: matchedQuote.id, quoteText: matchedQuote.quote.substring(0, 50) + "...", url: matchedQuote.url });
  } else {
    console.warn("⚠️ Konnte CTA-Box nicht matchen in: " + file);
  }
}

console.log("\n✅ Erfolgreich " + updatedCount + " von " + files.length + " Glossar-Dateien aktualisiert!");
