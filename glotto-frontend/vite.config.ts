// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Прокси для API (Go-бэкенд)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // Прокси для медиафайлов (MinIO)
      '/media': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/media/, ''),
      },
    },
  },
})
