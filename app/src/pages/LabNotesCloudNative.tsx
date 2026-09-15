import { ArticleLayout } from '../components/ArticleLayout';

export default function LabNotesCloudNative() {
  return (
    <ArticleLayout section="lab-notes">
      <main>
        <div className="container">
          <span className="tag">Agentic AI Skills</span>
          <h1>Cutting the Cord: Taking This Build From My Laptop to a Cloud-Native Workflow</h1>
          <p className="post-meta">September 2, 2026 · Lab Notes</p>

          <p className="lede">
            For most of this project, every session had one hard dependency: my Mac had to be open,
            online, and running the Claude desktop app. Claude worked through a bridge into a folder
            on my laptop — great for sitting down together in the evening, useless the moment I
            closed the lid. This is the log of untangling that: a real cloud IDE, a scoped GitHub
            token, a safety guardrail that stopped me from doing something I probably shouldn't
            have, and a merge conflict I caused myself by editing from two places at once.
          </p>

          <h3>Where This Started</h3>
          <p>
            The original setup was a device bridge: Claude reached a folder on my Mac, read and
            edited files there directly, and staged anything it needed to look at more closely. It
            worked well, but it was tethered — the laptop had to be on, awake, and running the
            desktop app for any of it to happen. CHANGES.md was already doing its job as the shared
            queue — I'd drop a request in the Open section, Claude would work it and move it to Done
            with a commit hash — but the whole loop still ran through one physical machine.
          </p>

          <h3>Standing Up a Real Cloud IDE</h3>
          <p>
            The first move was GitHub Codespaces — a full VS Code environment that runs against the
            repo in GitHub's own infrastructure instead of my machine. Claude drove the setup through
            its own browser tool: picked the <code>main</code> branch, a US West region, a 2-core
            machine, and landed in a live environment at a <code>github.dev</code> URL, editable from
            any browser, no laptop required to have it open. I asked the obvious follow-up before
            trusting it — what does this actually cost — and the answer turned out to be nothing for
            how I actually work.
          </p>
          <div className="example">
            <p className="example-source">From the cost research</p>
            <p>
              GitHub's Free tier includes 120 core-hours a month, which is 60 hours of runtime on a
              2-core machine, plus 15GB of storage. For evening and weekend edits to a small static
              site, that's not a budget I'm likely to bump into.
            </p>
          </div>

          <h3>Bringing Claude Into the Codespace</h3>
          <p>
            Once the Codespace existed, I wanted the same right-hand-panel Claude experience I'd
            gotten used to in VS Code on the Mac. It turned out to be the same install either way —
            Codespaces runs the same VS Code Marketplace mechanism whether the window is local or in
            a browser tab pointed at GitHub's servers. Extensions view, search "Claude Code,"
            install, sign in. No special cloud version, no separate setup path.
          </p>

          <h3>Giving Cowork Its Own Copy of the Repo</h3>
          <p>
            The deeper fix was decoupling this Cowork conversation from the laptop entirely, instead
            of just adding a second editing surface. Claude cloned the repo into its own persistent
            cloud workspace — a sandbox that isn't the Mac and isn't the Codespace, and stays alive
            between sessions on its own. Getting write access to a private repo meant a GitHub
            Personal Access Token, and I scoped it as tightly as GitHub allows: fine-grained, locked
            to just this one repository, permissioned for <code>Contents: Read and write</code> and
            nothing else, expiring in 90 days. The token itself lives in a credentials file on that
            cloud sandbox, permissioned so only that process can read it, and it was stripped back
            out of the visible remote URL right after the clone — it doesn't sit in plain sight in an
            ordinary <code>git remote -v</code>. While I was in the token settings anyway, I had
            Claude audit every token on the account; one was a redundant duplicate from an earlier
            session, and I had it deleted.
          </p>
          <div className="example">
            <p className="example-source">From the token audit</p>
            <p>
              Two fine-grained tokens existed side by side, both scoped to this same repo — one wired
              into the new cloud clone, one left over from earlier and never actually used anywhere.
              Rather than leave a live, unused credential sitting on the account, I confirmed it was
              safe to remove and had Claude delete it through the GitHub UI.
            </p>
          </div>

          <h3>The Guardrail I Didn't Expect</h3>
          <p>
            With the token in place, the obvious next step was full automation: an hourly scheduled
            task that would pull the repo on its own, no laptop, no Codespace, no me in the loop at
            all. Setting that up got refused — not by me, by Claude's own platform. A recurring,
            unattended task with a live credential embedded in its instructions tripped a safety
            classifier, and rather than finding a way around it, Claude stopped and explained the
            denial instead. That's the right instinct, even from the other side of it: a standing
            task holding a real credential, running with nobody watching, is exactly the shape of
            thing a safety system should be suspicious of — account owner or not, good intentions or
            not. We talked through the alternatives and I told Claude to use its judgment on how to
            proceed, which is where that particular thread paused, for now, in favor of the more
            pressing thing that happened next.
          </p>
          <div className="example">
            <p className="example-source">From the actual denial</p>
            <p>
              The tool's own error was blunt about it: permission for the action was denied by the
              platform's automation classifier, reason given simply as being blocked by that
              classifier. No workaround attempted, no obfuscation tried — just a stop and an
              explanation.
            </p>
          </div>

          <h3>Editing From Two Places Broke It, Predictably</h3>
          <p>
            Once both the Codespace and Claude's cloud clone could push to the same repo
            independently, they were bound to step on each other eventually — and they did, within a
            day. I'd edited CHANGES.md in Codespaces and pushed, while Claude's clone had separately
            pushed its own commits from a different request. My next sync in Codespaces came back
            with a divergent-branches error instead of a clean pull: two histories that had both
            moved forward from the same starting point and now needed to be reconciled instead of
            just fast-forwarded.
          </p>
          <div className="example">
            <p className="example-source">From the actual terminal</p>
            <p>
              The fix was one command run from the Codespaces terminal:{' '}
              <code>git pull --no-rebase --no-edit origin main</code>, which merges the two histories
              together instead of trying to rewrite one on top of the other. It resolved cleanly on
              its own — no conflict markers to hand-edit — and a follow-up <code>git push</code> put
              the merged result back on GitHub for both editing paths to share.
            </p>
          </div>

          <h3>Where It Actually Got Stuck</h3>
          <p>
            Everything above held up until I tried to actually rely on it day to day, and then two
            separate walls showed up. The first: Cowork's own cloud clone — the one meant to free
            this whole loop from my laptop — turned out to be able to read the repo perfectly (fetch,
            pull, diff, all fine) but not push to it. Every push attempt came back denied by a
            platform-level git proxy, not GitHub itself, with no setting either of us could find to
            grant it. The second wall showed up right after I fixed it: I got GitHub authentication
            working properly on my Mac's own bridge connection, only to discover that bridge can't
            delete files at all — not even the lock files git creates and normally cleans up on its
            own during a completely successful commit. Every git write through that bridge strands a
            lock behind it that blocks the next one.
          </p>
          <div className="example">
            <p className="example-source">From the actual proxy denial</p>
            <p>
              The error was specific enough to be useful: access was denied because the repo wasn't
              in "this session's authorized repository set," with a suggestion to add it — except
              neither of us could locate wherever that setting is supposed to live. Not a bug I could
              route around, and not one I tried to; a control like that existing at all is a
              reasonable thing for a platform to have, even when it's inconvenient for me personally.
            </p>
          </div>
          <p>
            Net effect: neither of the two "automated" paths can reliably push on its own right now.
            What actually works is a hybrid I didn't originally plan for — Claude reads and edits
            files directly in my connected Mac folder regardless of what device I'm on, but the git
            commit and push step comes back to an actual human at an actual terminal, either in that
            same folder or in Codespaces. That's a real compromise against the fully
            laptop-independent release model I was chasing at the top of this post, and I'd rather
            write that down plainly than pretend the loop closed cleanly.
          </p>

          <h3>Claude Code vs. Cowork, and Why I'm Using Both</h3>
          <p>
            People keep asking me what the difference actually is, so here's the honest answer from
            having now set up both. Cowork is the one holding the running history of this whole
            project — every CHANGES.md entry, weeks of Build Log backfills, the reasoning behind why
            a product description says what it says — because it's a persistent conversation I can
            pick back up from my phone, my laptop, or anywhere else, and it remembers what came
            before. Claude Code lives in the terminal, right next to the code, and its whole purpose
            is being the sharpest possible pair for actually writing and debugging it. I'll admit I
            haven't leaned on that side much yet on this particular project — Cowork's broader reach
            across git, the browser, and scheduling covered what I needed first — but now that a
            Codespace and the extension are both sitting there ready, that's the next thing on the
            list.
          </p>

          <h3>Where It Stands Now</h3>
          <p>
            Where this actually landed, plainly, since a post titled "Cutting the Cord" owes you the
            honest ending: laptop as default again, not laptop-optional. Claude still needs my Mac
            connected and the desktop app open to read or edit anything in this folder — the exact
            dependency this whole post set out to cut. The one real change from before any of this
            started is that publishing is now a single Commit & Push instead of a multi-step
            patch dance, which is worth something, but it's a smaller win than the title promised. A
            genuinely laptop-optional, fully cloud-native setup — Claude running agentic AI against
            this code with nothing of mine required to be open — is still unsolved. Both routes I
            tried to get there, Cowork's own cloud clone and my Mac's bridge running with full git
            permissions, hit walls neither of us could fully clear. Filing this one under "still
            struggling," not "done," and coming back to it once there's a real answer instead of
            another workaround. The cord, it turns out, is still attached — just a little longer than
            it used to be.
          </p>
        </div>
      </main>
    </ArticleLayout>
  );
}
