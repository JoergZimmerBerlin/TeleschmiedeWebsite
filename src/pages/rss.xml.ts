import { getCollection } from 'astro:content';

export const GET = async () => {
  const isGitHubPages = import.meta.env.GITHUB_ACTIONS === 'true' && import.meta.env.DEPLOY_TARGET !== 'ionos';
  const baseUrl = isGitHubPages ? 'https://joergzimmerberlin.github.io/TeleschmiedeWebsite' : 'https://teleschmie.de';

  const blogPosts = await getCollection('blog');

  // Sort by publication date descending
  const sortedPosts = blogPosts.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const escapeXml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const itemsXml = sortedPosts.map(post => {
    const postUrl = `${baseUrl}/blog/${post.id}/`;
    const pubDate = post.data.date ? new Date(post.data.date).toUTCString() : new Date().toUTCString();
    const desc = post.data.meta_description || post.data.description || '';
    const category = post.data.category || 'SEO Praxis';

    return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(desc)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(category)}</category>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jörg Zimmer - SEO &amp; AI Search Blog</title>
    <link>${baseUrl}/blog/</link>
    <description>Tiefgründige Case Studies, bewährte SEO-Strategien, technische Analysen und Insights aus über 25 Jahren Performance Marketing von Jörg Zimmer.</description>
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
};
