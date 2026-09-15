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

Product-enhancement tickets are filed in ServiceNow (instance `dev387941`) as Change Requests with **Category = `littledevlab`**. They're tracked in [CHANGES.md](CHANGES.md) rather than in ServiceNow itself.

A scheduled Claude cloud routine (`littledevlab: pull, implement, notify`) runs every 4 hours and:

1. Pulls `category=littledevlab` change requests via `scripts/sync_servicenow.py --proxy-auth`, appending any not already referenced in `CHANGES.md` under `## Open`.
2. Works through `## Open` top to bottom — pulled tickets and hand-written items alike — implementing only what is clearly safe unattended and leaving anything needing judgment open.
3. Moves what it implements to `## Done`, logs an entry in `build-log.html`, and pushes to `main`, which triggers the Cloudflare Pages deploy.
4. Emails a run summary every run, including quiet ones.

**Two ways to request a change:** file a ServiceNow Change Request, or add an item under `## Open` in `CHANGES.md` directly. Both are picked up identically. To force a cycle rather than wait for the schedule, use **Run now** on the routine.

The routine authenticates with Basic auth injected by an API credential on its `ldl-snow` cloud environment, so no ServiceNow credentials exist inside the run. That instance restricts Basic auth to holders of the `snc_basic_auth_api_access` role, which is why the integration uses a dedicated `claude_integration` user rather than `admin`.

`scripts/sync_servicenow.py` also runs standalone against OAuth (`SERVICENOW_INSTANCE_URL`, `SERVICENOW_CLIENT_ID`, `SERVICENOW_CLIENT_SECRET`, `SERVICENOW_USERNAME`, `SERVICENOW_PASSWORD`), which is how it is used from a local Claude Code session.

## Local development

No build tooling needed — just open `index.html` in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```