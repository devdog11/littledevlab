import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import markdown from './build/markdown.js'

// https://vite.dev/config/
// `npm run build` runs three steps (see package.json):
//   1. vite build                 browser bundle + manifest into dist/
//   2. vite build --ssr ...       build-time renderer into dist-ssr/
//   3. node scripts/prerender.mjs writes every page as flat HTML into dist/
export default defineConfig({
  plugins: [react(), markdown()],
  build: {
    // public/images links to the site's real images/ folder so the dev
    // server can show them. Don't copy them into dist; the deploy publishes
    // images/ next to the built pages.
    copyPublicDir: false,
    // The pre-render step reads this to add <link rel="modulepreload"> tags.
    manifest: true,
  },
  server: {
    // Content lives outside app/: ../build-log/*.md and ../lab-notes/*.md.
    fs: { allow: ['..'] },
  },
})
