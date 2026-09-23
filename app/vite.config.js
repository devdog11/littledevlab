import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // public/images links to the site's real images/ folder so the dev
    // server can show them. Don't copy them into dist; the live site
    // already serves /images/.
    copyPublicDir: false,
  },
})
