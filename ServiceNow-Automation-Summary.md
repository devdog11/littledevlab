# ServiceNow → CHANGES.md Automation Build

## Context

The `/sync-servicenow` skill (`.claude/commands/sync-servicenow.md`) existed only as a set of instructions for Claude to follow manually inside a session — no script had ever been built. Goal: make the sync run unattended, twice a day, without needing an active Claude session.

## What was built

**1. Standalone sync script — `scripts/sync_servicenow.py`**

- Re-implements the skill's logic without MCP/Claude session dependency: authenticates to the ServiceNow dev instance via OAuth (resource-owner password grant), queries the `change_request` table for `category=littledevlab`, and diffs results against `SNOW <number>` references already present in `CHANGES.md`.
- New tickets are formatted to match the existing bullet convention (timestamp, ticket number, short description, direct link to the record; an indented sub-bullet for the full description when it differs from the short description) and inserted under the `## Open` heading, newest first. `## Done` is left untouched.
- Credentials resolve from env vars (`SERVICENOW_INSTANCE_URL`, `SERVICENOW_CLIENT_ID`, `SERVICENOW_CLIENT_SECRET`, `SERVICENOW_USERNAME`, `SERVICENOW_PASSWORD`), falling back to whatever the local `servicenow` MCP server config in `~/.claude.json` already has, so it also runs zero-config on this machine.
- Supports `--dry-run` to preview without writing.

**2. Fixed an SSL cert gap during local testing**

The python.org macOS build has no bundled CA store, so the OAuth token request failed with `CERTIFICATE_VERIFY_FAILED`. Script now builds its SSL context from `certifi`'s bundle when available.

**3. Verified against the live instance**

`--dry-run` run found 2 real unsynced tickets — CHG0030004 (color contrast feedback on the homepage) and CHG0030002 (Trading Card Display Rack price change) — confirming the OAuth flow, query, and formatting all work end-to-end.

**4. Scheduling decision**

Weighed three options: local cron/launchd (simplest, but only runs if the Mac is on), a Claude Code scheduled cloud agent (fully agentic — can use judgment on ticket content — but costs tokens every run), and a GitHub Actions scheduled workflow (serverless, matches the existing `deploy.yml` pattern). Chose GitHub Actions, with new tickets auto-committed and pushed straight to `main` (no PR/review step) per explicit instruction.

**5. New workflow — `.github/workflows/sync-servicenow.yml`**

- Cron can't express a fixed Pacific local time across DST, so it fires at 4 UTC times (covering both the PDT and PST offsets for 10am and 4pm) and a guard step checks the actual `America/Los_Angeles` hour, skipping the run unless it's really 10am or 4pm Pacific — self-corrects across DST changes with no edits needed twice a year.
- Also has `workflow_dispatch` for manual/on-demand testing.
- Runs the script with the 5 secrets as env vars, then commits and pushes `CHANGES.md` if it changed.
- Hit a YAML parse error from an unindented multi-line string inside a `run: |` block (the commit message); fixed by passing the message as multiple `-m` flags to `git commit` instead.

**6. Repo layout fix**

The script was originally placed under `.claude/scripts/`, but `.claude/` is repo-gitignored — meaning it would never actually reach GitHub Actions after checkout. Moved it to a top-level `scripts/` directory and updated both the workflow's invocation path and the script's own repo-root path resolution.

**7. GitHub secrets setup**

5 repository secrets were added (`SERVICENOW_INSTANCE_URL`, `SERVICENOW_CLIENT_ID`, `SERVICENOW_CLIENT_SECRET`, `SERVICENOW_USERNAME`, `SERVICENOW_PASSWORD`), matching the same credentials the local `servicenow` MCP server config uses. First attempt accidentally created a GitHub **Environment** named after a secret rather than a repository secret — corrected by using Settings → Secrets and variables → Actions → Repository secrets instead.

**8. Shipped**

Committed `scripts/sync_servicenow.py` and `.github/workflows/sync-servicenow.yml` together and pushed to `main` (commit `b7cbb02`).

## Known follow-up

A later commit (`3119197`, "final push to get SNOW integration working") added a compiled `scripts/__pycache__/sync_servicenow.cpython-314.pyc` binary to the repo — this is a build artifact, not source, and shouldn't be tracked. Worth adding `__pycache__/` to `.gitignore` and removing it from the tree in a follow-up cleanup.
