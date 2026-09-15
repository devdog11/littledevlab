import { Fragment } from 'react';
import { Layout } from '../components/Layout';
import { LabHeaderVisual } from '../components/LabHeaderVisual';
import { buildLogDays } from '../data/buildLog';
import { SheetTitleBlock } from '../components/SheetTitleBlock';

export default function BuildLog() {
  return (
    <Layout current="build-log">
      <header className="log-header">
        <div className="container">
          <div>
            <p className="log-eyebrow">Lab Notebook</p>
            <h1>Build Log</h1>
            <p>
              A running record of what actually shipped on LittleDevLab — site changes, new
              products, infrastructure moves — logged roughly twice a day, in the order it happened.
              For deeper "how I built this" write-ups, see Lab Notes (coming soon).
            </p>
          </div>
          <LabHeaderVisual className="log-header-visual" />
        </div>
      </header>

      <SheetTitleBlock
        rows={[
          { label: 'Title', value: 'Build Log' },
          { label: 'Cadence', value: '~2 Entries / Day' },
          { label: 'Source', value: 'build-log/*.md' },
          { label: 'Dr. No.', value: 'littledevlab.com/build-log' },
        ]}
      />

      <section className="log-stream">
        <div className="container">
          <div className="log-stream-inner">
            {/* Day labels and entry cards must stay siblings inside
                .log-stream-inner — a wrapper element would break its timeline. */}
            {buildLogDays.map((day) => (
              <Fragment key={day.label}>
                <p className="log-day-label">{day.label}</p>
                {day.entries.map((entry, i) => (
                  <div className="log-entry" key={`${day.label}-${i}`}>
                    <div className="log-entry-card">
                      <div className="log-entry-meta">
                        <span className="log-entry-time">{entry.time}</span>
                        {entry.tags.map((tag) => (
                          <span className="log-entry-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Titles and bodies are authored HTML from this repo, never user input. */}
                      <h3 dangerouslySetInnerHTML={{ __html: entry.title }} />
                      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
                      {entry.commit && <span className="log-entry-commit">{entry.commit}</span>}
                    </div>
                  </div>
                ))}
              </Fragment>
            ))}

            <div className="log-cta">
              <p>
                Entries live as markdown in <code>build-log/</code> in the repo — this page is a
                hand-rendered view of that folder for now.
              </p>
              <a href="/index.html" className="btn btn-outline">
                Back to LittleDevLab
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
