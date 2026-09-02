# Hunter Douglas Remote Mount — 1-Gang, Full Dimension Spec

Measured directly from `oneganghd.shapr.3mf` (mesh geometry — circle/rect fits via least-squares on the actual triangulated surfaces, not eyeballed). Confidence noted per feature. All positions given as **offset from plate center (0,0)**, X = left(-)/right(+), Y = down(-)/up(+), looking at the front face. Units mm unless noted.

Three separate bodies, assembled in one stack:

| Part | Role | Thickness | Z-range (as exported) |
|---|---|---|---|
| Cover | front-facing plate, the one you see | 5.5 mm | 0.0 – 5.5 |
| Backer | structural piece behind the cover | 6.0 mm | -0.68 – 5.32 |
| Ring | clip that holds the remote, sits in the cover's round hole | 15.8 mm | 2.49 – 18.29 |

Backer sits flush-ish with the cover (overlapping Z 0–5.32), ring pokes up **~12.8mm proud** of the cover's front face (18.29 − 5.5). Confidence: high (direct bounding-box read).

---

## 1. Ring insert (high confidence — exact circular fit, rms 0.000)

- OD ⌀57.0mm, ID ⌀45.0mm, height 15.8mm
- Wall is stepped: concentric diameters at 57.0 / 55.2 / 52.5 / 45.0mm going down through the wall (visible steps/shoulders, not a plain straight-wall tube)
- 3 small tabs (⌀~1.0mm holes) at radius ~23–24mm from ring center, unevenly spaced — read these off the drawing/model directly if you need them; likely alignment pips, not structural

---

## 2. Cover plate (front face) — high confidence unless noted

**Outer envelope:** 120.7 × 119.1mm, 5.5mm thick.
Corners rounded, approx **R8mm** (fit was noisy, rms ~0.95 — eyeball-check this one in Shapr3D rather than trusting it to the mm).
There's also a shallow inset rim/groove running around the edge, about 1.4mm in from the outer edge (bbox of that inner line: 117.9 × 116.3mm) — reads as a decorative step, not structural. Medium confidence on purpose, high confidence on position.

**Switch cutout** (rounded rect, left side):
- 35.2mm × 68.7mm
- Corner radius ≈9.3mm
- Center offset from plate center: **(−22.9, 0.0)** — sits exactly on the horizontal centerline
- Close to a standard Decora/rocker-switch opening (~1.4″ × 2.7″) if that was the intent

**Round hole** (receives the ring, right side):
- ⌀56.0mm
- Center offset: **(+25.6, +1.2)** — just right of center, essentially on the horizontal centerline
- 1.0mm smaller than the ring's 57.0mm OD (press/friction fit)

**4 corner mounting holes:**
- ⌀6.9mm each
- Centers at **(±22.9, ±48.3)** — i.e. a 45.75 × 96.6mm rectangle centered on the plate

**6 edge slots** (small vertical slots, 3 columns × 2 rows):
- 3.1mm × 12.6mm each
- Column X-offsets: **−52.3, 0, +52.3**
- Row Y-offsets: **−28.3, +27.7**
- (the center column sits between the switch cutout and the ring hole)

---

## 3. Backer plate (structural, sits behind cover) — medium confidence on the small internal detail; high confidence on the big shapes

**Outer envelope:** 120.5 × 118.9mm, 6.0mm thick — essentially the same footprint as the cover, centered on the same axis.

**Main relief:** a large central opening, 109.5 × 108.5mm, centered (dx≈0, dy≈−0.3) — this is most of the backer hollowed out, leaving roughly a 5.5mm structural rim around the edge.

**4 corner support blocks** (solid islands inside that central opening, presumably where it screws to a real electrical box or gains rigidity):
- 35.4mm × ~57.7mm each
- Centers at **(±40.8, −29.3) and (±40.8, +29.0)**

**2 large holes, ⌀18.0mm**, centers at **(0, −28.3)** and **(0, +27.7)** — line up with the cover's center-column edge slots above.

