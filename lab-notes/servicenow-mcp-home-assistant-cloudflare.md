---
title: "Self-Hosting a ServiceNow MCP Server on a Home NUC, Wired Into Claude"
date: "2026-09-10"
category: "Agentic AI Skills"
skills: [Agentic AI, MCP, CI/CD & infra]
pinned: true
summary: "Packaged a ServiceNow MCP server as a Home Assistant add-on, tunneled it out through Cloudflare, and registered it as a remote connector at claude.ai."
excerpt: "Packaging a ServiceNow MCP server as a Home Assistant add-on, tunneling it out through Cloudflare, and registering it as a remote connector at claude.ai — end to end, on hardware I own."
description: "Packaging a ServiceNow MCP server as a Home Assistant add-on, tunneling it out through Cloudflare, and registering it as a remote connector at claude.ai — end to end, on hardware I own."
---

<p class="lede">Claude already ships a built-in ServiceNow connector. I didn't use it. The point of this track is learning the actual mechanics — running a real MCP server, exposing it safely to the internet, and registering it as a remote connector myself — on hardware I own rather than someone else's managed integration.</p>

The pieces: a ServiceNow MCP server packaged as a Home Assistant add-on on my NUC, a Cloudflare Tunnel to get it off my home network without opening a port, and a remote connector registration at Claude so it can actually call the thing. Three separate systems, three separate sets of gotchas.

## Part 1 — The Home Assistant Add-on

The add-on lives in a public sibling repo, <a href="https://github.com/devdog11/littledevlab-addons" rel="noopener" target="_blank">https://github.com/devdog11/littledevlab-addons</a> — it has to stay public because Home Assistant's Supervisor can't clone a private repo without credentials. It wraps <a href="https://github.com/jschuller/mcp-server-servicenow" rel="noopener" target="_blank">https://github.com/jschuller/mcp-server-servicenow</a>, run via `uvx` with `--transport streamable-http`, pointed at a ServiceNow dev/PDI instance over OAuth.

One detail worth calling out because it's easy to conflate: the add-on's Configuration page has **two independent auth layers**. The `username` / `password` / `client_id` / `client_secret` fields are the add-on's own login to my ServiceNow instance — Claude never touches them. A separate `static_token` field is the bearer token that *callers* (Claude, via the tunnel) have to present to reach the MCP endpoint. Two different problems, two different secrets, and it's worth keeping that distinction straight before you start debugging an auth failure in the wrong place.

<div class="callout">
<strong>Known friction:</strong> writing secrets into the add-on's Supervisor Options through the automation API gets blocked by a safety classifier almost every time — enter tokens manually through the Home Assistant UI instead. Also, any change to the add-on's <code>run.sh</code> or <code>config.yaml</code> needs a full uninstall → remove repository → add repository → install cycle, since Supervisor doesn't re-pull git changes on its own.
      </div>

## Part 2 — Cloudflare Tunnel

The add-on listens on the NUC's internal Docker network only — nothing routes to it from the internet by default, which is the point. A Cloudflare Tunnel gets it out without forwarding a port on my home router.

### Create the tunnel

<ol class="step-list">
<li>Cloudflare Zero Trust dashboard → <strong>Networks → Tunnels &amp; Mesh</strong> (renamed from just “Tunnels” — same place) → <strong>Create a tunnel</strong> → choose <strong>Cloudflared</strong>.</li>
<li>Name it something you're willing to live with — deleting a tunnel later doesn't cleanly free its name, the DNS pointer sticks to it. If you do delete one, give the replacement a new name rather than trying to reuse the old one.</li>
<li>Cloudflare shows an install command with a token embedded. Skip the install command — just copy the tunnel token out of it and keep it in a password manager, not in the repo.</li>
</ol>

### Point the Home Assistant add-on at it

<ol class="step-list">
<li><strong>Settings → Apps → Cloudflare Tunnel → Configuration</strong>, paste the tunnel token directly into the token field.</li>
<li>Save and restart the add-on, then check its logs for “Registered tunnel connection” to confirm it's actually connected.</li>
</ol>

<div class="callout">
<strong>Rotating the tunnel token later:</strong> there's no obvious “regenerate” button on the tunnel's Overview page. Instead, open the tunnel → <strong>Connectors</strong> → <strong>Add a connector</strong>, then scroll past the install commands to <strong>Refresh token</strong>. That invalidates the old token for new connections but doesn't disconnect a cloudflared instance already running on it — you still have to copy the new token into the add-on's config and restart it, or it keeps running on the old, now-dead token. Confirm the rotation actually took by checking the Connectors tab shows a fresh “last seen” timestamp, not a stale “Healthy” left over from before.
      </div>

### Add the public hostname route

