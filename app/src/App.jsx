import { Route, Routes } from 'react-router'
import { listPages, pathAliases } from './routes.js'

// Pages link to each other with plain <a href> (a full page load), not
// client-side <Link>s: every page is already pre-rendered HTML, and each page
// loads only its own stylesheet, so pages never inherit each other's CSS.
// The router maps the URL to the page that was loaded for it.
export default function App({ active }) {
  const { page, Component, data } = active
  const element = <Component params={page.params} data={data} />

  return (
    <Routes>
      {listPages()
        .filter((p) => p.file === page.file)
        .flatMap((p) => pathAliases(p))
        .map((path) => <Route key={path} path={path} element={element} />)}
      {/* Anything else the host served this HTML for (e.g. a trailing slash). */}
      <Route path="*" element={element} />
    </Routes>
  )
}
