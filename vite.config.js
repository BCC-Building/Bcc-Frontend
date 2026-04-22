// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem alag chunk mein
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Bootstrap alag mein  
          'bootstrap': ['bootstrap'],
          
          // Agar koi aur heavy lib hai toh
          'utils': ['lodash', 'moment']  // Agar ye installed hain toh
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Warning kam karne ke liye
  }
}