import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets
  build: {
    outDir: 'docs', // Output to docs folder for GitHub Pages
    emptyOutDir: true, // Clean the output directory before building
  },
})
