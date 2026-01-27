import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isGitHubPages
    ? 'https://joergzimmerberlin.github.io'
    : 'https://teleschmie.de',
  base: isGitHubPages ? '/TeleschmiedeWebsite' : '/',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
