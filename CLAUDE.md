# littledevlab — agent notes

## Build Log entries must end with a real commit hash

`build-log.html` entries carry a `<span class="log-entry-commit">commit <short-hash></span>`.
An entry written in the same commit as the work it describes cannot know its own
hash yet, so it goes in as `commit (pending push)`.

**That placeholder must never survive the run.** After committing and pushing, do a
second commit that replaces it with the real short hash:

1. Commit the work plus the build-log entry (placeholder still in place), and push.
2. Read back the hash of that commit (`git rev-parse --short HEAD`).
3. Replace `commit (pending push)` with `commit <hash>` in `build-log.html`.
4. Commit that as `Record commit hash for <what> in build-log`, and push.

The same backfill already happens for `CHANGES.md`; `build-log.html` needs it too.
Four entries (Sep 10–12 2026) shipped with the placeholder before this was written.

Entries authored after the fact live as markdown in `build-log/*.md` with a `commit:`
frontmatter field instead — those already have a real hash and need no backfill.

## CAD source is publishable only while a design is In Development

STEP files and other CAD source (`.step`, `.stp`, `.3mf`, `.f3d`, and the CadQuery
`.py` that generates them) may be committed **only** to support an entry under
`in-development/`. There the CAD is the subject of the post — the point is showing
the work while it is still unsettled.

**A finished product must not ship its STEP.** When a design graduates out of
In Development — to `products.html`, or to a Lab Notes write-up presenting it as
done — the CAD source comes out of the repo in the same commit that graduates it:

1. `git rm` the `.step`/`.3mf`/source files for that design.
2. Leave the `.glb` in place — the interactive viewer is a tessellated mesh, not
   manufacturable source, and every product page already depends on one.
3. Keep the generated `_preview.svg` if a page references it; a drawing is not
   printable geometry.
4. Remove or repoint any download links to the removed files.

Rationale: a published STEP is the product. It is fine to show how something was
made while it is still being made; it is not fine to hand out the manufacturing
file for something being sold. This matches the Sep 8 2026 call on the soap-dish
mount, where the CAD package was deliberately kept off the public repo.

Currently in scope: `images/in-development/drawer-organizer/*.step` and
`tools/make_organizer.py` are published under this exception because the drawer
organizer is an In Development entry. Both must be pulled if it graduates.
