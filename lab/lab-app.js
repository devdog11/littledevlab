// The Lab: React landing page for Lab Notes + Build Log.
// No build step: React 18 UMD + htm (JSX-like tagged templates) from unpkg.
// When this moves into the real repo, port it to a route in site/app/.
(function () {
  const { useState, useEffect, useMemo } = React;
  const html = htm.bind(React.createElement);
  const DATA = window.LAB_DATA;

  const fmtDate = iso =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

  const notes = DATA.notes.map(n => ({ ...n, kind: "note" })).sort(byDateDesc);
  const logs = DATA.logs.map(l => ({ ...l, kind: "log" })).sort(byDateDesc);
  const all = [...notes, ...logs].sort(byDateDesc);
  const skills = [...new Set(all.flatMap(i => i.skills))].sort();

  // ?skill=Agentic%20AI deep-links a filter, so a resume can point at one skill.
  function readSkill() {
    const s = new URLSearchParams(location.search).get("skill");
    return skills.includes(s) ? s : null;
  }

  function Cover() {
    return html`
      <header class="lab-header lab-cover">
        <div class="container">
          <p class="lab-eyebrow">Sheet index · LittleDevLab</p>
          <h1>The Lab</h1>
          <p class="lab-cover-lede">Learning by building: agentic AI, automation, CI/CD and 3D design. Every project is written up in Lab Notes, and every change that ships is in the Build Log.</p>
          <dl class="lab-stats">
            <div><dt>Lab Notes</dt><dd>${notes.length}</dd></div>
            <div><dt>Builds logged</dt><dd>${logs.length}</dd></div>
            <div><dt>Products shipped</dt><dd>${DATA.products}</dd></div>
          </dl>
        </div>
      </header>`;
  }

  function SeriesCard({ sheet, title, blurb, items, href, cta }) {
    return html`
      <article class="lab-series bp-panel">
        <p class="lab-sheet-no">Sheet series ${sheet}</p>
        <h2><a href=${href}>${title}</a></h2>
        <p>${blurb}</p>
        <ol class="lab-mini-list">
          ${items.slice(0, 3).map(i => html`
            <li key=${i.title}><span class="lab-date">${fmtDate(i.date)}</span> <a href=${i.href}>${i.title}</a></li>`)}
        </ol>
        <a class="btn btn-primary" href=${href}>${cta}</a>
      </article>`;
  }

  function Pinned() {
    const pinned = notes.filter(n => n.pinned);
    return html`
      <section class="lab-section" aria-labelledby="pinned-h">
        <div class="container">
          <span class="tag">Case studies</span>
          <h2 id="pinned-h">Start here</h2>
          <div class="lab-pinned">
            ${pinned.map((n, i) => html`
              <a class="lab-case bp-panel" href=${n.href} key=${n.href}>
                <span class="lab-sheet-no">L-${String(i + 1).padStart(2, "0")} · ${n.category}</span>
                <h3>${n.title}</h3>
                <p>${n.summary}</p>
                <span class="lab-skills">${n.skills.join(" · ")}</span>
              </a>`)}
          </div>
        </div>
      </section>`;
  }

  function Activity() {
    const [skill, setSkill] = useState(readSkill);
    const [kind, setKind] = useState("all");

    useEffect(() => {
      const url = new URL(location.href);
      skill ? url.searchParams.set("skill", skill) : url.searchParams.delete("skill");
      history.replaceState(null, "", url);
    }, [skill]);

    const shown = useMemo(
      () => all.filter(i => (kind === "all" || i.kind === kind) && (!skill || i.skills.includes(skill))),
      [skill, kind]
    );

    return html`
      <section class="lab-section" aria-labelledby="activity-h">
        <div class="container">
          <span class="tag">Activity</span>
          <h2 id="activity-h">Everything, newest first</h2>

          <div class="lab-filters">
            <div class="lab-chips" role="group" aria-label="Filter by skill">
              <button type="button" aria-pressed=${!skill} onClick=${() => setSkill(null)}>All skills</button>
              ${skills.map(s => html`
                <button type="button" key=${s} aria-pressed=${skill === s} onClick=${() => setSkill(skill === s ? null : s)}>${s}</button>`)}
            </div>
            <div class="lab-chips lab-kind" role="group" aria-label="Filter by type">
              ${[["all", "Both"], ["note", "Lab Notes"], ["log", "Build Log"]].map(([k, label]) => html`
                <button type="button" key=${k} aria-pressed=${kind === k} onClick=${() => setKind(k)}>${label}</button>`)}
            </div>
          </div>

          <p class="lab-count" aria-live="polite">${shown.length} ${shown.length === 1 ? "entry" : "entries"}${skill ? ` tagged ${skill}` : ""}</p>

          <ol class="lab-timeline">
            ${shown.map(i => html`
              <li key=${i.kind + i.date + i.title} class=${"lab-entry lab-entry--" + i.kind}>
                <span class="lab-kind-badge">${i.kind === "note" ? "Note" : "Log"}</span>
                <span class="lab-date">${fmtDate(i.date)}</span>
                <a class="lab-entry-title" href=${i.href}>${i.title}</a>
                ${i.summary && html`<p>${i.summary}</p>`}
                <span class="lab-skills">${i.skills.join(" · ")}${i.commit ? html` · <code>${i.commit}</code>` : ""}</span>
              </li>`)}
          </ol>
        </div>
      </section>`;
  }

  function App() {
    return html`
      <${Cover} />
      <main>
        <section class="lab-section">
          <div class="container lab-series-grid">
            <${SeriesCard} sheet="L" title="Lab Notes" href="../lab-notes/index.html" cta="Read the Lab Notes"
              blurb="Deep write-ups: what I tried, what broke, and why I landed where I did."
              items=${notes} />
            <${SeriesCard} sheet="B" title="Build Log" href="../build-log.html" cta="Open the Build Log"
              blurb="Short, dated entries for every change that shipped, each with its commit."
              items=${logs} />
          </div>
        </section>
        <${Pinned} />
        <${Activity} />
      </main>`;
  }

  ReactDOM.createRoot(document.getElementById("lab-root")).render(html`<${App} />`);
})();
