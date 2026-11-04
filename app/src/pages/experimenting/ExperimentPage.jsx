// One experiment's detail page, rendered from experiments/<slug>.md.
// Uses the Lab Note post layout (dark sheet, figures, callouts).
import Nav from '../../components/Nav.jsx'
import { SimpleFooter } from '../../components/SiteFooter.jsx'
import { longDate } from '../../content/dates.js'
import { loadExperiment } from '../../content/experiments.js'
import { MODEL_VIEWER_SRC, URLS } from '../../site.js'
import labNotesCss from '../lab-notes/lab-notes.css?url'

export function loadData(params) {
  return loadExperiment(params.slug)
}

export function head(params, exp) {
  return {
    title: `${exp.title} — Experimenting`,
    ogTitle: exp.title,
    description: exp.description ?? exp.summary,
    path: URLS.experiment(exp.slug),
    image: exp.image,
    type: 'article',
    styles: [labNotesCss],
    // The 3D viewer script loads only when this experiment has a model.
    scripts: exp.model ? [MODEL_VIEWER_SRC] : [],
  }
}

export default function ExperimentPage({ data: exp }) {
  return (
    <div className={`experiment experiment-${exp.slug}`}>
      <Nav variant="header" current="Experimenting" ctaClassName="nav-cta" />
      <main>
        <div className="container">
          <span className="tag">{exp.status}</span>
          <h1>{exp.title}</h1>
          <p className="post-meta">{longDate(exp.date)} &middot; Experimenting</p>
          {exp.model && (
            <figure className="exp-model">
              <model-viewer
                src={exp.model}
                alt={exp.modelAlt ?? `Interactive 3D model of the ${exp.title}`}
                camera-controls=""
                auto-rotate=""
                auto-rotate-delay="0"
                rotation-per-second="18deg"
                shadow-intensity="1"
                exposure="1"
                environment-image="neutral"
              ></model-viewer>
              <figcaption>3D model · drag to rotate, scroll or pinch to zoom</figcaption>
            </figure>
          )}
          {/* Rendered from experiments/<slug>.md at build time (trusted repo content). */}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: exp.html }} />
        </div>
      </main>
      <SimpleFooter links={[['All experiments', URLS.experimenting], ['The Lab', URLS.lab], ['Home', URLS.home]]} />
    </div>
  )
}
