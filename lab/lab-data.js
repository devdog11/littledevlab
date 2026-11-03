// The Lab: content for lab/index.html. Add a note or a build-log entry
// here when you publish one (newest first is not required; the page sorts).
// "skills" drive the filter chips; keep the names consistent.
window.LAB_DATA = {
  products: 6,
  notes: [
  {
    "date": "2026-10-01",
    "title": "Who Should Be Allowed to Deploy My Website?",
    "href": "../lab-notes/ldl-deploy-arch.html",
    "category": "Deployment Architecture",
    "skills": [
      "CI/CD & infra",
      "Agentic AI"
    ],
    "pinned": true,
    "summary": "Mapped the build chain, weighed three deployment-trigger options, and made GitHub the human-approval gate after agentic pushes got out of hand."
  },
  {
    "date": "2026-09-10",
    "title": "Self-Hosting a ServiceNow MCP Server on a Home NUC, Wired Into Claude",
    "href": "../lab-notes/servicenow-mcp-home-assistant-cloudflare.html",
    "category": "Agentic AI Skills",
    "skills": [
      "Agentic AI",
      "MCP",
      "CI/CD & infra"
    ],
    "pinned": true,
    "summary": "Packaged a ServiceNow MCP server as a Home Assistant add-on, tunneled it out through Cloudflare, and registered it as a remote connector at claude.ai."
  },
  {
    "date": "2026-09-08",
    "title": "Iterating a 3D-Printed Mounting Puck to Fit a Volkano Summit V6359 Soap Dish Escutcheon",
    "href": "../lab-notes/soap-dish-mount-puck.html",
    "category": "3D Design & Print",
    "skills": [
      "3D design & print",
      "Python"
    ],
    "pinned": true,
    "summary": "Reverse-engineered a cast-metal part with calipers and a parametric CadQuery script: five revisions to a validated, watertight fit."
  },
  {
    "date": "2026-09-02",
    "title": "Cutting the Cord: Taking This Build From My Laptop to a Cloud-Native Workflow",
    "href": "../lab-notes/cloud-native-agentic-workflow.html",
    "category": "Agentic AI Skills",
    "skills": [
      "Agentic AI",
      "CI/CD & infra"
    ],
    "summary": "A Codespace, a scoped GitHub token, a guardrail that stopped a bad move, and the real difference between Claude Code and Cowork."
  },
  {
    "date": "2026-08-31",
    "title": "The Real Work of Agentic AI Is Prompt and Context Engineering",
    "href": "../lab-notes/prompt-and-context-engineering.html",
    "category": "Agentic AI Skills",
    "skills": [
      "Agentic AI"
    ],
    "summary": "The skill left to build is shaping what the model sees: instructions, retrieved documents, tool descriptions, permissions and output schemas."
  },
  {
    "date": "2026-08-31",
    "title": "Hands-On Labs Are How Solution Architects Actually Learn Agentic AI",
    "href": "../lab-notes/hands-on-labs-agentic-ai.html",
    "category": "Agentic AI Skills",
    "skills": [
      "Agentic AI"
    ],
    "summary": "Why hands-on labs beat prompting-only for SAs moving to AI platforms, plus an ingestion and hallucination lesson from NotebookLM."
  }
],
  logs: [
  {
    "date": "2026-08-27",
    "title": "Repo is live — existing site and working plan committed",
    "commit": "9fcce41",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra"
    ]
  },
  {
    "date": "2026-08-28",
    "title": "Off GoDaddy — Cloudflare Pages + GitHub Actions live",
    "commit": "b8db569",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra"
    ]
  },
  {
    "date": "2026-08-29",
    "title": "Retheme to the drafting-blueprint look",
    "commit": "7ba8072",
    "href": "../build-log.html",
    "skills": [
      "Web & design"
    ]
  },
  {
    "date": "2026-08-29",
    "title": "Catalog grows from 2 products to 6",
    "commit": "754953e",
    "href": "../build-log.html",
    "skills": [
      "3D design & print",
      "Product design"
    ]
  },
  {
    "date": "2026-08-30",
    "title": "Product pages go interactive",
    "commit": "261d36e",
    "href": "../build-log.html",
    "skills": [
      "Product design",
      "Web & design"
    ]
  },
  {
    "date": "2026-08-30",
    "title": "Polish pass — bug fix, colors, above-the-fold cleanup, README",
    "commit": "a1712f1",
    "href": "../build-log.html",
    "skills": [
      "Documentation",
      "Product design",
      "Web & design"
    ]
  },
  {
    "date": "2026-08-31",
    "title": "Products gets its own page, Lab Notes is born, prompt-engineering post filled in",
    "commit": "afae4ac",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra",
      "Documentation",
      "Product design"
    ]
  },
  {
    "date": "2026-08-31",
    "title": "One nav for the whole site, contact form goes live, real photos swapped in",
    "commit": "a69f860",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra",
      "Product design",
      "Web & design"
    ]
  },
  {
    "date": "2026-09-01",
    "title": "Blueprint clipping fixed, DXF-to-blueprint pipeline documented",
    "commit": "e61ba64",
    "href": "../build-log.html",
    "skills": [
      "Documentation",
      "Web & design"
    ]
  },
  {
    "date": "2026-09-01",
    "title": "Every product opens into 3D, thumbnails scroll, Trading Card gets real copy",
    "commit": "ac14c7e",
    "href": "../build-log.html",
    "skills": [
      "Product design",
      "Web & design"
    ]
  },
  {
    "date": "2026-09-02",
    "title": "Build Log backfilled, Codespaces and a cloud-hosted repo clone stood up",
    "commit": "08e5a4b",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra",
      "Documentation"
    ]
  },
  {
    "date": "2026-09-02",
    "title": "Theo's Toys click bug fixed, Lab Notes recolored, and the honest ending to \"Cutting the Cord\\",
    "commit": "dde6306",
    "href": "../build-log.html",
    "skills": [
      "Documentation",
      "Product design",
      "Web & design"
    ]
  },
  {
    "date": "2026-09-02",
    "title": "Contact lens copy updated, repo hygiene cleanup",
    "commit": "be84980",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra",
      "Product design"
    ]
  },
  {
    "date": "2026-09-03",
    "title": "Hand-coded SVG replaces the PNG nav icon, favicon added everywhere",
    "commit": "91ca76d",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra",
      "Web & design"
    ]
  },
  {
    "date": "2026-09-03",
    "title": "Glasses lifestyle photos curated and wired into the gallery",
    "commit": "580b768",
    "href": "../build-log.html",
    "skills": [
      "Product design",
      "Web & design"
    ]
  },
  {
    "date": "2026-09-05",
    "title": "AI folder consolidation, and a new class of device-bridge bug",
    "commit": "d88e218",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra"
    ]
  },
  {
    "date": "2026-10-01",
    "title": "Made my deploy approval gate something GitHub enforces",
    "commit": "6710cd4",
    "href": "../build-log.html",
    "skills": [
      "CI/CD & infra"
    ]
  }
]
};
