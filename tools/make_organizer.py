#!/usr/bin/env python3
"""
Parametric drawer organizer — open-top box with elongated-diamond wall cutouts.

Builds a single watertight solid in CadQuery and writes three deliverables:

  organizer_165x148x70_2mm.step          AP214 STEP, one solid, CAD-importable
  organizer_165x148x70_2mm_preview.svg   white-background technical preview
  organizer_165x148x70_2mm.glb           web preview mesh (only if trimesh is present)

All dimensions are millimetres. Run with:  python3 tools/make_organizer.py [outdir]
"""

import os
import sys

import cadquery as cq

# ─────────────────────────────────────────────────────────────────────────────
# PRIMARY DIMENSIONS — everything downstream is derived from these
# ─────────────────────────────────────────────────────────────────────────────

LENGTH = 165.0          # X, exterior
WIDTH = 148.0           # Y, exterior
HEIGHT = 70.0           # Z, exterior
WALL = 2.0              # side-wall thickness
BOTTOM = 2.0            # floor thickness

# Diamond opening: 16 mm across (horizontal), 27 mm tall (vertical).
# Sharp points top and bottom, flat-ish points left and right.
DIA_W = 16.0
DIA_H = 27.0

# Z centrelines of the two rows, measured from the exterior bottom (z = 0).
# 19.5 - 13.5 = 6 mm solid below   |   38 - 33 = 5 mm between rows
# 70 - (51.5 + 13.5) = 5 mm solid above
ROW_Z = (19.5, 51.5)

# Horizontal centrelines along the 165 mm (front/back) walls — 8 per row.
X_CENTRES = (16.0, 35.0, 54.0, 73.0, 92.0, 111.0, 130.0, 149.0)

# Horizontal centrelines along the 148 mm (left/right) walls — 7 per row.
Y_CENTRES = (16.0, 35.333, 54.667, 74.0, 93.333, 112.667, 132.0)

# How far each cutting prism overshoots its wall, so the boolean is a clean
# through-cut rather than a coincident-face case.
OVERSHOOT = 1.0

# Derived
INNER_L = LENGTH - 2 * WALL     # 161
INNER_W = WIDTH - 2 * WALL      # 144
INNER_H = HEIGHT - BOTTOM       # 68

STEM = "organizer_165x148x70_2mm"


# ─────────────────────────────────────────────────────────────────────────────
# Geometry
# ─────────────────────────────────────────────────────────────────────────────

def _diamond_pts(cu, cv, half_u, half_v):
    """Diamond profile in a workplane's local (u, v) coordinates."""
    return [(cu - half_u, cv), (cu, cv + half_v), (cu + half_u, cv), (cu, cv - half_v)]


def _prism(plane, pts, depth):
    """Extrude a closed profile `depth` along the plane's normal."""
    return cq.Workplane(plane).polyline(pts).close().extrude(depth)


def build_shell():
    """Open-top box: solid floor, four walls, nothing cut yet."""
    outer = cq.Workplane("XY").box(LENGTH, WIDTH, HEIGHT, centered=False)
    # Cavity runs from the top of the floor clear past the rim, which both
    # opens the top and avoids a coincident top face in the boolean.
    cavity = (
        cq.Workplane("XY")
        .box(INNER_L, INNER_W, INNER_H + OVERSHOOT, centered=False)
        .translate((WALL, WALL, BOTTOM))
    )
    return outer.cut(cavity)


def diamond_cutters():
    """Every diamond prism, oriented to punch through its own wall."""
    cutters = []

    # Front (y = 0) and back (y = WIDTH) walls. Plane normal is +Y, so local
    # (u, v) maps to global (u, y, -v) — hence the negated Z centre.
    for y0 in (-OVERSHOOT, WIDTH - WALL - OVERSHOOT):
        plane = cq.Plane(origin=(0, y0, 0), xDir=(1, 0, 0), normal=(0, 1, 0))
        for cx in X_CENTRES:
            for cz in ROW_Z:
                pts = _diamond_pts(cx, -cz, DIA_W / 2, DIA_H / 2)
                cutters.append(_prism(plane, pts, WALL + 2 * OVERSHOOT))

    # Left (x = 0) and right (x = LENGTH) walls. Plane normal is +X, so local
    # (u, v) maps straight to global (x, u, v).
    for x0 in (-OVERSHOOT, LENGTH - WALL - OVERSHOOT):
        plane = cq.Plane(origin=(x0, 0, 0), xDir=(0, 1, 0), normal=(1, 0, 0))
        for cy in Y_CENTRES:
            for cz in ROW_Z:
                pts = _diamond_pts(cy, cz, DIA_W / 2, DIA_H / 2)
                cutters.append(_prism(plane, pts, WALL + 2 * OVERSHOOT))

    return cutters


