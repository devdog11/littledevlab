import IsoCube from '../../components/IsoCube.jsx'
import Nav from '../../components/Nav.jsx'
import { SimpleFooter } from '../../components/SiteFooter.jsx'
import { longDate } from '../../content/dates.js'
import { labNotesIndex } from '../../content/labNotesIndex.js'
import { URLS } from '../../site.js'
import labNotesCss from './lab-notes.css?url'

export function head() {
  return {
    title: 'Lab Notes — LittleDevLab',
    description: 'A running log of skill-building milestones behind LittleDevLab: agentic AI, 3D design/print, Python, home automation, and AI-assisted remodeling.',
    path: URLS.labNotes,
    styles: [labNotesCss],
  }
}

export function loadData() {
  return labNotesIndex()
}

export default function LabNotesIndexPage({ data: notes }) {
  return (
    <>
      <Nav variant="header" current="Lab Notes" ctaClassName="nav-cta" />

      <header className="lab-header">
        <div className="lab-header-inner">
          <div>
            <p className="lab-eyebrow">Lab Notebook</p>
            <h1>Lab Notes</h1>
            <p>A running log of what I'm actually learning while building LittleDevLab — agentic AI, 3D design/print, Python, home automation, and AI-assisted home remodeling — documented as I go.</p>
          </div>
          <div className="lab-header-visual" aria-hidden="true">
            <IsoCube />
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <ul className="post-list">
            {notes.map((note) => (
              <li key={note.slug}>
                <span className="tag">{note.category}</span>
                <h3><a href={URLS.note(note.slug)}>{note.title}</a></h3>
                <p className="post-meta">{longDate(note.date)}</p>
                <p className="excerpt">{note.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SimpleFooter links={[['All Lab Notes', URLS.labNotes], ['Home', URLS.home]]} />
    </>
  )
}
