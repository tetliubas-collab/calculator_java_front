import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // Проксі запитів до Java бекенду під час розробки
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 4173
  },
  build: {
    outDir: 'dist',
    // Генерація sourcemaps для дебагу (Крок 4 лаби)
    sourcemap: true
  }
})
