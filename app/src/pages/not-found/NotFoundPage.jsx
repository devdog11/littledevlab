import IsoCube from '../../components/IsoCube.jsx'
import Nav from '../../components/Nav.jsx'
import { SimpleFooter } from '../../components/SiteFooter.jsx'
import { URLS } from '../../site.js'
import labNotesCss from '../lab-notes/lab-notes.css?url'

// Served by Cloudflare Pages for any URL without a file (404.html at the root).
export function head() {
  return {
    title: 'Page not found — LittleDevLab',
    description: 'That page isn’t on LittleDevLab. Try the home page, Products, The Lab, Lab Notes or the Build Log.',
    path: '/404',
    noindex: true,
    styles: [labNotesCss],
  }
}

export default function NotFoundPage() {
  return (
    <>
      <Nav variant="header" ctaClassName="nav-cta" />

      <header className="lab-header">
        <div className="lab-header-inner">
          <div>
            <p className="lab-eyebrow">Error 404 · Part not found</p>
            <h1>This drawing isn’t in the set.</h1>
            <p>The page may have moved when the site was rebuilt, or the link has a typo. Everything that exists is one click away:</p>
          </div>
          <div className="lab-header-visual" aria-hidden="true">
            <IsoCube />
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <ul className="post-list">
            <li><h3><a href={URLS.home}>Home</a></h3><p className="excerpt">What LittleDevLab makes and why.</p></li>
            <li><h3><a href={URLS.products}>Products</a></h3><p className="excerpt">Photos, 3D models and prices for everything I print.</p></li>
            <li><h3><a href={URLS.lab}>The Lab</a></h3><p className="excerpt">Notes and log entries in one place, filterable by skill.</p></li>
            <li><h3><a href={URLS.labNotes}>Lab Notes</a></h3><p className="excerpt">Longer write-ups of what I learned building it.</p></li>
            <li><h3><a href={URLS.buildLog}>Build Log</a></h3><p className="excerpt">What shipped, day by day.</p></li>
          </ul>
        </div>
      </main>

      <SimpleFooter links={[["Home", URLS.home], ["Contact", URLS.contact]]} />
    </>
  )
}
