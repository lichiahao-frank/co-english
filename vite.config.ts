import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 的網址是 使用者名稱.github.io/co-english/，
// 所以正式版的資源路徑要帶上這一層；本機開發維持根目錄。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/co-english/' : '/',
  server: { port: 5173, strictPort: true },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: '小Co 英語陪練',
        short_name: '小Co英語',
        description: '每天 20 分鐘，跟小Co一起練英語聽力與口說',
        lang: 'zh-Hant',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FFF9F5',
        theme_color: '#FFF9F5',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
      },
    }),
  ],
}))
