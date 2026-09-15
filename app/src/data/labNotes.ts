export interface LabNotePost {
  tag: string;
  href: string;
  title: string;
  date: string;
  excerpt: string;
}

export const labNotePosts: LabNotePost[] = [
  {
    tag: 'Agentic AI Skills',
    href: '/lab-notes/servicenow-mcp-home-assistant-cloudflare.html',
    title: 'Self-Hosting a ServiceNow MCP Server on a Home NUC, Wired Into Claude',
    date: 'September 10, 2026',
    excerpt:
      'Packaging a ServiceNow MCP server as a Home Assistant add-on, tunneling it out through Cloudflare, and registering it as a remote connector at claude.ai — end to end, on hardware I own.',
  },
  {
    tag: '3D Design & Print',
    href: '/lab-notes/soap-dish-mount-puck.html',
    title:
      'Iterating a 3D-Printed Mounting Puck to Fit a Volkano Summit V6359 Soap Dish Escutcheon',
    date: 'September 8, 2026',
    excerpt:
      'Reverse-engineering a cast-metal escutcheon with no datasheet, calipers, and a parametric CadQuery script — five revisions from a rough first fit to a validated, watertight puck.',
  },
  {
    tag: 'Agentic AI Skills',
    href: '/lab-notes/cloud-native-agentic-workflow.html',
    title: 'Cutting the Cord: Taking This Build From My Laptop to a Cloud-Native Workflow',
    date: 'September 2, 2026',
    excerpt:
      'A real Codespace, a scoped GitHub token, a safety guardrail that stopped me from doing something dumb, a self-inflicted merge conflict, and the actual difference between Claude Code and Cowork.',
  },
  {
    tag: 'Agentic AI Skills',
    href: '/lab-notes/prompt-and-context-engineering.html',
    title: 'The Real Work of Agentic AI Is Prompt and Context Engineering',
    date: 'August 31, 2026',
    excerpt:
      'Agentic AI makes execution fast — the actual skill left to build is shaping what the model sees: system instructions, retrieved documents, tool descriptions, permissions, output schemas.',
  },
  {
    tag: 'Agentic AI Skills',
    href: '/lab-notes/hands-on-labs-agentic-ai.html',
    title: 'Hands-On Labs Are How Solution Architects Actually Learn Agentic AI',
    date: 'August 31, 2026',
    excerpt:
      'Why hands-on labs beat prompting-only for SAs moving from AI products to AI platforms, and the ingestion/hallucination lesson from a NotebookLM experiment.',
  },
];
