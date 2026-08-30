# Build Log

A lightweight, frequent changelog for LittleDevLab — separate from the deeper, milestone-driven **Lab Notes** posts planned elsewhere on the site. Lab Notes get written once a skill track has produced something worth teaching; the Build Log just tracks what shipped, day to day.

See `Working-Plan-Outline.md`, Section 8, for the full rationale.

## Convention

- One markdown file per entry: `YYYY-MM-DD-NN-slug.md` (`NN` increments for a second entry on the same day — `01`, `02`, ...).
- Frontmatter block: `date`, `time`, `title`, `tags`, `commit` (the git short hash the entry is anchored to, when there is one).
- Body: 2–4 sentences of plain narrative — what shipped and why it mattered, not a commit-message dump.

```markdown
---
date: 2026-08-30
time: "15:45"
title: Swapped in the properly-modeled 1-Gang mount
tags: [products, 3d-print]
commit: a1712f1
---

Body text here.
```

## Cadence

Roughly **2 entries per day** for now — one per natural work session, not one per commit. Small related commits (e.g., a retheme plus its texture follow-up) collapse into a single entry.

## Where this goes

This folder is the source of truth. The next build step (not yet done) is a dedicated page — most likely `littledevlab.com/build-log` — that renders these entries as a reverse-chronological stream. Until then, entries are readable directly in this folder on GitHub.
