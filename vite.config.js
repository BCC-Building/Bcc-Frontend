import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'vendor-core'
          }
          if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('react-icons')) {
            return 'vendor-ui'
          }
          if (id.includes('axios')) {
            return 'vendor-http'
          }
          return 'vendor'
        },
      },
    },
  },
})
