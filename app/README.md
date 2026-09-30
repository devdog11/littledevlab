# app

React + Vite source for site pages. The products page is first, and it is the live products page. `.github/workflows/deploy.yml` builds it and publishes `dist/index.html` as `products.html`. The old static `../products.html` is kept only for rollback and is not published. Edit products here (`products.js`, `src/pages/products/`), not in that file.

```
npm install
npm run dev     # local preview
npm run build   # production build into dist/
npm run lint
```

`public/images` is a symlink to the site's `images/` folder. It's used by the dev server only and isn't copied into the build.
