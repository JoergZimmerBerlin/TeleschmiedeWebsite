import { getCollection } from 'astro:content';
import { execSync } from 'node:child_process';
import path from 'node:path';

export const GET = async () => {
  const isGitHubPages = import.meta.env.GITHUB_ACTIONS === 'true' && import.meta.env.DEPLOY_TARGET !== 'ionos';
  const baseUrl = isGitHubPages ? 'https://joergzimmerberlin.github.io/TeleschmiedeWebsite' : 'https://teleschmie.de';

  const lastModYYYYMMDD = new Date().toISOString().split('T')[0];

  const getLastMod = (filePath: string) => {
    try {
      // Use git log to find the last commit date for this file in YYYY-MM-DD format
      const dateStr = execSync(`git log -1 --format=%cs -- "${filePath}"`, { encoding: 'utf8' }).trim();
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
    // Collect the source path for the content post
    const filePath = path.join(process.cwd(), 'src/content/blog', post.id);
    const postDate = getLastMod(filePath);
    urls += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
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
  for (const post of glossaryPosts) {
    const filePath = path.join(process.cwd(), 'src/content/glossar', post.id);
    const postDate = getLastMod(filePath);
    urls += `
  <url>
    <loc>${baseUrl}/glossar/${post.slug}/</loc>
    <lastmod>${postDate}</lastmod>
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
