import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ashes_of_aeloria/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('axios') || id.includes('zustand')) {
              return 'vendor-state';
            }
            return 'vendor';
          }

          if (id.includes('/src/data/')) {
            return 'game-data';
          }

          if (id.includes('/src/ai/') || id.includes('/src/components/testing/')) {
            return 'gameplay-testing';
          }
        },
      },
    },
  },
});
