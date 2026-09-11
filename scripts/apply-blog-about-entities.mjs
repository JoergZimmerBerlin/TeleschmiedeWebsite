import fs from 'fs';
import path from 'path';

const dir = 'src/content/blog';

const blogEntities = {
  // 1. Tool- und Plattform-spezifische Artikel
  'rankscale-ai-visibility-tool.md': { name: 'Rankscale', sameAs: 'https://rankscale.ai/' },
  'rankscale-ai-visibility-tracking-17-llms.md': { name: 'Rankscale', sameAs: 'https://rankscale.ai/' },
  'rankscale-essentials-ai-tracking-einsteiger.md': { name: 'Rankscale', sameAs: 'https://rankscale.ai/' },
  'rankscale-update-agency-api-chatgpt.md': { name: 'Rankscale', sameAs: 'https://rankscale.ai/' },
  'se-ranking-agentur-10-gruende.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'se-ranking-ai-tracker.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'se-ranking-api-endpunkte-kompass.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'se-ranking-ki-sichtbarkeit.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'se-ranking-preise.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'se-ranking-test-2026.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'website-seo-audit-vibe-coding.md': { name: 'SE Ranking', sameAs: 'https://seranking.com/' },
  'seorch-ai-geo-check.md': { name: 'SEORCH', sameAs: 'https://seorch.de/' },
  'seorch-seo-tool-fanboy.md': { name: 'SEORCH', sameAs: 'https://seorch.de/' },
  'sistrix-podcast-entitaeten-mapping.md': { name: 'Sistrix', sameAs: 'https://www.wikidata.org/wiki/Q97199261' },
  'sistrix-vs-se-ranking.md': { name: 'Sistrix', sameAs: 'https://www.wikidata.org/wiki/Q97199261' },
  'tldv-meeting-notetaker-ki.md': { name: 'tl;dv', sameAs: 'https://tldv.io/' },
  'ms-clarity-session-campixx.md': { name: 'Microsoft Clarity', sameAs: 'https://clarity.microsoft.com/' },
  'ai-agent-weihnachtsgruesse-linkedin.md': { name: 'LinkedIn', sameAs: 'https://www.wikidata.org/wiki/Q213660' },

  // 2. Events, Konferenzen & Netzwerke
  'ai-connect-berlin-networking.md': { name: 'Google Gemini', sameAs: 'https://www.wikidata.org/wiki/Q123687351' },
  'freelance-unlocked-eis-erfolgreich.md': { name: 'Freelance Unlocked', sameAs: 'https://freelanceunlocked.com/' },
  'freelance-unlocked-eis.md': { name: 'Freelance Unlocked', sameAs: 'https://freelanceunlocked.com/' },
  'freelance-unlocked-lila-tshirts.md': { name: 'Freelance Unlocked', sameAs: 'https://freelanceunlocked.com/' },
  'freelancer-team-omr-hamburg.md': { name: 'OMR Festival', sameAs: 'https://www.wikidata.org/wiki/Q28869871' },
  'freelancer-team-spirit-events.md': { name: 'Freelancer', sameAs: 'https://www.wikidata.org/wiki/Q45162' },
  'omr-2026-mission-freelancer-team.md': { name: 'OMR Festival', sameAs: 'https://www.wikidata.org/wiki/Q28869871' },
  'omr-freelancer-stand-roi.md': { name: 'OMR Festival', sameAs: 'https://www.wikidata.org/wiki/Q28869871' },
  'stefan-godulla-campixx.md': { name: 'CAMPIXX', sameAs: 'https://www.campixx.de/' },
  'malte-landwehr-ai-search-content-formate.md': { name: 'CAMPIXX', sameAs: 'https://www.campixx.de/' },
  'doenerback-und-motivation.md': { name: 'Freelancer', sameAs: 'https://www.wikidata.org/wiki/Q45162' },

  // 3. Podcasts & Interviews
  'bist-du-seo-ai-ready-podcast.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'magic-writing-podcast-seo-ist-tot.md': { name: 'Magic Writing', sameAs: 'https://magicwriting.io/' },
  'seopresso-podcast-maximilian-muhr.md': { name: 'SEOpresso', sameAs: 'https://seopresso.de/' },
  'seopresso-seo-persoenlich-interview.md': { name: 'SEOpresso', sameAs: 'https://seopresso.de/' },

  // 4. KI-Search, GEO & Tech SEO
  'ai-crawlability-tech-seo-disziplin.md': { name: 'Artificial Intelligence', sameAs: 'https://www.wikidata.org/wiki/Q11660' },
  'ai-crawler-sind-dumm-markdown.md': { name: 'Cloudflare', sameAs: 'https://www.wikidata.org/wiki/Q1102690' },
  'ai-generierte-website-kennzeichnung.md': { name: 'Artificial Intelligence Act', sameAs: 'https://www.wikidata.org/wiki/Q106596160' },
  'ai-geo-sichtbarkeit-umfrage.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'ai-seo-geo-praktikanten.md': { name: 'Artificial Intelligence', sameAs: 'https://www.wikidata.org/wiki/Q11660' },
  'beste-seo-tools-ai-search-prompt-tracking.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'generative-engine-optimization-geo.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'geo-action-plan-llm-sichtbarkeit.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'geo-seo-agentic-eigene-disziplin.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'geo-seo-ai-seo-llmo-umfrage.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'geo-seo-jahreszahl.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'geo-und-ai-search-neues-spiel.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'grounding-page-generator-ai-seo.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'ich-befinde-mich-in-der-geo-transformation.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'ki-website-leuchtturm.md': { name: 'Artificial Intelligence', sameAs: 'https://www.wikidata.org/wiki/Q11660' },
  'liebe-bots-crawler-agenten.md': { name: 'Web crawler', sameAs: 'https://www.wikidata.org/wiki/Q45127' },
  'reines-seo-vs-geo.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'seo-wird-groesser-geo-welle.md': { name: 'Generative Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q134083964' },
  'top-9-ai-visibility-tools.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  '_idee-bestes-tracking-system-ki-sichtbarkeit.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },

  // 5. SEO-Praxis, Sprechstunde & Consulting
  '24-jahre-seo-gleiche-fehler.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  '80-prozent-seo-fehler-sprechstunde.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'digitaler-unternehmensberater-statt-seo.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'einfachste-seo-verhaeltnisse.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'highlights-2025-jahresrueckblick.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'seo-feuerwehr-rettung.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'seo-relaunch-klassiker-meme.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'seo-sprechstunde-bewertung-ronny.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'seo-sprechstunde-erklaert.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'seo-sprechstunde-never-code-alone.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'seo-sprechstunde-so-laeuft-sie-ab.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'transparente-seo-preise-erfahrung.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'willkommen-seo-jahr-2026.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'wir-seos-sind-schuld-community.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'wir-seos-zusammenhalt.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' },
  'zwei-stunden-seo-potential.md': { name: 'Search Engine Optimization', sameAs: 'https://www.wikidata.org/wiki/Q180711' }
};

let updatedCount = 0;

for (const [filename, entity] of Object.entries(blogEntities)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if about_entity already exists
  if (/^about_entity:/m.test(content)) {
    continue;
  }

  const block = `about_entity:\n  name: "${entity.name}"\n  sameAs: "${entity.sameAs}"\n`;

  // Inject before key_takeaways if present, or before date, or before ---
  if (/^key_takeaways:/m.test(content)) {
    content = content.replace(/^key_takeaways:/m, `${block}key_takeaways:`);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else if (/^tags:/m.test(content)) {
    content = content.replace(/^(tags:.*$)/m, `$1\n${block}`);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else if (/^category:/m.test(content)) {
    content = content.replace(/^(category:.*$)/m, `$1\n${block}`);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else {
    // Fallback inject right after first ---
    content = content.replace(/^---\n/, `---\n${block}`);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  }
}

console.log(`✅ Successfully injected about_entity into ${updatedCount} blog files.`);
