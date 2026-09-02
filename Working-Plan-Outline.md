# LittleDevLab Working Plan: Innovator Site, Agentic AI Skills, and the Surf 2 Remodel Page

**Owner:** Tyson Bell  
**Drafted:** August 26, 2026  
**Last updated:** August 30, 2026  
**Status:** Living plan — Phase 0 (hosting) complete, Phase 1 (site v2) well underway

---

## Status Summary (as of 2026-08-30)

In the four days since this plan was drafted, execution has outpaced the original phasing — Phase 0 and a good chunk of Phase 1 are done:

*   **Hosting migration (Phase 0) — done.** Repo moved to GitHub, Cloudflare Pages project created, and `.github/workflows/deploy.yml` auto-deploys `main` on every push. littledevlab.com is live off GoDaddy.
*   **Site redesign — done.** Retheme to a drafting-blueprint palette (paper/ink/rust, monospace type, title-block header/footer strip) shipped 8/29.
*   **Product catalog — grown from 2 to 6.** Added Trading Card Display, Hunter Douglas Remote Wall Mount family, Steak Knife Holder, and ZBiotic Six-Pack Gift Carrier alongside the original glasses holder and coasters. Steak knife holder now also offers Classic Birch and Black Walnut color options.
*   **Product pages — now interactive.** Each product embeds a `<model-viewer>` 3D preview plus black/white (and material) color-variant renders; variant/color chips moved above the fold across all products. An anchor-link scroll bug on direct page loads was fixed along the way.
*   **New: Build Log workstream (Section 8).** Started a `build-log/` folder of short, dated markdown entries — roughly 2 per day — logging what shipped and why. This is the seed for a future `/build-log` (or similar) page on the site: a public stream of "what changed today," separate from the deeper milestone posts planned for Lab Notes.
*   **Still spec-only / not started:** Agentic framework formalization (Workstream C), the five skill-track Lab Notes posts (Workstream D), Surf 2 Remodel page + back-office toolkit (Workstream E), and both pilots (Sections 11–12).

See Section 10 for the full, dated decision log.

---

## 1\. Vision

Turn littledevlab.com from a product showcase into a working lab notebook: a public record of building real skill in agentic AI, 3D design/print, Python, home automation, and AI-assisted home remodeling — with each skill track documented as you learn it, using free or near-free cloud tooling wherever possible. One section of the same site also introduces a lightweight business page for your contractor's "Surf 2 Remodel" outfit, sized for a two-person shop where he works the trade and his wife handles light admin.

One site, one shared infrastructure:

1.  **littledevlab.com** — your innovator portfolio + learning log + product showcase (glasses/lens holder, Chilewich coaster holders, and whatever comes next).
2.  **littledevlab.com/surf\_2\_remodel** — a single page within the same site introducing the contractor's business, pointing out to a dead-simple back-office toolkit his wife can actually run. No separate site or hosting needed for this.

---

## 2\. Guiding Principles

*   **Free/low-cost first.** Every tool recommendation below has a free tier sufficient for a one-person lab or a two-person trade business. Upgrade only when a specific limit is actually hit.
*   **Static where possible.** A static site (HTML/CSS/JS, no server to patch) is the most secure hosting posture available — there's no database or server-side code to compromise. Dynamic needs (contact forms, receipt uploads) get bolted on via managed services, not custom backends.
*   **Document as you build.** Each skill track produces a "lab notes" page on the site — this is both the learning record and the content strategy for the site.
*   **Agentic AI does the scaffolding, you do the judgment.** Use agent pipelines to draft, research, and generate — but every publish, every business tool config, and every client-facing artifact gets a human review pass before it goes live.

---

## 3\. Workstream A — Rebuild littledevlab.com as an Innovator Site

**New information architecture:**

