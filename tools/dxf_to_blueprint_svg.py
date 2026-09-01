"""
Convert a Shapr3D-exported DXF dimension drawing into a faint tan "blueprint"
SVG for use as a background watermark behind a product gallery photo.

AI Generated: reverse-engineered from the SVGs already committed under
images/*/*-blueprint.svg (the original conversion script was never
committed - only its output). Verified byte-for-byte structural match
(page size, viewBox, path count) against images/coasters/chilewich-round.dxf
-> chilewich-round-blueprint.svg before use. See CHANGES.md 2026.09.01 entry.

Usage:
    python3 tools/dxf_to_blueprint_svg.py <input.dxf> <output.svg>
"""

import sys

import ezdxf
from ezdxf.addons.drawing import Frontend, RenderContext, config as cfgmod, layout, svg

BLUEPRINT_COLOR = "#d3c8ac"


def convert(dxf_path: str, svg_path: str) -> None:
    doc = ezdxf.readfile(dxf_path)
    msp = doc.modelspace()

    context = RenderContext(doc)
    backend = svg.SVGBackend()
    drawing_config = cfgmod.Configuration(
        color_policy=cfgmod.ColorPolicy.CUSTOM,
        custom_fg_color=BLUEPRINT_COLOR,
        background_policy=cfgmod.BackgroundPolicy.OFF,
    )
    frontend = Frontend(context, backend, config=drawing_config)
    frontend.draw_layout(msp)

    page = layout.Page(0, 0, layout.Units.mm)
    svg_string = backend.get_string(page)

    with open(svg_path, "w") as f:
        f.write(svg_string)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"usage: {sys.argv[0]} <input.dxf> <output.svg>")
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])
