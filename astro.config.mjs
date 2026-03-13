import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Automatische Erkennung: GitHub Pages vs Produktion
// DEPLOY_TARGET=ionos wird in deploy.yml gesetzt, damit der IONOS-Build
// nicht fälschlicherweise GitHub-Pages-Pfade verwendet.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && process.env.DEPLOY_TARGET !== 'ionos';

export default defineConfig({
  site: isGitHubPages
    ? 'https://joergzimmerberlin.github.io'
    : 'https://teleschmie.de',
  base: isGitHubPages ? '/TeleschmiedeWebsite' : '',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap(),
    mdx()
  ],
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  redirects: {
    '/leistungen/sechstunde/': '/seo-sprechstunde/',
    '/blog/schema-markup-zustaendigkeit-umfrage/': '/blog/google-search-console-zustaendigkeit-umfrage/'
  },
  prefetch: true,
  output: 'static',
  build: {
    assets: 'assets'
  }
});
