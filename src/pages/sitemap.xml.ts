import { getCollection } from 'astro:content';
import { execSync } from 'node:child_process';
import path from 'node:path';

export const GET = async () => {
  const isGitHubPages = import.meta.env.GITHUB_ACTIONS === 'true' && import.meta.env.DEPLOY_TARGET !== 'ionos';
  const baseUrl = isGitHubPages ? 'https://joergzimmerberlin.github.io/TeleschmiedeWebsite' : 'https://teleschmie.de';

  const lastModYYYYMMDD = new Date().toISOString().split('T')[0];

  const getLastMod = (filePath: string) => {
    try {
      const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
      // Use git log to find the last commit date for this file in YYYY-MM-DD format
      const dateStr = execSync(`git log -1 --format=%cs -- "${absolutePath}"`, { 
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'] 
      }).trim();
      return dateStr || lastModYYYYMMDD;
    } catch (e) {
      return lastModYYYYMMDD;
    }
  };

  // 1. Static Pages (.astro files in src/pages)
  const pages = import.meta.glob([
    '../pages/*.astro',
    '../pages/seo-freelancer-berlin.astro',
    '!../pages/404.astro'
  ]);

  let urls = '';

  for (const globPath in pages) {
    let cleanPath = globPath.split('/').pop()?.replace('.astro', '') || '';
    const filePath = path.join(process.cwd(), 'src/pages', cleanPath + '.astro');
    let urlLoc = cleanPath;
    if (cleanPath === 'index') {
      urlLoc = '';
    } else {
      urlLoc = cleanPath + '/';
    }

    urls += `
  <url>
    <loc>${baseUrl}/${urlLoc}</loc>
    <lastmod>${getLastMod(filePath)}</lastmod>
  </url>`;
  }

  // 2. Blog Index
  urls += `
  <url>
    <loc>${baseUrl}/blog/</loc>
    <lastmod>${getLastMod(path.join(process.cwd(), 'src/pages/blog/index.astro'))}</lastmod>
  </url>`;

  // 3. Blog Posts
  const blogPosts = await getCollection('blog');
  for (const post of blogPosts) {
    const frontmatterDate = post.data.date ? new Date(post.data.date).toISOString().split('T')[0] : null;
    // In Astro 5 Content Layer, filePath is available on the entry
    const relPath = post.filePath || `src/content/blog/${post.id}.md`;
    const filePath = path.join(process.cwd(), relPath);
    const postDate = frontmatterDate || getLastMod(filePath);
    
    urls += `
  <url>
    <loc>${baseUrl}/blog/${post.id}/</loc>
    <lastmod>${postDate}</lastmod>
  </url>`;
  }

  // 4. Glossary Index
  urls += `
  <url>
    <loc>${baseUrl}/glossar/</loc>
    <lastmod>${getLastMod(path.join(process.cwd(), 'src/pages/glossar/index.astro'))}</lastmod>
  </url>`;

  // 5. Glossary Posts
  const glossaryPosts = await getCollection('glossar');
  for (const entry of glossaryPosts) {
    const frontmatterDate = entry.data.date ? new Date(entry.data.date).toISOString().split('T')[0] : null;
    const relPath = entry.filePath || `src/content/glossar/${entry.id}.md`;
    const filePath = path.join(process.cwd(), relPath);
    const postDate = frontmatterDate || getLastMod(filePath);
    
    urls += `
  <url>
    <loc>${baseUrl}/glossar/${entry.id}/</loc>
    <lastmod>${postDate}</lastmod>
  </url>`;
  }

  // 6. LLM Files
  const llmFiles = ['llms.txt', 'llms-full.txt'];
  for (const file of llmFiles) {
    const filePath = path.join(process.cwd(), 'public', file);
    urls += `
  <url>
    <loc>${baseUrl}/${file}</loc>
    <lastmod>${getLastMod(filePath)}</lastmod>
  </url>`;
  }

  // 7. Blog Categories
  const blogCategories = ['seo-praxis', 'ai-seo', 'tech-seo-tools', 'events-networking'];
  for (const cat of blogCategories) {
    urls += `
  <url>
    <loc>${baseUrl}/blog/${cat}/</loc>
    <lastmod>${getLastMod(path.join(process.cwd(), 'src/pages/blog/[slug].astro'))}</lastmod>
  </url>`;
  }

  // 8. Glossar Categories
  const glossarCategories = ['seo-basics-onpage', 'technisches-seo-ux', 'ai-seo-generative-search', 'e-e-a-t-offpage'];
  for (const cat of glossarCategories) {
    urls += `
  <url>
    <loc>${baseUrl}/glossar/${cat}/</loc>
    <lastmod>${getLastMod(path.join(process.cwd(), 'src/pages/glossar/[slug].astro'))}</lastmod>
  </url>`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
};