| Section | Purpose |
| --- | --- |
| Home | Innovator intro + current focus + featured build |
| Lab Notes | Blog-style log — one post per skill milestone (5 tracks below) |
| Products | 3D print catalog — 6 products live: glasses/lens holder, Chilewich coasters, trading card display, Hunter Douglas remote mount family, steak knife holder, ZBiotic gift carrier — each with interactive `<model-viewer>` 3D preview and color-variant chips |
| Projects | Larger case studies: home remodel AI workflow, home automation setup, agent pipelines you've built |
| Surf 2 Remodel (`/surf_2_remodel`) | One dedicated page introducing the contractor's business — kept visually distinct (own header/color accent) but hosted as part of littledevlab.com, no separate site |
| About / Contact | Who you are, what "LittleDevLab" means, contact form |

**Build approach:** Keep it a static site (current `index.html` architecture already fits this). Lab Notes posts are hand-written HTML for now — no build tooling required to get started. **Eleventy** is the confirmed upgrade path once the post count makes hand-editing nav/index pages tedious (rough trigger: past ~10 posts). Eleventy is a good fit here because it still outputs plain static HTML/CSS (no framework runtime, nothing that changes your free-static-hosting plan in Workstream B) and has a shallow learning curve compared to Astro or Hugo.

---

## 4\. Workstream B — Hosting: Getting Off GoDaddy

**Status: Done (2026-08-28).** Repo is on GitHub, the Cloudflare Pages project is live, and `.github/workflows/deploy.yml` deploys `main` automatically via `wrangler-action` — typical deploy time under a minute. GoDaddy is no longer in the loop.

GoDaddy shared hosting is neither free nor particularly secure by default (shared server, historically a target for mass-compromise campaigns via outdated PHP/plugins). Since the site is static HTML, you don't need a traditional host at all — you need a CDN-backed static host, which is both free and more secure by construction.

| Host | Free tier | Custom domain | Notes |
| --- | --- | --- | --- |
| **Cloudflare Pages** | Unlimited bandwidth/requests, 500 builds/mo | Yes, free SSL | Best free bandwidth ceiling; adds Cloudflare's security/CDN layer in front automatically. **Recommended default.** |
| **Netlify** | 100GB bandwidth/mo, 300 build min, forms + serverless functions included | Yes, free SSL | Best if you want built-in form handling (contact forms, contractor intake) without wiring a separate service. |
| **GitHub Pages** | Free, generous | Yes, free SSL | Simplest possible setup, ties naturally into using GitHub as your version-control/learning log anyway. Good option if you want the repo itself to be part of the public "lab notes" story. |

**Recommendation:** Cloudflare Pages for littledevlab.com (best security posture + free bandwidth), with the repo hosted on GitHub either way — GitHub becomes your free CI/CD trigger (push to `main` → auto-deploy) and doubles as a visible record of the build process, which fits the "innovator" narrative.

**Domain:** Keep the domain registration wherever it is now (or move registration only, not hosting, to a cheaper registrar like Cloudflare Registrar/Namecheap at-cost pricing) — just repoint DNS to the new static host. This is a low-risk, reversible first move and a good literal "Phase 0" task.

**Local development home:** The site repo's working copy moves from its current location to `~/Development/Projects/littledevlab/` (Tyson's existing iCloud-backed `Development` folder). One tradeoff worth naming: `Development` syncs via iCloud Drive, which carries the same general risk flagged earlier for Google Drive — iCloud doesn't support excluding a single subfolder from sync, so the live `.git` folder is exposed to sync timing issues and storage-optimization eviction. This is judged acceptable here specifically _because_ GitHub is already the canonical copy (Workstream B) — if the local iCloud copy ever gets flaky, the fix is just deleting it and re-cloning from GitHub, not data loss. Recommend disabling "Optimize Mac Storage" for smoother day-to-day use, but it's not required.

_Note: moving the actual folder on Tyson's Mac is a step Tyson performs locally (Finder drag or_ `_mv ~/<current path> ~/Development/Projects/littledevlab_`_) — Cowork's file tools only reach folders explicitly connected to a session, so after the move, the new location needs to be reconnected as the working folder for future sessions to pick it up._

---

