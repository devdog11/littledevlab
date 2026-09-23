# app

React + Vite prototype of site pages. The products page is first. The static `../products.html` stays the live page until cutover.

```
npm install
npm run dev     # local preview
npm run build   # production build into dist/
npm run lint
```

`public/images` is a symlink to the site's `images/` folder. It's used by the dev server only and isn't copied into the build.
