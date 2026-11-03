// Build-time renderer, used only by scripts/prerender.mjs (never shipped).
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { headTags, lateHeadTags } from './head.js'
import { listPages, loadPage } from './routes.js'

export { listPages }

export async function render(page) {
  const active = await loadPage(page)
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={page.path}>
        <App active={active} />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: active.head, headTags: headTags(active.head), lateHeadTags: lateHeadTags(active.head) }
}
