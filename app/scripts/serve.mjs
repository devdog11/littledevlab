// Local preview of the built site, with Cloudflare Pages' URL rules:
//   /x.html -> 308 /x          /x/index.html -> 308 /x/
//   /x      -> x.html          /x (folder)   -> 308 /x/
//   unknown -> 404.html if present, else index.html (Pages' SPA fallback)
// Serves app/dist/ plus the repo's images/ folder at /images/.
// Usage: npm run serve [-- --port 4173]
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const roots = { '/images/': path.resolve(appDir, '..', 'images') }
const dist = path.join(appDir, 'dist')
const portArg = process.argv.indexOf('--port')
const port = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT ?? 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.glb': 'model/gltf-binary', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml', '.txt': 'text/plain',
}

const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile()

function resolve(urlPath) {
  for (const [prefix, dir] of Object.entries(roots)) {
    if (urlPath.startsWith(prefix)) return { file: path.join(dir, urlPath.slice(prefix.length)) }
  }
  if (urlPath === '/index.html') return { redirect: '/' }
  if (urlPath.endsWith('/index.html')) return { redirect: urlPath.slice(0, -'index.html'.length) }
  if (urlPath.endsWith('.html')) return { redirect: urlPath.slice(0, -'.html'.length) }
  const target = path.join(dist, urlPath)
  if (urlPath.endsWith('/')) return { file: path.join(target, 'index.html') }
  if (isFile(target)) return { file: target }
  if (isFile(`${target}.html`)) return { file: `${target}.html` }
  if (isFile(path.join(target, 'index.html'))) return { redirect: `${urlPath}/` }
  return { file: null }
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    const urlPath = decodeURIComponent(url.pathname)
    if (urlPath.includes('..')) return res.writeHead(400).end()
    const { file, redirect } = resolve(urlPath)
    if (redirect) return res.writeHead(308, { Location: redirect + url.search }).end()
    let status = 200
    let served = file
    if (!served || !isFile(served)) {
      const notFound = path.join(dist, '404.html')
      status = isFile(notFound) ? 404 : 200
      served = isFile(notFound) ? notFound : path.join(dist, 'index.html')
    }
    if (!isFile(served)) return res.writeHead(404).end('Not found')
    res.writeHead(status, { 'Content-Type': TYPES[path.extname(served).toLowerCase()] ?? 'application/octet-stream' })
    fs.createReadStream(served).pipe(res)
  })
  .listen(port, () => console.log(`Serving app/dist (+ ../images) at http://localhost:${port}`))
