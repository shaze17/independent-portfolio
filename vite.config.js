import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // If deploying to GitHub Pages at https://<username>.github.io/<repo-name>/,
  // uncomment the line below and replace with your repo name:
  // base: '/sharaj-portfolio/',
})