import fs from 'fs';
import path from 'path';

const file = 'src/pages/glossar/[slug].astro';
let content = fs.readFileSync(file, 'utf-8');

// Replace getStaticPaths
const oldPaths = `export async function getStaticPaths() {
  const entries = await getCollection('glossar');
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}`;

const newPaths = `export async function getStaticPaths() {
  const entries = await getCollection('glossar');
  const entryPaths = entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry, type: 'term' },
  }));

  const categories = [
    { name: 'SEO Basics & Onpage', slug: 'seo-basics-onpage', desc: 'Grundlagen, Keyword-Strategien und Onpage-Optimierung für nachhaltigen SEO-Erfolg.' },
    { name: 'Technisches SEO & UX', slug: 'technisches-seo-ux', desc: 'Crawling, Indexierung, PageSpeed und Core Web Vitals für eine technisch fehlerfreie Website.' },
    { name: 'AI SEO & Generative Search', slug: 'ai-seo-generative-search', desc: 'GEO, AIO, LLMs und die Zukunft der KI-gestützten Suchmaschinen.' },
    { name: 'E-E-A-T & Offpage', slug: 'e-e-a-t-offpage', desc: 'Autorität, Trust, Entitäten, Backlinks und nachhaltiger Markenaufbau.' }
  ];

  const categoryPaths = categories.map(cat => ({
    params: { slug: cat.slug },
    props: { 
      type: 'category', 
      categoryName: cat.name,
      categoryDescription: cat.desc
    },
  }));

  return [...entryPaths, ...categoryPaths];
}`;

content = content.replace(oldPaths, newPaths);

// Replace Astro.props parsing and define rendering logic conditionally
const oldProps = `const { entry } = Astro.props;
const lastReviewed = getGitModDate(\`src/content/glossar/\${entry.id}\`);
const { Content, headings } = await render(entry);`;

const newProps = `const { entry, type, categoryName, categoryDescription } = Astro.props;
const baseUrl = import.meta.env.BASE_URL.replace(/\\/$/, '');
const allEntries = await getCollection('glossar');

let Content, headings, lastReviewed, readingTime, entryImageWebp;
let relatedTerms = [];
let relatedBlogPosts = [];

if (type === 'term') {
  lastReviewed = getGitModDate(\`src/content/glossar/\${entry.id}\`);
  const rendered = await render(entry);
  Content = rendered.Content;
  headings = rendered.headings;

  if (entry.data.image) {
    entryImageWebp = await getImage({ src: entry.data.image, format: 'webp' });
  }

  const wordCount = (entry.body || '').split(/\\s+/).length;
  readingTime = Math.ceil(wordCount / 180);

  const manualRelatedTerms = allEntries.filter((e) => entry.data.related_terms?.includes(e.id));
  relatedTerms = manualRelatedTerms.length >= 3
    ? manualRelatedTerms
    : [
        ...manualRelatedTerms,
        ...allEntries
          .filter(e => e.id !== entry.id && !manualRelatedTerms.find(m => m.id === e.id))
          .filter(e => (e.data.category || 'SEO Basics & Onpage') === (entry.data.category || 'SEO Basics & Onpage')) // STRICT CATEGORY MATCH
          .map(e => {
            let score = 0;
            const titleWords = entry.data.title.toLowerCase().split(/\\W+/).filter(w => w.length > 3);
            const otherTitle = e.data.title.toLowerCase();
            if (titleWords.some(w => otherTitle.includes(w))) score += 5;
            return { ...e, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 3 - manualRelatedTerms.length)
      ];

  const allBlogPosts = await getCollection('blog');
  relatedBlogPosts = allBlogPosts
    .filter(post => {
      const entryTitle = entry.data.title.split('(')[0].trim().toLowerCase();
      const postText = (post.data.title + ' ' + (post.data.description || '') + ' ' + (post.data.tags || []).join(' ')).toLowerCase().replace(/-/g, ' ');
      if (postText.includes(entryTitle)) return true;
      const keywords = entryTitle.split(/\\s+/).filter(k => k.length > 3);
      if (keywords.length > 0) {
        const matchCount = keywords.filter(k => postText.includes(k)).length;
        if (matchCount >= Math.ceil(keywords.length / 2)) return true;
      }
      return post.data.tags?.some(tag => entryTitle.includes(tag.toLowerCase()));
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 3);
}`;

