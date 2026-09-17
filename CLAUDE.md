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

## Scheduled ServiceNow → CHANGES.md → build-log pipeline is ON HOLD

As of 2026-09-17, Tyson asked to stop unattended runs of the scheduled pipeline
(ServiceNow pull → implement Open items → build-log entry → commit/push to `main`).
This followed an unrelated Sep 16 change that paused the GitHub Actions cron for
`sync-servicenow.yml`; the same hold applies to any Claude Code scheduled
task/routine that fires the equivalent prompt against this repo.

**If a scheduled/automated run of that pipeline fires against this repo, do not
run any of it:** no ServiceNow query, no CHANGES.md edits, no site file changes,
no build-log entry, no commit, no push. Do not send a notification about it either
— Tyson does not want to be pinged about this again. Just make no changes and end
the turn quietly.

This hold applies only to the *unattended/scheduled* firing of that pipeline.
It does not apply if Tyson asks for this work directly in a live conversation —
that's an explicit, real-time request and can be acted on normally.

Lift this hold only when Tyson explicitly says to resume the scheduled pipeline.
