---
date: "2026-09-15"
time: "4:20 AM"
title: "A new In Development section, opened with a CadQuery drawer organizer"
tags: [3D Print]
commit: (pending push)
---

Lab Journey picked up a third sub-menu today. **In Development** sits between Lab Notes and Build Log and uses the Lab Notes layout verbatim, but written in the present tense: the spec a build has to meet, what currently works, and what is still unresolved. Lab Notes is what I learned after the fact; this is the state of play before it settles, and entries graduate across once there is a finished lesson worth writing down.

The first entry is a drawer organizer whose entire spec arrived as prose in a ServiceNow change request — 165 × 148 × 70 mm, 2 mm walls and floor, open top, and sixty 16 × 27 mm elongated-diamond openings on named centrelines through all four walls. The interesting question was whether a written spec that precise could go straight to a manufacturable STEP file without anyone touching geometry by hand. It could: CadQuery brings OpenCASCADE into the session as a normal Python package, so the model is a parametric script that builds and exports AP214 in about six seconds. The ticket's fallback plan — hand the STEP generation off to ChatGPT or another API — went unused, because generating a STEP file is a geometry-kernel problem rather than a rendering one.

Validation re-imports the exported file from disk rather than trusting the in-memory model, since a model that is valid in the session but exports badly is the failure actually worth catching. It comes back as a single watertight solid, bounding box exact to three decimals, and solid volume of 106,968.000 mm³ against a target of "approximately 106,968" — exact rather than approximate, because no cutout overlaps another, so the closed-form arithmetic and the kernel have to agree. The check I like most needs no knowledge of where the holes were supposed to be: the exported mesh has Euler characteristic −118, which for one closed surface means genus 60. Sixty through-holes, counted from topology instead of from the list that generated them.

Nothing has been printed. Every claim on that page is geometric, and whether a 2 mm wall with sixty holes in it stays rigid in a real drawer is a question a printer answers and a kernel does not.
