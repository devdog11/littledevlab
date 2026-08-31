# LittleDevLab

Source for [littledevlab.com](https://littledevlab.com) — a multi-page site for the Little Development Lab based in the SF Bay Area that also sells what it builds. Our most popular builds are the custom 3D-printed home goods shop. Every product is designed from scratch in Shapr3D and printed on a Bambu Lab printer.

## Stack

Plain HTML/CSS/JS — no build step, no framework, no dependencies. Interactive 3D product previews are powered by Google's [`<model-viewer>`](https://modelviewer.dev/) web component, loaded from a CDN.

## Structure

```
index.html            Home page — hero, How It's Made, About, Gallery, Custom-order CTA, Lab Journey, Contact
products.html         Product catalog — all 6 products, in-page nav dropdown + landing grid
build-log.html        Twice-daily changelog of what shipped on the site
lab-notes/            Lab Notes — milestone blog posts on the skill tracks behind this lab
CHANGES.md            Change-request log — the working queue for site edits (see below)
images/               Product photos, renders, and 3D models
  glasses/
  coasters/
  gaming-card-display/
  hunter-douglass/
  knives-holder/
  six-pack-gift-zbiotic/
  profile/             Personal photos (About / Lab Journey)
Working-Plan-Outline.md   Working notes / project plan
```

Each product folder generally contains real product photos (customer/lifestyle shots), photorealistic color-variant renders, and the source 3D model (`.step` + `.glb`) used to generate the `<model-viewer>` embed.

## Products

*   Glasses + Contact Lens Holder
*   Chilewich Coaster Holder (round & hexagonal)
*   Trading Card Display Rack
*   Hunter Douglas Remote Wall Mount (1/2-Gang + 3M-claw mount, in black/white)
*   Steak Knife Holder
*   ZBiotic Six-Pack Gift Carrier

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which deploys the site as-is (static files, no build) to Cloudflare Pages via `wrangler-action`. Typical deploy time is well under a minute.

Requires two repo secrets to be set for deploys to work: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## ServiceNow enhancement sync

Daily product-enhancement tickets are filed in ServiceNow (instance `dev322229`) with **Category = `littledevlab`** on a Change Request. They get pulled into [CHANGES.md](CHANGES.md) rather than tracked in ServiceNow itself.

**Steps:**

1. File the ticket in ServiceNow as a Change Request with Category set to `littledevlab`.
2. In a Claude Code session on this repo (needs the local `servicenow` MCP connection — check with `claude mcp list`), run `/sync-servicenow`.
3. It appends any tickets not already referenced in `CHANGES.md` under `## Open`, with the ticket number, description, and a link back to ServiceNow. It only edits the file — review the diff and commit/push yourself.

**Frequency:** run it once a day (e.g. ~9am) — or any time you know a new ticket landed. It's idempotent (safe to re-run; already-synced tickets are skipped by number).

Cloud/background scheduling isn't wired up yet — the ServiceNow connection is local-only (a stdio MCP server, not a claude.ai connector), so this has to be run from a local Claude Code session for now.

## Local development

No build tooling needed — just open `index.html` in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```