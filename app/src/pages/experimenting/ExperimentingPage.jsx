// Experimenting: projects in progress (3D, code, home automation, anything).
// Built from experiments/*.md; each card links to its detail page.
import Nav from '../../components/Nav.jsx'
import { SimpleFooter } from '../../components/SiteFooter.jsx'
import { experimentsIndex } from '../../content/experimentsIndex.js'
import { URLS } from '../../site.js'
import labNotesCss from '../lab-notes/lab-notes.css?url'
import labCss from '../lab/lab.css?url'

export function head() {
  return {
    title: 'Experimenting — LittleDevLab',
    description: 'Ideas go through multiple iterations of dev before they’re real. This page lists in-the-works, failed, and almost-real experiments. What’s your idea?',
    path: URLS.experimenting,
    styles: [labNotesCss],
    lateStyles: [labCss],
  }
}

export function loadData() {
  return { experiments: experimentsIndex() }
}

export default function ExperimentingPage({ data }) {
  const { experiments } = data
  return (
    <>
      <Nav variant="header" current="Experimenting" ctaClassName="nav-cta" />
      <div id="lab-root">
        <header className="lab-header lab-cover">
          <div className="container">
            <p className="lab-eyebrow">Sheet series E · On the bench</p>
            <h1>Experimenting</h1>
            <p className="lab-cover-lede">Ideas go through multiple iterations of dev before they’re real. This page lists in-the-works, failed, and almost-real experiments. <a href={URLS.contact}>What’s your idea?</a></p>
          </div>
        </header>
        <main>
          <section className="lab-section" aria-labelledby="exp-h">
            <div className="container">
              <span className="tag">Latest projects</span>
              <h2 id="exp-h">What's on the bench</h2>
              <div className="lab-pinned lab-pinned--two">
                {experiments.map((e, i) => (
                  <a className="lab-case bp-panel" href={URLS.experiment(e.slug)} key={e.slug}>
                    <span className="lab-sheet-no">E-{String(i + 1).padStart(2, '0')}</span>
                    <h3>{e.title}</h3>
                    <p>{e.summary}</p>
                    <span className="lab-status">{e.status}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <SimpleFooter links={[['The Lab', URLS.lab], ['Products', URLS.products], ['Home', URLS.home]]} />
    </>
  )
}
