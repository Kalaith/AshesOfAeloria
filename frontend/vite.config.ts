import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ashes_of_aeloria/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
