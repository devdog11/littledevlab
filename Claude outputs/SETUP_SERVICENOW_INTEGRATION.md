# Setting Up ServiceNow Integration with Claude

> **This repo is public.** Never paste real tunnel tokens, bearer tokens,
> ServiceNow credentials, or OAuth secrets into this file or any file in
> this repo. Enter all secrets manually through the Home Assistant UI
> (see "Known friction" below) — never via API/automation.

## Goal

Self-host a ServiceNow MCP server as a Home Assistant add-on on the NUC,
expose it to the public internet via a Cloudflare Tunnel, and register it
as a **remote MCP connector** at claude.ai/customize/connectors —
deliberately self-hosted rather than using Claude's built-in ServiceNow
registry connector. Framed as a LittleDevLab Lab Notes track (agentic AI +
home automation skill-building).

This ties together three pieces:
1. The **HA add-on** running the actual MCP server code.
2. A **Cloudflare Tunnel** so that add-on is reachable from the internet.
3. A **claude.ai remote connector** registration so Claude can call it.

---

## Part 1 — The Home Assistant Add-on (ServiceNow MCP server)

- Repo: `github.com/devdog11/littledevlab-addons` — **must stay public**;
  HA Supervisor can't clone private repos without credentials.
- Add-on slug: `cc55a077_servicenow_mcp`, version `1.0.4`.
- Internal hostname: `cc55a077-servicenow-mcp`, listening on `0.0.0.0:8080`,
  MCP path `/mcp`.
- Underlying package: `mcp-server-servicenow`
  (`github.com/jschuller/mcp-server-servicenow`), run via `uvx` with
  `--transport streamable-http`.
- ServiceNow instance: a dev/PDI instance at `dev322229.service-now.com`
  (OAuth).
- **Two independent auth layers** on the add-on's Configuration page —
  don't conflate them:
  - `username` / `password` / `client_id` / `client_secret` — the add-on's
    own login to your ServiceNow instance. Irrelevant to what Claude sends.
  - `static_token` — a separate static bearer token that the add-on checks
    incoming caller requests against. This is what claude.ai's connector
    needs (see Part 3).

### Known friction building/maintaining the add-on
- Writing secrets into the HA add-on's Supervisor Options via the API gets
  blocked by a safety classifier almost every time — **enter tokens
  manually via the HA UI** instead.
- Any change to `snow-mcp/run.sh` or `config.yaml` requires a full
  **uninstall → remove_repository → add_repository → install** cycle,
  since Supervisor doesn't re-pull git changes on its own. (Doesn't apply
  to the `cloudflared` add-on itself — that's a separate official add-on,
  not part of this repo.)

---

## Part 2 — Cloudflare Tunnel Setup

### Prerequisites
- [ ] `cloudflared` add-on already installed in HA Supervisor
- [ ] A domain/subdomain managed in Cloudflare DNS you're willing to route
      through the tunnel (`snow-mcp.littledevlab.com`)
- [ ] Access to the Cloudflare Zero Trust dashboard for your account

### Steps

**1. Create the tunnel in Cloudflare Zero Trust**
1. Zero Trust dashboard → **Networks → Tunnels & Mesh** (renamed from
   just "Tunnels" — same place).
2. **Create a tunnel** → choose **Cloudflared**.
3. Name it something identifiable, e.g. `ldl-nuc`. **Note:** deleting a
   tunnel later doesn't cleanly free its name — the DNS pointer sticks to
   it. Pick a name you're willing to live with; if you do delete one, give
   the replacement a new name rather than reusing the old one.
4. Cloudflare shows an install command with a token embedded — you don't
   need the install command, just copy the **tunnel token** value out of
   it. Store it in a password manager, not this repo.

**2. Configure the HA cloudflared add-on**
1. HA: **Settings → Add-ons → Cloudflare Tunnel → Configuration**.
2. Paste the tunnel token into the token field via the HA UI directly.
3. Save and start (or restart) the add-on.
4. Check the add-on logs to confirm it connects
   ("Registered tunnel connection").

**2a. Rotating the tunnel token later**
There's no obvious "regenerate" button on the tunnel's Overview page.
Instead:
1. Tunnel's page (Networks → Tunnels & Mesh → your tunnel) →
   **Connectors** → **Add a connector**.
2. In the panel, scroll past the install commands to **Refresh token** →
   click it.
3. This immediately invalidates the *old* token for new connections but
   does **not** disconnect an already-running cloudflared instance — you
   still have to:
4. Copy the new token into the HA cloudflared add-on's Configuration
   (step 2 above) and **restart the add-on**. Saving config without
   restarting leaves it running on the old, now-invalid token.
