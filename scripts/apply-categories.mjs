import fs from 'fs';
import path from 'path';

const dir = 'src/content/glossar';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const categories = [
  { name: 'SEO Basics & Onpage', terms: ["301-vs-302", "404-fehlerseiten", "alt-attribut", "b2b-seo", "breadcrumb", "canonical-tag", "content-audit", "content-marketing", "cornerstone-content", "duplicate-content", "evergreen-content", "faq-snippet", "h1-tag", "holistischer-content", "html-sitemap", "interne-verlinkung", "keyword-cluster", "keyword-dichte", "keyword-kannibalismus", "keyword-mapping", "keyword-tool", "keywordrecherche", "landingpage", "long-tail-keywords", "meta-description", "money-keyword", "seo-audit", "seo-text", "snippet-optimierung", "suchintention", "suchvolumen", "title-tag", "seo-basics-onpage"] },
  { name: 'Technisches SEO & UX', terms: ["core-web-vitals", "crawler", "crawl-budget", "google-search-console", "indexing", "log-file-analyse", "pagespeed", "redirect-chain", "robots-txt", "schema-org-markup", "sichtbarkeit", "sichtbarkeitsindex", "sichtbarkeitsmanagement", "sitemap", "technisches-seo", "trailing-slashes", "usability", "website-relaunch", "website-seo-audit", "strukturierte-daten", "technisches-schema-markup"] },
  { name: 'AI SEO & Generative Search', terms: ["aeo", "ai-seo", "ai-tracking-tools", "chatgpt-seo", "conversion-rate", "cpc", "ctr", "geo", "geo-agentur", "geo-audit", "geo-freelancer", "geo-optimierung", "geo-vs-seo", "ki-seo-beratung", "ki-sichtbarkeit-messen-optimieren", "llmo", "llms-full-txt", "rag", "zero-click-content"] },
  { name: 'E-E-A-T & Offpage', terms: ["authoritativeness-eeat", "backlink", "bing-webmastertools", "brand-mentions", "campixx-berlin", "citation", "e-e-a-t", "expertise-eeat", "experience-eeat", "google-core-update", "linkbuilding", "linkjuice", "local-seo", "rankingfaktoren", "trustworthiness-eeat", "ueberstunde-berlin", "wordpress-seo", "zitierfaehiger-content", "nofollow-link"] }
];

let updatedCount = 0;

for (const file of files) {
  const slug = file.replace('.md', '');
  const filePath = path.join(dir, file);
  
  let targetCategory = '';
  for (const cat of categories) {
    if (cat.terms.includes(slug)) {
      targetCategory = cat.name;
      break;
    }
  }
  
  if (!targetCategory) {
    targetCategory = 'SEO Basics & Onpage'; // fallback
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if category is already there
  if (!content.includes('category:')) {
    // Insert category after the first frontmatter block
    // Find the end of frontmatter (second ---)
    const parts = content.split('---');
    if (parts.length >= 3) {
      const frontmatter = parts[1];
      const newFrontmatter = frontmatter.trim() + `\ncategory: "${targetCategory}"\n`;
      const newContent = `---
${newFrontmatter}
---${parts.slice(2).join('---')}`;
      fs.writeFileSync(filePath, newContent);
      updatedCount++;
    }
  }
}

console.log(`Updated ${updatedCount} files.`);
