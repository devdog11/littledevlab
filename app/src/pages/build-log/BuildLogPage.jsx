import { Fragment } from 'react'
import IsoCube from '../../components/IsoCube.jsx'
import Nav from '../../components/Nav.jsx'
import SiteFooter, { Titleblock } from '../../components/SiteFooter.jsx'
import { buildLogEntries } from '../../content/buildLog.js'
import { longDate } from '../../content/dates.js'
import { URLS } from '../../site.js'
import buildLogCss from './build-log.css?url'

const TITLEBLOCK = [
  ['Title', 'Build Log'],
  ['Cadence', '~2 Entries / Day'],
  ['Source', 'build-log/*.md'],
  ['Dr. No.', 'littledevlab.com/build-log'],
]

export function head() {
  return {
    title: 'Build Log — LittleDevLab',
    description: 'A running record of what shipped on LittleDevLab — site changes, new products, and infrastructure moves — logged roughly twice a day.',
    path: URLS.buildLog,
    styles: [buildLogCss],
  }
}

export function loadData() {
  return buildLogEntries()
}

// Entries grouped under one label per day, newest day first.
function groupByDay(entries) {
  const days = []
  for (const entry of entries) {
    const last = days[days.length - 1]
    if (last?.date === entry.date) last.entries.push(entry)
    else days.push({ date: entry.date, entries: [entry] })
  }
  return days
}

function Entry({ entry }) {
  return (
    <div className="log-entry" id={entry.slug}>
      <div className="log-entry-card">
        <div className="log-entry-meta">
          <span className="log-entry-time">{entry.time}</span>
          {entry.tags?.map((tag) => <span key={tag} className="log-entry-tag">{tag}</span>)}
        </div>
        <h3>{entry.title}</h3>
        {/* Rendered from Markdown at build time (trusted repo content). */}
        <div className="log-entry-body" dangerouslySetInnerHTML={{ __html: entry.html }} />
        {entry.commit && <span className="log-entry-commit">commit {entry.commit}</span>}
      </div>
    </div>
  )
}

export default function BuildLogPage({ data: entries }) {
  return (
    <>
      <Nav current="Build Log" ctaClassName="btn nav-cta" />

      <header className="log-header">
        <div className="container">
          <div>
            <p className="log-eyebrow">Lab Notebook</p>
            <h1>Build Log</h1>
            <p>A running record of what actually shipped on LittleDevLab — site changes, new products, infrastructure moves — logged roughly twice a day, in the order it happened. For deeper "how I built this" write-ups, see Lab Notes (coming soon).</p>
          </div>
          <div className="log-header-visual" aria-hidden="true">
            <IsoCube />
          </div>
        </div>
      </header>

      <Titleblock items={TITLEBLOCK} reveal={false} />

      <section className="log-stream">
        <div className="container">
          <div className="log-stream-inner">
            {groupByDay(entries).map((day) => (
              <Fragment key={day.date}>
                <p className="log-day-label">{longDate(day.date)}</p>
                {day.entries.map((entry) => <Entry key={entry.slug} entry={entry} />)}
              </Fragment>
            ))}
            <div className="log-cta">
              <p>Entries live as markdown in <code>build-log/</code> in the repo — this page is built from that folder.</p>
              <a href={URLS.home} className="btn btn-outline">Back to LittleDevLab</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter titleblock={null} />
    </>
  )
}
