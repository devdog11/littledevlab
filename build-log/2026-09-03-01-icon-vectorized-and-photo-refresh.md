---
date: "2026-09-03"
time: "12:10 PM"
title: "Hand-coded SVG replaces the PNG nav icon, favicon added everywhere"
tags: [Design, Infra]
commit: 91ca76d
---

Rebuilt the nav/footer mark as a hand-coded inline SVG — same technique as the site's sphere logo, matched to the paper/ink/rust/gold palette — and swapped it into all 7 pages that carry it, 10 replacements in total, plus added a favicon to every page for the first time. Also confirmed the git lock-file problem isn't an iCloud quirk: it reproduced instantly on a brand-new, non-iCloud local folder too — it's a restriction of the device bridge itself, not the sync layer.
