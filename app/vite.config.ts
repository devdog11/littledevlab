import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import manifest from './pages.manifest.json';

// A page joins the build as soon as its client entry exists on disk, so the
// build stays green while pages are ported over one at a time.
const ported = manifest.pages.filter((p) => existsSync(resolve(__dirname, p.entry)));

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Each entry sits at the exact path the live site already serves, so no
      // existing URL or bookmark changes.
      input: Object.fromEntries(ported.map((p) => [p.key, resolve(__dirname, p.path)])),
    },
  },
});
