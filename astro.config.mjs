import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
  ],
  server: {
    port: 4321,
    host: true,
  },
  output: 'hybrid',
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
  },
});

