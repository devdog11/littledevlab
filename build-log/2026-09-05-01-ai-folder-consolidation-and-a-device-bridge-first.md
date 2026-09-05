---
date: "2026-09-05"
time: "12:39 AM"
title: "AI folder consolidation, and a new class of device-bridge bug"
tags: [Infra]
commit: d88e218
---

Spent the session consolidating six scattered AI folders — Documents/Claude, Codex, Development, plus stale iCloud and Google Drive copies of the same projects — into one tree: `AI/Projects` for live work, `AI/Archive` for chat exports and superseded duplicates. littledevlab and littledevlab-addons moved over as intact git repos, untouched mid-history. Nothing got hard-deleted in the process; everything redundant landed in Archive first, so "did I actually delete anything" had a precise answer instead of a hand-wave.

The device bridge earned its keep along the way. Deleting a tracked file still throws "Operation not permitted" — worked around the same way the `_to_delete/` pattern already logged here does, by renaming instead of removing. A stale `.git/index.lock` needed the same trick. Recovered two commits that only existed in a stale duplicate copy by hand: `git show <hash>:<file>` piped straight into the tracked file, then `git reset --mixed` to walk HEAD forward without ever touching a working tree that already matched. And a first: `rm -rf` on an entire mounted folder root failed with "Device or resource busy" instead of the usual permission error — contents deleted clean, the mount point itself just isn't removable from in here. Filed as a new failure mode, not a repeat of the old one.

One prompting note worth keeping: naming the destination filesystem up front (local disk vs. iCloud vs. Drive) before asking for a review doc would've saved a rewrite when the plan changed mid-stream. And "did you delete X" turned out to be a much better prompt than "clean this up" — it forces a moved/archived/deleted answer instead of a vague "done."
