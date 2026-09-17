# ServiceNow integration — the whole back-and-forth

Personal troubleshooting record. Written 2026-09-15, covering the original
build through the PDI reset and rebuild. Gitignored (`working/`).

---

## Current state (start here)

- **Instance:** `dev387941.service-now.com`
- **Intake:** ServiceNow Change Request with Category = `littledevlab`, **or**
  a hand-written item under `## Open` in `CHANGES.md`. Both treated identically.
- **Engine:** Claude cloud routine `littledevlab: pull, implement, notify`
  (`trig_011JHmmhrGdm6GcLakxiaJn4`), every 4 hours (`52 */4 * * *` UTC),
  environment `ldl-snow` (`env_0198RKcMhLCX3mQCygTZeUG6`), Gmail connector.
- **Auth:** Basic, injected by an API credential on the `ldl-snow` environment.
  No ServiceNow credentials exist inside the run.
- **Integration user:** `claude_integration` (`e3e5eb460fdfc310e6eb4bc530d1b22d`),
  roles `snc_basic_auth_api_access` + `itil`, `web_service_access_only`.
- **Publish:** push to `main` → `deploy.yml` → Cloudflare Pages.
- **Email:** every run, to `tyson.bell@littledevlab.com`.
- **Force a run:** Run now on the routine.

Deliberately off: GitHub Actions `sync-servicenow.yml`, the HA `snow-mcp`
add-on, the `snow-mcp` claude.ai connector. `deploy.yml` must stay **on**.

---

## Phase 1 — the original build (before the reset)

- `/sync-servicenow` existed only as instructions for a manual Claude session;
  no script had ever been built.
- Built `scripts/sync_servicenow.py` — OAuth password grant, queries
  `change_request` for `category=littledevlab`, diffs against `SNOW <number>`
  references already in `CHANGES.md`, appends new ones under `## Open`.
- Hit `CERTIFICATE_VERIFY_FAILED` locally — python.org macOS builds ship with
  no CA store. Patched to use `certifi`. **This fix later caused a new bug —
  see Phase 3.**
- Chose GitHub Actions over local cron / a cloud agent for scheduling. Cron
  can't express fixed Pacific time across DST, so it fired 4×/day UTC with a
  guard step that skipped unless the local hour was 10 or 16.
- Script originally lived in `.claude/` — which is gitignored, so it would
  never reach the Actions runner. Moved to top-level `scripts/`.
- 5 repo secrets added. First attempt accidentally created a GitHub
  *Environment* named after a secret instead of repository secrets.
- Separately, a Claude cloud routine was set up to process `## Open` items —
  running on its **own** 4×/day schedule with its own guard. Two independent
  schedulers now existed, which nobody was tracking.

## Phase 2 — PDI released, rebuild begins

- Old PDI `dev322229` released; new one `dev387941`. Everything pointing at the
  old host had to be repointed.
- Created the gitignored `working/` folder for local-only notes.
- Updated `~/AI/automations/servicenow-mcp-stdio.sh` (instance URL + client ID)
  and the Keychain items (`servicenow_client_secret`, `servicenow_password`).

**Failures, in order:**

- `400 "This combination of host and port requires TLS"` → the instance URL had
  a **trailing slash**. Removed it.
- Same error persisted → the **MCP stdio server is spawned once per session**
  and was holding the old config. Worked around it by running the script
  directly instead of through MCP.
- `401 access_denied` on the OAuth token → **trailing space** on the password in
  Keychain.
- `403 "Access to unscoped api is not allowed"` → the new OAuth Application
  Registry defaulted to **Scope Restriction = "Useraccount scoped"** with a
  single `useraccount` auth scope. Changed to **Broadly scoped**. Nothing to do
  with the Application field, which was already Global.
- Sync then worked; pulled CHG0030001. Push rejected (remote ahead) → rebased.

## Phase 3 — architecture rethink, then the auth saga

- Audited what was actually running and found: a second Claude routine still
  committing to `build-log.html`, and `sync-servicenow.yml` **still active**
  despite being believed disabled. Verified with `gh api`, not the dashboard.
- Decided the routine should own the whole pipeline (GitHub Actions can't do
  the AI analysis, which is the actual point), with GitHub remaining the record
  of all content.
- While probing `create_webhook_trigger` to learn its schema, the call
  **succeeded and created a live unfiltered push trigger**. Later removed via
  the routine's Edit dialog, where it appears as a `Push` row under
  "Select a trigger" — not called a webhook anywhere in the UI.
- Tried storing ServiceNow creds in the routine's `environment_variables` via
  API → **silently ignored**, always returns `{}`.
- Worse: that same call **wiped the routine's prompt and config**. The API's
  "partial update" is only partial at the top level — passing `job_config`
  replaces the whole thing. Restored from the conversation transcript.
- Discovered **API credentials** on cloud environments (Pro/Max): the agent
  proxy injects the credential *after* the request leaves the sandbox, so the
  key never reaches the session. Not visible in the **Add** environment dialog —
  only when **editing an existing** environment.
- Created the `ldl-snow` environment with a Basic credential, deliberately
  separate from `Default` so ad-hoc cloud sessions don't inherit ServiceNow access.
- Added `--proxy-auth` to the sync script (skip OAuth, send no Authorization
  header, let the transport supply it).