def build_organizer():
    result = build_shell()
    for cutter in diamond_cutters():
        result = result.cut(cutter)
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Reference volumes (closed-form, used to check the kernel's answer)
# ─────────────────────────────────────────────────────────────────────────────

def solid_volume_unperforated():
    return LENGTH * WIDTH * HEIGHT - INNER_L * INNER_W * INNER_H


def diamond_count():
    return 2 * len(X_CENTRES) * len(ROW_Z) + 2 * len(Y_CENTRES) * len(ROW_Z)


def expected_volume():
    # A diamond (rhombus) of diagonals DIA_W x DIA_H has area d1*d2/2.
    removed = diamond_count() * (DIA_W * DIA_H / 2.0) * WALL
    return solid_volume_unperforated() - removed


# ─────────────────────────────────────────────────────────────────────────────
# SVG preview
# ─────────────────────────────────────────────────────────────────────────────

ISO_COS = 0.8660254037844387   # cos 30 degrees
ISO_SIN = 0.5                  # sin 30 degrees

# Canvas and the two regions the drawing is laid out in.
SVG_W, SVG_H = 980, 700
ISO_BOX = (34, 152, 544, 388)    # x, y, w, h  — isometric view
SEC_BOX = (652, 200, 236, 236)   # x, y, w, h  — cross-section


def iso_raw(x, y, z):
    """
    Isometric projection, viewed from the front-right-above.

    Y is flipped so the *front* wall (y = 0) and the *right* wall (x = LENGTH)
    are the two faces turned toward the viewer; we look down into the open top
    and see the inside of the far two walls.
    """
    yv = WIDTH - y
    return ((x - yv) * ISO_COS, (x + yv) * ISO_SIN - z)


def iso_fit(box):
    """Scale and offset that fit the whole outer body into `box`."""
    bx, by, bw, bh = box
    corners = [iso_raw(x, y, z)
               for x in (0.0, LENGTH) for y in (0.0, WIDTH) for z in (0.0, HEIGHT)]
    xs = [p[0] for p in corners]
    ys = [p[1] for p in corners]
    scale = min(bw / (max(xs) - min(xs)), bh / (max(ys) - min(ys)))
    ox = bx + (bw - (max(xs) - min(xs)) * scale) / 2 - min(xs) * scale
    oy = by + (bh - (max(ys) - min(ys)) * scale) / 2 - min(ys) * scale
    return scale, ox, oy


def write_svg(path):
    import math

    unperf = solid_volume_unperforated()
    vol = expected_volume()
    reduction = 100.0 * (unperf - vol) / unperf

    # Leave room in the fit for the dimension lines that hang off the body.
    scale, OX, OY = iso_fit((ISO_BOX[0] + 46, ISO_BOX[1], ISO_BOX[2] - 76, ISO_BOX[3] - 54))

    out = []
    A = out.append

    def P(x, y, z):
        sx, sy = iso_raw(x, y, z)
        return (OX + sx * scale, OY + sy * scale)

    def pts_attr(points):
        return " ".join(f"{p[0]:.2f},{p[1]:.2f}" for p in points)

    A('<?xml version="1.0" encoding="UTF-8"?>')
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{SVG_W}" height="{SVG_H}" '
      f'viewBox="0 0 {SVG_W} {SVG_H}" font-family="Helvetica, Arial, sans-serif">')
    A(f'<rect width="{SVG_W}" height="{SVG_H}" fill="#ffffff"/>')

    # ── Title block ──────────────────────────────────────────────────────────
    A('<text x="40" y="46" font-size="22" font-weight="700" fill="#1e3a5f">'
      'Drawer Organizer &#8212; 165 &#215; 148 &#215; 70 mm</text>')
    A('<text x="40" y="70" font-size="13" fill="#55503f">'
      'Open top &#183; 2 mm walls and floor &#183; 60 elongated-diamond openings '
      '&#183; single watertight solid &#183; all dimensions in millimetres</text>')
    A('<line x1="40" y1="84" x2="940" y2="84" stroke="#d8d0be" stroke-width="1"/>')

    L, W, H, T = LENGTH, WIDTH, HEIGHT, WALL
    EDGE = "#1e3a5f"
    DIM = "#b0492a"

    # ── Isometric body, painted back to front ────────────────────────────────
    A(f'<g stroke="{EDGE}" stroke-linejoin="round" stroke-linecap="round">')

    def face(points, fill, w=1.4):
        A(f'<polygon points="{pts_attr(points)}" fill="{fill}" stroke-width="{w}"/>')

    def diamond(project, cu, cz):
        corners = [project(cu - DIA_W / 2, cz), project(cu, cz + DIA_H / 2),
                   project(cu + DIA_W / 2, cz), project(cu, cz - DIA_H / 2)]
        return pts_attr([P(*c) for c in corners])

    # Inside surfaces, seen through the open top.
    face([P(T, T, BOTTOM), P(L - T, T, BOTTOM), P(L - T, W - T, BOTTOM), P(T, W - T, BOTTOM)],
         "#efe9dc", 1.0)                                    # floor
    face([P(T, W - T, BOTTOM), P(L - T, W - T, BOTTOM), P(L - T, W - T, H), P(T, W - T, H)],
         "#ddd5c3", 1.0)                                    # far wall, inside
    face([P(T, T, BOTTOM), P(T, W - T, BOTTOM), P(T, W - T, H), P(T, T, H)],
         "#d3cab6", 1.0)                                    # left wall, inside

    # Those far walls carry openings too, visible through the open top.
    A('<g fill="#ffffff" stroke-width="0.7" opacity=".85">')
    for cx in X_CENTRES:
        for cz in ROW_Z:
            A(f'<polygon points="{diamond(lambda u, v: (u, W - T, v), cx, cz)}"/>')
    for cy in Y_CENTRES:
        for cz in ROW_Z:
            A(f'<polygon points="{diamond(lambda u, v: (T, u, v), cy, cz)}"/>')
    A('</g>')

    # The 2 mm top rim: outer rectangle with the opening knocked out of it.
    A('<polygon points="{} {}" fill="#c3b79e" stroke="{}" stroke-width="1.4" '
      'fill-rule="evenodd"/>'.format(
          pts_attr([P(0, 0, H), P(L, 0, H), P(L, W, H), P(0, W, H)]),
          pts_attr([P(T, T, H), P(L - T, T, H), P(L - T, W - T, H), P(T, W - T, H)]),
          EDGE))

    # The two walls turned toward us.
    face([P(0, 0, 0), P(L, 0, 0), P(L, 0, H), P(0, 0, H)], "#f6f2e8", 1.6)   # front
    face([P(L, 0, 0), P(L, W, 0), P(L, W, H), P(L, 0, H)], "#e6dfcf", 1.6)   # right

    # Diamond openings on those two walls.
    A('<g fill="#ffffff" stroke-width="1.0">')
    for cx in X_CENTRES:
        for cz in ROW_Z:
            A(f'<polygon points="{diamond(lambda u, v: (u, 0.0, v), cx, cz)}"/>')
    for cy in Y_CENTRES:
        for cz in ROW_Z:
            A(f'<polygon points="{diamond(lambda u, v: (L, u, v), cy, cz)}"/>')
    A('</g>')
    A('</g>')

    # ── Dimensions on the isometric ──────────────────────────────────────────
    A(f'<g stroke="{DIM}" fill="none" stroke-width="1.1">')

    def edge_dim(p1, p2, offset, label):
        """Witness lines, a dimension line, and a label that reads left-to-right."""
        ox_, oy_ = offset
        a, b = p1, p2
        A(f'<line x1="{a[0]:.2f}" y1="{a[1]:.2f}" x2="{a[0]+ox_:.2f}" y2="{a[1]+oy_:.2f}" opacity=".55"/>')
        A(f'<line x1="{b[0]:.2f}" y1="{b[1]:.2f}" x2="{b[0]+ox_:.2f}" y2="{b[1]+oy_:.2f}" opacity=".55"/>')
        A(f'<line x1="{a[0]+ox_:.2f}" y1="{a[1]+oy_:.2f}" x2="{b[0]+ox_:.2f}" y2="{b[1]+oy_:.2f}"/>')
        for tip, other in ((a, b), (b, a)):
            tx, ty = tip[0] + ox_, tip[1] + oy_
            ang = math.degrees(math.atan2((other[1] + oy_) - ty, (other[0] + ox_) - tx))
            A(f'<path d="M {tx:.2f},{ty:.2f} l 9,-2.6 l 0,5.2 Z" fill="{DIM}" stroke="none" '
              f'transform="rotate({ang:.2f} {tx:.2f} {ty:.2f})"/>')
        mx, my = (a[0] + b[0]) / 2 + ox_, (a[1] + b[1]) / 2 + oy_
        ang = math.degrees(math.atan2((b[1] + oy_) - (a[1] + oy_), (b[0] + ox_) - (a[0] + ox_)))
        if ang > 90 or ang < -90:
            ang += 180
        A(f'<text x="{mx:.2f}" y="{my:.2f}" transform="rotate({ang:.2f} {mx:.2f} {my:.2f})" '
          f'text-anchor="middle" dy="-7" fill="{DIM}" stroke="none" font-size="13.5" '
          f'font-weight="600">{label}</text>')

    # Front bottom edge runs down-right; offset perpendicular, away from the body.
    d = 32
    edge_dim(P(0, 0, 0), P(L, 0, 0), (-0.5 * d, 0.866 * d), "165 mm")
    edge_dim(P(L, 0, 0), P(L, W, 0), (0.5 * d, 0.866 * d), "148 mm")

    # Height, on the left silhouette corner.
    top, bot = P(0, 0, H), P(0, 0, 0)
    hx = top[0] - 40
    A(f'<line x1="{top[0]:.2f}" y1="{top[1]:.2f}" x2="{hx - 8:.2f}" y2="{top[1]:.2f}" opacity=".55"/>')
    A(f'<line x1="{bot[0]:.2f}" y1="{bot[1]:.2f}" x2="{hx - 8:.2f}" y2="{bot[1]:.2f}" opacity=".55"/>')
    A(f'<line x1="{hx:.2f}" y1="{top[1]:.2f}" x2="{hx:.2f}" y2="{bot[1]:.2f}"/>')
    for ty, sign in ((top[1], 1), (bot[1], -1)):
        A(f'<path d="M {hx:.2f},{ty:.2f} l -2.6,{9*sign:.2f} l 5.2,0 Z" fill="{DIM}" stroke="none"/>')
    my = (top[1] + bot[1]) / 2
    A(f'<text x="{hx:.2f}" y="{my:.2f}" transform="rotate(-90 {hx:.2f} {my:.2f})" '
      f'text-anchor="middle" dy="-7" fill="{DIM}" stroke="none" font-size="13.5" '
      f'font-weight="600">70 mm</text>')
    A('</g>')

    # Leader calling out one diamond, aimed up-left into clear space.
    tip = P(X_CENTRES[1], 0, ROW_Z[1])
    lx, ly = 44.0, 110.0
    A(f'<text x="{lx:.2f}" y="{ly:.2f}" font-size="13.5" font-weight="600" fill="{EDGE}">'
      f'16 &#215; 27 mm diamond opening</text>')
    A(f'<text x="{lx:.2f}" y="{ly + 17:.2f}" font-size="11.5" fill="#55503f">'
      f'27 mm vertical, sharp top and bottom points, cut clean through the 2 mm wall</text>')
    A(f'<g stroke="{EDGE}" stroke-width="1" fill="none">'
      f'<path d="M {lx + 60:.2f},{ly + 25:.2f} L {lx + 60:.2f},{tip[1] - 16:.2f} '
      f'L {tip[0]:.2f},{tip[1]:.2f}"/>'
      f'<circle cx="{tip[0]:.2f}" cy="{tip[1]:.2f}" r="2.4" fill="{EDGE}"/></g>')

    # ── Cross-section ────────────────────────────────────────────────────────
    sx0, sy0, sw, sh = SEC_BOX
    csc = min(sw / WIDTH, sh / HEIGHT)
    base_x = sx0 + (sw - WIDTH * csc) / 2
    base_y = sy0 + (sh + HEIGHT * csc) / 2

    def C(u, z):
        """Section coordinates: u across the 148 mm walls, z up from the floor."""
        return (base_x + u * csc, base_y - z * csc)

    A(f'<text x="{sx0}" y="{sy0 - 58}" font-size="15" font-weight="700" fill="{EDGE}">'
      f'Cross-section</text>')
    A(f'<text x="{sx0}" y="{sy0 - 39}" font-size="11.5" fill="#55503f">'
      f'Cut at x = 82.5 mm, between diamond columns.</text>')
    A(f'<text x="{sx0}" y="{sy0 - 24}" font-size="11.5" fill="#55503f">'
      f'Open top, solid 2 mm floor, no openings below.</text>')
    A(f'<text x="{sx0}" y="{sy0 - 9}" font-size="11.5" fill="#55503f">'
      f'Dashed lines are the two diamond row centrelines.</text>')

    def cut(u, z, du, dz):
        p = C(u, z + dz)
        A(f'<rect x="{p[0]:.2f}" y="{p[1]:.2f}" width="{du * csc:.2f}" height="{dz * csc:.2f}" '
          f'fill="{EDGE}" stroke="{EDGE}" stroke-width="1"/>')

    cut(0, 0, WIDTH, BOTTOM)                       # floor
    cut(0, BOTTOM, WALL, HEIGHT - BOTTOM)          # near wall
    cut(WIDTH - WALL, BOTTOM, WALL, HEIGHT - BOTTOM)  # far wall

    # Cavity outline, so the open top reads as open.
    A(f'<path d="M {C(WALL, HEIGHT)[0]:.2f},{C(WALL, HEIGHT)[1]:.2f} '
      f'L {C(WALL, BOTTOM)[0]:.2f},{C(WALL, BOTTOM)[1]:.2f} '
      f'L {C(WIDTH - WALL, BOTTOM)[0]:.2f},{C(WIDTH - WALL, BOTTOM)[1]:.2f} '
      f'L {C(WIDTH - WALL, HEIGHT)[0]:.2f},{C(WIDTH - WALL, HEIGHT)[1]:.2f}" '
      f'fill="none" stroke="{EDGE}" stroke-width="1"/>')

    # Open top.
    ot_l, ot_r = C(WALL, HEIGHT), C(WIDTH - WALL, HEIGHT)
    A(f'<line x1="{ot_l[0]:.2f}" y1="{ot_l[1] - 9:.2f}" x2="{ot_r[0]:.2f}" y2="{ot_r[1] - 9:.2f}" '
      f'stroke="{EDGE}" stroke-width="1.2" stroke-dasharray="5 4"/>')
    A(f'<text x="{(ot_l[0] + ot_r[0]) / 2:.2f}" y="{ot_l[1] - 16:.2f}" text-anchor="middle" '
      f'font-size="12" font-weight="600" fill="{EDGE}">OPEN TOP</text>')

    # Row centrelines with their heights.
    for cz in ROW_Z:
        a, b = C(-4, cz), C(WIDTH + 4, cz)
        A(f'<line x1="{a[0]:.2f}" y1="{a[1]:.2f}" x2="{b[0]:.2f}" y2="{b[1]:.2f}" '
          f'stroke="{DIM}" stroke-width="1" stroke-dasharray="9 3 2 3" opacity=".85"/>')
        A(f'<text x="{b[0] + 6:.2f}" y="{b[1]:.2f}" dy="4" font-size="11" fill="{DIM}">'
          f'{cz:g} mm</text>')

    # 2 mm callouts.
    fl = C(WIDTH * 0.62, BOTTOM / 2)
    A(f'<line x1="{fl[0]:.2f}" y1="{fl[1]:.2f}" x2="{fl[0] + 26:.2f}" y2="{fl[1] + 30:.2f}" '
      f'stroke="{DIM}" stroke-width="1"/>')
    A(f'<text x="{fl[0] + 29:.2f}" y="{fl[1] + 34:.2f}" font-size="12" font-weight="600" '
      f'fill="{DIM}">2 mm floor</text>')
    wl = C(WALL / 2, HEIGHT * 0.58)
    A(f'<line x1="{wl[0]:.2f}" y1="{wl[1]:.2f}" x2="{wl[0] - 20:.2f}" y2="{wl[1] - 14:.2f}" '
      f'stroke="{DIM}" stroke-width="1"/>')
    A(f'<text x="{wl[0] - 24:.2f}" y="{wl[1] - 18:.2f}" text-anchor="end" font-size="12" '
      f'font-weight="600" fill="{DIM}">2 mm wall</text>')

    # Internal usable height, drawn inside the cavity where there is room.
    t2, b2 = C(WIDTH * 0.5, HEIGHT), C(WIDTH * 0.5, BOTTOM)
    ih_x = t2[0]
    A(f'<g stroke="{DIM}" stroke-width="1" fill="none">'
      f'<line x1="{ih_x:.2f}" y1="{t2[1]:.2f}" x2="{ih_x:.2f}" y2="{b2[1]:.2f}"/></g>')
    for ty, sign in ((t2[1], 1), (b2[1], -1)):
        A(f'<path d="M {ih_x:.2f},{ty:.2f} l -2.6,{9 * sign:.2f} l 5.2,0 Z" fill="{DIM}" '
          f'stroke="none"/>')
    my2 = (t2[1] + b2[1]) / 2
    A(f'<rect x="{ih_x - 38:.2f}" y="{my2 - 9:.2f}" width="76" height="18" fill="#ffffff"/>')
    A(f'<text x="{ih_x:.2f}" y="{my2:.2f}" dy="4" text-anchor="middle" font-size="11" '
      f'fill="{DIM}">68 mm usable</text>')

    # ── Notes ────────────────────────────────────────────────────────────────
    A(f'<line x1="40" y1="{SVG_H - 122}" x2="940" y2="{SVG_H - 122}" '
      f'stroke="#d8d0be" stroke-width="1"/>')
    notes = [
        f"Solid volume {vol:,.0f} mm³, against {unperf:,.0f} mm³ for the same box "
        f"with unperforated 2 mm walls.",
        f"The diamond pattern uses approximately {reduction:.1f}% less solid volume than "
        f"the unperforated version.",
        "Internal opening 161 × 144 mm; internal usable height 68 mm; exterior corners square.",
        "60 openings: 16 front, 16 back, 14 left, 14 right, in two rows on centrelines "
        "19.5 mm and 51.5 mm.",
        "6 mm of solid material below the lower row, 5 mm between the rows, 5 mm above the "
        "upper row. Corners, top rim, bottom perimeter and floor are unbroken.",
    ]
    A('<g font-size="12.5" fill="#2c2820">')
    for i, line in enumerate(notes):
        A(f'<text x="40" y="{SVG_H - 100 + i * 19}">{line}</text>')
    A('</g>')

    A('</svg>')

    with open(path, "w") as fh:
        fh.write("\n".join(out) + "\n")


