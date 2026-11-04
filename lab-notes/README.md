# Lab Notes

One Markdown file per post: `lab-notes/<slug>.md` is published at
`littledevlab.com/lab-notes/<slug>`. The Lab Notes list, The Lab page and the
post page are all built from these files (`npm run build` in `app/`).

```
---
title: "Post title"
date: "2026-10-01"                 # YYYY-MM-DD
category: "Agentic AI Skills"      # label above the title
skills: [Agentic AI, MCP]          # filter chips on The Lab; reuse existing names
pinned: false                      # true = "Start here" card on The Lab
summary: "One or two lines for The Lab's cards and timeline."
excerpt: "The longer teaser shown on the Lab Notes list."
description: "Meta description for search and link previews."
status: "gate enforced"            # optional, shown as "· Status: ..."
image: "/images/..."               # optional link-preview image
---

<p class="lede">Opening paragraph.</p>

Body in Markdown. Styled blocks (callouts, step lists, figures, tables) are
plain HTML with their class, e.g. <div class="callout">...</div>; leave a blank
line around an HTML block so the Markdown inside and after it still renders.
```

Styles: `app/src/pages/lab-notes/lab-notes.css`. Rules that only one post uses
are scoped with `:where(.note-<slug>)`.
