# LittleDevLab website

Every page on littledevlab.com is a React page in `app/`, pre-rendered to static HTML at build time. The output is plain files (no server): `index.html`, `products.html`, `build-log.html`, `lab/index.html`, `lab-notes/index.html` and `lab-notes/<slug>.html`, at the same paths as before. Google model-viewer and the theme fonts still load from CDNs. The intent is to ensure tyson has a grip on what automation is being done.

## Where things live

- `app/` — the React + Vite source (pages, components, pre-render script). See `app/README.md`.
- `lab-notes/<slug>.md` — one Lab Note per file (front matter + Markdown). See `lab-notes/README.md`.
- `build-log/*.md` — one Build Log entry per file; the Build Log page and The Lab are built from these. See `build-log/README.md`.
- `images/` — photos, 3D models and the theme (`images/theme/engr.css`, the global stylesheet).
- `tools/` — `stage-site.sh` (assembles the deploy folder), `check-attribution.sh`, and optional offline asset utilities.
- `DECISIONS.md` — why the site is built the way it is.

## Local preview

```
cd app
npm install
npm run build    # pre-renders every page into app/dist
npm run serve    # http://localhost:4173, with Cloudflare Pages' URL rules
```

`npm run dev` gives a live-reloading dev server instead (pages render in the browser, no pre-render).

## Deployment

`.github/workflows/deploy.yml` deploys to Cloudflare Pages on pushes to `main` and manual dispatch from `main`, behind the `production` environment. It builds `app/` with Node 22 (`npm run build` pre-renders every page), then `tools/stage-site.sh` assembles `_public/` from `app/dist` plus `images/` and `build-log/*.md`, and checks every page is present and pre-rendered. It requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets. If the build fails, nothing deploys and the live site stays on its last good version. `.github/workflows/pr-checks.yml` runs the same lint, build and staging on every pull request.

Rollback: revert to a known good commit. The pre-React static pages (index.html, build-log.html, lab-notes/*.html) were removed when the site moved to pre-rendered React and are still in Git history.

The enclosing workspace is not the public repository. Never publish its control/ directory. Historical Lab Notes and Build Log entries describe past tools and integrations; they are not current operating instructions.
