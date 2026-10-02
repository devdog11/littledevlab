---
date: "2026-10-01"
time: "17:40 PDT"
title: "Made my deploy approval gate something GitHub enforces"
tags: [Infra]
commit: 6710cd4
---

Published a Lab Note on who should be allowed to deploy this site, then closed the four gaps it named the same day. `main` now requires a pull request and a passing build check, only `main` can deploy, and the Cloudflare credentials live in a GitHub environment that only `main` can use, on a new token scoped to one account.

I also removed a one-time setup step that logged a fake "Action failed" on every deploy, and moved the workflow's actions to current versions. All of it is live across pull requests #7, #8 and #9. The Lab Note now covers what is enforced and the one gap left: with zero required approvals, the review is still mine to do.
