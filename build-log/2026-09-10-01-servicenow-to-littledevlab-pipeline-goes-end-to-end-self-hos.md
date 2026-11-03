---
date: "2026-09-10"
time: "8:42 PM"
title: "ServiceNow-to-LittleDevLab pipeline goes end to end — self-hosted, not the built-in connector"
tags: [Infra, Agentic AI]
skills: [Agentic AI, CI/CD & infra]
commit: "0ebcd0e"
---

Finally got a real ServiceNow MCP server talking to Claude end to end: packaged as a Home Assistant add-on on my NUC, tunneled to the public internet through Cloudflare, and registered as a remote connector at claude.ai — deliberately self-hosted instead of using Claude's built-in ServiceNow registry connector, since the mechanics were the whole point of this track. Not exactly “production ready” since nothing here is cloud-hosted, but every piece of it — the add-on, the tunnel, the connector registration, the tool-permission tuning — is real and running today. Full write-up, with the actual steps and the friction that came with each one, is in the new Lab Notes post: [Self-Hosting a ServiceNow MCP Server on a Home NUC, Wired Into Claude](/lab-notes/servicenow-mcp-home-assistant-cloudflare).