## 5\. Workstream C — Agentic AI Framework (Free/Cloud-First)

Goal: a repeatable pattern for "agent does the first draft, I review and publish" that you reuse across every skill track and the Surf 2 Remodel page — not a single monolithic pipeline.

**Decision: Claude/Cowork is the sole orchestration layer for now.** No separate no-code tool (n8n, Make, Zapier) is needed at this stage — Cowork already gives you file access, multi-step research, and judgment in one place, and adding a second orchestration tool before you've hit a real limitation would be premature infrastructure. Revisit this only if a specific need shows up that Cowork genuinely can't cover well: a fully unattended, schedule-triggered job that needs to run with no one reviewing the output (e.g., a nightly automated report). That's the one class of task Cowork isn't built for, since it works best with you in the loop.

| Layer | Free/low-cost option | Use case here |
| --- | --- | --- |
| Orchestration (primary, in use now) | **Claude (Cowork / Claude Code)** | Every pipeline below starts here — file access, multi-step research, and judgment in one place. Covers the plan for now; no other orchestration tool needed yet. |
| Code execution / compute | **GitHub Actions** (2,000 free minutes/mo on public repos, effectively unlimited on public repos) | Free CI/CD: auto-deploy site on push, run Python scripts on a schedule, run eval suites |
| Evals | **promptfoo** (open source, CLI) + **DeepEval** (open source, Python/pytest-native) | Promptfoo for comparing prompts/models and basic red-teaming; DeepEval for regression-testing any Python-based agent you build |
| Model access | Claude (what you have), plus free tiers of **Google AI Studio (Gemini)** for comparison evals | Running the same eval suite across providers is itself a good "AI evals" learning exercise |
| Home automation | **Home Assistant** (self-hosted, free, open source) | You already have this connected — it's the natural anchor for Workstream D's automation track |
| _Future, not needed yet_ | _n8n (self-hosted free, or free-tier cloud)_ | _Only worth adding once you have a genuinely unattended, scheduled job — e.g., "watch a folder, summarize, post a draft" with no human trigger. Revisit later, not part of the current build._ |

**Pattern to standardize:** every pipeline = trigger → agent draft → human review gate → publish. Document this pattern once on the Lab Notes page, then reference it from every subsequent post so the site itself teaches the framework.

---

## 6\. Workstream D — The Five Skill Tracks (Lab Notes Content Plan)

Each track becomes a recurring content category on the site, not a one-off project.

### 1\. 3D Design & Print (Shapr3D → Bambu Lab X1C)

You're already doing this. Next step is turning existing files (glasses holder, coaster holders, and everything else in the Bambu Files library) into "how I designed this" posts — CAD screenshots, iteration photos, print settings. This is the track with the most existing raw material.

### 2\. AI Evals

Learning path: start with promptfoo against your own prompts (e.g., the ones used to generate site copy or contractor content), then graduate to DeepEval for anything with agentic/multi-step behavior. Publish a lab-notes post per eval suite you build, with what it caught.

### 3\. Home Automation & Scripting

You already have Home Assistant connected. Natural arc: document current automations → write a Python or Node-RED script that extends one → wire it into a GitHub Actions pipeline for something scheduled (e.g., a weekly automation health report), with Cowork handling the drafting/review side of the pipeline.

### 4\. Python

Thread this through the other four tracks rather than treating it as standalone — every automation, eval script, and image-batch tool above is a Python exercise. Consider one dedicated "Python foundations" post series (environment setup, venvs, packaging a script as a CLI tool) since that's reusable infrastructure for everything else.

### 5\. AI-Assisted Home Remodeling

Tool chain: **Live Home 3D** (free, unlimited built-in Cycles rendering — good baseline photoreal renders without extra cost) and **Trimble SketchUp** (AI Render, now built into SketchUp 2026.1 — good for fast concept/mood-board variations from a prompt, though it leans stylized rather than fully photoreal). Pair both with a documented prompt-engineering pattern: model geometry in one of these tools first, then use text-prompt rendering passes to generate photoreal client-facing images, comparing outputs from both tools' AI renderers. This track doubles as a genuinely useful lead-gen skill for the contractor sub-business — visualizing a remodel before it's built is a strong sales tool.

