# Experimenting

One Markdown file per experiment: `experiments/<slug>.md` is published at
`littledevlab.com/experimenting/<slug>`. The Experimenting list, the card on
The Lab and the detail page are all built from these files (`npm run build` in
`app/`). An experiment can be anything: 3D design, code, home automation.

## Add an experiment

1. Put its photos in `images/experiments/<slug>/`. For a 3D model, put the STEP
   file there too and run `python3 tools/step_to_glb.py images/experiments/<slug>/<file>.step`
   to make the `.glb` the viewer reads.
2. Copy an existing file here to `<slug>.md` (letters, digits, hyphens) and edit it.

```
---
title: "Kraft Singles Organizer"
date: "2026-11-03"              # YYYY-MM-DD; newest shows first
order: 1                        # optional; breaks ties on the same date, lower first
status: "Almost real"           # In the lab | Almost real | Failed
summary: "Two to four sentences for the list card."
description: "Meta description for search and link previews (about 155 characters)."
image: "/images/experiments/<slug>/photo.jpg"   # optional link-preview image
model: "/images/experiments/<slug>/<slug>.glb"  # optional 3D viewer at the top
modelAlt: "Interactive 3D model of ..."          # optional; defaults from the title
---

<p class="lede">Opening paragraph.</p>

## Version 1

Body in Markdown. Photos are HTML figures:

<figure class="post-figure">
<img alt="What the photo shows" src="/images/experiments/<slug>/v1-test-fit.jpg"/>
<figcaption>Caption.</figcaption>
</figure>
```

Leave a blank line around an HTML block so the Markdown after it still
renders. Styles are shared with Lab Notes (`app/src/pages/lab-notes/lab-notes.css`).
