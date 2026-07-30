import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // آپدیت خودکار سرویس‌ورکر بدون نیاز به رفرش دستی کاربر
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Sepa Mission Game',
        short_name: 'Sepa',
        description: 'A progressive web app game with strict stage progression and challenges.',
        theme_color: '#1976d2', // رنگ قالب متریال یو‌آی پیش‌فرض
        background_color: '#121212', // رنگ بک‌گراند دارک مود
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // پشتیبانی از آیکون‌های تطبیق‌پذیر اندروید
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'], // کش کردن تمام فایل‌های بیلد شده
        runtimeCaching: [
          {
            // کش کردن فونت‌ها و فایل‌های خارجی (مانند آیکون‌ها در صورت لود خارجی)
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // ۱ سال
              }
            }
          }
        ]
      }
    })
  ]
});
