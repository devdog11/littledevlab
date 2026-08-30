---
date: 2026-08-28
time: "00:28"
title: Off GoDaddy — Cloudflare Pages + GitHub Actions live
tags: [infra, hosting]
commit: b8db569
---

Phase 0 done in one sitting: added a GitHub Actions workflow that deploys the static site to Cloudflare Pages via `wrangler-action` on every push to `main`, then created the actual Cloudflare Pages project so the first deploy has somewhere to land. littledevlab.com no longer depends on GoDaddy shared hosting — push to `main` and it's live in under a minute.
