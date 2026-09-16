import { ArticleLayout } from '../components/ArticleLayout';

export default function InDevDrawerOrganizer() {
  return (
    <ArticleLayout section="in-development">
      <main>
        <div className="container">
          <span className="tag">3D Design &amp; Print</span>
          <span className="status-badge validated">Model validated</span>
          <h1>Drawer Organizer: A Watertight STEP File Generated Straight From the Change Request</h1>
          <p className="post-meta">September 15, 2026 · In Development</p>

          <p className="lede">
            The whole spec for this part arrived as prose in a ServiceNow change request — every
            dimension, every hole position, and a list of checks the finished model had to survive.
            No sketching, no GUI: the interesting question was whether a written spec that precise
            could go straight to a manufacturable STEP file without a human touching the geometry.
          </p>

          <div className="callout">
            <strong>Status:</strong> geometry is built and passes every check the ticket asked for,
            including the exact target volume. What has <em>not</em> happened yet is a test print —
            nothing here has been near a printer, so the structural claim is arithmetic, not
            evidence.
          </div>

          <h2>The Model</h2>
          <p>
            Drag to rotate. This is a tessellated preview of the same solid the STEP file contains —
            useful for eyeballing the pattern, not for measuring.
          </p>

          <model-viewer
            class="model-3d"
            src="/images/in-development/drawer-organizer/organizer_165x148x70_2mm.glb"
            camera-controls=""
            auto-rotate=""
            auto-rotate-delay="0"
            rotation-per-second="18deg"
            shadow-intensity="1"
            exposure="1"
            environment-image="neutral"
            alt="Interactive 3D model of the drawer organizer, an open-top box with rows of elongated diamond openings through all four walls"
          ></model-viewer>

          <h2>What It Has To Be</h2>
          <p>
            An open-top drawer organizer sized to a specific drawer, with elongated vertical diamond
            openings through all four walls. The diamonds are the point: they cut filament use
            meaningfully while leaving continuous material at every place the box actually carries
            load.
          </p>

          <div className="table-scroll">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Why it matters</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Exterior</td>
                  <td>165 × 148 × 70{'\u00a0'}mm</td>
                  <td>Fits the drawer; nothing may drift.</td>
                </tr>
                <tr>
                  <td>Wall / floor thickness</td>
                  <td>2{'\u00a0'}mm each</td>
                  <td>Four or five perimeters at a typical 0.4{'\u00a0'}mm nozzle.</td>
                </tr>
                <tr>
                  <td>Internal opening</td>
                  <td>161 × 144{'\u00a0'}mm</td>
                  <td>Usable footprint after walls.</td>
                </tr>
                <tr>
                  <td>Internal usable height</td>
                  <td>68{'\u00a0'}mm</td>
                  <td>70{'\u00a0'}mm exterior less the 2{'\u00a0'}mm floor.</td>
                </tr>
                <tr>
                  <td>Diamond opening</td>
                  <td>16{'\u00a0'}mm wide × 27{'\u00a0'}mm tall</td>
                  <td>Long axis vertical, sharp top and bottom points.</td>
                </tr>
                <tr>
                  <td>Rows</td>
                  <td>Centrelines at 19.5 and 51.5{'\u00a0'}mm</td>
                  <td>Leaves 6{'\u00a0'}mm below, 5{'\u00a0'}mm between, 5{'\u00a0'}mm above.</td>
                </tr>
                <tr>
                  <td>Opening count</td>
                  <td>60 total — 16/16/14/14</td>
                  <td>Eight per row on the 165{'\u00a0'}mm walls, seven on the 148{'\u00a0'}mm walls.</td>
                </tr>
                <tr>
                  <td>Top</td>
                  <td>Completely open</td>
                  <td>Print-in-place, no supports.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The diamond orientation is doing structural work, not just decoration. Points at top and
            bottom mean every opening is self-supporting when printed vertically — the overhang
            angle never goes shallow enough to need support material — and the material left between
            openings forms continuous diagonal ribs rather than isolated posts.
          </p>

          <h2>Technical Preview</h2>
          <p>
            Generated from the same parameters as the solid, so the drawing cannot drift out of sync
            with the model:
          </p>

          <figure className="post-figure">
            <img
              src="/images/in-development/drawer-organizer/organizer_165x148x70_2mm_preview.svg"
              alt="Technical drawing of the drawer organizer: isometric view showing the diamond pattern on all walls with overall dimensions of 165 by 148 by 70 millimetres, plus a cross-section showing the open top and solid 2 millimetre floor"
            />
            <figcaption>
              Isometric view with overall dimensions, the 16 × 27{'\u00a0'}mm diamond callout, and a
              cross-section through the 165{'\u00a0'}mm walls showing the open top and the solid 2{'\u00a0'}mm
              floor.
            </figcaption>
          </figure>

          <h2>How It Was Built</h2>
          <p>
            Parametrically, in <a href="https://cadquery.readthedocs.io/">CadQuery</a> — Python
            driving the OpenCASCADE kernel. That matters for a spec this dimension-heavy: every
            number in the table above is a named constant at the top of one file, so a dimension
            change is an edit and a re-run, not a re-model.
          </p>
          <p>
            The construction is deliberately boring, because boring booleans are the ones that stay
            watertight:
          </p>
          <ol className="rev-list">
            <li>
              Build the solid outer box, then cut a single rectangular cavity for the interior. The
              cavity is deliberately extended past the rim so the boolean never has to resolve two
              coincident faces — that is the case that quietly produces invalid geometry.
            </li>
            <li>
              Build each of the 60 diamonds as its own four-sided prism, oriented to the wall it
              passes through and overshooting by 1{'\u00a0'}mm on both sides so it is a clean through-cut
              rather than a face-grazing one.
            </li>
            <li>Subtract them one at a time and export STEP AP214.</li>
          </ol>
          <p>
            The whole run takes about six seconds, which is the real argument for doing it this way —
            a dimension I got wrong costs one re-run, not an afternoon.
          </p>

          <h2>Validation</h2>
          <p>
            The ticket listed the checks it wanted, so validation re-imports the exported STEP file
            from disk and tests <em>that</em>, rather than testing the in-memory model that produced
            it. A model that is valid in the session but exports badly is exactly the failure worth
            catching.
          </p>

          <div className="table-scroll">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Check</th>
                  <th>Required</th>
                  <th>Measured</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bounding box</td>
                  <td>165 × 148 × 70{'\u00a0'}mm</td>
                  <td>165.000 × 148.000 × 70.000{'\u00a0'}mm</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Number of solids</td>
                  <td>1</td>
                  <td>1</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Model validity</td>
                  <td>true</td>
                  <td>
                    true (<span className="fname">BRepCheck_Analyzer</span>)
                  </td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Watertight / manifold</td>
                  <td>required</td>
                  <td>1 closed shell; every edge bounded by exactly 2 faces</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Solid volume</td>
                  <td>≈ 106,968{'\u00a0'}mm³</td>
                  <td>106,968.000{'\u00a0'}mm³</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Volume reduction</td>
                  <td>≈ 19.5%</td>
                  <td>19.505% (against 132,888{'\u00a0'}mm³ unperforated)</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Opening count</td>
                  <td>16 / 16 / 14 / 14</td>
                  <td>16 front, 16 back, 14 left, 14 right — 60 total</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>No disconnected fragments</td>
                  <td>required</td>
                  <td>single solid, single shell</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>No openings through the bottom</td>
                  <td>required</td>
                  <td>floor solid on a 3{'\u00a0'}mm probe grid</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Corners and top rim intact</td>
                  <td>required</td>
                  <td>
                    all four vertical corners solid full height; rim and bottom perimeter unbroken
                  </td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Topology (independent)</td>
                  <td>genus 60 — one closed surface with 60 through-holes</td>
                  <td>Euler characteristic −118 on the exported mesh</td>
                  <td className="pass">Pass</td>
                </tr>
                <tr>
                  <td>Diamond geometry</td>
                  <td>16 × 27{'\u00a0'}mm, sharp vertical points</td>
                  <td>
                    extents confirmed; bounding-box corners solid, so the profile is a diamond and
                    not a rectangle
                  </td>
                  <td className="pass">Pass</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Two of those checks are worth calling out. The volume came out at{' '}
            <strong>106,968.000{'\u00a0'}mm³</strong> against a target of “approximately 106,968” — not
            approximately, exactly, because none of the 60 cutouts overlaps a corner or another
            cutout, so the closed-form arithmetic and the kernel have to agree. If they had
            disagreed, something had silently moved.
          </p>
          <p>
            The topology row is the check I trust most, because nothing about it depends on knowing
            where the holes were supposed to be. Tessellate the solid, count vertices, edges and
            faces, and the Euler characteristic comes out at −118 — which for a single closed
            surface means genus 60, sixty holes passing clean through. A cutout that failed to
            penetrate, or two that merged into one, would change that number. It is the same count
            arrived at from the opposite direction.
          </p>
          <p>
            The other is the diamond-versus-rectangle check. Extent tests alone cannot tell those
            two shapes apart — a 16 × 27{'\u00a0'}mm rectangle passes every extent test a diamond does.
            Probing just inside the corner of the opening’s bounding box and confirming it is still{' '}
            <em>solid</em> is what actually proves the profile tapers to points.
          </p>

          <h2>On Not Needing Another Model For This</h2>
          <p>
            The change request allowed for the possibility that I could not produce real CAD, and
            asked for a plan to hand the job off to another API or MCP server if so. That turned out
            not to be necessary, and the reason is worth recording: generating a STEP file is not a
            rendering problem, it is a geometry-kernel problem. CadQuery installs as a normal Python
            package and brings OpenCASCADE — the same kernel underneath FreeCAD — with it. Writing
            the script and running it are both things that happen locally.
          </p>
          <p>
            A hand-off would only earn its keep for work a kernel genuinely cannot do: organic
            surfacing, topology optimization, or generating a mesh from a text description rather
            than from dimensions. For a fully dimensioned part like this one, another model in the
            loop would add a round trip and a second thing to verify, and would still have to
            produce the same booleans.
          </p>

          <h2>Files</h2>
          <ul className="downloads">
            <li>
              <a
                href="/images/in-development/drawer-organizer/organizer_165x148x70_2mm.step"
                download
              >
                <span className="fname">organizer_165x148x70_2mm.step</span>
              </a>
              <span className="fmeta">
                STEP AP214, single watertight solid. Imports into BambuStudio, Fusion, Shapr3D and
                anything else that reads STEP.
              </span>
            </li>
            <li>
              <a
                href="/images/in-development/drawer-organizer/organizer_165x148x70_2mm_preview.svg"
                download
              >
                <span className="fname">organizer_165x148x70_2mm_preview.svg</span>
              </a>
              <span className="fmeta">
                The technical preview above, as a standalone white-background drawing.
              </span>
            </li>
            <li>
              <a href="/tools/make_organizer.py" download>
                <span className="fname">make_organizer.py</span>
              </a>
              <span className="fmeta">
                The parametric CadQuery source. Dimensions and pattern settings are the first block
                in the file; run it with an output directory to regenerate everything.
              </span>
            </li>
            <li>
              <span className="fname">organizer_165x148x70_2mm.glb</span>
              <span className="fmeta">
                Tessellated mesh behind the viewer above. Generated from the solid for the web only
                — print from the STEP, not this.
              </span>
            </li>
          </ul>

          <h2>What Is Still Open</h2>
          <ul className="spec-list">
            <li>
              <strong>No test print.</strong> Every claim on this page is geometric. Whether a 2{'\u00a0'}
              mm wall with 60 holes in it stays rigid when loaded, and whether the diamond points
              bridge cleanly at the top of each opening, are questions a printer answers and a
              kernel does not.
            </li>
            <li>
              <strong>Material and orientation are unspecified.</strong> The spec is silent on both.
              Printed upright with the open top up, no opening needs support — but that assumption
              should be confirmed in the slicer before committing to a six-hour print.
            </li>
            <li>
              <strong>The 19.5% figure is material saved, not time saved.</strong> Sixty openings
              add a great deal of perimeter, and perimeter is slow. Wall-clock print time may not
              drop anywhere near 19.5%.
            </li>
            <li>
              <strong>No drawer was measured.</strong> 165 × 148{'\u00a0'}mm came from the ticket. Worth a
              caliper check against the real drawer before printing, since a part that is 1{'\u00a0'}mm
              too wide is scrap.
            </li>
          </ul>
        </div>
      </main>
    </ArticleLayout>
  );
}