**Test runs:**

1. `CERTIFICATE_VERIFY_FAILED: self-signed certificate in chain` → the Phase 1
   certifi fix was **overriding the system trust store**, which is where the
   proxy's CA lives. Changed to prefer the system store and fall back to
   certifi only when it holds zero CAs. (Local Python reports 0 CAs, so the
   macOS case still works.)
2. `401 "Required to provide Auth information"` → no header injected.
   Investigated: Basic auth failed **from the laptop too**, with a password that
   worked fine for OAuth. Queried `sys_properties` via OAuth and found the
   cause — see gotchas.
3. Created `claude_integration`, granted roles, set password over REST → still
   401, because `user_password` written via the Table API is stored as a
   literal string, never hashed.
4. Password set properly through the UI → **full green run**: pulled,
   implemented CHG0030001, logged, pushed `c549ec4` + `ea7982b`, emailed.

## Phase 4 — cleanup

- Removed the `Push` trigger; left the cron.
- Disabled `sync-servicenow.yml`. Accidentally disabled **`deploy.yml`** at the
  same time — caught it, re-enabled. Without it nothing publishes.
- Enabled the routine.
- Deleted all five `SERVICENOW_*` repo secrets; kept both `CLOUDFLARE_*`.
- Stopped the HA `snow-mcp` add-on (auto-boot off) and removed the `snow-mcp`
  connector from claude.ai.
- Updated README and marked the HA setup guide as not in use.

---

## Troubleshooting playbook

| Symptom | Cause | Fix |
|---|---|---|
| `400 This combination of host and port requires TLS` | trailing slash on instance URL | strip it |
| `401 access_denied` on `/oauth_token.do` | wrong password — check for stray whitespace | re-set the Keychain item |
| `403 Access to unscoped api is not allowed` | OAuth app Scope Restriction is "Useraccount scoped" | set to **Broadly scoped** |
| `401 Required to provide Auth information` via the routine | credential not saved, host mismatch, or Basic auth blocked by role | check the credential list in `ldl-snow`; confirm the user holds `snc_basic_auth_api_access` |
| `CERTIFICATE_VERIFY_FAILED` in a cloud run | something overriding the system trust store | use the system store; certifi only as fallback |
| MCP tool keeps failing after you fixed the script | stdio server spawned per session, holding old config | start a **new** Claude Code session |
| Routine "not running" but you disabled nothing | GitHub UI toggle didn't stick | verify with `gh api .../actions/workflows`, never the dashboard |
| Site stops updating | `deploy.yml` disabled | re-enable it — it's the only publish path |

**Fast triage command** (proves whether ServiceNow itself is happy, independent
of Claude, the proxy, and MCP):

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  -u "claude_integration:PASSWORD" \
  "https://dev387941.service-now.com/api/now/table/change_request?sysparm_limit=1"
```

`200` = ServiceNow fine, problem is downstream. `401` = password or role.

---

## Gotchas worth remembering

- **New PDIs restrict Basic auth.** This one set
  `glide.authenticate.basic_auth.restriction.enforce = true` at provisioning,
  limiting Basic auth to holders of `snc_basic_auth_api_access`. `admin` does
  **not** have it by default. This cost the most time by far, and it looks
  exactly like a broken credential.
- **You cannot set a ServiceNow password over the REST Table API.** It stores a
  literal string that never matches. Use the form's Set Password action or a
  background script with `gr.setDisplayValue('user_password', ...)`.
- The user form's **Set Password** may route into the Password Reset
  application, which needs a service-desk process configured — a fresh PDI has
  none ("No service-desk processes found"). Background script is the reliable path.
- **Routine updates via API are destructive.** Passing `job_config` replaces it
  entirely. Send the complete config every time, or edit in the UI.
- **Routine environment variables aren't settable via API** — accepted without
  error, silently discarded.
- **API credentials only appear when editing an existing environment**, never in
  the Add dialog. Values are write-only; to change one, delete and re-add.
- **Two credentials on overlapping hosts** → the proxy sends only one, with no
  warning. Keep exactly one per host.
- **Credentials apply to every session in the environment**, so keep integration
  credentials in a dedicated environment, not `Default`.
- **Never store the `admin` login in a cloud credential.** Use a scoped
  integration user — the blast radius is the whole point.
- **Verify state with the API, not dashboards.** Both the GitHub workflow toggle
  and the assumed-disabled routine were wrong when checked directly.
- Stock `admin` sys_id `6816f79cc0a8016401c5a33be04be441` is **identical on
  every PDI** — it never tells you which instance you reached.
- The old instance still answers (with 400s) after release, so "it responded"
  doesn't prove you're on the new one.

## If the PDI gets released again

1. Create an OAuth app (Application Registry → external client) → **Broadly scoped**.
2. Re-add the `littledevlab` choice to `change_request.category`.
3. Create an integration user with `snc_basic_auth_api_access` + `itil`,
   `web_service_access_only`; set its password via background script.
4. In `ldl-snow`: delete the old credential, add Basic with the new user/password,
   allowed website = the new host.
5. Update the instance URL + client ID in `servicenow-mcp-stdio.sh` and the
   Keychain items; start a new Claude Code session.
6. Update the instance URL in the routine's prompt (STEP 1).
7. Run now on the routine and read the log.
