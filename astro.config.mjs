import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://teleschmie.de',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
