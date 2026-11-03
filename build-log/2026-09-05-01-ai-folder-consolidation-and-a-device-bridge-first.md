---
date: "2026-09-05"
time: "12:39 AM"
title: "AI folder consolidation, and a new class of device-bridge bug"
tags: [Infra]
skills: [CI/CD & infra]
commit: "d88e218"
---

Spent the session consolidating six scattered AI folders — Documents/Claude, Codex, Development, plus stale iCloud and Google Drive copies of the same projects — into one tree: `AI/Projects` for live work, `AI/Archive` for chat exports and superseded duplicates. littledevlab and littledevlab-addons moved over as intact git repos, untouched mid-history. Nothing got hard-deleted in the process; everything redundant landed in Archive first, so “did I actually delete anything” had a precise answer instead of a hand-wave. The device bridge earned its keep along the way — a stale `.git/index.lock` got renamed instead of removed, two commits stranded in a stale duplicate got recovered by hand via `git show` plus `git reset --mixed`, and `rm -rf` on an entire mounted folder root hit a brand-new “Device or resource busy” error instead of the usual permission one.
