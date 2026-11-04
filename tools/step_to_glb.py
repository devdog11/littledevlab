"""Convert a STEP or STL file to a GLB the site's 3D viewer (model-viewer) can show.

    python3 tools/step_to_glb.py images/experiments/applaws/applaws.step [color]
    python3 tools/step_to_glb.py images/experiments/kraft-singles/holder.stl [color]

Writes <same name>.glb next to the source file. CAD files are in millimetres
and glTF in metres, so the model is scaled by 0.001 (real size in AR), and
turned from CAD's Z-up to glTF's Y-up. `color` is a hex code for the plastic,
default F3EDE1 (the logo's off-white).
STEP needs CadQuery (pip install cadquery); STL needs nothing extra.
"""
import json
import math
import struct
import sys
from pathlib import Path

MM_TO_M = 0.001
# -90 degrees about X: CAD Z-up -> glTF Y-up (same as CadQuery's own export).
Z_UP_TO_Y_UP = [-math.sqrt(0.5), 0.0, 0.0, math.sqrt(0.5)]


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def step_to_glb(src, out, rgb):
    import cadquery as cq

    shape = cq.importers.importStep(str(src)).val().scale(MM_TO_M)
    assy = cq.Assembly()
    assy.add(shape, name=src.stem, color=cq.Color(*rgb, 1))
    # 0.05 mm chordal tolerance after scaling: smooth curves, small file.
    assy.export(str(out), exportType="GLTF", tolerance=0.00005, angularTolerance=0.2)
    bb = shape.BoundingBox()
    return bb.xlen / MM_TO_M, bb.ylen / MM_TO_M, bb.zlen / MM_TO_M


def read_stl(path):
    """Triangles as [(v1, v2, v3), ...] from a binary or ASCII STL."""
    data = path.read_bytes()
    if len(data) >= 84:
        count = struct.unpack_from("<I", data, 80)[0]
        if 84 + count * 50 == len(data):  # binary
            tris = []
            for i in range(count):
                v = struct.unpack_from("<12f", data, 84 + i * 50)
                tris.append((v[3:6], v[6:9], v[9:12]))
            return tris
    verts = [tuple(float(x) for x in line.split()[1:4])
             for line in data.decode("ascii", "replace").splitlines()
             if line.strip().startswith("vertex")]
    return [tuple(verts[i:i + 3]) for i in range(0, len(verts) - 2, 3)]


def stl_to_glb(src, out, rgb):
    tris = read_stl(src)
    if not tris:
        raise SystemExit(f"No triangles found in {src}")
    positions, normals = [], []
    for a, b, c in tris:
        a, b, c = ([x * MM_TO_M for x in p] for p in (a, b, c))
        u = [b[i] - a[i] for i in range(3)]
        v = [c[i] - a[i] for i in range(3)]
        n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
        length = math.sqrt(sum(x * x for x in n)) or 1.0
        n = [x / length for x in n]
        for p in (a, b, c):  # flat shading: each triangle keeps its own normal
            positions.append(p)
            normals.append(n)

    pos_bytes = b"".join(struct.pack("<3f", *p) for p in positions)
    nrm_bytes = b"".join(struct.pack("<3f", *n) for n in normals)
    binary = pos_bytes + nrm_bytes
    lo = [min(p[i] for p in positions) for i in range(3)]
    hi = [max(p[i] for p in positions) for i in range(3)]
    gltf = {
        "asset": {"version": "2.0", "generator": "littledevlab step_to_glb.py"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"name": src.stem, "mesh": 0, "rotation": Z_UP_TO_Y_UP}],
        "meshes": [{"primitives": [{"attributes": {"POSITION": 0, "NORMAL": 1}, "material": 0}]}],
        "materials": [{"pbrMetallicRoughness": {
            "baseColorFactor": [*(srgb_to_linear(c) for c in rgb), 1.0],
            "metallicFactor": 0.0, "roughnessFactor": 0.6}, "doubleSided": True}],
        "buffers": [{"byteLength": len(binary)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": 0, "byteLength": len(pos_bytes), "target": 34962},
            {"buffer": 0, "byteOffset": len(pos_bytes), "byteLength": len(nrm_bytes), "target": 34962},
        ],
        "accessors": [
            {"bufferView": 0, "componentType": 5126, "count": len(positions), "type": "VEC3", "min": lo, "max": hi},
            {"bufferView": 1, "componentType": 5126, "count": len(normals), "type": "VEC3"},
        ],
    }
    js = json.dumps(gltf, separators=(",", ":")).encode()
    js += b" " * (-len(js) % 4)
    binary += b"\0" * (-len(binary) % 4)
    total = 12 + 8 + len(js) + 8 + len(binary)
    out.write_bytes(struct.pack("<4sII", b"glTF", 2, total)
                    + struct.pack("<I4s", len(js), b"JSON") + js
                    + struct.pack("<I4s", len(binary), b"BIN\0") + binary)
    return tuple((hi[i] - lo[i]) / MM_TO_M for i in range(3))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    rgb = hex_rgb(sys.argv[2] if len(sys.argv) > 2 else "F3EDE1")
    out = src.with_suffix(".glb")
    kind = src.suffix.lower()
    if kind in (".step", ".stp"):
        size = step_to_glb(src, out, rgb)
    elif kind == ".stl":
        size = stl_to_glb(src, out, rgb)
    else:
        sys.exit(f"Unsupported file type {src.suffix}: use .step, .stp or .stl")
    print(f"{out}  {out.stat().st_size / 1024:.0f} KB  "
          f"{size[0]:.1f} x {size[1]:.1f} x {size[2]:.1f} mm")


if __name__ == "__main__":
    main()