# ─────────────────────────────────────────────────────────────────────────────

def main():
    outdir = sys.argv[1] if len(sys.argv) > 1 else "."
    os.makedirs(outdir, exist_ok=True)

    model = build_organizer()
    step_path = os.path.join(outdir, f"{STEM}.step")
    cq.exporters.export(model, step_path, exportType="STEP")

    svg_path = os.path.join(outdir, f"{STEM}_preview.svg")
    write_svg(svg_path)

    # Optional web-preview mesh, so the site can show the model interactively.
    # The tessellated STL is only a stepping stone to the GLB, so it goes to a
    # temp dir rather than sitting next to the three real deliverables.
    try:
        import tempfile

        import trimesh

        with tempfile.TemporaryDirectory() as tmp:
            stl_path = os.path.join(tmp, f"{STEM}.stl")
            cq.exporters.export(model, stl_path, exportType="STL",
                                tolerance=0.05, angularTolerance=0.2)
            glb_path = os.path.join(outdir, f"{STEM}.glb")
            trimesh.load(stl_path).export(glb_path)
            print(f"wrote {glb_path}")
    except ImportError:
        print("trimesh not installed - skipped GLB export")

    print(f"wrote {step_path}")
    print(f"wrote {svg_path}")


if __name__ == "__main__":
    main()
