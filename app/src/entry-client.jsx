import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { applyHead } from './head.js'
import { findPage, loadPage } from './routes.js'

async function start() {
  const root = document.getElementById('root')
  const prerendered = root.dataset.page
  const page = findPage(prerendered, window.location.pathname)
  if (!page) return // Unknown URL in dev: nothing to render.

  // Load the page's code and content first, so the first render is identical
  // to the pre-rendered HTML and hydration has nothing to patch.
  const active = await loadPage(page)
  const app = (
    <StrictMode>
      <BrowserRouter>
        <App active={active} />
      </BrowserRouter>
    </StrictMode>
  )

  if (prerendered) {
    hydrateRoot(root, app)
  } else {
    applyHead(active.head)
    createRoot(root).render(app)
  }
}

start()
