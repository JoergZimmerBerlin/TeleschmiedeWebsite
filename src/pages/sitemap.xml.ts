import { getCollection } from 'astro:content';

export const GET = async () => {
  const isGitHubPages = import.meta.env.GITHUB_ACTIONS === 'true' && import.meta.env.DEPLOY_TARGET !== 'ionos';
  const baseUrl = isGitHubPages ? 'https://joergzimmerberlin.github.io/TeleschmiedeWebsite' : 'https://teleschmie.de';

  const lastModYYYYMMDD = new Date().toISOString().split('T')[0];

  // 1. Static Pages (.astro files in src/pages)
  const pages = import.meta.glob([
    '../pages/*.astro',
    '!../pages/404.astro'
  ]);

  let urls = '';

  for (const path in pages) {
    let cleanPath = path.split('/').pop()?.replace('.astro', '') || '';
    if (cleanPath === 'index') {
      cleanPath = '';
    } else {
      cleanPath = cleanPath + '/';
    }

    urls += `
  <url>
    <loc>${baseUrl}/${cleanPath}</loc>
    <lastmod>${lastModYYYYMMDD}</lastmod>
    <changefreq>${cleanPath === '' ? 'daily' : 'weekly'}</changefreq>
  </url>`;
  }

  // 2. Blog Index
  urls += `
  <url>
    <loc>${baseUrl}/blog/</loc>
    <lastmod>${lastModYYYYMMDD}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`;

  // 3. Blog Posts
  const blogPosts = await getCollection('blog');
  for (const post of blogPosts) {
    const postDate = post.data.pubDate ? new Date(post.data.pubDate).toISOString().split('T')[0] : lastModYYYYMMDD;
    urls += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
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
