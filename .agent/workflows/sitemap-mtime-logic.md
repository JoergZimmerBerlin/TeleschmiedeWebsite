---
description: Custom logic for dynamically generating an Astro sitemap with exact file mtime dates
---

## Astro Sitemap File Modified Dates Logic

This logic allows an Astro project to automatically map true file modification dates (mtime) into the generated `sitemap.xml` file, rather than using the generic current build date.

### How to use
When working with an Astro sitemap, apply the following logic in `src/pages/sitemap.xml.ts` in order to scan `.astro` pages as well as markdown files in `src/content/`.

```javascript
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

export const GET = async () => {
  const isGitHubPages = import.meta.env.GITHUB_ACTIONS === 'true' && import.meta.env.DEPLOY_TARGET !== 'ionos';
  const baseUrl = isGitHubPages ? 'https://joergzimmerberlin.github.io/TeleschmiedeWebsite' : 'https://teleschmie.de';

  const lastModYYYYMMDD = new Date().toISOString().split('T')[0];

  // Helper logic to find mtime from physical file path
  const getLastMod = (filePath) => {
    try {
      const stats = fs.statSync(filePath);
      return new Date(stats.mtimeMs).toISOString().split('T')[0];
    } catch (e) {
      return lastModYYYYMMDD;
    }
  };

  // Static Astro Pages
  const pages = import.meta.glob([
    '../pages/*.astro',
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

  // Collections (e.g. blog or glossar)
  const myCollection = await getCollection('my_content_name');
  for (const post of myCollection) {
    const filePath = path.join(process.cwd(), 'src/content/my_content_name', post.id);
    const postDate = getLastMod(filePath);
    urls += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
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
```
