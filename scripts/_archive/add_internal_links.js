const fs = require('fs');
const path = require('path');

const dir = '/Users/jorti/Documents/Antigravity/src/content/blog';

// Definition der hinzuzufügenden Links pro Artikel
const mappings = {
  '24-jahre-seo-gleiche-fehler.md': [
    { title: 'GEO, SEO, AI-SEO oder LLMO? Die Community hat abgestimmt', slug: 'geo-seo-ai-seo-llmo-umfrage' },
    { title: 'Die SEO-Sprechstunde einfach erklärt: Website & Sichtbarkeit auf den Grill', slug: 'seo-sprechstunde-erklaert' }
  ],
  'ai-agent-weihnachtsgruesse-linkedin.md': [
    { title: 'GEO, AIO, AI-SEO: Warum ihr bitte NICHT den Praktikanten dransetzen solltet', slug: 'ai-seo-geo-praktikanten' },
    { title: 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', slug: 'se-ranking-ai-tracker' }
  ],
  'ai-seo-geo-praktikanten.md': [
    { title: 'Wenn AI-Agenten deinen LinkedIn-Feed kapern', slug: 'ai-agent-weihnachtsgruesse-linkedin' },
    { title: 'Rankscale AI Visibility Tool: 17 LLMs für 99€ tracken', slug: 'rankscale-ai-visibility-tracking-17-llms' }
  ],
  'bist-du-seo-ai-ready-podcast.md': [
    { title: 'SEOpresso Podcast: Meine Empfehlung mit Max Muhr', slug: 'seopresso-podcast-maximilian-muhr' },
    { title: 'SEO Persönlich: Mein Interview im SEOpresso Podcast', slug: 'seopresso-seo-persoenlich-interview' }
  ],
  'core-web-vitals-ux-bericht.md': [
    { title: 'PageSpeed 100/100: So wurde diese Website blitzschnell', slug: 'pagespeed-100-seo-optimierung' },
    { title: '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', slug: '24-jahre-seo-gleiche-fehler' }
  ],
  'geo-seo-ai-seo-llmo-umfrage.md': [
    { title: 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', slug: 'rankscale-ai-visibility-tool' },
    { title: 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', slug: 'se-ranking-ai-tracker' }
  ],
  'google-ads-support-seo-nicht-tot.md': [
    { title: 'SEO ist tot? Magic Writing Podcast mit Michael Kaufhold', slug: 'magic-writing-podcast-seo-ist-tot' },
    { title: '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', slug: '24-jahre-seo-gleiche-fehler' }
  ],
  'highlights-2025-jahresrueckblick.md': [
    { title: 'SEO Persönlich: Mein Interview im SEOpresso Podcast', slug: 'seopresso-seo-persoenlich-interview' },
    { title: '5 Sterne: Was Kunden über die SEO-Sprechstunde sagen', slug: 'seo-sprechstunde-bewertung-ronny' }
  ],
  'magic-writing-podcast-seo-ist-tot.md': [
    { title: 'Bist du SEO AI Ready? Podcast mit Antonio Blago', slug: 'bist-du-seo-ai-ready-podcast' },
    { title: 'Der Google Ads Support ist nicht dein Freund - und SEO ist nicht tot', slug: 'google-ads-support-seo-nicht-tot' }
  ],
  'pagespeed-100-seo-optimierung.md': [
    { title: 'Core Web Vitals: Warum dein UX-Bericht wichtiger ist als du denkst', slug: 'core-web-vitals-ux-bericht' },
    { title: '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', slug: '24-jahre-seo-gleiche-fehler' }
  ],
  'rankscale-ai-visibility-tool.md': [
    { title: 'Rankscale AI Visibility Tool: 17 LLMs für 99€ tracken', slug: 'rankscale-ai-visibility-tracking-17-llms' },
    { title: 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', slug: 'se-ranking-ai-tracker' }
  ],
  'rankscale-ai-visibility-tracking-17-llms.md': [
    { title: 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', slug: 'rankscale-ai-visibility-tool' },
    { title: 'GEO, SEO, AI-SEO oder LLMO? Die Community hat abgestimmt', slug: 'geo-seo-ai-seo-llmo-umfrage' }
  ],
  'se-ranking-ai-tracker.md': [
    { title: 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', slug: 'rankscale-ai-visibility-tool' },
    { title: 'GEO, AIO, AI-SEO: Warum ihr bitte NICHT den Praktikanten dransetzen solltet', slug: 'ai-seo-geo-praktikanten' }
  ],
  'seo-sprechstunde-bewertung-ronny.md': [
    { title: 'Die SEO-Sprechstunde einfach erklärt: Website & Sichtbarkeit auf den Grill', slug: 'seo-sprechstunde-erklaert' },
    { title: 'Wie läuft so eine SEO-Sprechstunde ab?', slug: 'seo-sprechstunde-so-laeuft-sie-ab' }
  ],
  'seo-sprechstunde-erklaert.md': [
    { title: 'Wie läuft so eine SEO-Sprechstunde ab?', slug: 'seo-sprechstunde-so-laeuft-sie-ab' },
    { title: '5 Sterne: Was Kunden über die SEO-Sprechstunde sagen', slug: 'seo-sprechstunde-bewertung-ronny' }
  ],
  'seo-sprechstunde-so-laeuft-sie-ab.md': [
    { title: 'Die SEO-Sprechstunde einfach erklärt: Website & Sichtbarkeit auf den Grill', slug: 'seo-sprechstunde-erklaert' },
    { title: '5 Sterne: Was Kunden über die SEO-Sprechstunde sagen', slug: 'seo-sprechstunde-bewertung-ronny' }
  ],
  'seopresso-podcast-maximilian-muhr.md': [
    { title: 'SEO Persönlich: Mein Interview im SEOpresso Podcast', slug: 'seopresso-seo-persoenlich-interview' },
    { title: 'Bist du SEO AI Ready? Podcast mit Antonio Blago', slug: 'bist-du-seo-ai-ready-podcast' }
  ],
  'seopresso-seo-persoenlich-interview.md': [
    { title: 'SEOpresso Podcast: Meine Empfehlung mit Max Muhr', slug: 'seopresso-podcast-maximilian-muhr' },
    { title: 'Highlights 2025 - Ein SEO-Jahresrückblick', slug: 'highlights-2025-jahresrueckblick' }
  ]
};

const blockRegex = /### Weiterführende Artikel/;

for (const [filename, links] of Object.entries(mappings)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filename}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (blockRegex.test(content)) {
     console.log(`Links already exist in ${filename}, skipping.`);
     continue;
  }
  
  content = content.trimEnd();

  let linkBlock = `\n\n### Weiterführende Artikel\n`;
  for(let i=0; i<links.length; i++) {
     linkBlock += `* **Lese-Tipp:** [${links[i].title}](/blog/${links[i].slug}/)\n`;
  }
  
  const hrIndex = content.lastIndexOf('\n---');
  if (hrIndex !== -1 && hrIndex > content.length - 200) {
     content = content.slice(0, hrIndex) + linkBlock + content.slice(hrIndex);
  } else {
     content = content + linkBlock;
  }
  
  fs.writeFileSync(filePath, content + '\n');
  console.log(`Updated ${filename}`);
}
