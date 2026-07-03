import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://MORECORIANDERS.github.io',
  base: '/sw-industry-dashboard',
  outDir: 'dist',
  build: {
    assets: '_assets',
  },
});
