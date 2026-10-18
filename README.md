# LittleDevLab website

This is a static website with one React page. index.html, build-log.html, lab-notes/ and build-log/ are plain HTML/CSS/JavaScript with no build step. The products page is a React + Vite app in `app/`, built during deployment. Google model-viewer and other remote resources still require network access. The intent is to ensure tyson has a grip on what automation is being done.

## Local preview

Static pages: from this directory, `python3 -m http.server 8000`, then open http://localhost:8000. The Products link 404s here, because that page is built from `app/`.

Products page: `cd app && npm install && npm run dev`. See app/README.md.

Main pages: index.html, products (built from app/), build-log.html, lab-notes/index.html. Keep images/, lab-notes/, build-log/, and tools/ in their existing relative positions. tools/ contains optional offline asset utilities, not runtime dependencies.

## Deployment

Publish this directory as the root of the public Git repository. Its .github/workflows/deploy.yml retains the existing Cloudflare Pages deployment on main and manual dispatch. It builds `app/` with Node 22, publishes the result as `products.html` plus `assets/`, and stages the static files beside it. It requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets and publishes an explicit staging directory. If the build fails, nothing deploys and the live site stays on its last good version. No control repository is required to serve the site.

Rollback: revert to a known good commit. The pre-React static products page was removed on 2026-10-16 and is still in Git history.

The enclosing workspace is not the public repository. Never publish its control/ directory. Historical Lab Notes and Build Log entries describe past tools and integrations; they are not current operating instructions.
