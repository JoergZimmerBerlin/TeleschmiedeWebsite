import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
    sitemap(),
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: 'lightningcss',
      minimizer: 'lightningcss'
    },
    build: {
      cssMinify: 'lightningcss'
    }
  },
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  redirects: {
    '/leistungen/sechstunde/': '/seo-sprechstunde/',
    '/blog/schema-markup-zustaendigkeit-umfrage/': '/blog/google-search-console-zustaendigkeit-umfrage/',
    '/html/impressum.html': '/impressum/',
    '/html/antworten.html': '/leistungen/',
    '/berlin/adwords-optimierung-sea.html': '/google-ads-freelancer-berlin/',
    '/berlin/suchmaschinen-optimierung-seo/seo-agentur-berlin.html': '/seo-freelancer-berlin/'
  },
  prefetch: true,
  output: 'static',
  build: {
    assets: 'assets',
    concurrency: 10
  }
});
