import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const GLOSSAR_DIR = './src/content/glossar';
const BLOG_DIR = './src/content/blog';
const DIST_DIR = './dist';

// 1. Money Pages (Prio 1 für kommerziellen Linkjuice - STRIKT EXISTIERENDE ROUTEN)
const MONEY_PAGES = [
  {
    url: '/seo-sprechstunde/',
    terms: ['SEO-Sprechstunde', 'SEO Sprechstunde', 'SEO-Beratung', 'SEO Beratung'],
    title: 'SEO-Sprechstunde',
    type: 'service'
  },
  {
    url: '/leistungen/',
    terms: ['SEO Leistungen', 'SEO-Leistungen', 'SEO Dienstleistungen'],
    title: 'Leistungen',
    type: 'service'
  },
  {
    url: '/seo-freelancer-berlin/',
    terms: ['SEO Freelancer', 'SEO-Freelancer', 'SEO Freelancer Berlin', 'SEO Experte Berlin'],
    title: 'SEO Freelancer Berlin',
    type: 'service'
  },
  {
    url: '/google-ads-freelancer-berlin/',
    terms: ['Google Ads Freelancer', 'Google Ads Beratung', 'SEA Freelancer'],
    title: 'Google Ads Freelancer Berlin',
    type: 'service'
  },
  {
    url: '/ueber-mich/',
    terms: ['Jörg Zimmer'],
    title: 'Über Jörg Zimmer',
    type: 'service'
  },
  {
    url: '/tools/',
    terms: ['SEO-Tools', 'SEO Tools'],
    title: 'SEO Tools',
    type: 'service'
  },
  {
    url: '/tools/seo-tool-kostenrechner/',
    terms: ['SEO-Tool Kostenrechner', 'SEO Tool Kostenrechner', 'Tool-Kostenrechner'],
    title: 'SEO-Tool Kostenrechner',
    type: 'service'
  },
  {
    url: '/tools/groundingpage-generator/',
    terms: ['Grounding Page Generator', 'Groundingpage Generator'],
    title: 'Grounding Page Generator',
    type: 'service'
  },
  {
    url: '/freelancer-team/',
    terms: ['Freelancer Netzwerk', 'Freelancer-Team', 'Freelancer Team'],
    title: 'Freelancer Team',
    type: 'service'
  }
];

const STOPWORDS = new Set([
  'der','die','das','und','oder','ein','eine','einer','eines','einem','einen',
  'für','mit','von','zu','in','im','den','dem','des','auf','ist','wie','was',
  'warum','wer','nicht','sie','ihr','wir','aus','bei','zur','zum','über','unter',
  'vor','nach','als','seo','jahr','2026','uns','sich','dass','wenn','so','auch'
]);

function getTokens(str) {
  return new Set(
    str.toLowerCase()
      .split(/[^a-z0-9äöüß]+/)
      .filter(t => t.length > 2 && !STOPWORDS.has(t))
  );
}

function getCluster(cat) {
  const c = (cat || '').toLowerCase();
  if (c.includes('ai') || c.includes('generative')) return 'ai';
  if (c.includes('tech') || c.includes('ux')) return 'tech';
  if (c.includes('offpage') || c.includes('e-e-a-t') || c.includes('event')) return 'offpage';
  return 'onpage';
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 2. Existenz-Prüfung aller real in dist/ gerenderten URLs
function getExistingRoutes(distDir) {
  const validRoutes = new Set();
  function scan(dir, baseRoute = '/') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scan(path.join(dir, entry.name), `${baseRoute}${entry.name}/`);
      } else if (entry.name === 'index.html') {
        validRoutes.add(baseRoute);
      } else if (entry.name.endsWith('.html')) {
        validRoutes.add(`${baseRoute}${entry.name.replace(/\.html$/, '')}/`);
      }
    }
  }
  if (fs.existsSync(distDir)) {
    scan(distDir);
  }
  return validRoutes;
}

