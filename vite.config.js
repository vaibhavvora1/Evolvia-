import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/');
          if (!moduleId.includes('/node_modules/')) return undefined;

          // React core and Router — loaded in react-vendor
          if (/\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(moduleId)) {
            return 'react-vendor';
          }

          // Motion chunk — gsap + lenis in lazy motion bundle
          if (/\/(gsap|lenis)\//.test(moduleId)) {
            return 'motion';
          }

          // Icons chunk — react-icons isolated for optimal cacheability
          if (moduleId.includes('/react-icons/')) {
            return 'icons';
          }

          return 'vendor';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // gsap and lenis are dynamic imports — exclude from pre-bundling
    // so they land in the 'motion' lazy chunk, not the initial bundle.
    exclude: ['gsap', 'lenis'],
  },
});
