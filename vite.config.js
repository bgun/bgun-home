import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths for assets (needed for sub-page routing)
  build: {
    outDir: 'docs', // Output to docs folder for GitHub Pages
    emptyOutDir: true, // Clean the output directory before building
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        patchwork: resolve(__dirname, 'patchwork.html'),
      },
    },
  },
})
