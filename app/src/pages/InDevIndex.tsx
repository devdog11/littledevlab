import { ArticleLayout } from '../components/ArticleLayout';

export default function InDevIndex() {
  return (
    <ArticleLayout section="in-development">
      <header className="lab-header">
        <div className="lab-header-inner">
          <div>
            <p className="lab-eyebrow">On the Workbench</p>
            <h1>In Development</h1>
            <p>
              Work that is open on the bench right now — part-finished models, half-proved ideas,
              and the things I am still arguing with. Lab Notes is what I learned after the fact;
              this is the state of play before it settles.
            </p>
          </div>
          <div className="lab-header-visual" aria-hidden="true">
            <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(160,150) scale(1.12)">
                <polygon points="-110,-40 0,-95 110,-40 0,15" className="edge-solid" />
                <polygon points="-110,-40 0,15 0,95 -110,40" className="edge-solid" />
                <polygon points="110,-40 0,15 0,95 110,40" className="edge-solid" />
                <g
                  fill="none"
                  stroke="#c8a96e"
                  strokeWidth="1.6"
                  opacity=".72"
                  strokeLinejoin="round"
                >
                  <polygon points="-80,-15 -67,6.5 -80,15 -93,-6.5" />
                  <polygon points="-38,6 -25,27.5 -38,36 -51,14.5" />
                  <polygon points="-80,18 -67,39.5 -80,48 -93,26.5" />
                  <polygon points="-38,39 -25,60.5 -38,69 -51,47.5" />
                  <polygon points="80,-15 67,6.5 80,15 93,-6.5" />
                  <polygon points="38,6 25,27.5 38,36 51,14.5" />
                  <polygon points="80,18 67,39.5 80,48 93,26.5" />
                  <polygon points="38,39 25,60.5 38,69 51,47.5" />
                </g>
                <g className="dim">
                  <line x1="-110" y1="40" x2="-110" y2="126" className="ext-line" />
                  <line x1="110" y1="40" x2="110" y2="126" className="ext-line" />
                  <line x1="-110" y1="118" x2="110" y2="118" className="dim-line" />
                  <line x1="-112.5" y1="115.5" x2="-107.5" y2="120.5" className="tick" />
                  <line x1="107.5" y1="115.5" x2="112.5" y2="120.5" className="tick" />
                  <text x="0" y="118" className="dim-text" textAnchor="middle" dy="-6">
                    165 mm
                  </text>
                </g>
                <line x1="-6" y1="15" x2="6" y2="15" className="center-mark" />
                <line x1="0" y1="9" x2="0" y2="21" className="center-mark" />
              </g>
            </svg>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <p className="lede">
            Same format as Lab Notes, different tense. Each entry below is something I am actively
            building — the spec it has to meet, what is working, and what is still unresolved.
            Entries graduate to <a href="/lab-notes/index.html">Lab Notes</a> once there is a
            finished lesson worth writing down.
          </p>

          <ul className="post-list">
            <li>
              <span className="tag">3D Design &amp; Print</span>
              <span className="status-badge validated">Model validated</span>
              <h3>
                <a href="/in-development/drawer-organizer.html">
                  Drawer Organizer: A Watertight STEP File Generated Straight From the Change
                  Request
                </a>
              </h3>
              <p className="post-meta">September 15, 2026</p>
              <p className="excerpt">
                A 165 × 148 × 70{'\u00a0'}mm open-top drawer organizer with 60 elongated-diamond wall
                cutouts, modeled parametrically in CadQuery from a written spec — 19.5% less
                material than solid walls, validated against every dimension in the ticket.
              </p>
              <p className="status-note">
                Open: no test print yet. The geometry passes validation; whether 2{'\u00a0'}mm walls with
                this much perforation survive a real drawer is still unproven.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </ArticleLayout>
  );
}
