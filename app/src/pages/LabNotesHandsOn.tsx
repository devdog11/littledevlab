import { ArticleLayout } from '../components/ArticleLayout';

export default function LabNotesHandsOn() {
  return (
    <ArticleLayout section="lab-notes">
      <main>
        <div className="container">
          <span className="tag">Agentic AI Skills</span>
          <h1>Hands-On Labs Are How Solution Architects Actually Learn Agentic AI</h1>
          <p className="post-meta">August 31, 2026 · Lab Notes</p>

          <p className="lede">
            Enterprise Solution Architects pride themselves on being leaders in their core technology
            — but the job also means spending real cycles learning new tech, and the proliferation of
            AI has made that harder, not easier. So how do you run your business, stay on top of your
            stack, and still get deep enough into something new that you’re comfortable putting it in
            front of a customer?
          </p>

          <p>
            My answer: hands-on labs. Pick one AI product, actually explore its ecosystem, and play
            with different models inside it — rather than stopping at prompting a single tool well.
            Most SAs aren’t programmers, but the bar is moving past “prompt an AI product
            effectively” toward leveraging an AI platform: agentic AI, not just AI-assisted work.
          </p>

          <h2>Where I started: NotebookLM</h2>
          <p>
            Personally, I started with NotebookLM (Gemini). It’s an interesting entry point precisely
            because it demands a real understanding of AI ingestion before it gives you anything
            useful — a notebook is only as good as what, and how, you feed it.
          </p>

          <h2>What I watched go wrong</h2>
          <p>
            I watched plenty of people dump countless documents into a notebook — personal archives,
            corporate repositories — chasing a quick win against the sheer noise of enterprise
            product docs, Distinguished Architect and Tier 2 architect write-ups, and general SA
            “noise.” The problem showed up fast: uncurated content led to massive hallucination. Feed
            a model a pile of unvetted documents and it will confidently synthesize an answer from
            the worst of them right alongside the best.
          </p>

          <h2>The fix: curate before you ingest</h2>
          <p>
            That’s the actual opportunity — not one AI product, but combining several. First, scrub
            the content. Validate that a document is even accurate before it goes in. If you can’t
            find or confirm the author, have your product team validate it instead of trusting it on
            faith. From there —
          </p>

          <div className="callout">
            This is where my original draft trails off — the next step was “leverage the platform to
            clean…” and I want to finish it with the actual tools and steps I used, not a guess. More
            on the cleaning pipeline soon.
          </div>
        </div>
      </main>
    </ArticleLayout>
  );
}
