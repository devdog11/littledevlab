// Every page the site pre-renders: its clean URL, the flat file it is written
// to, and the module that renders it. Page modules live in src/pages/<name>/
// and export:
//   default            the page component; receives { params, data }
//   head(params, data) title, description, canonical path, styles, ...
//   loadData(params)   optional, async: content the page needs (Markdown)
// The pre-render step and the browser both load the module (and its data)
// before rendering, so the first browser render matches the static HTML.

import { labNotesIndex } from './content/labNotesIndex.js'

// One lazy chunk per page, so each page only downloads its own code.
export const pageModules = import.meta.glob('./pages/*/*Page.jsx')

const STATIC_PAGES = [
  { path: '/products', file: 'products.html', module: './pages/products/ProductsPage.jsx' },
  { path: '/lab/', file: 'lab/index.html', module: './pages/lab/LabPage.jsx' },
  { path: '/build-log', file: 'build-log.html', module: './pages/build-log/BuildLogPage.jsx' },
  { path: '/lab-notes/', file: 'lab-notes/index.html', module: './pages/lab-notes/LabNotesIndexPage.jsx' },
]

// One page per lab-notes/<slug>.md. `preload` names the note's own chunk
// (as the build manifest keys it) so the pre-render can modulepreload it.
function notePages() {
  return labNotesIndex().map(({ slug }) => ({
    path: `/lab-notes/${slug}`,
    file: `lab-notes/${slug}.html`,
    module: './pages/lab-notes/LabNotePage.jsx',
    params: { slug },
    preload: [`../lab-notes/${slug}.md`],
  }))
}

export function listPages() {
  return [...STATIC_PAGES.map((p) => ({ params: {}, ...p })), ...notePages()]
}

// The other spellings a page answers to: Cloudflare redirects x.html to /x,
// but local previews and old links still use the .html file names.
export function pathAliases(page) {
  const { path, file } = page
  const aliases = new Set([path, `/${file}`])
  if (path.endsWith('/') && path !== '/') aliases.add(path.slice(0, -1))
  return [...aliases]
}

// Pre-rendered pages name themselves in <div id="root" data-page="...">, which
// is reliable however the URL was spelled. The dev server has no pre-rendered
// HTML, so fall back to matching the URL.
export function findPage(file, pathname) {
  const pages = listPages()
  if (file) return pages.find((p) => p.file === file) ?? null
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  return pages.find((p) => pathAliases(p).some((a) => (a.length > 1 ? a.replace(/\/$/, '') : a) === clean)) ?? null
}

export async function loadPage(page) {
  const load = pageModules[page.module]
  if (!load) throw new Error(`No page module ${page.module}`)
  const mod = await load()
  const data = mod.loadData ? await mod.loadData(page.params) : undefined
  return { page, Component: mod.default, data, head: mod.head(page.params, data) }
}
