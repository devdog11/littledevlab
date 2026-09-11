#!/usr/bin/env python3
"""
Sync new littledevlab ServiceNow change requests into CHANGES.md.

Standalone equivalent of the `/sync-servicenow` skill — does not require an
active Claude Code session or MCP tool access. Reads ServiceNow OAuth
credentials from environment variables, falling back to whatever project
entry in ~/.claude.json has a configured `servicenow` MCP server (the same
credentials `mcp-server-servicenow` uses).

Env var overrides:
  SERVICENOW_INSTANCE_URL, SERVICENOW_CLIENT_ID, SERVICENOW_CLIENT_SECRET,
  SERVICENOW_USERNAME, SERVICENOW_PASSWORD

Usage:
  python3 scripts/sync_servicenow.py [--dry-run]
"""

import base64
import json
import os
import re
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CHANGES_PATH = os.path.join(REPO_ROOT, "CHANGES.md")
CLAUDE_JSON_PATH = os.path.expanduser("~/.claude.json")


def ssl_context():
    """Use certifi's CA bundle when available (python.org macOS builds ship without one)."""
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def load_config_from_claude_json():
    """Pull servicenow MCP server args from any project entry in ~/.claude.json."""
    if not os.path.exists(CLAUDE_JSON_PATH):
        return {}

    try:
        with open(CLAUDE_JSON_PATH) as f:
            data = json.load(f)
    except Exception:
        return {}

    for proj in data.get("projects", {}).values():
        sn = proj.get("mcpServers", {}).get("servicenow")
        if not sn:
            continue
        args = sn.get("args", [])
        cfg = {}
        flag_map = {
            "--instance-url": "instance_url",
            "--client-id": "client_id",
            "--client-secret": "client_secret",
            "--username": "username",
            "--password": "password",
        }
        for i, arg in enumerate(args):
            key = flag_map.get(arg)
            if key and i + 1 < len(args):
                cfg[key] = args[i + 1]
        if cfg:
            return cfg

    return {}


def get_credentials():
    fallback = load_config_from_claude_json()

    creds = {
        "instance_url": os.environ.get("SERVICENOW_INSTANCE_URL", fallback.get("instance_url")),
        "client_id": os.environ.get("SERVICENOW_CLIENT_ID", fallback.get("client_id")),
        "client_secret": os.environ.get("SERVICENOW_CLIENT_SECRET", fallback.get("client_secret")),
        "username": os.environ.get("SERVICENOW_USERNAME", fallback.get("username")),
        "password": os.environ.get("SERVICENOW_PASSWORD", fallback.get("password")),
    }

    missing = [k for k, v in creds.items() if not v]
    if missing:
        print(f"Error: missing ServiceNow credentials: {', '.join(missing)}", file=sys.stderr)
        print("Set them as env vars, or configure the `servicenow` MCP server via `claude mcp`.", file=sys.stderr)
        sys.exit(1)

    return creds


def get_oauth_token(creds):
    """ServiceNow resource-owner password-credentials grant."""
    token_url = creds["instance_url"].rstrip("/") + "/oauth_token.do"
    payload = urllib.parse.urlencode({
        "grant_type": "password",
        "client_id": creds["client_id"],
        "client_secret": creds["client_secret"],
        "username": creds["username"],
        "password": creds["password"],
    }).encode()

    req = urllib.request.Request(token_url, data=payload, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urllib.request.urlopen(req, timeout=15, context=ssl_context()) as resp:
            return json.loads(resp.read().decode())["access_token"]
    except urllib.error.HTTPError as e:
        print(f"Error fetching OAuth token (HTTP {e.code}): {e.read().decode()}", file=sys.stderr)
        sys.exit(1)


def query_change_requests(creds, access_token):
    params = {
        "sysparm_query": "category=littledevlab^ORDERBYsys_created_on",
        "sysparm_fields": "number,short_description,description,sys_id,sys_created_on",
        "sysparm_limit": "200",
    }
    url = creds["instance_url"].rstrip("/") + "/api/now/table/change_request?" + urllib.parse.urlencode(params)

    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {access_token}")
    req.add_header("Accept", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=15, context=ssl_context()) as resp:
            return json.loads(resp.read().decode()).get("result", [])
    except urllib.error.HTTPError as e:
        print(f"Error querying change_request table (HTTP {e.code}): {e.read().decode()}", file=sys.stderr)
        sys.exit(1)


def existing_ticket_numbers(changes_text):
    return set(re.findall(r"SNOW\s+([A-Za-z0-9]+)", changes_text))


def format_timestamp(sys_created_on):
    # ServiceNow returns "YYYY-MM-DD HH:MM:SS"
    dt = datetime.strptime(sys_created_on, "%Y-%m-%d %H:%M:%S")
    return dt.strftime("%Y.%m.%d.%H%M")


def collapse_whitespace(text):
    return re.sub(r"\s+", " ", text or "").strip()


def format_entry(ticket, instance_url):
    number = ticket["number"]
    short_desc = collapse_whitespace(ticket.get("short_description", ""))
    description = collapse_whitespace(ticket.get("description", ""))
    timestamp = format_timestamp(ticket["sys_created_on"])
    link = f"{instance_url.rstrip('/')}/nav_to.do?uri=change_request.do?sys_id={ticket['sys_id']}"

    lines = [f"*   {timestamp} - SNOW {number}: {short_desc} — {link}"]
    if description and description != short_desc:
        lines.append(f"    *   {description}")
    return "\n".join(lines)


def insert_under_open(changes_text, new_entries_block):
    match = re.search(r"(## Open\n)", changes_text)
    if not match:
        print("Error: could not find '## Open' heading in CHANGES.md", file=sys.stderr)
        sys.exit(1)
    idx = match.end()
    return changes_text[:idx] + "\n" + new_entries_block + "\n" + changes_text[idx:]


def main():
    dry_run = "--dry-run" in sys.argv

    creds = get_credentials()
    access_token = get_oauth_token(creds)
    tickets = query_change_requests(creds, access_token)

    with open(CHANGES_PATH) as f:
        changes_text = f.read()

    already_synced = existing_ticket_numbers(changes_text)
    new_tickets = [t for t in tickets if t["number"] not in already_synced]

    if not new_tickets:
        print("no new littledevlab tickets found")
        return

    # Newest first
    new_tickets.sort(key=lambda t: t["sys_created_on"], reverse=True)

    entries_block = "\n".join(format_entry(t, creds["instance_url"]) for t in new_tickets)
    updated_text = insert_under_open(changes_text, entries_block)

    if dry_run:
        print(entries_block)
        print(f"\n(dry run — {len(new_tickets)} new ticket(s), CHANGES.md not written)")
        return

    with open(CHANGES_PATH, "w") as f:
        f.write(updated_text)

    print(f"added {len(new_tickets)} new littledevlab ticket(s) to CHANGES.md")


if __name__ == "__main__":
    main()