<ol class="step-list">
<li>On the tunnel's <strong>Hostname routes</strong> tab (previously “Public Hostname”) → <strong>Add a public hostname</strong>.</li>
<li>Subdomain <code>snow-mcp</code>, your domain, service type <code>HTTP</code>, URL pointed at the add-on's internal hostname and port. Save — Cloudflare creates the DNS record automatically.</li>
</ol>

### Test it from outside the house

From a device off the home network — phone on cellular works — hit the public hostname's `/mcp` path. An auth error at that point is actually good news: it means routing works and only the bearer token check is left. One trap: don't bother testing the add-on's internal hostname directly in a browser — that name only resolves inside Home Assistant Supervisor's own Docker network, so “can't be reached” there is expected and tells you nothing about whether the add-on itself is healthy. Check its Logs tab for a clean `Uvicorn running on http://0.0.0.0:8080` instead.

## Part 3 — Registering the Remote Connector at Claude

<ol class="step-list">
<li>Go to <a href="https://claude.ai/customize/connectors" rel="noopener" target="_blank">https://claude.ai/customize/connectors</a> → <strong>Add custom connector</strong>, name it, and point it at the tunnel's public <code>/mcp</code> URL.</li>
<li>Under <strong>Authentication</strong>, Claude will likely auto-detect “Sign in now” (OAuth) — that's a false positive. This server doesn't do a real OAuth handshake, it just checks a static bearer token. Select <strong>No sign-in</strong> instead.</li>
<li>Under <strong>Request headers</strong>, add one: name <code>Authorization</code>, value the literal string <code>Bearer </code> followed by the token. The field does not add the “Bearer ” prefix for you — type it yourself, or every call fails auth for a reason that looks nothing like a missing prefix.</li>
<li>The token itself comes from the add-on's own Configuration page — the <code>static_token</code> field, not the ServiceNow login fields next to it.</li>
<li>Add the connector, then test the connection before moving on. “Couldn't connect to the server” means a routing/tunnel problem; an auth failure means the token pasted into Claude doesn't match the add-on's current <code>static_token</code> — check the add-on's logs for the exact mismatch.</li>
</ol>

### Tool permissions

Once connected, the connector's detail page shows a permissions list for every tool the server exposes, split into read-only and write/delete groups, each individually settable to Always Allow, Needs Approval, or Deny. Here's where I landed:

<table class="perm-table">
<thead>
<tr><th>Tool</th><th>Type</th><th>Permission</th></tr>
</thead>
<tbody>
<tr><td>Aggregate Records</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get Ci</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get Ci Relationships</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get Current User</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get Record</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get System Properties</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get Table Schema</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Get Update Set</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>List Ci</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>List Records</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>List Update Set Changes</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>List Update Sets</td><td>Read-only</td><td class="allow">Always allow</td></tr>
<tr><td>Create Ci</td><td>Write/delete</td><td class="approval">Needs approval</td></tr>
<tr><td>Create Record</td><td>Write/delete</td><td class="approval">Needs approval</td></tr>
<tr><td>Create Update Set</td><td>Write/delete</td><td class="approval">Needs approval</td></tr>
<tr><td>Delete Record</td><td>Write/delete</td><td class="approval">Needs approval</td></tr>
<tr><td>Set Current Update Set</td><td>Write/delete</td><td class="approval">Needs approval</td></tr>
<tr><td>Update Ci</td><td>Write/delete</td><td class="approval">Needs approval</td></tr>
<tr><td>Update Record</td><td>Write/delete</td><td class="allow">Always allow</td></tr>
</tbody>
</table>

Lookups against a dev instance are low-risk, so the whole read-only group is set to auto-allow — no reason to interrupt myself to approve a `List Records` call. Everything that creates, deletes, or reassigns state stays gated behind approval, with one exception: `Update Record`, opened up because the downstream automation I'm building only ever updates existing change requests, never creates or deletes anything.

## Lessons Worth Keeping

<ul class="spec-list">
<li>Two independent secrets are easy to conflate: the Cloudflare tunnel token (routes traffic to the NUC) and the MCP static bearer token (authenticates Claude to the server itself). Rotating one has zero effect on the other — regenerating the tunnel token doesn't touch the connector's saved header, and vice versa.</li>
<li>Any change to the add-on's own code requires the full uninstall/reinstall dance — there's no lighter “reload from git” option in Supervisor.</li>
<li>Automating secret entry through an API is the wrong instinct here anyway — the manual UI path is what actually works, consistently, every time.</li>
</ul>

## What's Next

The connector is live and the permission set above is what I'm running with today. Still open: a `sync-servicenow` command that's meant to pull change requests tagged with a `littledevlab` category into this site's own change log automatically — blocked on confirming the category value in ServiceNow and a pass over what's safe to publish verbatim. That's the next post in this track.
