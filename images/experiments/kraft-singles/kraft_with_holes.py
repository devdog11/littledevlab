from pathlib import Path
import os, json, struct, collections
os.environ['MPLCONFIGDIR']=str(Path('work/mpl-cache').resolve())
import cadquery as cq
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
out=Path('outputs').resolve()

# W = Width, D = Depth, T = wall and base thickness
# F = Front wall height above floor, B=Back wall height avove the floor
# H = Max total height T+F
#W,D,T=90.0,70.0,2.0
#F,B=35.0,80.0
#H=T+F
T = 2.0
W, D = 90.0 + 2*T, 70.0 + 2*T  # external: 94 × 74 mm
F, B = 50.0, 80.0              # internal wall heights
H = T + B                      # tallest overall height: 82 mm

# Variable guide
# T: wall and base thickness (mm).
# W, D: outside width and depth (mm); subtract 2*T from each for inside size.
# F, B: front and back wall heights above the inside floor (mm).
# H: maximum overall height, including the base (mm).
# profile: points tracing the holder's side cross-section.
# wire: closed outline made from profile; blank: solid extruded across W.
# cavity: interior box cut from blank; s: finished holder solid.
# bb: s's bounding box, used to check its overall dimensions.
# out: output directory; stem: shared filename prefix for exported files.
# r: STEP file imported back for validation.
# raw: exported STL bytes; n: STL triangle count; edges: count per mesh edge.
# i, j, a, b: temporary triangle, vertex, and edge indices in the STL check.
# values: raw data for one STL triangle; pts: its three rounded vertex points.
# verts, tris: tessellated model vertices and triangles for the preview.
# xyz: vertex coordinates as tuples; fig, ax: preview figure and 3D axes.
# e, p: each model edge and its endpoints while drawing the preview outline.
# notes: design and print information written to the notes file.

profile=[(0,0,0),(0,D,0),(0,D,T+B),(0,D-T,T+B),(0,T,T+F),(0,0,T+F)]
wire=cq.Wire.makePolygon([cq.Vector(*p) for p in profile],close=True)
blank=cq.Solid.extrudeLinear(wire,[],cq.Vector(W,0,0))
cavity=cq.Workplane('XY').box(W-2*T,D-2*T,H+1,centered=(False,False,False)).translate((T,T,T)).val()
s=blank.cut(cavity).clean()

# 5 mm wide pointed-top teardrop holes through all four walls.
# Regular aligned rows and columns fill each wall while keeping a 10 mm border.
hole_width = 5.0
hole_radius = hole_width / 2
edge_margin = 10.0
hole_pitch_across = 9.0
hole_pitch_z = 9.0

def teardrop_prism(origin, across_axis, through_axis, center_across, bottom_z):
    """Make a pointed-top hole cutter, extruded through one wall."""
    y0 = center_across - hole_radius
    y1 = center_across + hole_radius
    z0 = bottom_z
    z_side = bottom_z + hole_radius
    z_peak = bottom_z + hole_width
    def point(across, z):
        if across_axis == 'x':
            return cq.Vector(across, origin, z)
        return cq.Vector(origin, across, z)
    wire = cq.Wire.makePolygon([
        point(y0, z0), point(y0, z_side),
        point(center_across, z_peak), point(y1, z_side), point(y1, z0)
    ], close=True)
    if through_axis == 'x':
        return cq.Solid.extrudeLinear(wire, [], cq.Vector(T, 0, 0))
    return cq.Solid.extrudeLinear(wire, [], cq.Vector(0, T, 0))

hole_tools = []
# Front/back walls: same X and Z grid on both walls, clipped to each wall's top.
for wall_y, wall_height in ((0, F), (D-T, B)):
    bottom_z = T + edge_margin
    z_max = T + wall_height - edge_margin - hole_width
    while bottom_z <= z_max:
        x = T + edge_margin + hole_radius
        x_max = W - T - edge_margin - hole_radius
        while x <= x_max:
            hole_tools.append(teardrop_prism(wall_y, 'x', 'y', x, bottom_z))
            x += hole_pitch_across
        bottom_z += hole_pitch_z

