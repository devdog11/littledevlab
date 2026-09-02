---
date: "2026-09-02"
time: "9:52 PM"
title: "Contact lens copy updated, repo hygiene cleanup"
tags: [Products, Infra]
commit: be84980
---

Replaced the Glasses + Contact Lens Holder's description and feature bullets with new submitted marketing copy, keeping the site's own product name over the copy's generic one. Separately, cleaned up repo hygiene: stray patch files, a `.bak` file, and an empty `_to_delete/` folder are gone, and `.claude/`, `*.bak`, and `_to_delete/` were added to `.gitignore` so they don't creep back in. (gitignore/.claude cleanup landed separately in commit 21e9b18.)