5. Confirm in the Cloudflare dashboard's Connectors tab that the
   connector shows a fresh "last seen" timestamp, not a stale "Healthy"
   from before rotation.

**3. Add the public hostname route**
On your tunnel in the Zero Trust dashboard:
1. **Hostname routes** tab (previously "Public Hostname") →
   **Add a public hostname**.
2. Subdomain: `snow-mcp` (or your choice)
3. Domain: your domain managed in Cloudflare
4. Service type: `HTTP`
5. URL: `cc55a077-servicenow-mcp:8080`
6. Save — Cloudflare auto-creates the DNS record.

**4. Test from outside your network**
- From a device NOT on your home network (phone on cellular, etc.), hit
  `https://snow-mcp.littledevlab.com/mcp`.
- Expect a response from the MCP server — likely an auth error if no
  bearer token is supplied yet, which just means routing works.
- Include the bearer token (the add-on's static token, not ServiceNow
  OAuth creds) and confirm a valid MCP response.
- **Don't test `http://cc55a077-servicenow-mcp:8080` directly in a
  regular browser** — that internal hostname only resolves inside HA
  Supervisor's internal Docker network. "Can't be reached" there is
  expected and tells you nothing about add-on/tunnel health. To verify
  the add-on itself is up, check its **Logs** tab (Settings → Add-ons →
  ServiceNow MCP → Logs) — a clean start shows
  `Uvicorn running on http://0.0.0.0:8080`.

---

## Part 3 — Register as a Remote Connector in claude.ai

1. Go to **claude.ai/customize/connectors** → **Add custom connector**.
2. Name it and point it at `https://snow-mcp.littledevlab.com/mcp`.
3. Under **Authentication**, Claude will likely auto-detect "Sign in now"
   (OAuth) — **ignore that, it's a false positive**. This server doesn't
   do a real OAuth handshake; it just checks a static bearer token.
   Select **No sign-in** instead.
4. Under **Request headers**, click **+ Add header**:
   - Header name: `Authorization`
   - Header value: the literal string `Bearer ` followed by the token,
     e.g. `Bearer eyJhI...`. The field does **not** add the "Bearer "
     prefix for you — type it yourself.
5. The token itself comes from the HA add-on's Configuration page
   (Settings → Add-ons → ServiceNow MCP → Configuration → `static_token`
   field, eye icon to reveal). That's the field the add-on checks
   incoming requests against — separate from the
   `username`/`password`/`client_id`/`client_secret` fields on the same
   page, which are only for the add-on's own login to ServiceNow and are
   irrelevant to what Claude sends.
6. Click **Add**, then test the connection.
   - "Couldn't connect to the server" → routing/tunnel problem, recheck
     Part 2 steps 2–3.
   - Auth failure → check the add-on's Logs tab for a line like
     `Auth error returned: invalid_token (status=401)` — means the value
     pasted into Claude's header doesn't match the add-on's current
     `static_token` (stale copy, extra whitespace, or a token regenerated
     on one side but not the other).

---

## Known Friction Summary

- Secrets via the HA API get blocked by a safety classifier — always
  enter manually via the HA UI.
- Add-on code changes require a full uninstall/reinstall cycle (Supervisor
  doesn't auto re-pull git).
- **Two independent secrets are easy to conflate:**
  - **Cloudflare tunnel token** — routes traffic to the NUC.
  - **MCP static bearer token** — authenticates callers (Claude) to the
    MCP server itself.
  Rotating one has no effect on the other — regenerating the tunnel token
  doesn't invalidate the static bearer token in Claude's connector config,
  and vice versa.

---

## Related, Not Yet Done

- A `.claude/commands/sync-servicenow.md` Claude Code command in the
  littledevlab repo is meant to pull `category=littledevlab` ServiceNow
  `change_request` tickets into the site's public `CHANGES.md`. Never
  successfully run yet — blocked on:
  - confirming the `littledevlab` category's actual choice-list value in
    ServiceNow,
  - a public-appropriateness review of `short_description` text (it gets
    pasted verbatim into a public file),
  - deciding whether to add a `state` filter (the query currently has
    none).

---

## Status Checklist

- [ ] Add-on built and running (`cc55a077_servicenow_mcp` v1.0.4) — **done**
- [ ] Tunnel created in Cloudflare
- [ ] Token entered into HA cloudflared add-on
- [ ] Public hostname route added
- [ ] Tested externally
- [ ] Registered as claude.ai remote connector
- [ ] `sync-servicenow` command validated end-to-end
