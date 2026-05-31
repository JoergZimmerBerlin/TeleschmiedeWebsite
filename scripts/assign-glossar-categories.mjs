import fs from 'fs';
import path from 'path';

const dir = 'src/content/glossar';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

// Explicit mapping
const categories = {
  // 1. SEO Basics & Onpage
  'h1-h2-h3.md': 'SEO Basics & Onpage',
  'keywordrecherche.md': 'SEO Basics & Onpage',
  'keywoerter.md': 'SEO Basics & Onpage',
  'keyword-tool.md': 'SEO Basics & Onpage',
  'money-keyword.md': 'SEO Basics & Onpage',
  'meta-description.md': 'SEO Basics & Onpage',
  'title-tag.md': 'SEO Basics & Onpage',
  'snippet-optimierung.md': 'SEO Basics & Onpage',
  'strukturierte-daten.md': 'SEO Basics & Onpage',
  'schema-org-markup.md': 'SEO Basics & Onpage',
  'faq-markup.md': 'SEO Basics & Onpage',
  'technisches-schema-markup.md': 'SEO Basics & Onpage',
  'semantic-seo.md': 'SEO Basics & Onpage',
  'local-seo.md': 'SEO Basics & Onpage',
  'wordpress-seo.md': 'SEO Basics & Onpage',
  'seo-agentur.md': 'SEO Basics & Onpage',
  'seo-beratung.md': 'SEO Basics & Onpage',
  'seo-consulting.md': 'SEO Basics & Onpage',
  'seo-coaching.md': 'SEO Basics & Onpage',
  'seo-audit.md': 'SEO Basics & Onpage',
  'website-seo-audit.md': 'SEO Basics & Onpage',
  'website-relaunch.md': 'SEO Basics & Onpage',
  'sichtbarkeit.md': 'SEO Basics & Onpage',
  'sichtbarkeitsindex.md': 'SEO Basics & Onpage',
  'sichtbarkeitsmanagement.md': 'SEO Basics & Onpage',
  'rankingfaktoren.md': 'SEO Basics & Onpage',
  'google-algorithmus.md': 'SEO Basics & Onpage',
  'google-core-update.md': 'SEO Basics & Onpage',
  'cpc.md': 'SEO Basics & Onpage',
  'ctr.md': 'SEO Basics & Onpage',
  'conversion-rate.md': 'SEO Basics & Onpage',
  'suchvolumen.md': 'SEO Basics & Onpage',
  'traffic.md': 'SEO Basics & Onpage',

  // 2. Technisches SEO & UX
  'technisches-seo.md': 'Technisches SEO & UX',
  'core-web-vitals.md': 'Technisches SEO & UX',
  'pagespeed.md': 'Technisches SEO & UX',
  'usability.md': 'Technisches SEO & UX',
  'crawling-vs-indexing.mdx': 'Technisches SEO & UX',
  'crawler.md': 'Technisches SEO & UX',
  'robots-txt.md': 'Technisches SEO & UX',
  'sitemap.md': 'Technisches SEO & UX',
  'canonical-tag.md': 'Technisches SEO & UX',
  'noindex.md': 'Technisches SEO & UX',
  '301-vs-302.md': 'Technisches SEO & UX',
  '404-fehlerseiten.md': 'Technisches SEO & UX',
  'trailing-slashes.md': 'Technisches SEO & UX',
  'google-search-console.md': 'Technisches SEO & UX',
  'bing-webmastertools.md': 'Technisches SEO & UX',

  // 3. AI SEO & Generative Search
  'geo.md': 'AI SEO & Generative Search',
  'geo-vs-seo.md': 'AI SEO & Generative Search',
  'geo-optimierung.md': 'AI SEO & Generative Search',
  'geo-agentur.md': 'AI SEO & Generative Search',
  'geo-freelancer.md': 'AI SEO & Generative Search',
  'geo-audit.md': 'AI SEO & Generative Search',
  'ai-seo.md': 'AI SEO & Generative Search',
  'ki-seo-beratung.md': 'AI SEO & Generative Search',
  'ki-sichtbarkeit-messen-optimieren.md': 'AI SEO & Generative Search',
  'ai-tracking-tools.md': 'AI SEO & Generative Search',
  'chatgpt-seo.md': 'AI SEO & Generative Search',
  'llmo.md': 'AI SEO & Generative Search',
  'llms-txt.md': 'AI SEO & Generative Search',
  'llms-full-txt.md': 'AI SEO & Generative Search',
  'aeo.md': 'AI SEO & Generative Search',
  'rag.md': 'AI SEO & Generative Search',
  'zero-click-content.md': 'AI SEO & Generative Search',
  'grounding-page.md': 'AI SEO & Generative Search',

  // 4. E-E-A-T & Offpage
  'e-e-a-t.md': 'E-E-A-T & Offpage',
  'experience-eeat.md': 'E-E-A-T & Offpage',
  'expertise-eeat.md': 'E-E-A-T & Offpage',
  'authoritativeness-eeat.md': 'E-E-A-T & Offpage',
  'trustworthiness-eeat.md': 'E-E-A-T & Offpage',
  'entitaet.md': 'E-E-A-T & Offpage',
  'entity-seo.md': 'E-E-A-T & Offpage',
  'entitaeten-building.md': 'E-E-A-T & Offpage',
  'knowledge-graph.md': 'E-E-A-T & Offpage',
  'markenaufbau-mit-seo.md': 'E-E-A-T & Offpage',
  'zitierfaehiger-content.md': 'E-E-A-T & Offpage',
  'brand-mentions.md': 'E-E-A-T & Offpage',
  'mention.md': 'E-E-A-T & Offpage',
  'citation.md': 'E-E-A-T & Offpage',
  'linkbuilding.md': 'E-E-A-T & Offpage',
  'interne-verlinkung.md': 'E-E-A-T & Offpage',
  'linkjuice.md': 'E-E-A-T & Offpage',
  'pressearbeit-im-seo.md': 'E-E-A-T & Offpage',
  'campixx-berlin.md': 'E-E-A-T & Offpage',
  'seo-stammtisch-berlin.md': 'E-E-A-T & Offpage',
  'ueberstunde-berlin.md': 'E-E-A-T & Offpage'
};

let fallbackCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const cat = categories[file] || 'SEO Basics & Onpage';
  
  if (content.match(/category:\s*".*?"/)) {
    content = content.replace(/category:\s*".*?"/, `category: "${cat}"`);
  } else if (content.match(/category:\s*'.*?'/)) {
    content = content.replace(/category:\s*'.*?'/, `category: "${cat}"`);
  } else {
    // Inject right after the very first line which should be ---
    content = content.replace(/^---\n/, `---\ncategory: "${cat}"\n`);
  }
  
  fs.writeFileSync(filePath, content);
}
