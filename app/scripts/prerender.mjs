// Pre-render every page to static HTML (step 3 of `npm run build`).
//
// Runs after the two Vite builds:
//   dist/       browser build: the HTML template, JS chunks, CSS, manifest
//   dist-ssr/   build-time renderer (src/entry-server.jsx)
// For each page it renders the React tree to HTML, fills the template's head
// and #root, and writes a FLAT file at the page's real path (products.html,
// lab/index.html, lab-notes/<slug>.html, ...). Also writes sitemap.xml.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Render with React's production build, as the browser gets.
process.env.NODE_ENV = 'production'

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(appDir, 'dist')
const SITE_URL = 'https://littledevlab.com'

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
// dist/index.html is only the template; the home page overwrites it if it is a route.
await fs.rm(path.join(dist, 'index.html'))

const manifest = JSON.parse(await fs.readFile(path.join(dist, '.vite', 'manifest.json'), 'utf8'))
const { listPages, render } = await import(pathToFileURL(path.join(appDir, 'dist-ssr', 'entry-server.js')).href)

// Module-preload the page's own chunk and what it imports, so the browser
// fetches them alongside the entry script instead of after it.
function preloadTags(page) {
  const keys = [path.posix.join('src', page.module), ...(page.preload ?? [])]
  const files = new Set()
  const visit = (k) => {
    const chunk = manifest[k]
    if (!chunk || chunk.isEntry || files.has(chunk.file)) return
    files.add(chunk.file)
    ;(chunk.imports ?? []).forEach(visit)
  }
  keys.forEach(visit)
  return [...files]
    .filter((f) => !template.includes(`/${f}"`)) // already preloaded by Vite
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
}

const pages = listPages()
for (const page of pages) {
  const rendered = await render(page)
  // React 19 adds <link rel="preload" as="image"> for every eager <img>; on a
  // page with dozens of product photos that competes with what's on screen.
  // They aren't part of the component tree, so removing them is safe.
  const html = rendered.html.replace(/<link rel="preload" as="image"[^>]*\/>/g, '')
  const { headTags, lateHeadTags } = rendered
  if (!html.trim()) throw new Error(`${page.file}: rendered empty`)

  const out = template
    .replace('<!--app-head-->', [headTags, ...preloadTags(page)].join('\n    '))
    .replace('<!--app-late-head-->', lateHeadTags)
    .replace('<div id="root"></div>', `<div id="root" data-page="${page.file}">${html}</div>`)

  const file = path.join(dist, page.file)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, out)
  console.log(`  ${page.file.padEnd(52)} ${(out.length / 1024).toFixed(1)} kB`)
}

const urls = pages.map((p) => `  <url><loc>${SITE_URL}${p.path}</loc></url>`).join('\n')
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`Pre-rendered ${pages.length} page(s) into dist/`)
