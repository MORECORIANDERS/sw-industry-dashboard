import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://MORECORIANDERS.github.io',
  base: '/sw-industry-dashboard',
  outDir: 'dist',
  build: {
    assets: '_assets',
    format: 'file',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