# Side walls: same depth and height grid; omit only holes that violate the
# 10 mm clearance to the sloping top edge.
for wall_x in (0, W-T):
    bottom_z = T + edge_margin
    while True:
        z_peak = bottom_z + hole_width
        if z_peak + edge_margin > T + B:
            break
        y = T + edge_margin + hole_radius
        y_max = D - T - edge_margin - hole_radius
        while y <= y_max:
            # Side wall top slopes linearly from T+F at front to T+B at back.
            top_z = T + F + (B-F) * (y-T) / (D-2*T)
            if z_peak + edge_margin <= top_z:
                hole_tools.append(teardrop_prism(wall_x, 'y', 'x', y, bottom_z))
            y += hole_pitch_across
        bottom_z += hole_pitch_z

for hole_tool in hole_tools:
    s = s.cut(hole_tool)
s = s.clean()

assert s.isValid() and len(s.Solids())==1
bb=s.BoundingBox()
assert max(abs(bb.xlen-W),abs(bb.ylen-D),abs(bb.zlen-H))<1e-6
assert bb.ylen<=3.0625*25.4
stem='kraft_singles_tapered_holder'
out.mkdir(exist_ok=True)
cq.exporters.export(s,str(out/(stem+'.step')))
cq.exporters.export(s,str(out/(stem+'.stl')),tolerance=0.05)
r=cq.importers.importStep(str(out/(stem+'.step'))).val()
assert r.isValid() and len(r.Solids())==1 and abs(r.Volume()-s.Volume())<1e-5
raw=(out/(stem+'.stl')).read_bytes(); n=struct.unpack_from('<I',raw,80)[0]; edges=collections.Counter()
for i in range(n):
    values=struct.unpack_from('<12fH',raw,84+i*50)[3:12]
    pts=[tuple(round(v,5) for v in values[j:j+3]) for j in (0,3,6)]
    for a,b in ((0,1),(1,2),(2,0)): edges[tuple(sorted((pts[a],pts[b])))]+=1
assert all(count==2 for count in edges.values())
verts,tris=s.tessellate(0.05)
xyz=[v.toTuple() for v in verts]
fig=plt.figure(figsize=(9,6),facecolor='#faf8f3')
ax=fig.add_subplot(111,projection='3d',facecolor='#faf8f3')
ax.add_collection3d(Poly3DCollection([[xyz[i] for i in tri] for tri in tris],facecolors='#edb94f',linewidths=0,shade=True))
for e in s.Edges():
    p=[v.toTuple() for v in (e.startPoint(),e.endPoint())]
    ax.plot(*zip(*p),color='#725422',linewidth=0.7)
ax.set(xlim=(0,W),ylim=(0,D),zlim=(0,H),xlabel='Width (mm)',ylabel='Depth (mm)',zlabel='Height (mm)')
ax.set_box_aspect((W,D,H)); ax.view_init(elev=31,azim=-58)
ax.set_title('Tapered cheese-slice holder\n97.8 W × 77.4 D × 38.4 H mm',fontsize=16)
fig.savefig(out/(stem+'_preview.png'),dpi=170,bbox_inches='tight')
notes = f"""All dimensions are in mm.
External width × depth × height: {W} × {D} × {H}.
Wall and base thickness: {T}.
Front wall height: {F}.
Back wall height: {B}.
Internal width × depth: {W - 2*T} × {D - 2*T}.
"""
(out/(stem+'_notes.txt')).write_text(notes)
print(json.dumps({'external_mm':[bb.xlen,bb.ylen,bb.zlen],'internal_width_depth_mm':[93,72.6],'valid_STEP':True,'closed_STL':True,'volume_mm3':s.Volume()},indent=2))
