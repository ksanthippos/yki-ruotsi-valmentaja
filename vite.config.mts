import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/yki-ruotsi-valmentaja/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'YKI Ruotsi Valmentaja',
        short_name: 'YKI Valmentaja',
        description:
          'PWA ruotsin YKI-kokeeseen valmistautumiseen ja ruotsinkielisen opetussanaston harjoitteluun.',
        lang: 'fi',
        start_url: '/yki-ruotsi-valmentaja/',
        scope: '/yki-ruotsi-valmentaja/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#356ae6',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});