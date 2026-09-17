# LittleDevLab website

This is a standalone static HTML/CSS/JavaScript website. No package.json, lockfile, package install, compilation, or build command is required. Google model-viewer and other remote resources still require network access. The intent is to ensure tyson has a grip on what automation is being done.

## Local preview

From this directory: `python3 -m http.server 8000`, then open http://localhost:8000.

Main pages: index.html, products.html, build-log.html, lab-notes/index.html. Keep images/, lab-notes/, build-log/, and tools/ in their existing relative positions. tools/ contains optional offline asset utilities, not runtime dependencies.

## Deployment

Publish this directory as the root of the public Git repository. Its .github/workflows/deploy.yml retains the existing Cloudflare Pages deployment on main and manual dispatch. It requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets and publishes an explicit static-only staging directory. No control repository is required to serve the site.

The enclosing workspace is not the public repository. Never publish its control/ directory. Historical Lab Notes and Build Log entries describe past tools and integrations; they are not current operating instructions.
