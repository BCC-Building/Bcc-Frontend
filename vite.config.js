// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React ecosystem alag chunk mein
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom') ||
              id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          
          // Bootstrap alag chunk mein
          if (id.includes('node_modules/bootstrap')) {
            return 'bootstrap';
          }
          
          // Framer Motion alag chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
          
          // React Icons alag chunk
          if (id.includes('node_modules/react-icons')) {
            return 'icons-vendor';
          }
          
          // React Helmet Async
          if (id.includes('node_modules/react-helmet-async')) {
            return 'utils-vendor';
          }
          
          // Baaki sab node_modules ko vendor chunk mein
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Warning limit in KB
  }
});