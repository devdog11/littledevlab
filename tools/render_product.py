import bpy, sys, os, math, mathutils

argv = sys.argv[sys.argv.index("--") + 1:]
glb_path   = argv[0]
out_dir    = argv[1]
base_name  = argv[2]
mode       = argv[3]           # "render" or "photoreal"
color_hex  = argv[4] if len(argv) > 4 else "F3EDE1"   # default: paper/white plastic

def hex_to_rgb(h):
    # Blender's Base Color input is LINEAR, but hex codes are sRGB-encoded.
    # Feeding sRGB values straight in as if they were linear silently washes
    # out dark colors (a near-black hex renders as mid-gray) while barely
    # affecting near-white ones - exactly the bug that made every "black"
    # material come out looking like light gray plastic. Convert properly.
    h = h.lstrip('#')
    def to_linear(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (to_linear(int(h[i:i+2], 16)) for i in (0, 2, 4))
    return (r, g, b, 1.0)

# ---- clean scene ----
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for block in list(bpy.data.meshes) + list(bpy.data.materials) + list(bpy.data.lights) + list(bpy.data.cameras):
    try:
        block.user_clear()
        bpy.data.batch_remove(ids=[block])
    except Exception:
        pass

# ---- import model ----
bpy.ops.import_scene.gltf(filepath=glb_path)
mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
if not mesh_objs:
    raise RuntimeError("No mesh objects imported from " + glb_path)

# join into one object for simpler bbox/material handling
bpy.ops.object.select_all(action='DESELECT')
for o in mesh_objs:
    o.select_set(True)
bpy.context.view_layer.objects.active = mesh_objs[0]
if len(mesh_objs) > 1:
    bpy.ops.object.join()
obj = bpy.context.view_layer.objects.active
obj.name = base_name

# ---- normalize scale/units: many CAD exports come in mm; scale down if huge ----
bpy.context.view_layer.update()
bbox_corners = [obj.matrix_world @ mathutils.Vector(c) for c in obj.bound_box]
xs = [c.x for c in bbox_corners]; ys = [c.y for c in bbox_corners]; zs = [c.z for c in bbox_corners]
size = mathutils.Vector((max(xs)-min(xs), max(ys)-min(ys), max(zs)-min(zs)))
center = mathutils.Vector(((max(xs)+min(xs))/2, (max(ys)+min(ys))/2, (max(zs)+min(zs))/2))
max_dim = max(size.x, size.y, size.z, 0.0001)

# scale so the largest dimension is ~0.15m (typical small printed part), for consistent lighting/camera setup
target = 0.15
scale_factor = target / max_dim
obj.scale = (obj.scale.x*scale_factor, obj.scale.y*scale_factor, obj.scale.z*scale_factor)
bpy.context.view_layer.update()

# recompute bbox after scale
bbox_corners = [obj.matrix_world @ mathutils.Vector(c) for c in obj.bound_box]
xs = [c.x for c in bbox_corners]; ys = [c.y for c in bbox_corners]; zs = [c.z for c in bbox_corners]
size = mathutils.Vector((max(xs)-min(xs), max(ys)-min(ys), max(zs)-min(zs)))
center = mathutils.Vector(((max(xs)+min(xs))/2, (max(ys)+min(ys))/2, (max(zs)+min(zs))/2))
max_dim = max(size.x, size.y, size.z, 0.0001)

# sit object on the ground plane (z = min)
min_z = min(zs)
obj.location.z -= min_z
bpy.context.view_layer.update()
bbox_corners = [obj.matrix_world @ mathutils.Vector(c) for c in obj.bound_box]
zs = [c.z for c in bbox_corners]
center.z = (max(zs)+min(zs))/2

# ---- material ----
mat = bpy.data.materials.new(name="ProductMat")
mat.use_nodes = True
bsdf = mat.node_tree.nodes.get("Principled BSDF")
rgb = hex_to_rgb(color_hex)
bsdf.inputs["Base Color"].default_value = rgb
if "Roughness" in bsdf.inputs:
    bsdf.inputs["Roughness"].default_value = 0.35 if mode == "photoreal" else 0.55
if "Metallic" in bsdf.inputs:
    bsdf.inputs["Metallic"].default_value = 0.0
obj.data.materials.clear()
obj.data.materials.append(mat)

# ---- backdrop (neutral mid-gray studio sweep) ----
# A bright/near-white backdrop bounces huge amounts of light (GI) onto small
# objects at this scale, washing out dark materials almost to white. Use a
# neutral ~40% gray (standard studio-photography practice) and a plane sized
# just a bit larger than the object so it doesn't dump excess bounce light.
bpy.ops.mesh.primitive_plane_add(size=max_dim*9, location=(center.x, center.y, 0))
floor = bpy.context.active_object
floor.name = "Backdrop"
bm_mat = bpy.data.materials.new(name="BackdropMat")
bm_mat.use_nodes = True
bg_bsdf = bm_mat.node_tree.nodes.get("Principled BSDF")
backdrop_color = (0.42, 0.42, 0.42, 1.0)
bg_bsdf.inputs["Base Color"].default_value = backdrop_color
bg_bsdf.inputs["Roughness"].default_value = 0.9
floor.data.materials.append(bm_mat)

# ---- camera ----
cam_dist = max_dim * 3.2
az = math.radians(35)
el = math.radians(28)
cam_x = center.x + cam_dist * math.cos(el) * math.sin(az)
cam_y = center.y - cam_dist * math.cos(el) * math.cos(az)
cam_z = center.z + cam_dist * math.sin(el) + max_dim*0.15
bpy.ops.object.camera_add(location=(cam_x, cam_y, cam_z))
cam = bpy.context.active_object
direction = center - mathutils.Vector((cam_x, cam_y, cam_z))
rot_quat = direction.to_track_quat('-Z', 'Y')
cam.rotation_euler = rot_quat.to_euler()
cam.data.lens = 65
bpy.context.scene.camera = cam

# ---- lighting: 3-point studio setup ----
def add_area(name, loc, power_factor, size):
    bpy.ops.object.light_add(type='AREA', location=loc)
    L = bpy.context.active_object
    L.name = name
    dist = (mathutils.Vector(loc) - center).length
    # scale like Blender's default (1000W @ 1m size, 3m distance) -> power ~ factor * dist^2
    L.data.energy = power_factor * (dist ** 2)
    L.data.size = size
    direction = center - mathutils.Vector(loc)
    L.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    return L

key_loc  = (center.x + max_dim*2.5, center.y - max_dim*2.5, center.z + max_dim*3.0)
fill_loc = (center.x - max_dim*3.0, center.y - max_dim*1.5, center.z + max_dim*1.8)
rim_loc  = (center.x - max_dim*1.0, center.y + max_dim*3.0, center.z + max_dim*2.5)

add_area("Key",  key_loc,  14 if mode=="photoreal" else 12, max_dim*1.2)
add_area("Fill", fill_loc, 3,  max_dim*2.0)
add_area("Rim",  rim_loc,  5.5, max_dim*1.0)

world = bpy.context.scene.world
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
bg.inputs[0].default_value = (0.05,0.05,0.05,1) if mode=="photoreal" else (0.08,0.08,0.08,1)
bg.inputs[1].default_value = 0.15

# ---- render settings ----
scene = bpy.context.scene
scene.render.film_transparent = False
scene.render.image_settings.file_format = 'PNG'

# Headless EEVEE needs a working OpenGL/EGL context, which this container's
# surfaceless fallback doesn't reliably provide (renders come out blank white).
# Cycles (CPU ray-tracing) works headless without a GPU context, so use it for
# both modes; keep "render" mode cheap (low samples/res) and "photoreal" nicer.
scene.render.engine = 'CYCLES'
scene.cycles.use_denoising = False
try:
    scene.cycles.device = 'CPU'
except Exception:
    pass

if mode == "photoreal":
    scene.cycles.samples = 64
    scene.render.resolution_x = 1400
    scene.render.resolution_y = 1050
else:
    scene.cycles.samples = 24
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 900

# Filmic/AgX both lift shadows a lot (by design, for a "cinematic" look) which
# makes it hard to ever show a genuinely dark material - everything reads as
# mid-gray. Standard (linear, no tone-curve) preserves actual material color/
# darkness, as long as light levels are tuned to avoid clipping (done above).
scene.view_settings.view_transform = 'Standard'
scene.view_settings.exposure = 0.0

print("DEBUG center=", center, "size=", size, "max_dim=", max_dim)
print("DEBUG cam loc=", (cam_x, cam_y, cam_z), "cam rot=", cam.rotation_euler)
for l in bpy.data.objects:
    if l.type == 'LIGHT':
        print("DEBUG light", l.name, "energy=", l.data.energy, "loc=", l.location)
print("DEBUG obj verts=", len(obj.data.vertices), "obj dims=", obj.dimensions, "obj loc=", obj.location)

out_path = os.path.join(out_dir, f"{base_name}-{mode}.png")
scene.render.filepath = out_path
bpy.ops.render.render(write_still=True)
print("WROTE:", out_path)
