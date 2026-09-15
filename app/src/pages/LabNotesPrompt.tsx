import { ArticleLayout } from '../components/ArticleLayout';

export default function LabNotesPrompt() {
  return (
    <ArticleLayout section="lab-notes">
      <main>
        <div className="container">
          <span className="tag">Agentic AI Skills</span>
          <h1>The Real Work of Agentic AI Is Prompt and Context Engineering</h1>
          <p className="post-meta">August 31, 2026 · Lab Notes</p>

          <p className="lede">
            I could probably build this site myself. I could even go into my ServiceNow instance and
            build the API integration by hand. But with Claude working alongside me, agentic AI just
            gets me to the end goal faster — way faster. The part that’s actually mine to learn isn’t
            the execution, it’s how I shape the request that produces it: prompt engineering, and
            underneath that, context engineering.
          </p>

          <p>
            Here’s the breakdown, one concept at a time, each with a real example pulled from actual
            sessions — a self-hosted ServiceNow MCP build, a Hunter Douglas remote-mount
            reverse-engineering job, a few edits to this site, and an email fix along the way. No
            generic definitions without something real underneath them.
          </p>

          <h3>Context Engineering</h3>
          <p>
            Everything the model sees before it answers, assembled on purpose: not just the prompt,
            but the system instructions, retrieved documents, tool descriptions, and conversation
            history working together. Prompt engineering shapes the ask; context engineering shapes
            everything the ask is answered against.
          </p>
          <div className="example">
            <p className="example-source">From the ServiceNow MCP build</p>
            <p>
              Asked how to make a task more agentic, I didn’t answer from general knowledge — I
              assembled three live sources in the same turn: a grep through my own planning doc
              (which ruled out setting up new Cloudflare infrastructure, since that was already
              live), a connector-registry search that surfaced an official pre-built option I was
              obligated to mention, and two web searches that found the real self-hosted package and
              Home Assistant add-on. The recommendation came from combining all three, not any one of
              them.
            </p>
          </div>

          <h3>System Instructions</h3>
          <p>
            The standing rules that shape every response in a session, independent of what's actually
            asked — tone, scope, what the agent is and isn't allowed to do by default.
          </p>
          <div className="example">
            <p>
              The clearest proof this one is real: it’s the same rule, unprompted, in every single
              agentic session I run — short replies, links instead of walls of text. I don’t ask for
              it per conversation. It sits above the conversation and shapes every reply inside it,
              which is the actual difference between a system instruction and a one-off request.
            </p>
          </div>

          <h3>User Input</h3>
          <p>
            The literal request. How much structure or ambiguity is left in it changes what comes
            back — a vague ask gets a generic answer, a specific one gets a usable one.
          </p>
          <div className="example">
            <p className="example-source">From this site’s own credential rotation</p>
            <p>
              I once pasted a live GitHub token straight into a chat, unredacted. That exact string is
              what got used, once, to rewrite a credential file — not reproduced here for obvious
              reasons, but it’s the cleanest example I have of input being used verbatim rather than
              interpreted.
            </p>
          </div>

          <h3>Conversation State</h3>
          <p>
            What the model retains from earlier turns. Handled well, it keeps a long session
            coherent; handled poorly, it drags stale or irrelevant context forward into a new ask.
          </p>
          <div className="example">
            <p className="example-source">From this site’s own change-request log</p>
            <p>
              I approve a batch of change requests once, in a single message. Every build step after
              that — a dozen or more tool calls, sometimes minutes apart — reuses those approvals
              without me repeating them. Same pattern in a Home Assistant add-on build: a security
              token generated once got reused silently across a blocked config write, a chat handoff,
              and a reinstall, days apart, without either of us retyping it.
            </p>
          </div>

          <h3>Retrieved Documents</h3>
          <p>
            External material pulled into context (RAG). This is exactly where the NotebookLM
            ingestion lesson lands — what you retrieve, and how well it's curated, sets the ceiling on
            accuracy.
          </p>
          <div className="example">
            <p className="example-source">From a littledevlab.com deploy bug</p>
            <p>
              A page edit I made “wasn’t showing up” on the live site. Reading the repo’s own GitHub
              Actions file — not the page, the deploy config — showed the site only rebuilds on git
              push, not on save. That one retrieved file flipped the diagnosis from “my edit is
              wrong” to “the edit is right, it just isn’t live yet,” which is a completely different
              fix.
            </p>
          </div>

          <h3>Tool Descriptions</h3>
          <p>
            How clearly a tool's purpose and parameters are described determines whether an agent
            picks the right tool and uses it correctly — an ambiguous description produces
            confidently wrong tool calls.
          </p>
          <div className="example">
            <p className="example-source">From the ServiceNow MCP build</p>
            <p>
              A git push failed with a permissions error I initially chalked up to iCloud sync
              flakiness — a known issue with this setup. The tool’s own description said otherwise: it
              explained that file deletion is blocked by default in a connected folder. That line is
              what pointed to the real cause and the real fix, not my first guess.
            </p>
          </div>

          <h3>Examples</h3>
          <p>
            Few-shot examples inside a prompt steer output format and tone more reliably than
            instructions alone — showing beats telling.
          </p>
          <div className="example">
            <p className="example-source">From the contact lens holder product page</p>
            <p>
              Instead of asking for “better product copy,” I handed over the raw facts as the sample
              to match: two lens prescriptions in one eye, one in the other, dailies that ship fused
              in five-day strips, and the specific annoyance of tearing loose two lenses instead of
              one while half awake. The published copy follows that exact shape — because I showed it,
              instead of describing what I wanted.
            </p>
          </div>

          <h3>Permissions</h3>
          <p>
            What the agent is actually allowed to do: read vs. write, which systems, and where a
            human has to approve before something goes live. This is exactly the layer the ServiceNow
            change-request workflow lives in.
          </p>
          <div className="example">
            <p className="example-source">From the ServiceNow MCP build</p>
            <p>
              I said flat out that Claude had my go-ahead to use my login for a lab instance,
              password included. It still declined to type the password into a form, even with
              explicit permission, calling it “a hard rule, not a judgment call.” My permission wasn’t
              sufficient to cross that particular line — which is the actual point of keeping
              permissions separate from instructions.
            </p>
          </div>

          <h3>Output Schemas</h3>
          <p>
            Constraining a response to a defined structure — a form, a ticket update, a specific JSON
            shape — so a downstream system can consume it without a human reformatting it first.
          </p>
          <div className="example">
            <p>
              This entire post is the example. I asked for exactly nine headings, in a fixed order,
              each either a real example or the literal words “None found” — and got back precisely
              that structure, not a paragraph I’d have had to reformat myself.
            </p>
          </div>
        </div>
      </main>
    </ArticleLayout>
  );
}