**4 rectangular reliefs, ~5.0mm × 15.6mm**, centers at **(±52.7, −28.3)** and **(±52.7, +27.7)** — line up with the cover's outer-column edge slots (backer cut is the larger clearance behind the cover's smaller decorative slot).

**8 smaller holes, ⌀11.1mm**, in two clusters (not simple corner-mirrored — pull exact coordinates from the file if these matter to you):
- Cluster A: (+39.9,−43.2), (−5.9,−43.2), (+39.9,−49.2), (−5.9,−49.2)
- Cluster B: (+5.9,+49.2), (+5.9,+43.2), (−39.9,+49.2), (−39.9,+43.2)

**1 narrow slot, 3.5mm × 36.1mm**, near the left edge, center **(−51.5, −0.3)** — likely a wire pass-through or print vent.

**8 small edge tabs, ~3.5mm × 7.3–7.6mm**, near the four far corners — minor, probably snap-fit or alignment nubs. Low priority to replicate exactly.

**2 unconfirmed large arcs** (~R22.4mm) near the top and bottom mid-edge (y≈+65, y≈−48) — could be a big fillet on the backer's own edge or a real cutout; the fit was rough (rms 0.11) and they sit right at the edge of the part. **Worth a visual check in Shapr3D before trusting.**

---

## 4. Flange / flange-connector — the cover↔backer snap mechanism

Answered — but from the **clean, unmodified Lutron Claro 1-gang adapter + front plate STLs** you uploaded (the building blocks your HD cover/backer were derived from), not your edited HD bodies. Your own parts were too reshaped around the switch cutout/ring hole to isolate this cleanly; these source files weren't.

**It's not a continuous rail and not a single tab — it's 4 discrete snap zones**, one at each of the same 4 locations already flagged in the sections above (the "6 edge slots" on the cover / "4 rectangular reliefs" on the backer): plate-center offsets (dx, dy) = (±29.7, −28.3) and (±29.7, +27.7) mm — left/right edges, upper and lower rows.

At each zone:

- **The flange** lives on the **adapter/backer** (the plate with the wall screws). It's a narrow raised rib, ~1.0mm wide at its flat top, rising to Z=6.0mm — the adapter's own full thickness. Immediately outboard of it (toward the outer edge) the material chamfers down into a shallow valley before rising into the rib; immediately inboard it drops straight down to the general floor level (~1.8–2.3mm).
- **The flange connector** (the "linear hole") lives on the **front/cover plate**. It's a rectangular notch, ~3.1 × 12.6mm, cut through the plate's edge rabbet, with walls rising to the plate's full 5.5mm face thickness.
- Assembled, the rib's peak (Z=6.0) sits **~0.5mm proud of the front plate's 5.5mm face** — that's the "poke out" you're seeing. The notch is what lets it through.
- Outside these 4 zones, the edge is just a plain ~5.4mm-wide full-height wall on the adapter against a plain recessed rabbet shelf on the front plate — ordinary edge structure, not part of the snap.

See `flange-mechanism-diagram.png/.svg` — an annotated cross-section through one zone, adapter and front plate overlaid at assembled position.

**Confidence:** medium-high on the shape and mechanism (very repeatable across all 4 zones, both source files); medium on exact width/height numbers, since these come from the standard Lutron parts rather than your final HD-modified bodies — if you extended or reprinted this area, worth a quick visual check in Shapr3D before cutting metal to it.

---

## Caveats

- Everything above comes from a triangulated mesh (3MF/STL export), not the original parametric STEP — dimensions are least-squares fits to the tessellation, accurate to roughly ±0.1–0.3mm on clean circular/rectangular features, worse on the noisier fits called out above.
- The backer's internal lattice may partly be print-optimization structure rather than deliberate design intent — if you're redrawing from scratch, the cover + ring dimensions above are the ones that actually matter for fit and function; treat the backer detail as "nice to match" rather than "must match."
- The flange/flange-connector numbers in section 4 come from the stock Lutron Claro adapter + front plate files, not your edited HD cover/backer — same mechanism, but verify the exact numbers against your own parts if precision matters here.