// 3. Load Glossary
function loadGlossary(validRoutes) {
  const terms = [];
  const files = fs.readdirSync(GLOSSAR_DIR).filter(f => (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('_'));
  
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    const expectedRoute = `/glossar/${slug}/`;
    // Strikte Existenz-Prüfung: Route muss in dist/ existieren
    if (validRoutes && !validRoutes.has(expectedRoute)) {
      continue;
    }

    const content = fs.readFileSync(path.join(GLOSSAR_DIR, file), 'utf-8');
    const titleMatch = content.match(/^title:\s*(?:['"](.*?)['"]|(.*))$/m);
    const descMatch = content.match(/^description:\s*(?:['"](.*?)['"]|(.*))$/m);
    const catMatch = content.match(/^category:\s*(?:['"](.*?)['"]|(.*))$/m);
    const relMatch = content.match(/related_terms:\s*\[(.*?)\]/);
    const synMatch = content.match(/synonyms:\s*\[(.*?)\]/);
    
    if (titleMatch) {
      const fullTitle = (titleMatch[1] || titleMatch[2]).trim();
      const description = descMatch ? (descMatch[1] || descMatch[2]).trim() : '';
      const category = catMatch ? (catMatch[1] || catMatch[2]).trim() : 'Glossar';
      
      const related = relMatch 
        ? relMatch[1].split(',').map(s => s.replace(/['"\s]/g, '')).filter(Boolean)
        : [];
      const synonyms = synMatch
        ? synMatch[1].split(',').map(s => s.replace(/['"\s]/g, '')).filter(Boolean)
        : [];

      // Primärbegriff vor dem Doppelpunkt extrahieren
      let primaryKeyword = fullTitle;
      if (fullTitle.includes(':')) {
        primaryKeyword = fullTitle.split(':')[0].trim();
      }

      const rawTokenStr = `${slug.replace(/-/g, ' ')} ${fullTitle} ${synonyms.join(' ')}`;
      const tokens = getTokens(rawTokenStr);

      terms.push({
        primaryKeyword,
        fullTitle,
        description,
        slug,
        type: 'glossar',
        category,
        related,
        synonyms,
        tokens
      });
    }
  }
  return terms;
}

// 4. Load Blog
const GENERIC_BLOG_KEYWORDS = new Set(['idee', '5 sterne', 'tatü tata', 'quicktipp', 'linkedin', 'highlight', 'seo 2026']);

function loadBlog(validRoutes) {
  const posts = [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('_'));
  
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    const expectedRoute = `/blog/${slug}/`;
    // Strikte Existenz-Prüfung: Route muss in dist/ existieren
    if (validRoutes && !validRoutes.has(expectedRoute)) {
      continue;
    }

    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const titleMatch = content.match(/^title:\s*(?:['"](.*?)['"]|(.*))$/m);
    const descMatch = content.match(/^description:\s*(?:['"](.*?)['"]|(.*))$/m);
    const catMatch = content.match(/^category:\s*(?:['"](.*?)['"]|(.*))$/m);
    const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
    
    if (titleMatch) {
      const cleanTitle = (titleMatch[1] || titleMatch[2]).replace(/[:"]/g, '').trim();
      const description = descMatch ? (descMatch[1] || descMatch[2]).trim() : '';
      const category = catMatch ? (catMatch[1] || catMatch[2]).trim() : 'Blog';
      const related = tagsMatch
        ? tagsMatch[1].split(',').map(s => s.replace(/['"\s]/g, '')).filter(Boolean)
        : [];

      let primaryKeyword = cleanTitle;
      if (titleMatch[1].includes(':')) {
        primaryKeyword = titleMatch[1].split(':')[0].trim();
      }
      if (GENERIC_BLOG_KEYWORDS.has(primaryKeyword.toLowerCase()) || primaryKeyword.length < 5) {
        primaryKeyword = cleanTitle;
      }

      const rawTokenStr = `${slug.replace(/-/g, ' ')} ${cleanTitle} ${related.join(' ')}`;
      const tokens = getTokens(rawTokenStr);

      posts.push({
        primaryKeyword,
        fullTitle: cleanTitle,
        description,
        slug,
        type: 'blog',
        category,
        related,
        synonyms: [],
        tokens
      });
    }
  }
  return posts;
}

// 5. Thematische Relevanz & Graph-Balancing für "Weitere spannende Themen"
function buildThematicRecommendations(allItems, validRoutes) {
  const recommendationMap = new Map();
  
  // Deduplizieren nach Slug & Existenz-Prüfung
  const uniqueItemsMap = new Map();
  for (const it of allItems) {
    const route = it.type === 'glossar' ? `/glossar/${it.slug}/` : `/blog/${it.slug}/`;
    if (!validRoutes || validRoutes.has(route)) {
      if (!uniqueItemsMap.has(it.slug)) {
        uniqueItemsMap.set(it.slug, it);
      }
    }
  }
  const uniqueItems = Array.from(uniqueItemsMap.values());

  // Cluster bilden
  const clusters = {};
  uniqueItems.forEach(it => {
    const c = getCluster(it.category);
    if (!clusters[c]) clusters[c] = [];
    clusters[c].push(it);
  });

  function getSim(itemA, itemB) {
    let score = 0;
    if (itemA.category === itemB.category) score += 15;
    if (itemA.related.includes(itemB.slug)) score += 50;
    if (itemB.related.includes(itemA.slug)) score += 30;
    for (const t of itemA.tokens) {
      if (itemB.tokens.has(t)) score += 10;
    }
    return score;
  }

  for (const [cName, clusterItems] of Object.entries(clusters)) {
    if (clusterItems.length === 0) continue;

    // Nearest-Neighbor-Kette für maximal thematische Nähe
    const unvisited = new Set(clusterItems.map((_, i) => i));
    const chain = [];
    let curr = 0;
    chain.push(curr);
    unvisited.delete(curr);

    while (unvisited.size > 0) {
      let bestNext = null;
      let bestScore = -1;
      for (const cand of unvisited) {
        const s = getSim(clusterItems[curr], clusterItems[cand]);
        if (s > bestScore) {
          bestScore = s;
          bestNext = cand;
        }
      }
      chain.push(bestNext);
      unvisited.delete(bestNext);
      curr = bestNext;
    }

    const M = chain.length;
    for (let pos = 0; pos < M; pos++) {
      const srcItem = clusterItems[chain[pos]];
      const recs = [];
      for (let offset = 1; offset <= 7 && offset < M; offset++) {
        const targetItem = clusterItems[chain[(pos + offset) % M]];
        const targetRoute = targetItem.type === 'glossar' ? `/glossar/${targetItem.slug}/` : `/blog/${targetItem.slug}/`;
        if (validRoutes && !validRoutes.has(targetRoute)) continue;

        recs.push({
          slug: targetItem.slug,
          title: targetItem.fullTitle,
          type: targetItem.type
        });
      }
      recommendationMap.set(srcItem.slug, recs);
    }
  }

  return recommendationMap;
}

// 6. Suchbegriff-Matrix aufbauen (Prio 1: Services, Prio 2: Glossar, Prio 3: Blog)
function buildSearchTerms(glossary, blog, validRoutes) {
  const termMap = new Map();
  const patternList = [];

  // Prio 1: Money Pages (NUR echt existierende Routen!)
  for (const mp of MONEY_PAGES) {
    if (validRoutes && !validRoutes.has(mp.url)) {
      console.warn(`   ⚠️ Überspringe nicht-existierende Money-Page: ${mp.url}`);
      continue;
    }

    for (const term of mp.terms) {
      const lower = term.toLowerCase();
      if (!termMap.has(lower)) {
        termMap.set(lower, {
          termText: term,
          url: mp.url,
          title: mp.title,
          description: '',
          type: 'service',
          isMoneyPage: true
        });
        patternList.push(term);
      }
    }
  }

  // Prio 2: Glossar
  for (const g of glossary) {
    const route = `/glossar/${g.slug}/`;
    if (validRoutes && !validRoutes.has(route)) continue;

    const primaryLower = g.primaryKeyword.toLowerCase();
    if (!termMap.has(primaryLower) && g.primaryKeyword.length >= 3) {
      termMap.set(primaryLower, {
        termText: g.primaryKeyword,
        url: route,
        title: g.fullTitle,
        description: g.description,
        type: 'glossar',
        slug: g.slug,
        isMoneyPage: false
      });
      patternList.push(g.primaryKeyword);
    }

    for (const syn of g.synonyms) {
      const synLower = syn.toLowerCase();
      if (!termMap.has(synLower) && syn.length >= 4) {
        termMap.set(synLower, {
          termText: syn,
          url: route,
          title: g.fullTitle,
          description: g.description,
          type: 'glossar',
          slug: g.slug,
          isMoneyPage: false
        });
        patternList.push(syn);
      }
    }
  }

  // Prio 3: Blog
  for (const b of blog) {
    const route = `/blog/${b.slug}/`;
    if (validRoutes && !validRoutes.has(route)) continue;

    const pLower = b.primaryKeyword.toLowerCase();
    if (!termMap.has(pLower) && b.primaryKeyword.length >= 5) {
      termMap.set(pLower, {
        termText: b.primaryKeyword,
        url: route,
        title: b.fullTitle,
        description: b.description,
        type: 'blog',
        slug: b.slug,
        isMoneyPage: false
      });
      patternList.push(b.primaryKeyword);
    }
    
    const fullLower = b.fullTitle.toLowerCase();
    if (!termMap.has(fullLower) && b.fullTitle.length >= 10 && b.fullTitle !== b.primaryKeyword) {
      termMap.set(fullLower, {
        termText: b.fullTitle,
        url: route,
        title: b.fullTitle,
        description: b.description,
        type: 'blog',
        slug: b.slug,
        isMoneyPage: false
      });
      patternList.push(b.fullTitle);
    }
  }

  // Sortierung: Money Pages zuerst, danach längste Phrasen zuerst
  patternList.sort((a, b) => {
    const itemA = termMap.get(a.toLowerCase());
    const itemB = termMap.get(b.toLowerCase());
    if (itemA.isMoneyPage && !itemB.isMoneyPage) return -1;
    if (!itemA.isMoneyPage && itemB.isMoneyPage) return 1;
    return b.length - a.length;
  });

  const escapedPatterns = patternList.map(escapeRegExp);
  const unifiedRegex = new RegExp(`(?<![\\p{L}\\p{N}])(${escapedPatterns.join('|')})(?![\\p{L}\\p{N}])`, 'giu');

  return { termMap, unifiedRegex };
}

// 7. Wasserdichte Schutzzonen (DOM-Selektoren)
const PROTECTED_SELECTOR = 'a, h1, h2, h3, h4, h5, h6, figure, blockquote, cite, figcaption, pre, code, button, .not-prose, section, [class*="bg-dark"], [class*="bg-lime-50"], .roi-calculator, .download-card, .copy-agent-btn';

function collectTextNodes(node) {
  const nodes = [];
  for (const child of node.childNodes) {
    if (child.nodeType === 1) { // Element Node
      if (child.matches && child.matches(PROTECTED_SELECTOR)) {
        continue; // Komplette Schutzzone sofort überspringen!
      }
      nodes.push(...collectTextNodes(child));
    } else if (child.nodeType === 3) { // Text Node
      if (child.nodeValue && child.nodeValue.trim().length > 0) {
        nodes.push(child);
      }
    }
  }
  return nodes;
}

// 8. HTML verarbeiten
function linkHtml(filePath, termMap, unifiedRegex, recommendationMap, validRoutes) {
  let currentSlug = path.basename(filePath, '.html');
  if (currentSlug === 'index') {
    currentSlug = path.basename(path.dirname(filePath));
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // Nur Seiten mit Blog- oder Glossar-Fließtext bearbeiten
  const startIdx = html.indexOf('id="blog-content"');
  if (startIdx === -1) return;

  const startTagEnd = html.indexOf('>', startIdx);
  if (startTagEnd === -1) return;

  // Matching closing </div> ermitteln
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

  const contentHtml = html.substring(startTagEnd + 1, endDivIdx);
  const frag = JSDOM.fragment(contentHtml);
  const doc = frag.ownerDocument;

  // Eventuell vorhandene alte "Weitere spannende Themen"-Box entfernen (Idempotenz)
  const existingBoxes = frag.querySelectorAll('div.not-prose');
  for (const box of existingBoxes) {
    if (box.textContent.includes('Weitere spannende Themen')) {
      box.remove();
    }
  }

  // Bereits im Text vorhandene Links erfassen, um Doppellinks zu vermeiden
  const linkedUrls = new Set();
  const existingLinks = frag.querySelectorAll('a[href]');
  for (const a of existingLinks) {
    const href = a.getAttribute('href');
    if (href) {
      linkedUrls.add(href);
      linkedUrls.add(href.endsWith('/') ? href : href + '/');
    }
  }

  // In-Text-Links setzen (Maximal 5-7 pro Artikel)
  let matchesCount = 0;
  const textNodes = collectTextNodes(frag);

  for (const node of textNodes) {
    if (matchesCount >= 7) break;
    const text = node.nodeValue;
    unifiedRegex.lastIndex = 0;
    
    let match;
    while ((match = unifiedRegex.exec(text)) !== null && matchesCount < 7) {
      const matchedText = match[0];
      const term = termMap.get(matchedText.toLowerCase());
      
      if (!term) continue;
      // Strikte Existenz-Prüfung: Linkziel muss existieren!
      if (!validRoutes.has(term.url)) continue;
      if (linkedUrls.has(term.url)) continue;
      if (term.slug && term.slug === currentSlug) continue;
      if (term.url.includes(`/${currentSlug}/`)) continue;

      const matchIndex = match.index;
      const beforeText = text.substring(0, matchIndex);
      const afterText = text.substring(matchIndex + matchedText.length);

      const a = doc.createElement('a');
      a.href = term.url;
      if (term.type === 'service') {
        a.className = 'money-link font-bold text-lime-700 hover:underline decoration-lime-300';
      } else if (term.type === 'glossar') {
        a.className = 'glossary-link';
        a.setAttribute('data-tooltip-title', term.title);
        a.setAttribute('data-tooltip-body', term.description);
      } else {
        a.className = 'internal-blog-link text-lime-600 underline decoration-lime-300 font-medium';
      }
      a.textContent = matchedText;

      const parent = node.parentNode;
      if (parent) {
        if (beforeText) parent.insertBefore(doc.createTextNode(beforeText), node);
        parent.insertBefore(a, node);
        if (afterText) parent.insertBefore(doc.createTextNode(afterText), node);
        parent.removeChild(node);
      }

      matchesCount++;
      linkedUrls.add(term.url);
      break; // Weiter zum nächsten Textknoten
    }
  }

  // Thematische "Weitere spannende Themen"-Box injizieren
  const recs = recommendationMap.get(currentSlug);
  if (recs && recs.length > 0) {
    const boxDiv = doc.createElement('div');
    boxDiv.className = 'mt-12 p-6 bg-gray-50 border border-gray-100 rounded-2xl not-prose';
    
    const h3 = doc.createElement('h3');
    h3.className = 'text-xl font-bold text-dark mb-4 !mt-0 !border-none !pb-0';
    h3.textContent = 'Weitere spannende Themen';
    boxDiv.appendChild(h3);

    const ul = doc.createElement('ul');
    ul.className = 'space-y-2 !pl-0 !list-none m-0';

    for (const r of recs) {
      const rUrl = r.type === 'glossar' ? `/glossar/${r.slug}/` : `/blog/${r.slug}/`;
      // Strikte Existenz-Prüfung für die Box!
      if (!validRoutes.has(rUrl)) continue;

      const li = doc.createElement('li');
      li.className = 'm-0 p-0';
      const a = doc.createElement('a');
      a.href = rUrl;
      a.className = 'text-lime-700 hover:text-lime-900 font-medium underline decoration-lime-300';
      a.textContent = r.title;
      li.appendChild(a);
      ul.appendChild(li);
    }
    boxDiv.appendChild(ul);
    frag.appendChild(boxDiv);
  }

  // Serialisieren
  const tempWrapper = doc.createElement('div');
  tempWrapper.appendChild(frag);
  const newContent = tempWrapper.innerHTML;

  const newHtml = html.substring(0, startTagEnd + 1) + newContent + html.substring(endDivIdx);
  fs.writeFileSync(filePath, newHtml, 'utf-8');
}

function processDirectory(dir, termMap, unifiedRegex, recommendationMap, validRoutes) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath, termMap, unifiedRegex, recommendationMap, validRoutes);
    } else if (item.endsWith('.html')) {
      linkHtml(fullPath, termMap, unifiedRegex, recommendationMap, validRoutes);
    }
  }
}

// Main Execution
console.log('🚀 Starting Smart Linker 2.0 (DOM-based, Semantic, Protected & 100% 404-Safe)...');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist directory not found. Run build first.');
  process.exit(1);
}

const validRoutes = getExistingRoutes(DIST_DIR);
console.log(`🛡️ Scanned ${validRoutes.size} real existing routes in ${DIST_DIR} for zero-404 guarantee.`);

const glossary = loadGlossary(validRoutes);
const blog = loadBlog(validRoutes);
const allItems = [...glossary, ...blog];

console.log(`📚 Loaded ${glossary.length} valid glossary terms and ${blog.length} valid blog posts.`);

const recommendationMap = buildThematicRecommendations(allItems, validRoutes);
console.log(`🎯 Generated thematic recommendations for ${recommendationMap.size} content pages.`);

const { termMap, unifiedRegex } = buildSearchTerms(glossary, blog, validRoutes);
console.log(`🔍 Compiled search dictionary with ${termMap.size} verified terms (including Money Pages & Synonyms).`);

processDirectory(DIST_DIR, termMap, unifiedRegex, recommendationMap, validRoutes);
console.log('✨ Smart Linker 2.0 Execution Complete!');
