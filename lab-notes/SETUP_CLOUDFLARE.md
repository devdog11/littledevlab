# Setting Up Cloudflare Tunnel for the ServiceNow MCP Add-on

> **This repo is public.** Never paste real tunnel tokens, bearer tokens,
> or credentials into this file or any file in this repo. Enter secrets
> only through the Home Assistant UI (Supervisor → cloudflared add-on
> config, entered manually — see known friction note below).

Goal: expose the `snow-mcp` HA add-on (internal hostname
`cc55a077-servicenow-mcp`, port 8080, path `/mcp`) to the public internet
via a Cloudflare Tunnel, so it can be registered as a remote MCP connector
at claude.ai/customize/connectors.

## Prerequisites
- [ ] `cloudflared` add-on already installed in HA Supervisor (done)
- [ ] A domain or subdomain managed in Cloudflare DNS that you're willing
      to route through the tunnel (`snow-mcp.littledevlab.com`)
- [ ] Access to the Cloudflare Zero Trust dashboard for your account

## Steps

### 1. Create the tunnel in Cloudflare Zero Trust
1. Go to the Cloudflare Zero Trust dashboard → **Networks → Tunnels &
   Mesh** (the section has been renamed from just "Tunnels" — same place).
2. Click **Create a tunnel** → choose **Cloudflared**.
3. Name it something identifiable, e.g. `ldl-nuc`. **Note:** if you delete
   a tunnel later (out of frustration or otherwise), its name still holds
   the DNS pointer — a new tunnel can't reuse it cleanly. Pick a name
   you're willing to live with, and if you do delete one, give the
   replacement a new name rather than trying to reuse the old one (how to
   actually clear the old pointer isn't nailed down yet).
4. Cloudflare will show you an install command with a token embedded.
   You don't need the install command — just copy the **tunnel token**
   value out of it. Keep this somewhere private (password manager, not
   this repo).

### 2. Configure the HA cloudflared add-on
1. In Home Assistant: **Settings → Add-ons → Cloudflare Tunnel → Configuration**.
2. Paste the tunnel token into the token field via the HA UI directly.
3. Save and start (or restart) the add-on.
4. Check the add-on logs to confirm it connects ("Registered tunnel connection").

### 2a. Rotating the tunnel token later (if you ever need to)
There's no obvious "regenerate" button on the tunnel's main Overview page.
Instead:
1. On the tunnel's page (Networks → Tunnels & Mesh → your tunnel) → the
   **Connectors** section → **Add a connector**.
2. In the panel that opens, scroll past the install commands to
   **Refresh token** → click **Refresh token**.
3. This immediately invalidates the *old* token for new connections, but
   it does **not** disconnect a cloudflared instance already running on
   it — so you still have to:
4. Copy the new token into the HA cloudflared add-on's Configuration
   (step 2 above) and **restart the add-on**. Just saving the config
   without restarting cloudflared will leave it running on the old,
   now-invalid token.
5. Confirm in the Cloudflare dashboard's Connectors tab that the
   connector shows a fresh "last seen" timestamp, not just "Healthy"
   left over from before the rotation.

### 3. Add the public hostname route
Back in the Zero Trust dashboard, on your new tunnel:
1. Go to the tunnel's **Hostname routes** tab (previously called "Public
   Hostname") → **Add a public hostname**.
2. Subdomain: `snow-mcp` (or your choice)
3. Domain: your domain managed in Cloudflare
4. Service type: `HTTP`
5. URL: `cc55a077-servicenow-mcp:8080`
6. Save. Cloudflare will auto-create the DNS record.

### 4. Test from outside your network
- From a device NOT on your home network (phone on cellular, etc.), hit:
  `https://snow-mcp.littledevlab.com/mcp`
- You should get a response from the MCP server (likely an auth error if
  no bearer token is supplied yet — that's expected and means routing works).
- Include the bearer token (the static one configured in the add-on, not
  your ServiceNow OAuth creds) and confirm you get a valid MCP response.
- **Don't bother testing `http://cc55a077-servicenow-mcp:8080` directly
  in a regular browser** — that internal hostname only resolves inside
  HA Supervisor's internal Docker network. A "can't be reached" there is
  expected and tells you nothing about whether the add-on or tunnel is
  healthy. To check the add-on itself is actually up and listening, read
  its **Logs** tab instead (Settings → Add-ons → ServiceNow MCP → Logs) —
  a clean start looks like `Uvicorn running on http://0.0.0.0:8080`.

### 5. Register as a remote connector in claude.ai
1. Go to claude.ai/customize/connectors → **Add custom connector**.
2. Name it and point it at `https://snow-mcp.littledevlab.com/mcp`.
3. Under **Authentication**, Claude will likely auto-detect "Sign in now"
   (OAuth) — **ignore that, it's a false positive**. This server doesn't
   do a real OAuth handshake; it checks a single static bearer token.
   Select **No sign-in** instead.
4. Under **Request headers**, click **+ Add header** and enter:
   - Header name: `Authorization`
   - Header value: the literal string `Bearer ` followed by the token —
     e.g. `Bearer eyJhI...`. The field does **not** add the "Bearer "
     prefix for you; you must type it.
5. The token itself comes from the HA add-on's own Configuration page
   (Settings → Add-ons → ServiceNow MCP → Configuration → `static_token`
   field, click the eye icon to reveal). That field is what the add-on
   checks incoming requests against — it's separate from the
   `username`/`password`/`client_id`/`client_secret` fields on that same
   page, which are only for the add-on's own login to your ServiceNow
   instance and are irrelevant to what Claude sends.
6. Click **Add**, then test the connection.
   - If you get "Couldn't connect to the server," that's a routing/tunnel
     problem — recheck steps 2–3.
   - If you get an auth failure, recheck the add-on's Logs tab for a line
     like `Auth error returned: invalid_token (status=401)` — that means
     the value pasted into Claude's header doesn't match the add-on's
     current `static_token` (stale copy, extra whitespace, or a token
     that was regenerated on one side but not the other).

## Known friction (carried over from the add-on build)
- Writing secrets into the HA add-on's Supervisor Options via the API
  gets blocked by a safety classifier almost every time — enter tokens
  manually via the HA UI.
- Any change to `snow-mcp/run.sh` or `config.yaml` requires a full
  uninstall → remove_repository → add_repository → install cycle, since
  Supervisor doesn't re-pull git changes automatically. (This doesn't
  apply to the cloudflared add-on itself, which is a separate official
  add-on, not part of this repo.)
- Two independent secrets are easy to conflate: the **Cloudflare tunnel
  token** (routes traffic to your NUC) and the **MCP static bearer
  token** (authenticates callers to the MCP server itself). Rotating one
  has no effect on the other — if you regenerate the tunnel token,
  the static bearer token in Claude's connector config is still valid,
  and vice versa.

## Status
- [ ] Tunnel created in Cloudflare
- [ ] Token entered into HA cloudflared add-on
- [ ] Public hostname route added
- [ ] Tested externally
- [ ] Registered as claude.ai remote connector
