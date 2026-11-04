"""Parametric eight-cup holder, exported as STEP with a matplotlib preview.

Run with: python3 friskies_holder.py
Requires CadQuery and Matplotlib.
"""

from pathlib import Path
import math

import cadquery as cq
import matplotlib

from datetime import datetime

matplotlib.use("Agg")  # Save preview without requiring an interactive desktop.
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection


# ------------------------------ Design constants ------------------------------
# Long axis is X; its outer length is calculated from the bay layout below.
WIDTH = 85.0

# Outer wall height above the flat bottom.
WALL_HEIGHT = 40.0

# Floor and walls.
FLOOR_THICKNESS = 2.0
WALL_THICKNESS = 2.0

# Seven transverse partitions separate eight equally sized bays. Dividers lean
# 15° toward the back, and the slots are sized to leave solid webs at each
# divider attachment.
CUP_COUNT = 8
CUP_DEPTHS = [27.0] * CUP_COUNT
DIVIDER_THICKNESS = 2.0
DIVIDER_HEIGHT = 20.0
DIVIDER_ANGLE_DEG = 15.0
BACK_SLOPE_DEG = 15.0
DIVIDER_FORWARD_OFFSET = 0.0
# Front access notch leaves 5 mm at each side and at the bottom.
FRONT_CUTOUT_MARGIN = 5.0
# Rounded lightening slots in both long side walls. Each slot is centered in a
# cup bay, leaving solid wall at the rim, floor, ends, and divider attachments.
SIDE_SLOT_WIDTH = 12.0
SIDE_SLOT_HEIGHT = 28.0
DIVIDER_COUNT = CUP_COUNT - 1
DIVIDER_BASE_WIDTH = DIVIDER_THICKNESS / math.cos(math.radians(DIVIDER_ANGLE_DEG))
REAR_WALL_BASE_THICKNESS_X = WALL_THICKNESS * math.cos(math.radians(BACK_SLOPE_DEG))
LENGTH = (
    WALL_THICKNESS
    + sum(CUP_DEPTHS)
    + DIVIDER_COUNT * DIVIDER_BASE_WIDTH
    + REAR_WALL_BASE_THICKNESS_X
)
MAX_PRINTER_XY = 256.0  # X1 Carbon nominal build plate dimensions.

# No bevels or fillets are applied; all edges remain sharp as requested.
OUTPUT_DIR = Path(__file__).resolve().parent / "outputs"
TIMESTAMP = datetime.now().strftime("%m%d_%H%M%S") # Tyson this is they right way to get auto-version numbers
STEP_FILE = OUTPUT_DIR / f"Friskies_8_Cup_Holder_{TIMESTAMP}.step"
PREVIEW_FILE = OUTPUT_DIR / f"Friskies_8_Cup_Holder_{TIMESTAMP}_preview.png"


