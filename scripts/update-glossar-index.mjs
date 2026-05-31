import fs from 'fs';

const file = 'src/pages/glossar/index.astro';
let content = fs.readFileSync(file, 'utf-8');

// Insert categories array in the frontmatter
const categoriesDef = `
const categories = [
  { name: 'SEO Basics & Onpage', slug: 'seo-basics-onpage' },
  { name: 'Technisches SEO & UX', slug: 'technisches-seo-ux' },
  { name: 'AI SEO & Generative Search', slug: 'ai-seo-generative-search' },
  { name: 'E-E-A-T & Offpage', slug: 'e-e-a-t-offpage' }
];
`;

content = content.replace("const baseUrl = import.meta.env.BASE_URL.replace(/\\/$/, '');", "const baseUrl = import.meta.env.BASE_URL.replace(/\\/$/, '');\n" + categoriesDef);

// Insert Category Hubs HTML
const searchBarEndIndex = content.indexOf('<!-- Entries Grid -->');
const hubsHtml = `
      <!-- Category Hubs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {categories.map(cat => {
          const count = sortedEntries.filter(e => (e.data.category || 'SEO Basics & Onpage') === cat.name).length;
          return (
            <a href={\`\${baseUrl}/glossar/\${cat.slug}/\`} class="group bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:bg-white hover:border-lime-accent hover:shadow-md transition-all duration-300">
              <h3 class="font-bold text-lg text-dark mb-2 group-hover:text-lime-600 transition-colors">{cat.name}</h3>
              <p class="text-sm text-gray-muted">{count} Begriffe</p>
            </a>
          );
        })}
      </div>

      `;

content = content.substring(0, searchBarEndIndex) + hubsHtml + content.substring(searchBarEndIndex);

// Add Badge to individual cards
content = content.replace(
  '<h2 class="text-xl font-bold mb-3 group-hover:text-lime-600 transition-colors">',
  '<span class="text-[10px] font-bold text-lime-700 bg-lime-accent/20 px-2 py-0.5 rounded uppercase mb-3 inline-block">{entry.data.category || \'SEO Basics & Onpage\'}</span>\n            <h2 class="text-xl font-bold mb-3 group-hover:text-lime-600 transition-colors">'
);

fs.writeFileSync(file, content);
