# LittleDevLab

Source for [littledevlab.com](https://littledevlab.com) — a static one-page site for a custom 3D-printed home goods shop based in the SF Bay Area. Every product is designed from scratch in Shapr3D and printed on a Bambu Lab printer.

## Stack

Plain HTML/CSS/JS — no build step, no framework, no dependencies. Interactive 3D product previews are powered by Google's [`<model-viewer>`](https://modelviewer.dev/) web component, loaded from a CDN.

## Structure

```
index.html          Entire site (markup, styles, and script in one file)
images/              Product photos, renders, and 3D models
  glasses/
  coasters/
  gaming-card-display/
  hunter-douglass/
  knives-holder/
  six-pack-gift-zbiotic/
Working-Plan-Outline.md   Working notes / project plan
```

Each product folder generally contains real product photos (customer/lifestyle shots), photorealistic color-variant renders, and the source 3D model (`.step` + `.glb`) used to generate the `<model-viewer>` embed.

## Products

- Glasses + Contact Lens Holder
- Chilewich Coaster Holder (round & hexagonal)
- Trading Card Display Rack
- Hunter Douglas Remote Wall Mount (1/2-Gang + 3M-claw mount, in black/white)
- Steak Knife Holder
- ZBiotic Six-Pack Gift Carrier

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which deploys the site as-is (static files, no build) to Cloudflare Pages via `wrangler-action`. Typical deploy time is well under a minute.

Requires two repo secrets to be set for deploys to work: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Local development

No build tooling needed — just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```
