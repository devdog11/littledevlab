// Interim: The Lab's list of Lab Notes, moved from lab/lab-data.js. Replaced by
// the Lab Notes Markdown front matter in the next step.
export function labNotesIndex() {
  return [
    {
      "slug": "ldl-deploy-arch",
      "date": "2026-10-01",
      "title": "Who Should Be Allowed to Deploy My Website?",
      "category": "Deployment Architecture",
      "skills": [
        "CI/CD & infra",
        "Agentic AI"
      ],
      "pinned": true,
      "summary": "Mapped the build chain, weighed three deployment-trigger options, and made GitHub the human-approval gate after agentic pushes got out of hand."
    },
    {
      "slug": "servicenow-mcp-home-assistant-cloudflare",
      "date": "2026-09-10",
      "title": "Self-Hosting a ServiceNow MCP Server on a Home NUC, Wired Into Claude",
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
      "slug": "soap-dish-mount-puck",
      "date": "2026-09-08",
      "title": "Iterating a 3D-Printed Mounting Puck to Fit a Volkano Summit V6359 Soap Dish Escutcheon",
      "category": "3D Design & Print",
      "skills": [
        "3D design & print",
        "Python"
      ],
      "pinned": true,
      "summary": "Reverse-engineered a cast-metal part with calipers and a parametric CadQuery script: five revisions to a validated, watertight fit."
    },
    {
      "slug": "cloud-native-agentic-workflow",
      "date": "2026-09-02",
      "title": "Cutting the Cord: Taking This Build From My Laptop to a Cloud-Native Workflow",
      "category": "Agentic AI Skills",
      "skills": [
        "Agentic AI",
        "CI/CD & infra"
      ],
      "pinned": false,
      "summary": "A Codespace, a scoped GitHub token, a guardrail that stopped a bad move, and the real difference between Claude Code and Cowork."
    },
    {
      "slug": "prompt-and-context-engineering",
      "date": "2026-08-31",
      "title": "The Real Work of Agentic AI Is Prompt and Context Engineering",
      "category": "Agentic AI Skills",
      "skills": [
        "Agentic AI"
      ],
      "pinned": false,
      "summary": "The skill left to build is shaping what the model sees: instructions, retrieved documents, tool descriptions, permissions and output schemas."
    },
    {
      "slug": "hands-on-labs-agentic-ai",
      "date": "2026-08-31",
      "title": "Hands-On Labs Are How Solution Architects Actually Learn Agentic AI",
      "category": "Agentic AI Skills",
      "skills": [
        "Agentic AI"
      ],
      "pinned": false,
      "summary": "Why hands-on labs beat prompting-only for SAs moving to AI platforms, plus an ingestion and hallucination lesson from NotebookLM."
    }
  ]
}
