// The Lab: landing page for Lab Notes + Build Log. Ported from the CDN React
// prototype (lab/lab-app.js + lab-data.js); its lists now come from the
// Markdown front matter of the notes and the Build Log entries.
import { useMemo, useState, useSyncExternalStore } from 'react'
import { useSearchParams } from 'react-router'
import products from '../../../products.js'
import Nav from '../../components/Nav.jsx'
import { SimpleFooter } from '../../components/SiteFooter.jsx'
import { buildLogIndex } from '../../content/buildLogIndex.js'
import { newestFirst, shortDate } from '../../content/dates.js'
import { experimentsIndex } from '../../content/experimentsIndex.js'
import { labNotesIndex } from '../../content/labNotesIndex.js'
import { URLS } from '../../site.js'
import labNotesCss from '../lab-notes/lab-notes.css?url'
import labCss from './lab.css?url'

export function head() {
  return {
    title: 'The Lab — LittleDevLab',
    description: 'Hands-on AI, automation and 3D-design work, documented: Lab Notes write-ups and the Build Log of what shipped.',
    path: URLS.lab,
    styles: [labNotesCss],
    lateStyles: [labCss],
  }
}

export function loadData() {
  const notes = labNotesIndex()
    .map((n) => ({ ...n, kind: 'note', href: URLS.note(n.slug) }))
    .sort(byDateDesc)
  const logs = buildLogIndex()
    .map((l) => ({ ...l, kind: 'log', href: `${URLS.buildLog}#${l.slug}` }))
    .sort(newestFirst)
  const experiments = experimentsIndex().map((e) => ({ href: URLS.experiment(e.slug), title: e.title }))
  return { notes, logs, experiments, products: products.length }
}

// Newest date first; same-day items keep their order (notes before logs).
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)

// false while hydrating (matches the pre-rendered HTML), true after.
const subscribeNever = () => () => {}
function useHydrated() {
  return useSyncExternalStore(subscribeNever, () => true, () => false)
}

function Cover({ notes, logs, productCount }) {
  return (
    <header className="lab-header lab-cover">
      <div className="container">
        <p className="lab-eyebrow">Sheet index · LittleDevLab</p>
        <h1>The Lab</h1>
        <p className="lab-cover-lede">Learning by building: agentic AI, automation, CI/CD and 3D design. Every project is written up in Lab Notes, and every change that ships is in the Build Log.</p>
        <dl className="lab-stats">
          <div><dt>Lab Notes</dt><dd>{notes.length}</dd></div>
          <div><dt>Builds logged</dt><dd>{logs.length}</dd></div>
          <div><dt>Products shipped</dt><dd>{productCount}</dd></div>
        </dl>
      </div>
    </header>
  )
}

function SeriesCard({ sheet, title, blurb, items, href, cta, limit = 3 }) {
  return (
    <article className="lab-series bp-panel">
      <p className="lab-sheet-no">Sheet series {sheet}</p>
      <h2><a href={href}>{title}</a></h2>
      <p>{blurb}</p>
      <ol className="lab-mini-list">
        {items.slice(0, limit).map((i) => (
          <li key={i.href}>{i.date && <><span className="lab-date">{shortDate(i.date)}</span> </>}<a href={i.href}>{i.title}</a></li>
        ))}
      </ol>
      <a className="btn btn-primary" href={href}>{cta}</a>
    </article>
  )
}

