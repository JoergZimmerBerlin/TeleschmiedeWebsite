import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Automatische Erkennung: GitHub Pages vs Produktion
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

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
