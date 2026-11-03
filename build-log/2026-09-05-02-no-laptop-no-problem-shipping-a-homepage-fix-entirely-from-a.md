---
date: "2026-09-05"
time: "5:26 PM"
title: "No laptop, no problem — shipping a homepage fix entirely from a phone"
tags: [Infra, Repo]
skills: [CI/CD & infra]
commit: "20992c6, f7fff2d"
---

Wanted to update the homepage profile photo without opening the laptop, which meant solving the actual blocker: the repo was private and the GitHub iOS app has no visibility settings at all — no Danger Zone, nothing. Safari's desktop-site view got past that; flipping the repo public there took two minutes. From there it was a normal Claude session end to end: clone, swap the photo reference to the transparent PNG, and push — authenticated with a short-lived, repo-scoped, write-only personal access token generated on the phone and good for pushing this one change. No terminal, no repo settings menu, no laptop. The device-bridge workaround that's carried most of this build log so far turns out to have a phone-shaped alternative when the repo itself is reachable. Same token, same session, one more fix: the homepage's “Shop on Etsy” contact link had been pointing at the bare etsy.com homepage since launch — swapped it for the real LittleDevLab shop URL and dropped the “coming soon” from the label.
