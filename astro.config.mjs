import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  base: '/xuanchen_content',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    origin: 'http://localhost:4321',
    csrf: {
      checkOrigin: false,
    },
  },
});
