import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://joergzimmerberlin.github.io',
  base: '/TeleschmiedeWebsite',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
