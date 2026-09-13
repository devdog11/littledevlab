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
