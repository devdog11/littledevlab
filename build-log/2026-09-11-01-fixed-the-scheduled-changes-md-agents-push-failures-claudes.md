---
date: "2026-09-11"
time: "5:18 PM"
title: "Fixed the scheduled CHANGES.md agent's push failures — Claude's GitHub App was authorized but never installed"
tags: [Infra, Agentic AI]
skills: [Agentic AI, CI/CD & infra]
commit: "25dcece"
---

The new twice-daily cloud routine that processes CHANGES.md's Open items kept failing to push its commits with a `403 Resource not accessible by integration` error, even though it could read the repo fine. Root cause: Claude's GitHub connection on the devdog11 account was only an *authorized* OAuth app (identity-level access), never an *installed* GitHub App — and repo write permissions only come from an installation. Fixed by installing the Claude GitHub App directly at github.com/apps/claude and granting it repository access, which gave it the Contents: Read and write permission the routine's git push needs. The routine's queued changes should now push cleanly on its next run.
