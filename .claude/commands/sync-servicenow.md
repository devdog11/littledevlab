---
description: Pull new littledevlab enhancement tickets from ServiceNow into CHANGES.md
---

Sync new ServiceNow tickets into `CHANGES.md`. Requires the `servicenow` MCP server (local, configured via `claude mcp`).

1. Query the `change_request` table via `mcp__servicenow__list_records` with `query: "category=littledevlab"`, `fields: "number,short_description,sys_id,sys_created_on"`, `order_by: "sys_created_on"`. Use a high `limit` (e.g. 200) to catch everything.
2. Read `CHANGES.md`. Every ticket number already referenced there (search for the `SNOW <number>` pattern) has already been synced — skip it.
3. For each remaining new ticket, build one line in this format, matching the existing bullet style:
   `*   <ticket sys_created_on as YYYY.MM.DD.HHmm> - SNOW <number>: <short_description trimmed of whitespace/newlines> — <instance base URL>/nav_to.do?uri=change_request.do?sys_id=<sys_id>`
   Get the instance base URL from the `servicenow` MCP config (it's `https://dev322229.service-now.com`) — don't hardcode it if it's discoverable, but this is the current instance.
4. Insert the new lines directly under the `## Open` heading, above whatever is already there (newest tickets end up at the top, consistent with the file's existing newest-first order). If multiple new tickets are found, sort them newest-first among themselves too.
5. Do **not** touch anything under `## Done`, do not remove or reformat existing `## Open` items, and do not commit or push — just edit the file and leave it for the user to review.
6. Report a one-line summary: how many new tickets were added (or "no new littledevlab tickets found").
