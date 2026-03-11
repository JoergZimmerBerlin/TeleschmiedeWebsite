import { getCollection } from 'astro:content';

export const GET = async () => {
    const isGitHubPages = import.meta.env.GITHUB_ACTIONS === 'true' && import.meta.env.DEPLOY_TARGET !== 'ionos';
    const baseUrl = isGitHubPages ? 'https://joergzimmerberlin.github.io/TeleschmiedeWebsite' : 'https://teleschmie.de';

    const imageMap = {
        '': [
            { loc: '/images/joerg-zimmer-portrait.webp', title: 'Jörg Zimmer SEO Freelancer Profilbild' }
        ],
        'ueber-mich/': [
            { loc: '/images/joerg-zimmer-portrait.webp', title: 'Jörg Zimmer über mich' }
        ],
        'seo-sprechstunde/': [
            { loc: '/images/joerg-zimmer-portrait.webp', title: 'SEO Sprechstunde mit Jörg Zimmer' }
        ],
        'kontakt/': [
            { loc: '/images/joerg-zimmer-portrait.webp', title: 'Kontakt Jörg Zimmer' }
        ]
    };

    let urls = '';

    for (const [path, images] of Object.entries(imageMap)) {
        let imageTags = '';
        for (const img of images) {
            imageTags += `
      <image:image>
        <image:loc>${baseUrl}${img.loc}</image:loc>
        <image:title>${img.title}</image:title>
      </image:image>`;
        }

        urls += `
  <url>
    <loc>${baseUrl}/${path}</loc>${imageTags}
  </url>`;
    }

    const blogPosts = await getCollection('blog');
    for (const post of blogPosts) {
        if (post.data.image) {
            urls += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <image:image>
      <image:loc>${baseUrl}${post.data.image.src}</image:loc>
      <image:title>${post.data.title}</image:title>
    </image:image>
  </url>`;
        }
    }

    const glossaryPosts = await getCollection('glossar');
    for (const post of glossaryPosts) {
        if (post.data.image) {
            urls += `
  <url>
    <loc>${baseUrl}/glossar/${post.slug}/</loc>
    <image:image>
      <image:loc>${baseUrl}${post.data.image.src}</image:loc>
      <image:title>${post.data.title}</image:title>
    </image:image>
  </url>`;
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