---

## 7\. Workstream E — Surf 2 Remodel Page & Back-Office Toolkit

Design constraint: the contractor is excellent at the trade, not business ops; his wife can be trained on simple, repetitive tasks (uploading receipts, checking a dashboard) but shouldn't need to learn accounting software.

**Page (**`**littledevlab.com/surf_2_remodel**`**):** Not a separate site — one page on the existing static site, using its own header/accent color so it reads as "his business" rather than "your lab." No new hosting, no new domain, no new deploy pipeline. Needs: services offered, past work/photos, a contact/quote-request form (a simple Cloudflare Pages Function or Netlify Forms handles this without a backend, once the hosting move in Workstream B is done), and license/insurance info for trust signals.

**Back-office toolkit — sized for "wife can run it":** these are external tools linked from the page, not things you build — the page's job is credibility and intake, the toolkit below is where the actual business ops happen.

| Need | Free/low-cost tool | Why this one |
| --- | --- | --- |
| Invoicing + basic bookkeeping | **Wave** | Unlimited invoices/clients, free forever, includes basic accounting and bank reconciliation — one login covers most of what a two-person shop needs |
| Estimates from the job site | **Joist** | Purpose-built for trade contractors — estimates, approvals, deposits from a phone, free tier available |
| Receipt capture (the wife's task) | **Zoho Expense** free tier | Free mobile app, snap-a-photo receipt capture, up to 3 users free — this is the "upload receipts" task, designed for someone who isn't a bookkeeper |
| Scheduling/quotes intake | Contact form on the site → routed to email, or a free Calendly tier if he wants online booking | Keeps intake simple, no new login for clients |

**Rollout order for the contractor track:** (1) the `/surf_2_remodel` page + contact form first — he needs to be findable and look credible now; (2) Wave for invoicing next — replaces whatever ad hoc method he's using today; (3) Joist once the invoicing habit is established; (4) receipts/Zoho Expense last, once his wife has a simple one-task job to learn rather than a whole system.

---

## 8\. Workstream F — Build Log (Daily Changelog)

**Status: Started 2026-08-30.**

Separate from Lab Notes (Workstream A/D — deep, milestone-driven posts written once a skill track produces something worth teaching), the Build Log is a lightweight, frequent record of what actually shipped, day to day, on the site and the lab overall. It's the raw material a returning reader (or future Eleventy migration) can turn into a "recent activity" stream, and it doubles as an honest running record for this plan itself.

**Folder:** `build-log/` at the repo root (versioned in git, unlike the private `Progress Story`/`Objects Source` folders in Sections 11–12, since these entries are meant to become public-facing).

**Format:** one markdown file per entry, named `YYYY-MM-DD-NN-slug.md` (NN increments for multiple same-day entries), each with a short frontmatter block (`date`, `time`, `title`, `tags`, `commit`) and 2–4 sentences of plain narrative. See `build-log/README.md` for the full convention.

**Cadence:** roughly 2 entries per day for now — one per natural work session, not one per commit. Small related commits (e.g., a retheme plus its texture follow-up) collapse into a single entry.

**Backfill:** the four days of work since this plan was drafted (2026-08-27 through 2026-08-30) have been logged retroactively from git history to seed the folder — see the six entries currently in `build-log/`.

**Next step (not yet built):** a dedicated page — most likely `littledevlab.com/build-log` — that renders this folder as a reverse-chronological stream. Until that page exists, the folder is the source of truth and the entries are readable directly on GitHub.

---

## 9\. Phased Roadmap

| Phase | Focus | Rough scope | Status |
| --- | --- | --- | --- |
| **0 — Foundation** | Move littledevlab.com to Cloudflare Pages + GitHub; set up the repo as the "lab notebook" | 1 weekend | **Done (2026-08-28)** |
| **1 — Site v2** | Rebuild IA (Lab Notes, Projects, `/surf_2_remodel` placeholder page); publish first 3D-print retrospective posts using existing photos, hand-written HTML | 1–2 weeks | **In progress** — retheme, interactive 3D viewers, and 4 new products shipped; Lab Notes/Projects IA and `/surf_2_remodel` placeholder not started |
| **1.5 — Build Log** _(added 2026-08-30)_ | Stand up `build-log/` folder + convention as a lightweight daily changelog, ahead of a dedicated page | Ongoing | **Started (2026-08-30)** |
| **2 — Agentic framework** | Formalize the Claude/Cowork trigger → draft → review → publish pattern + GitHub Actions auto-deploy; write the "how this pipeline works" post | 1–2 weeks | Not started |
| **3 — Evals + Python track** | Install promptfoo/DeepEval, run first eval suite against something real (site copy, or a contractor form validator), publish results | 1–2 weeks | Not started |
| **4 — Home automation track** | Document current Home Assistant setup, ship one new automation via scripted pipeline | Ongoing | Not started |
| **5 — AI remodel track** | Pick one real or hypothetical remodel, run it through Live Home 3D + SketchUp AI Render, document the prompt-engineering workflow | 1–2 weeks | Not started |
| **6 — Surf 2 Remodel page + Wave** | Build the `/surf_2_remodel` page + contact form; set up Wave for invoicing | 1 weekend + iteration | Not started |
| **7 — Contractor back office** | Add Joist, then Zoho Expense for the wife's receipt workflow, with a short training walkthrough | Ongoing | Not started |
| **8 — Eleventy migration (when needed)** | Once Lab Notes passes ~10 hand-written posts, migrate the blog structure to Eleventy without changing the free static hosting setup | Trigger-based, not scheduled | Not started |

Phases 3–5 can run in parallel once Phase 2's pattern exists — they're independent content tracks sharing the same framework. Phase 6–7 (Surf 2 Remodel) is decoupled from your personal skill tracks and can start any time bandwidth allows, though it now lives in the same repo/deploy pipeline since it's a page, not a separate site.

---

## 10\. Decisions Confirmed

**2026-08-26**

1.  **Contractor presence:** No separate site. `littledevlab.com/surf_2_remodel` is a single page within the existing site — same repo, same hosting, same deploy pipeline. Simplifies Workstream E considerably (no second Cloudflare Pages project, no second domain).
2.  **Lab Notes tooling:** Hand-written HTML posts for now. **Eleventy** is the confirmed next step once that becomes tedious (~10 posts as the rough trigger) — chosen because it stays plain static output, so it doesn't disturb the free hosting setup in Workstream B.
3.  **Orchestration:** Claude/Cowork only for now. No n8n or other no-code automation tool being stood up at this stage — added back to the plan only if a genuinely unattended, scheduled task shows up that doesn't fit a review-in-the-loop pattern.

**2026-08-30**

1.  **Hosting executed:** Phase 0 completed exactly per the Workstream B recommendation — Cloudflare Pages + GitHub Actions, GoDaddy fully out of the loop.
2.  **Visual identity set:** Site retheme to a drafting-blueprint palette (paper/ink/rust, monospace type, title-block strip) — this is now the site's established look, not just a proposal.
3.  **Interactive product pages adopted ahead of schedule:** `<model-viewer>` 3D embeds and color/material variant chips are live on all 6 products now, rather than waiting for the Section 12 pipeline to generate them. The manual pattern being used today is effectively the template that pipeline will need to automate later.
4.  **Build Log started:** New `build-log/` folder + convention (Section 8) — a daily/twice-daily changelog, distinct from milestone Lab Notes posts, with a future dedicated site page as the next step.
5.  **Product catalog decision:** New products get added to the existing hand-coded `.product-block` pattern for now (steak knife holder, trading card display, Hunter Douglas mounts, ZBiotic carrier all shipped this way) — the templated Section 12 generator remains a "when it gets tedious" upgrade, same posture as the Eleventy trigger in decision 2.

---

## 11\. Pilot: Daily Progress Story Agent

This is the first real agentic pipeline for the project (not just AI-assisted) — it has a self-directed loop and a feedback signal it acts on without you in between. Chosen as the pilot because it uses existing raw material (3D print photos) and directly exercises Workstream C's "trigger → agent draft → review → publish" pattern from the inside, with the review happening _after_ publish via reader feedback rather than before.

**Concept:** A folder of curated photos gets turned into a daily post that tells an ongoing progress story. The photo's actual date is not the post's publish date — the agent is curating a narrative arc (early builds → iterations → setbacks → refined pieces), not dumping photos in date order. Readers can thumbs up/down each post; the next day's run reads that signal and adjusts.

**Folder structure:**

| Folder | Purpose | Public? |
| --- | --- | --- |
| `~/Development/Progress Story/` (iCloud Drive) | Curated source photos, staged for the story. Sibling to the repo, not inside it — lets Tyson add photos from his iPhone via Files/Photos → iCloud, and keeps it out of git entirely. | No — private, agent-only |
| `~/Development/Projects/littledevlab/images/lab-notes/` | Photos actually used in a published post | Yes — deployed with the site |
| `~/Development/Projects/littledevlab/lab-notes/state.json` | Tracks: which photos have been used, current story-arc position, feedback history | Committed to the repo (metadata only, not spoiler content) |

Keeping curated-but-unused photos out of the deployed repo matters because a public GitHub repo exposes everything in it, not just what's linked from the site — so "unused chapters" of the story need to stay in a folder the site never touches until the agent explicitly promotes one photo into `images/lab-notes/` on the day it's featured. Keeping `Progress Story` as a sibling folder (not a subfolder of the repo) also means there's no risk of it accidentally getting swept into a `git add .`.

**Daily loop:**

1.  Scheduled trigger (via the `schedule` skill) starts the run.
2.  Agent reads `state.json` (story position, used photos, yesterday's vote) and the `Progress Story` folder.
3.  Agent picks the next photo(s) for the story beat — not necessarily the next-oldest by date — and drafts the post, explicitly informed by yesterday's thumbs up/down (e.g., a thumbs-down prompts a different angle, length, or tone next time).
4.  Agent self-checks the draft against eval criteria (promptfoo/DeepEval — tone, length, no broken links) before publishing; revises itself up to a few tries.
5.  On pass: copies the chosen photo into `images/lab-notes/`, commits, pushes (GitHub Actions deploys), updates `state.json`.
6.  On repeated eval failure or an empty source folder: stops and flags you instead of publishing something unreviewed.

**Feedback capture (open build item):** The site is static, so a thumbs up/down click needs somewhere to write to. Recommended: a Cloudflare Pages Function + Cloudflare Workers KV (both free tier, and Cloudflare Pages is already the Workstream B hosting choice) — the button posts a vote, the function writes it to KV, and the next day's agent run reads it back before drafting.

**Status:** Spec only — not yet built. Tyson is curating the source photo folder at `~/Development/Progress Story/` (iCloud); build starts once there's enough material to run the first few days of the loop. Once this folder is connected to Cowork as a working folder, future sessions can read/write it directly.

---

## 12\. Pilot: Folder-Driven Product Site Generator

Generalizes the two hand-built product blocks (glasses/lens holder, Chilewich coasters) into a repeatable pipeline: drop a folder of photos + a 3D model file, get a published product page. This is the mechanism that scales the site as new prints get made, rather than hand-coding each new product block.

**Input contract — folder schema (the part Tyson controls):**

```
~/Development/Objects Source/<product-slug>/
    photos/          — raw phone photos, any filenames, any count
    model.3mf         — (or .stl/.step) the CAD file, at least one
    notes.md          — optional: what it is, colors/materials actually made, price idea, backstory
```

Lives outside the deployed repo, same reasoning as `Progress Story` — raw CAD files and unculled photos don't need to be publicly downloadable, and it keeps the git repo lean. `notes.md` matters more than it looks: it's what grounds the generated copy in facts instead of the agent inventing details from photos alone.

**Pipeline steps:**

1.  **Ingestion** — agent scans `Objects Source/` for slugs not yet reflected in the site's `images/`. For each new one: reads `notes.md`, checks photo quality, compresses/resizes for web (current photos run 1–5MB straight off iPhone — too heavy for a static site; this step fixes that automatically).
2.  **Content drafting** — agent drafts name, description, and feature bullets from photos + notes. Variant chips (color/size) are only listed if a matching photo actually exists — this is the completeness-eval logic (Section on the eyecare-organizer color-gap discussion) running _before_ publish instead of catching the gap after.
3.  **Template rendering, not freehand HTML** — a script (Python + templating) fills the existing `.product-block` pattern with generated content; the LLM supplies content, not layout. Keeps every product visually consistent as the catalog grows.
4.  **Self-check** — verify every image path resolves, every variant chip has a backing photo, HTML is well-formed; optionally run drafted copy through promptfoo for tone/length consistency with existing product blocks.
5.  **Human review gate** — preview the rendered block; Tyson approves or sends back for revision. Not skipped, since this publishes real product claims.
6.  **Publish** — commit, push, Cloudflare Pages auto-deploys (once Workstream B's hosting move is complete).
7.  **Optional stretch** — convert `.3mf`/`.step` to `.glb` and embed with the `<model-viewer>` web component so visitors can rotate the actual model instead of just viewing photos. Not needed for v1.

**Trigger:** since n8n isn't in the current toolset (Section 10, decision 3), the practical version is a scheduled Cowork task (`schedule` skill) that periodically checks `Objects Source/` for new slugs, runs steps 1–4 automatically, and messages Tyson for the Step 5 review gate rather than publishing unattended.

**Status:** Spec only — not yet built. As of 2026-08-30, the manual precursor exists: all 6 live products already use `<model-viewer>` + variant chips (Section 10, decision 6), which is the visual/template pattern this pipeline needs to automate. Next step is still creating the `Objects Source/` folder and one test product to build the actual ingestion pipeline against.

---

## Sources

*   [6 best free static website hosting services compared](https://appwrite.io/blog/post/best-free-static-website-hosting)
*   [I Tested 8 Free Website Hosts — Only 3 Work \[2026 Data\]](https://snapdeploy.dev/blog/deploy-website-free-2026-complete-guide)
*   [Zapier vs Make vs n8n in 2026: Where AI Agents Actually Fit](https://medium.com/@automation.labs/zapier-vs-make-vs-n8n-in-2026-where-ai-agents-actually-fit-1edbbeff85f3)
*   [n8n vs Make vs Zapier for AI Agents: 2026 Comparison](https://www.betterclaw.io/blog/n8n-vs-make-vs-zapier-ai-agents)
*   [Top 5 LLM Evaluation Frameworks in 2026, Compared | DeepEval](https://deepeval.com/blog/top-5-llm-evaluation-frameworks)
*   [DeepEval vs PromptFoo: Best LLM Evaluation Framework 2026](https://scrolltest.com/deepeval-vs-promptfoo-llm-evaluation-framework-2026/)
*   [The 6 best free invoicing software in 2026 | Zapier](https://zapier.com/blog/best-free-invoice-software/)
*   [Best Contractor Invoicing Software for 2026 | Joist](https://www.joist.com/blog/best-contractor-invoicing-software-2026/)
*   [Best Expense Tracking Apps for Small Businesses in 2026](https://use.expensify.com/resource-center/guides/best-business-expense-tracking-app)
*   [3D Rendering Software – Live Home 3D](https://www.livehome3d.com/useful-articles/3d-rendering-software)
*   [Trimble launches SketchUp AI for rendering and object generation](https://www.engineering.com/trimble-launches-sketchup-ai-for-rendering-and-object-generation/)