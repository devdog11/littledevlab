# ServiceNow pipeline — as built (2026-09-15)

Local notes, gitignored. Supersedes the original PDI-reset checklist, which
described a GitHub-Actions-centric design that was replaced during the rebuild.

Instance: **`dev387941.service-now.com`** (the previous PDI, `dev322229`, was released).

---

## How it works now

A single scheduled Claude cloud routine owns the whole pipeline.

**Routine:** `littledevlab: pull, implement, notify`
(`trig_011JHmmhrGdm6GcLakxiaJn4`) — https://claude.ai/code/routines

| Setting | Value |
|---|---|
| Schedule | `52 */4 * * *` UTC (every 4 hours) |
| Environment | `ldl-snow` (`env_0198RKcMhLCX3mQCygTZeUG6`) |
| Repo | `devdog11/littledevlab`, pushes to `main` |
| Connector | Gmail only |
| Model | Sonnet 5 |

Each run:

1. Pulls `category=littledevlab` change requests —
   `SERVICENOW_INSTANCE_URL=https://dev387941.service-now.com python3 scripts/sync_servicenow.py --proxy-auth`
2. Works through `## Open` in `CHANGES.md` (ServiceNow tickets and hand-written
   items are treated identically), implementing only what is clearly safe
   unattended
3. Moves implemented items to `## Done`, adds a `build-log.html` entry, pushes
   two commits (work, then the hash backfill)
4. Emails `tyson.bell@littledevlab.com` on **every** run

Quiet runs (nothing pulled, nothing implemented) make no commit and write no
Build Log entry — but still send an email, so the progression stays visible.

Pushing to `main` triggers `deploy.yml` → Cloudflare Pages.

**Force a cycle:** Run now on the routine.

---

## Auth — the part that took all the time

The routine holds **no ServiceNow credentials.** The `ldl-snow` cloud
environment has an API credential (type **Basic**, host
`dev387941.service-now.com`, user `claude_integration`) that Anthropic's agent
proxy injects into requests *after* they leave the sandbox.

Two non-obvious things that cost hours:

1. **This PDI restricts Basic auth.** It enabled
   `glide.authenticate.basic_auth.restriction.enforce` at provisioning
   (`enforcement_date 2026-09-14 15:38:02`), limiting Basic auth to holders of
   the `snc_basic_auth_api_access` role. `admin` doesn't have it, so Basic auth
   failed from everywhere — not a proxy or credential problem.
2. **Passwords can't be set via the REST Table API.** Writing `user_password`
   stores a literal string that the auth layer never matches (it reads back as
   plaintext instead of a hash). It has to be set through the UI's **Set
   Password** action or a background script using
   `gr.setDisplayValue('user_password', ...)`.

**Integration user:** `claude_integration`
(`e3e5eb460fdfc310e6eb4bc530d1b22d`), `web_service_access_only`, roles
`snc_basic_auth_api_access` + `itil`. Deliberately **not** `admin` — the
credential lives in an environment shared by every session there, so it can
work change requests but can't administer the instance.

---

## Two intake routes

1. **ServiceNow** — Change Request with Category = `littledevlab`
2. **Manual** — add an item under `## Open` in `CHANGES.md`

No reconciliation needed: the routine pulls and then processes in the same
checkout, so both sources are already in one file by the time it reads them.

---

## Also configured

- **OAuth app** `littledevlab-mcp`, client ID `e8be4f57d31b4c37bbb523ac9bf9f647`,
  Scope Restriction **Broadly scoped** (it defaulted to "Useraccount scoped",
  which returned `Access to unscoped api is not allowed` on the Table API).
  Used by the local MCP server and standalone script runs, not by the routine.
- **Local MCP server** — `~/AI/automations/servicenow-mcp-stdio.sh`, instance
  URL and client ID updated; secrets in Keychain (`servicenow_client_secret`,
  `servicenow_password`).
- **`littledevlab` category** exists on `change_request`.
- `scripts/sync_servicenow.py` gained `--proxy-auth` (skip OAuth, let the
  transport supply auth) and now prefers the system trust store, falling back
  to certifi only when it's empty — the unconditional certifi override was
  rejecting the proxy's CA in the sandbox.

## Deliberately off

- **GitHub Actions `sync-servicenow.yml`** — disabled; the routine owns the
  pull. Its repo secrets still point at the dead `dev322229` instance, so it
  would fail if re-enabled without updating them.
- **`snow-mcp` connector / HA add-on / Cloudflare Tunnel** — still aimed at
  `dev322229`. Nothing in the pipeline uses it; it will fail if called from a
  claude.ai chat until repointed.

`deploy.yml` (Cloudflare Pages) stays **active** — it's what publishes the site.
