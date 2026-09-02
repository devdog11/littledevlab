---
date: "2026-09-02"
time: "4:56 PM"
title: "Theo's Toys click bug fixed, Lab Notes recolored, and the honest ending to \"Cutting the Cord\""
tags: [Products, Design, Docs]
commit: dde6306
---

Fixed a bug where clicking a Theo's Toys product photo could leave the 3D toggle out of sync, recolored Lab Notes to match Build Log's navy/gold, and published a new Lab Notes post — "Cutting the Cord" — chronicling the push toward a laptop-optional workflow. That post got two honest follow-up rewrites once the cloud routes actually hit walls: the Cowork-hosted clone's git push is blocked by a platform proxy, and the Mac bridge can edit files but can't reliably run git (it can't delete its own lock files). Landed back on a hybrid: Claude edits files directly in the local folder, one manual Commit & Push finishes the job.
