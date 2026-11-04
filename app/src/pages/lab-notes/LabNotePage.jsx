import Nav from '../../components/Nav.jsx'
import { SimpleFooter } from '../../components/SiteFooter.jsx'
import { longDate } from '../../content/dates.js'
import { loadNote } from '../../content/labNotes.js'
import { URLS } from '../../site.js'
import labNotesCss from './lab-notes.css?url'

export function loadData(params) {
  return loadNote(params.slug)
}

export function head(params, note) {
  return {
    title: `${note.title} — Lab Notes`,
    ogTitle: note.title,
    description: note.description,
    path: URLS.note(note.slug),
    image: note.image,
    type: 'article',
    styles: [labNotesCss],
  }
}

export default function LabNotePage({ data: note }) {
  return (
    // The wrapper class scopes this post's own rules in lab-notes.css.
    <div className={`note-${note.slug}`}>
      <Nav variant="header" current="Lab Notes" ctaClassName="nav-cta" />
      <main>
        <div className="container">
          <span className="tag">{note.category}</span>
          <h1>{note.title}</h1>
          <p className="post-meta">
            {longDate(note.date)} &middot; Lab Notes{note.status ? ` · Status: ${note.status}` : ''}
          </p>
          {/* Rendered from lab-notes/<slug>.md at build time (trusted repo content). */}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: note.html }} />
        </div>
      </main>
      <SimpleFooter links={[['All Lab Notes', URLS.labNotes], ['Home', URLS.home]]} />
    </div>
  )
}
