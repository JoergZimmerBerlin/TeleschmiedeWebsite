import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
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
  integrations: [tailwind(), sitemap()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
