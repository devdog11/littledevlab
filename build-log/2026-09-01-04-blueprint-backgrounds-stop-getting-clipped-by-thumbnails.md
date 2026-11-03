---
date: "2026-09-01"
time: "1:28 AM"
title: "Blueprint backgrounds stop getting clipped by thumbnails"
tags: [Design, Engineering]
skills: [Web & design]
commit: "388d1e6"
---

The drafting-graphic background scaled to fill its whole box, which looked fine on desktop but on mobile left almost no room below the photo and thumbnail strip — the graphic was getting sliced off entirely. Switched to a fixed-size, bottom-anchored background with guaranteed padding underneath, so it clears the thumbnails on every screen size.
