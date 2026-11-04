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

## Stage 2: Build Log

| Decision | Why |
| --- | --- |
| The page is built from `build-log/*.md`; the 17 existing files were rewritten to match the live page, and the 11 entries that only existed on the page became new files | The live page is what readers saw (titles, times, tags and wording had drifted from the files). Nothing visible changes; the earlier file wording is still in git history (`45ff1f6`). |
| Markdown is rendered at build time by a small Vite transform (`app/build/markdown.js`, using `marked`) | No Markdown library ships to the browser; `x.md?meta` imports only the front matter for lists. |
| Front matter gained `skills:` | The Lab's skill filter reads it, so its hand-kept list can go. Existing skills came from `lab/lab-data.js`; new entries map from their tags. |
| Entries sort by date, then time of day | Works for new files without hand ordering. One visible change: on Sept 5 the 5:26 PM entry now sits above the 12:39 AM one. |
| Spaces restored around inline code (`via wrangler-action on`) | The old page's formatter had glued them to the words; the Markdown files already had the spaces. |
| Dates formatted by hand, not `toLocaleDateString` | Build-time and browser output must match exactly, whatever the visitor's locale or time zone. |
| Each entry has an `id` (its file name) | The Lab links to the exact entry (`/build-log#2026-10-01-01-...`). |
| Closing note now says the page is built from the folder | "Hand-rendered view of that folder for now" is no longer true. |
| `build-log/*.md` stays published | Those files were public URLs before; the staging step still copies the folder. |
| Pages now have `<!DOCTYPE html>` | The old build-log.html had none (quirks mode); a few pixels of vertical spacing changed. |

## Stage 3: The Lab

| Decision | Why |
| --- | --- |
| Ported `lab/lab-app.js` (htm + CDN React 18) to `app/src/pages/lab/LabPage.jsx` and removed `lab/` | Same components and markup in JSX; React now comes from the build, not unpkg. |
| Build Log items come from `build-log/*.md` front matter (`?meta`, no bodies) and link to the exact entry | Replaces the hand-kept `logs` list; The Lab now shows all 28 entries, not 17. |
| Lab Notes items come from a temporary module until stage 4 | Stage 4 replaces it with the notes' own front matter. |
| `?skill=` filter uses React Router's `useSearchParams` and applies after hydration | The pre-rendered page is the unfiltered list (good for no-JS readers and crawlers); reading the URL during hydration would mismatch the static HTML. |
| Products shipped = number of products in `app/products.js` | Was a hand-typed `6`. |
| Kept the prototype's stylesheet order: Lab Notes sheet, theme, then `lab.css` | `lab.css` relies on loading after the theme. |
| Gave the two series buttons padding | The shared base sheet has no `.btn` rule, so they rendered as bare text blocks. |

## Stage 4: Lab Notes

| Decision | Why |
| --- | --- |
| Markdown (`lab-notes/<slug>.md`) rendered at build time, not MDX | The posts are prose plus a few styled HTML blocks; Markdown allows inline HTML, so no MDX compiler or JSX-in-content is needed. |
| Converted with a script that round-trips every block through the site's own renderer and keeps a block as raw HTML if it doesn't come back identical | Guarantees the text and structure are unchanged. Result: all six posts render to the same DOM as the old pages. Prose, headings and plain lists are Markdown; callouts, step lists, figures, tables, the option cards and 4 `<pre>` blocks stay HTML. |
| Six posts + the index page = the 7 old files | The index list is now generated from front matter. |
| Front matter also carries `excerpt`, `description`, `status`, `image` | The Lab's short `summary` and the Lab Notes list's longer teaser were different texts; the meta description and the deploy post's "Status: gate enforced" line had to live somewhere. |
| One `lab-notes.css` for all posts; each post's extra rules are scoped with `:where(.note-<slug>)` | The seven `<style>` blocks shared a base and differed in post-specific rules (two posts styled `code` differently). `:where()` adds no specificity, so each post keeps exactly its old cascade. |
| Narrowed one theme rule: `#root section + section` became `#root > section + section` | The old Products app needed it; now that every page renders in `#root` it drew rules between the deploy post's inner sections. Top-level sections still get the separator. |
| Each note is its own chunk, modulepreloaded on its page | A post downloads only its own text. |
| Same-day notes order by file name, Z to A | Keeps the old list order (Aug 31: prompt engineering, then hands-on labs) without a manual order field. |
| Post links and images use clean absolute URLs (`/lab-notes/x`, `/images/...`) | Same targets, no redirect; relative `../` paths would break at `/lab-notes/x` without `.html`. |

## Stage 5: Home

| Decision | Why |
| --- | --- |
| Markup converted from index.html by a script (HTML to JSX), then wired up by hand | Keeps every class, id and string as it was; the screenshots at 1280px and 390px match the old page. |
| Scroll reveal: a `<Reveal>` wrapper (same elements the old script picked: section headers, about blocks, contact blocks, title block) | React owns the class instead of a script adding it after load. |
| Gallery: a data list + the shared `Lightbox`; tiles are buttons for the keyboard (Enter/Space opens, Escape closes, focus returns to the tile) | The old tiles were click-only `div`s. |
| Contact form: same FormSubmit AJAX call, button states and mailto fallback, in `ContactForm.jsx`; the form also has `action`/`method` pointing at FormSubmit | With JavaScript off, the form now still sends (FormSubmit's own thank-you page) instead of doing nothing. |
| `blueprint.js` became `useDimension` + `DimensionLabel` (ResizeObserver, state) | Labels start empty in both the static HTML and the first render, then fill in, so hydration never mismatches. |
| Hash re-scroll after load ported as `useHashScrollFix` | Same double-rAF + 600 ms correction as the inline script. |
| Scroll spy kept: the Nav highlights the home dropdown link for the section in view | Same behavior as the old script. |
| The old home script's product helpers (`setProductColor`, `toggle3D`, Hunter Douglas/coaster/glasses swaps) were dropped | The home page has no product blocks or 3D viewers; that code was left over from before Products moved to its own page. The model-viewer color swap lives in `ProductBlock.jsx` (already React). model-viewer no longer loads on the home page. |
| Theme rule `#root > section + section` became `:where(#root) > section + section` | With an id in it, the rule out-ranked `#custom`'s dark top border; `:where()` gives it the same weight as the old `body > section + section`. |

## Stage 6: cleanup and deploy

| Decision | Why |
| --- | --- |
| Removed `index.html`, `build-log.html`, `lab-notes/*.html`, `partials/site-nav.html`, `tools/sync-nav.py`, `images/theme/blueprint.js` | Each is now produced or replaced by `app/` (pages, `Nav`, `useDimension`). |
| Kept `font-specimens.html` | Not part of the site or the deploy; it's a type reference page, not something this work replaced. |
| Workflows: same trigger, `production` environment and attribution check; the build step runs `npm run build` (pre-render) and staging is `tools/stage-site.sh` | Both workflows now build and check the full pre-rendered site, with one shared staging script. |
| Staging publishes `app/dist` + `images/` + `build-log/*.md`; `lab/` is now published too | The old deploy never copied `lab/`, so the menu's "Lab Journey" link would have 404'd in production. |
| Product "Order" links use `/#contact` | Same target as `/index.html#contact`, without the redirect. |
