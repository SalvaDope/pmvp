import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  site: 'https://pmvp.pt',
  output: 'static',
  security: {
    checkOrigin: false,
  },
  adapter: isVercel
    ? vercel()
    : node({
        mode: 'standalone',
      }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
