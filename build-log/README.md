# Build Log

Short records of what changed in LittleDevLab and why it mattered. Browse the dated Markdown files here, or read the [website Build Log](https://littledevlab.com/build-log).

Files are named `YYYY-MM-DD-NN-slug.md`. Each entry includes a date, time, title, tags, and a commit reference when available. Entries describe work at the time it was recorded; they are not current operating instructions.

The website's Build Log page and the activity list on The Lab are built from these files, so adding a file here is all it takes to publish an entry. Front matter:

```
---
date: "2026-10-01"          # YYYY-MM-DD
time: "5:40 PM"             # shown as written; also used to order entries within a day
title: "What shipped"
tags: [Infra, Design]       # labels shown on the Build Log card
skills: [CI/CD & infra]     # filter chips on The Lab; reuse existing names
commit: "6710cd4"           # optional
---

Body in Markdown.
```
