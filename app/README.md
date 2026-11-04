# app

React + Vite source for every page on littledevlab.com. `npm run build` renders
each page to static HTML (flat files at the site's real paths) in `dist/`;
`.github/workflows/deploy.yml` publishes `dist/` plus the repo's `images/`.

```
npm install
npm run dev     # live dev server (renders in the browser, no pre-render)
npm run build   # browser build + build-time renderer + pre-render into dist/
npm run serve   # preview dist/ with Cloudflare Pages' URL rules (http://localhost:4173)
npm run lint
```

- Pages: `src/pages/<name>/<Name>Page.jsx`, listed in `src/routes.js`. Each exports
  the component, a `head()` (title, description, canonical, styles) and optionally
  `loadData()`.
- Menu: `MENUS` in `src/site.js`, rendered by `src/components/Nav.jsx`.
- Pre-render: `scripts/prerender.mjs`. Decisions and reasons: `../DECISIONS.md`.

`public/images` is a symlink to the site's `images/` folder. It's used by the dev server only and isn't copied into the build.
