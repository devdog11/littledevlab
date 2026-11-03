# Decisions: React pre-render conversion

Choices made while moving littledevlab.com to a pre-rendered React site
(branch `theme/quiet-drafting-studio`). One line of reasoning each.

## Stage 1: router, Nav, pre-render

| Decision | Why |
| --- | --- |
| Pre-render with a 90-line build script (`app/scripts/prerender.mjs`) on Vite's own SSR build, instead of a plugin | The one maintained React-Router SSG plugin (vite-react-ssg) pins React Router 6 and react-helmet-async 1.x, which doesn't support React 19; the script adds no dependency and writes flat files exactly where we want them. |
| React Router 7 (`react-router`), declarative mode: `StaticRouter` at build time, `BrowserRouter` in the browser | Smallest React Router setup that pre-renders; no framework mode, no server. |
| Pages link to each other with plain `<a href>`, not `<Link>` | Every page is already static HTML, and each page keeps its own stylesheet (see below); full page loads mean one page's CSS never leaks into another. |
| Links use clean URLs (`/products`, `/build-log`, `/lab/`, `/lab-notes/`) | Cloudflare Pages serves those directly; the old `.html` spellings still work through Cloudflare's redirect. |
| Folder pages use a trailing slash (`/lab/`, `/lab-notes/`) as canonical | That is how Cloudflare serves `lab/index.html`; `/lab` would redirect to it. |
| Each page module exports `head()` (title, description, canonical, Open Graph, stylesheets) | The pre-render writes those tags into the static `<head>`; no head-manager library needed. |
| Each page keeps its own stylesheet, imported with `?url` and linked in the page's head, before or after `blueprint.css` as it was | The old pages each had their own `<style>` block with different rules; keeping them per page, in the same order relative to the theme, keeps every page looking the same. |
| Products CSS loads after the theme | That is the order the live Products page already had (Vite appended it after `blueprint.css`). |
| One lazy chunk per page (`import.meta.glob`), loaded before hydrating, plus `modulepreload` tags | Each page downloads only its own code, and the first browser render matches the static HTML. |
| `<div id="root" data-page="...">` tells the browser which page was pre-rendered | Hydrates the right page however the URL was spelled (`/x`, `/x.html`, trailing slash). |
| Strip React 19's automatic `<link rel="preload" as="image">` tags from the output | React adds one per eager `<img>`; on Products that's ~40 full-size photos competing with what's on screen. |
| `<noscript>` style shows `.reveal` content and the product photos when JavaScript is off | Pre-rendered HTML carries the fade-in class; without this, no-JS readers would see blank sections. |
| The Nav's menu lives in `app/src/site.js` (`MENUS`) | One list for every page; replaces `partials/site-nav.html` and `tools/sync-nav.py`. Products dropdown keeps the partial's order. |
| `tools/stage-site.sh` assembles `_public/` for both workflows | One staging script, so the PR check and the deploy can't drift apart. |
| `npm run serve` (`app/scripts/serve.mjs`) previews the build with Cloudflare's URL rules | `python3 -m http.server` doesn't map `/products` to `products.html`. |
| Added `sitemap.xml` to the build | Free once every page is listed in one place; lists canonical URLs. |