// I need to carefully replace the logic from `const { entry } = Astro.props;` down to `---`
const logicStart = content.indexOf(`const { entry } = Astro.props;`);
const logicEnd = content.indexOf(`---`, logicStart);
content = content.substring(0, logicStart) + newProps + '\n' + content.substring(logicEnd);

// Now handle the UI
const uiStart = content.indexOf(`<Layout`);
const uiEnd = content.length;
const oldUi = content.substring(uiStart, uiEnd);

const categoryUi = `
{type === 'category' ? (
  <Layout title={\`\${categoryName} | Jörg Zimmer\`} description={categoryDescription}>
    <section class="section pt-12 pb-12 bg-white">
      <div class="container-narrow">
        <div class="mb-10">
          <a href={\`\${baseUrl}/glossar/\`} class="text-sm font-bold text-gray-muted hover:text-lime-600 transition-colors inline-flex items-center gap-2 mb-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zum Glossar
          </a>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {categoryName}
          </h1>
          <p class="text-lg md:text-xl text-gray-muted max-w-3xl">
            {categoryDescription}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEntries
            .filter(e => (e.data.category || 'SEO Basics & Onpage') === categoryName)
            .sort((a, b) => a.data.title.localeCompare(b.data.title))
            .map(t => (
              <a href={\`\${baseUrl}/glossar/\${t.id}/\`} class="group block bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-lime-accent transition-all duration-300">
                <span class="text-[10px] font-bold text-lime-700 bg-lime-accent/20 px-2 py-0.5 rounded uppercase mb-3 inline-block">
                  Glossar
                </span>
                <h2 class="font-bold text-lg mb-2 group-hover:text-lime-600 transition-colors">
                  {t.data.title}
                </h2>
                <p class="text-sm text-gray-muted line-clamp-2">
                  {t.data.description}
                </p>
              </a>
          ))}
        </div>
      </div>
    </section>
    <Schema title={\`\${categoryName} | Jörg Zimmer\`} description={categoryDescription} />
  </Layout>
) : (
  ${oldUi.replace(/<Layout/g, '<Layout\n  title={entry.data.title}') /* just keep it as is, wait it already has it */}
`;

// Replace the old UI with the conditional UI
// But I need to safely wrap the old UI
content = content.substring(0, uiStart) + 
`{type === 'category' ? (
  <Layout title={\`\${categoryName} | Jörg Zimmer\`} description={categoryDescription}>
    <section class="section pt-12 pb-12 bg-white">
      <div class="container-narrow">
        <div class="mb-10">
          <a href={\`\${baseUrl}/glossar/\`} class="text-sm font-bold text-gray-muted hover:text-lime-600 transition-colors inline-flex items-center gap-2 mb-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Übersicht
          </a>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {categoryName}
          </h1>
          <p class="text-lg text-gray-muted max-w-3xl">
            {categoryDescription}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEntries
            .filter(e => (e.data.category || 'SEO Basics & Onpage') === categoryName)
            .sort((a, b) => a.data.title.localeCompare(b.data.title))
            .map(t => (
              <a href={\`\${baseUrl}/glossar/\${t.id}/\`} class="group block bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-lime-accent transition-all duration-300">
                <span class="text-[10px] font-bold text-lime-700 bg-lime-accent/20 px-2 py-0.5 rounded uppercase mb-3 inline-block">
                  Glossar
                </span>
                <h2 class="font-bold text-lg mb-2 group-hover:text-lime-600 transition-colors">
                  {t.data.title}
                </h2>
                <p class="text-sm text-gray-muted line-clamp-2">
                  {t.data.description}
                </p>
              </a>
          ))}
        </div>
      </div>
    </section>
    <Schema title={\`\${categoryName} | Jörg Zimmer\`} description={categoryDescription} />
  </Layout>
) : (
` + oldUi + `\n)}\n`;

fs.writeFileSync(file, content);
