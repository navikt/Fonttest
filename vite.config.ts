import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Set the base path to your repo name for GitHub Pages deployment
export default defineConfig({
  plugins: [react()],
  base: '/aksel-darkside-demo/',
})
