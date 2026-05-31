import fs from 'fs';
import path from 'path';

const dir = 'src/content/glossar';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const categories = [
  { 
    name: 'Technisches SEO & UX', 
    terms: ["301-vs-302", "404-fehlerseiten", "core-web-vitals", "crawler", "crawl-budget", "google-search-console", "indexing", "log-file-analyse", "pagespeed", "redirect-chain", "robots-txt", "sitemap", "technisches-seo", "trailing-slashes", "usability", "website-relaunch", "website-seo-audit", "seo-audit", "strukturierte-daten", "technisches-schema-markup", "schema-org-markup", "faq-markup"] 
  },
  { 
    name: 'AI SEO & Generative Search', 
    terms: ["aeo", "ai-seo", "ai-tracking-tools", "chatgpt-seo", "geo", "geo-agentur", "geo-audit", "geo-freelancer", "geo-optimierung", "geo-vs-seo", "ki-seo-beratung", "ki-sichtbarkeit-messen-optimieren", "llmo", "llms-full-txt", "rag", "zero-click-content", "semantic-seo", "google-algorithmus", "google-core-update"] 
  },
  { 
    name: 'E-E-A-T & Offpage', 
    terms: ["authoritativeness-eeat", "backlink", "bing-webmastertools", "brand-mentions", "citation", "e-e-a-t", "expertise-eeat", "experience-eeat", "linkbuilding", "linkjuice", "nofollow-link", "trustworthiness-eeat", "zitierfaehiger-content"] 
  }
];

let updatedCount = 0;
const counts = {
  'Technisches SEO & UX': 0,
  'AI SEO & Generative Search': 0,
  'E-E-A-T & Offpage': 0,
  'SEO Basics & Onpage': 0
};

for (const file of files) {
  const slug = file.replace('.md', '');
  const filePath = path.join(dir, file);
  
  let targetCategory = 'SEO Basics & Onpage';
  for (const cat of categories) {
    if (cat.terms.includes(slug)) {
      targetCategory = cat.name;
      break;
    }
  }
  
  counts[targetCategory]++;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let inFrontmatter = false;
  let newLines = [];
  let categoryReplaced = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === '---') {
      if (i === 0) {
        inFrontmatter = true;
        newLines.push(line);
      } else if (inFrontmatter) {
        if (!categoryReplaced) {
          // If there was no category line, add it before closing
          newLines.push(`category: "${targetCategory}"`);
        }
        inFrontmatter = false;
        newLines.push(line);
      } else {
        newLines.push(line);
      }
    } else {
      if (inFrontmatter && line.startsWith('category:')) {
        newLines.push(`category: "${targetCategory}"`);
        categoryReplaced = true;
      } else {
        newLines.push(line);
      }
    }
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'));
  updatedCount++;
}

console.log(`Updated ${updatedCount} files.`);
console.log('New Distribution:', counts);
