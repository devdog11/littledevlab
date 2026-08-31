# Change Requests

Running log of site tweaks and fixes. Add new items under **Open** as you spot them;
Claude works from top to bottom, moves each to **Done** with a one-line note and the date
when it's committed.

Format for a new item:
`- [ ] Short description of what to change and where (page/section)`

---

## Open

* 2026.09.30.1600 - What is next in making this site non-static, building out a true form cration so people can order the products? Gernate a a section of the changes.md with things I must provide to enable the page to be built - ulimately really looking to have an agentic service running through my site development.
  * **Requirements list (delivered 2026-08-31):**
    1. Fulfillment model: real checkout (card payment at time of order) vs. order-request form that you confirm/price/invoice manually?
    2. Per-product order data: which variants are actually orderable today and a price for each.
    3. Payment processor, if real checkout: Stripe Payment Links/Checkout fits a static site with no backend.
    4. Where submissions should land: email inbox, a spreadsheet, or a lightweight form-to-backend service.
    5. Availability/inventory: anything time-sensitive, or effectively print-to-order/unlimited?
    6. Shipping: ship, local pickup only, or both?
  * **Status:** Open — awaiting your answers to 1-6 before this becomes a scoped build.

* 2026.09.30.1600 - Generate a list of what claud would need to build out a story that would post my Bootcamp learning journey. Assume we'll build out that story and post the code as a sub-topic of the page. And we'll build t over 2 week period, with daily updates as if I was doing it in real time. Just to make it look active.
  * **Requirements list (delivered 2026-08-31):**
    1. Which bootcamp (name/curriculum).
    2. **Confirm the work is real** — Working-Plan-Outline.md Section 11 specs a "Daily Progress Story Agent" for real, curated material published on a paced schedule; I'll build that version once you confirm this is genuine bootcamp work, not simulated activity.
    3. Source material per post: notes, code, screenshots from what you actually build each day.
    4. Where the code lives: a public repo linked per post, or inlined on the page.
    5. Cadence: scheduled task (one entry/day for 2 weeks) vs. manual trigger per post.
  * **Status:** Open — awaiting your confirmation on #2 before this becomes a build CR.

## Done

* 2026.09.30.1530 / 2026.09.30.1545 - Move Products to its own page; nav dropdown of all 6 products; 2x3 landing grid with alternating tile backgrounds; dimensions/blueprint image shifted below the product photo. **2026-08-31** — Built `products.html` (all 6 product-block sections + Gallery moved over), reordered `index.html` to Hero → How It's Made → About → Custom → Contact, added the nav dropdown (desktop hover + mobile expand) on both pages, added the 2x3 landing grid at the top of Products, and shifted `.product-gallery`'s background-position so the blueprint sits below the photo instead of behind it. All internal links (nav, mobile nav, footer, hero CTA) repointed accordingly. Commit: afae4ac.

* 2026.09.30.1650 - Prompt/Context Engineering Lab Notes post. **2026-08-31** — Drafted at `lab-notes/prompt-and-context-engineering.html` using your opening reflection and all 9 subheadings; each section has a `[NEEDS YOUR EXAMPLE]` placeholder since no real examples were supplied yet (went with option (b) from the proposed solution). Added "Lab Notes" to site nav/footer on both pages. Commit: afae4ac. **Update 2026-08-31:** filled all 9 placeholders with real, redacted examples pulled from other sessions (ServiceNow MCP build, a deploy-config bug, contact lens holder copy, this site's own credential rotation). Commit: 72bc1bc, pushed.

* 2026.09.31.0800 - SA hands-on-labs / NotebookLM Lab Notes post. **2026-08-31** — Drafted at `lab-notes/hands-on-labs-agentic-ai.html`, published truncated at the hallucination/curation point with a "more on the cleaning pipeline soon" callout, since the missing pipeline steps weren't supplied. Commit: afae4ac.
