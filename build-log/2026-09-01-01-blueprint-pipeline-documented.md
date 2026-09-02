---
date: "2026-09-01"
time: "9:52 AM"
title: "Blueprint clipping fixed, DXF-to-blueprint pipeline documented"
tags: [Design, Engineering, Docs]
commit: e61ba64
---

The drafting-graphic background behind product photos was getting sliced off on mobile; switched to a fixed-size, bottom-anchored background with guaranteed padding so it clears the thumbnail strip on every screen size. Then reconstructed and checked in the script that turns a Shapr3D DXF export into each product's blueprint backdrop (`tools/dxf_to_blueprint_svg.py`), used it to generate the two backdrops still missing, and moved the Trading Card Display Rack to the top of the products page.
