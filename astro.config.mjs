import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Deployment-Erkennung: IONOS (Produktion) vs GitHub Pages (Preview)
// DEPLOY_TARGET=ionos → teleschmie.de (kein base prefix)
// Sonst GitHub Actions → GitHub Pages mit /TeleschmiedeWebsite prefix
const isIONOS = process.env.DEPLOY_TARGET === 'ionos';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && !isIONOS;

export default defineConfig({
  site: isGitHubPages
    ? 'https://joergzimmerberlin.github.io'
    : 'https://teleschmie.de',
  base: isGitHubPages ? '/TeleschmiedeWebsite' : '',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