function Pinned({ notes }) {
  const pinned = notes.filter((n) => n.pinned)
  return (
    <section className="lab-section" aria-labelledby="pinned-h">
      <div className="container">
        <span className="tag">Case studies</span>
        <h2 id="pinned-h">Start here</h2>
        <div className="lab-pinned">
          {pinned.map((n, i) => (
            <a className="lab-case bp-panel" href={n.href} key={n.href}>
              <span className="lab-sheet-no">L-{String(i + 1).padStart(2, '0')} · {n.category}</span>
              <h3>{n.title}</h3>
              <p>{n.summary}</p>
              <span className="lab-skills">{n.skills.join(' · ')}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const KINDS = [['all', 'Both'], ['note', 'Lab Notes'], ['log', 'Build Log']]

function Activity({ all }) {
  const skills = useMemo(() => [...new Set(all.flatMap((i) => i.skills ?? []))].sort(), [all])
  const [kind, setKind] = useState('all')

  // ?skill=Agentic%20AI deep-links a filter, so a resume can point at one skill.
  // The pre-rendered page is unfiltered; the URL's filter applies once hydrated.
  const hydrated = useHydrated()
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('skill')
  const skill = hydrated && skills.includes(requested) ? requested : null

  function setSkill(next) {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        if (next) params.set('skill', next)
        else params.delete('skill')
        return params
      },
      { replace: true, preventScrollReset: true },
    )
  }

  const shown = all.filter((i) => (kind === 'all' || i.kind === kind) && (!skill || i.skills?.includes(skill)))

  return (
    <section className="lab-section" aria-labelledby="activity-h">
      <div className="container">
        <span className="tag">Activity</span>
        <h2 id="activity-h">Everything, newest first</h2>

        <div className="lab-filters">
          <div className="lab-chips" role="group" aria-label="Filter by skill">
            <button type="button" aria-pressed={!skill} onClick={() => setSkill(null)}>All skills</button>
            {skills.map((s) => (
              <button type="button" key={s} aria-pressed={skill === s} onClick={() => setSkill(skill === s ? null : s)}>{s}</button>
            ))}
          </div>
          <div className="lab-chips lab-kind" role="group" aria-label="Filter by type">
            {KINDS.map(([k, label]) => (
              <button type="button" key={k} aria-pressed={kind === k} onClick={() => setKind(k)}>{label}</button>
            ))}
          </div>
        </div>

        <p className="lab-count" aria-live="polite">{shown.length} {shown.length === 1 ? 'entry' : 'entries'}{skill ? ` tagged ${skill}` : ''}</p>

        <ol className="lab-timeline">
          {shown.map((i) => (
            <li key={i.kind + i.href} className={`lab-entry lab-entry--${i.kind}`}>
              <span className="lab-kind-badge">{i.kind === 'note' ? 'Note' : 'Log'}</span>
              <span className="lab-date">{shortDate(i.date)}</span>
              <a className="lab-entry-title" href={i.href}>{i.title}</a>
              {i.summary && <p>{i.summary}</p>}
              <span className="lab-skills">{(i.skills ?? []).join(' · ')}{i.commit ? <> · <code>{i.commit}</code></> : ''}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function LabPage({ data }) {
  const { notes, logs } = data
  const all = useMemo(() => [...notes, ...logs].sort(byDateDesc), [notes, logs])

  return (
    <>
      <Nav variant="header" current="The Lab (overview)" ctaClassName="nav-cta" />
      <div id="lab-root">
        <Cover notes={notes} logs={logs} productCount={data.products} />
        <main>
          <section className="lab-section">
            <div className="container lab-series-grid">
              <SeriesCard
                sheet="L" title="Lab Notes" href={URLS.labNotes} cta="Read the Lab Notes"
                blurb="Deep write-ups: what I tried, what broke, and why I landed where I did."
                items={notes}
              />
              <SeriesCard
                sheet="B" title="Build Log" href={URLS.buildLog} cta="Open the Build Log"
                blurb="Short, dated entries for every change that shipped, each with its commit."
                items={logs}
              />
              <SeriesCard
                sheet="E" title="Experimenting" href={URLS.experimenting} cta="See the experiments"
                blurb="Projects still on the bench, from 3D prints to code and home automation: in the works, failed and almost real."
                items={data.experiments}
                limit={Infinity}
              />
            </div>
          </section>
          <Pinned notes={notes} />
          <Activity all={all} />
        </main>
      </div>
      <SimpleFooter links={[['Lab Notes', URLS.labNotes], ['Build Log', URLS.buildLog], ['Home', URLS.home]]} />
    </>
  )
}