def build_holder() -> cq.Workplane:
    """Build a tray with a sloped rear wall, access notch, and angled dividers."""

    back_run = WALL_HEIGHT * math.tan(math.radians(BACK_SLOPE_DEG))
    # Outer side profile is extruded across the short dimension. The rear top
    # leans outward, while its base remains at the nominal LENGTH coordinate.
    outer_profile = [(0, 0), (LENGTH, 0),
                     (LENGTH + back_run, WALL_HEIGHT), (0, WALL_HEIGHT)]
    outer = (cq.Workplane("XZ").polyline(outer_profile).close()
             .extrude(WIDTH).translate((0, WIDTH, 0)))

    # Offset the rear interior face along its normal to maintain 2 mm wall
    # thickness on the sloping back. Extend the cavity above the rim for a clean cut.
    back_angle = math.radians(BACK_SLOPE_DEG)
    rear_base_x = LENGTH - WALL_THICKNESS * math.cos(back_angle)
    rear_base_z = FLOOR_THICKNESS + WALL_THICKNESS * math.sin(back_angle)
    rear_top_x = LENGTH + back_run - WALL_THICKNESS * math.cos(back_angle)
    rear_top_z = WALL_HEIGHT + WALL_THICKNESS * math.sin(back_angle)
    cavity_profile = [
        (WALL_THICKNESS, FLOOR_THICKNESS),
        (rear_base_x, FLOOR_THICKNESS),
        (rear_top_x, rear_top_z + 1),
        (WALL_THICKNESS, WALL_HEIGHT + 1),
    ]
    cavity = (cq.Workplane("XZ").polyline(cavity_profile).close()
              .extrude(WIDTH - 2 * WALL_THICKNESS)
              .translate((0, WIDTH - WALL_THICKNESS, 0)))
    holder = outer.cut(cavity)

    # Cut through the front end wall, leaving the requested 5 mm side and
    # bottom margins. The opening reaches the rim; the floor remains intact.
    opening = cq.Workplane("XY").box(
        WALL_THICKNESS + 2,
        WIDTH - 2 * FRONT_CUTOUT_MARGIN,
        WALL_HEIGHT + 1,
        centered=(False, False, False),
    ).translate((-1, FRONT_CUTOUT_MARGIN, FRONT_CUTOUT_MARGIN))
    holder = holder.cut(opening)

    # Locate each partition after accumulating the bay in front of it.
    # DIVIDER_BASE_WIDTH accounts for the horizontal footprint of a 2 mm-thick
    # plate leaning 15°. This keeps both end bays equal to the middle bays.
    divider_starts = []
    accumulated_depth = 0.0
    for i in range(1, CUP_COUNT):
        accumulated_depth += CUP_DEPTHS[i - 1]
        divider_starts.append(
            WALL_THICKNESS
            + accumulated_depth
            + (i - 1) * DIVIDER_BASE_WIDTH
            - DIVIDER_FORWARD_OFFSET
        )

    # One vertical capsule-shaped opening per bay on each long side wall.
    # Each cutter is only as deep as its wall, so it cannot remove a divider
    # or pass through the opposite side. Vertical rounded slots print without
    # support because each layer grows around a short arch rather than a flat roof.
    slot_z = WALL_THICKNESS + (WALL_HEIGHT - WALL_THICKNESS) / 2.0
    for bay in range(CUP_COUNT):
        bay_start = (WALL_THICKNESS if bay == 0
                     else divider_starts[bay - 1] + DIVIDER_BASE_WIDTH)
        bay_end = (divider_starts[bay] if bay < DIVIDER_COUNT
                   else rear_base_x)
        slot_x = (bay_start + bay_end) / 2.0
        slot_profile = (
            cq.Workplane("XZ")
            .center(slot_x, slot_z)
            .slot2D(SIDE_SLOT_HEIGHT, SIDE_SLOT_WIDTH, angle=75)
        )
        near_side_cutter = slot_profile.extrude(WALL_THICKNESS).translate(
            (0, WALL_THICKNESS, 0)
        )
        far_side_cutter = near_side_cutter.translate((0, WIDTH - WALL_THICKNESS, 0))
        holder = holder.cut(near_side_cutter).cut(far_side_cutter)

    # Partitions cross the short axis and lean toward the back in the X/Z plane.
    angle = math.radians(DIVIDER_ANGLE_DEG)
    rise = DIVIDER_HEIGHT
    run = rise * math.tan(angle)
    half_t = DIVIDER_THICKNESS / 2.0
    # Offset perpendicular to the slanted face to give the plate true 2 mm thickness.
    normal_x = -math.sin(angle) * half_t
    normal_z = math.cos(angle) * half_t
    for center_x in divider_starts:
        profile = [
            (center_x, FLOOR_THICKNESS),
            (center_x + run, FLOOR_THICKNESS + rise),
            (center_x + run + DIVIDER_BASE_WIDTH, FLOOR_THICKNESS + rise),
            (center_x + DIVIDER_BASE_WIDTH, FLOOR_THICKNESS),
        ]

        # profile = [
        #     (center_x - normal_x, FLOOR_THICKNESS - normal_z),
        #     (center_x + run - normal_x, FLOOR_THICKNESS + rise - normal_z),
        #     (center_x + run + normal_x, FLOOR_THICKNESS + rise + normal_z),
        #     (center_x + normal_x, FLOOR_THICKNESS + normal_z),
        # ]
        divider = (
            cq.Workplane("XZ")
            .polyline(profile)
            .close()
            .extrude(WIDTH - 2 * WALL_THICKNESS)
            .translate((0, WIDTH - WALL_THICKNESS, 0))
        )
        holder = holder.union(divider)
    return holder.clean()


def save_preview(holder: cq.Workplane, path: Path) -> None:
    """Render the holder's tessellated surfaces as an isometric preview."""
    vertices, triangles = holder.val().tessellate(0.2)
    points = [vertex.toTuple() for vertex in vertices]
    faces = [[points[index] for index in tri] for tri in triangles]
    fig = plt.figure(figsize=(9, 5.6), dpi=180)
    ax = fig.add_subplot(111, projection="3d")
    ax.add_collection3d(Poly3DCollection(
        faces, facecolors="#f28c28", edgecolors="#653b16", linewidths=0.15,
        alpha=0.94
    ))
    ax.set_xlim(0, LENGTH + WALL_HEIGHT * math.tan(math.radians(BACK_SLOPE_DEG)))
    ax.set_ylim(0, WIDTH)
    ax.set_zlim(0, WALL_HEIGHT * 1.08)
    ax.set_box_aspect((LENGTH, WIDTH, WALL_HEIGHT))
    ax.view_init(elev=28, azim=-58)
    ax.set_xlabel("Length (mm)")
    ax.set_ylabel("Width (mm)")
    ax.set_zlabel("Height (mm)")
    ax.set_title(f"Eight-cup holder — {LENGTH:g} × {WIDTH:g} mm, "
                 f"{DIVIDER_ANGLE_DEG:g}° dividers, rounded side slots")
    fig.tight_layout()
    fig.savefig(path, bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    part = build_holder()
    bb = part.val().BoundingBox()
    fits_printer = max(bb.xlen, bb.ylen) <= MAX_PRINTER_XY
    if not fits_printer:
        raise ValueError(
            f"Model footprint {bb.xlen:.2f} × {bb.ylen:.2f} mm exceeds "
            f"the nominal {MAX_PRINTER_XY:.0f} mm X1 Carbon bed."
        )
    cq.exporters.export(part, str(STEP_FILE), exportType="STEP")
    save_preview(part, PREVIEW_FILE)
    print(f"STEP: {STEP_FILE}")
    print(f"Preview: {PREVIEW_FILE}")
    print(f"Valid: {part.val().isValid()}")
    print(f"Bounding box: {bb.xlen:.2f} x {bb.ylen:.2f} x {bb.zlen:.2f} mm")
    print(f"Fits nominal X1 Carbon build area: {fits_printer}")
