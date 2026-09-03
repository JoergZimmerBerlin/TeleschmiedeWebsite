import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkGithubAlerts from 'remark-github-alerts';

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
  markdown: {
    remarkPlugins: [remarkGithubAlerts]
  },
  integrations: [
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: 'lightningcss',
      minimizer: 'lightningcss'
    },
    build: {
      cssMinify: 'lightningcss',
      minify: 'esbuild'
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
    // CI-sicherer Standard: Lokal 10 Threads für Speed, auf GitHub Actions 4 Threads (verhindert OOM-Crashes bei 500+ Bildern)
    concurrency: process.env.GITHUB_ACTIONS === 'true' ? 4 : 10,
    inlineStylesheets: 'never'
  }
});
