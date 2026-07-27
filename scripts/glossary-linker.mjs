import fs from 'node:fs';
import path from 'node:path';

const GLOSSAR_DIR = './src/content/glossar';
const BLOG_DIR = './src/content/blog';
const DIST_DIR = './dist';

// 1. Load Glossary Terms
function loadGlossary() {
  const terms = [];
  const files = fs.readdirSync(GLOSSAR_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(GLOSSAR_DIR, file), 'utf-8');
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    const descMatch = content.match(/description:\s*['"](.*?)['"]/);
    const slug = file.replace(/\.mdx?$/, '');
    
    if (titleMatch) {
      const catMatch = content.match(/category:\s*['"](.*?)['"]/);
      terms.push({
        title: titleMatch[1],
        description: descMatch ? descMatch[1] : '',
        slug: slug,
        type: 'glossar',
        category: catMatch ? catMatch[1] : 'Glossar'
      });
    }
  }
  return terms;
}

// 2. Load Blog Posts
function loadBlog() {
  const posts = [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    const descMatch = content.match(/description:\s*['"](.*?)['"]/);
    const slug = file.replace(/\.mdx?$/, '');
    
    if (titleMatch) {
      const catMatch = content.match(/category:\s*['"](.*?)['"]/);
      posts.push({
        title: titleMatch[1].replace(/[:"]/g, ''), // Clean title for matching
        description: descMatch ? descMatch[1] : '',
        slug: slug,
        type: 'blog',
        category: catMatch ? catMatch[1] : 'Blog'
      });
    }
  }
  return posts;
}

// 3. Process HTML Files
function processDirectory(dir, allTerms, ringTerms) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath, allTerms, ringTerms);
    } else if (item.endsWith('.html')) {
      linkHtml(fullPath, allTerms, ringTerms);
    }
  }
}

function linkHtml(filePath, allTerms, ringTerms) {
  const absolutePath = path.resolve(filePath);
  // Get the parent directory name, which is the actual slug for Astro's index.html files
  let currentSlug = path.basename(filePath, '.html');
  if (currentSlug === 'index') {
    currentSlug = path.basename(path.dirname(filePath));
  }
  
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // Content areas to scan
  let startIdx = html.indexOf('id="blog-content"');
  if (startIdx === -1) {
    startIdx = html.indexOf('class="blog-content prose');
  }
  
  if (startIdx === -1) return;

  const startTagEnd = html.indexOf('>', startIdx);
  if (startTagEnd === -1) return;
  
  // Find the matching closing </div> by tracking depth
  let depth = 1;
  let currentIdx = startTagEnd + 1;
  while (depth > 0 && currentIdx < html.length) {
    const nextOpen = html.indexOf('<div', currentIdx);
    const nextClose = html.indexOf('</div', currentIdx);
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      currentIdx = nextOpen + 4;
    } else {
      depth--;
      currentIdx = nextClose + 6;
    }
  }
  
  const endDivIdx = currentIdx - 6;
  if (endDivIdx <= startTagEnd) return;

  let content = html.substring(startTagEnd + 1, endDivIdx);
  const originalContent = content;

  const glossaryMap = new Map();
  const patternParts = [];
  
  for (const term of allTerms) {
    // Skip if it's the current page
    if (currentSlug === term.slug) continue;
    if (filePath.includes(`/${term.type}/${term.slug}/`)) continue;
    
    // Exact title match (case insensitive)
    const escapedTitle = term.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    patternParts.push(escapedTitle);
    glossaryMap.set(term.title.toLowerCase(), term);
  }

  if (patternParts.length === 0) return;

  const unifiedRegex = new RegExp(`\\b(${patternParts.join('|')})\\b`, 'gi');
  let matchesCount = 0;
  const linkedTerms = new Set(); // Link each term only ONCE per page for better UX

  content = content.replace(unifiedRegex, (match, p1, offset) => {
    // Limit in-text links to maximum 5 per page
    if (matchesCount >= 5) return match;

    const term = glossaryMap.get(match.toLowerCase());
    if (!term || linkedTerms.has(term.slug)) return match;

    const upToMatch = content.substring(0, offset);
    
    // Safety checks
    const lastOpen = upToMatch.lastIndexOf('<');
    const lastClose = upToMatch.lastIndexOf('>');
    if (lastOpen > lastClose) return match;

    const lastAOpen = upToMatch.toLowerCase().lastIndexOf('<a');
    const lastAClose = upToMatch.toLowerCase().lastIndexOf('</a');
    if (lastAOpen > lastAClose) return match;

    const lastHOpen = upToMatch.toLowerCase().lastIndexOf('<h');
    const lastHClose = upToMatch.toLowerCase().lastIndexOf('</h');
    if (lastHOpen > lastHClose) {
        const headingTagMatch = upToMatch.substring(lastHOpen).match(/^<h[1-6]/i);
        if (headingTagMatch) return match;
    }

    matchesCount++;
    linkedTerms.add(term.slug);
    
    if (term.type === 'glossar') {
        return `<a href="/glossar/${term.slug}/" class="glossary-link" data-tooltip-title="${term.title}" data-tooltip-body="${term.description}">${match}</a>`;
    } else {
        return `<a href="/blog/${term.slug}/" class="internal-blog-link text-lime-600 underline decoration-lime-300 font-medium">${match}</a>`;
    }
  });
  
  // Add Guaranteed Ring-Topology Links (Verwandte Themen)
  const currentIndex = ringTerms.findIndex(t => t.slug === currentSlug);
  if (currentIndex !== -1) {
    let relatedHtml = `
      <div class="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
        <h3 class="text-xl font-bold mb-4">Weitere spannende Themen</h3>
        <ul class="space-y-2">
    `;
    
    // Pick 5 highly relevant items (next in category-sorted ring)
    for (let i = 1; i <= 5; i++) {
      const nextIndex = (currentIndex + i) % ringTerms.length;
      const t = ringTerms[nextIndex];
      const url = t.type === 'glossar' ? `/glossar/${t.slug}/` : `/blog/${t.slug}/`;
      relatedHtml += `<li><a href="${url}" class="text-lime-700 hover:text-lime-900 font-medium underline decoration-lime-300">${t.title}</a></li>`;
    }
    
    relatedHtml += `
        </ul>
      </div>
    `;
    content = content + relatedHtml;
  }

  if (content !== originalContent) {
    const newHtml = html.substring(0, startTagEnd + 1) + content + html.substring(endDivIdx);
    fs.writeFileSync(filePath, newHtml);
    console.log(`✅ Linked ${matchesCount} text items & 5 related topics in: ${filePath}`);
  }
}

console.log('🚀 Starting Intelligent Cross-Linking (Blog & Glossar)...');
const glossary = loadGlossary();
const blog = loadBlog();
const allTerms = [...glossary, ...blog].sort((a, b) => b.title.length - a.title.length);
// Sort ring mathematically by category first, then slug, ensuring "next items" are highly relevant
const ringTerms = [...glossary, ...blog].sort((a, b) => {
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category);
  }
  return a.slug.localeCompare(b.slug);
});

console.log(`📚 Loaded ${glossary.length} glossary terms and ${blog.length} blog posts.`);

if (fs.existsSync(DIST_DIR)) {
  processDirectory(DIST_DIR, allTerms, ringTerms);
  console.log('✨ Cross-Linking Complete!');
} else {
  console.error('❌ dist directory not found. Run build first.');
}
