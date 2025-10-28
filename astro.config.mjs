import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
// Hybrid site configuration (static pages + server endpoints)
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [
    tailwind(),
  ],
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/components': resolve(__dirname, './src/components'),
        '@/layouts': resolve(__dirname, './src/layouts'),
        '@/lib': resolve(__dirname, './src/lib'),
        '@/config': resolve(__dirname, './src/config'),
        '@/content': resolve(__dirname, './src/content'),
      },
    },
    plugins: [
      {
        name: 'yaml-raw-loader',
        load(id) {
          if (id.endsWith('.yml') || id.endsWith('.yaml')) {
            const fs = require('fs');
            const raw = fs.readFileSync(id, 'utf-8');
            return `export default ${JSON.stringify(raw)}`;
          }
        },
      },
    ],
  },
});

