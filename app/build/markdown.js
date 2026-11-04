// Build-time Markdown support for Vite: `import post from 'x.md'` gives
//   { meta, html }  front matter + the body rendered to HTML
// and `import post from 'x.md?meta'` gives { meta } only (for lists, so a
// page that only lists posts doesn't download every post body).
// Markdown is rendered while building, so marked never ships to the browser.
import { marked } from 'marked'

// Front matter: a small YAML subset, enough for this site.
//   key: "quoted string" | bare string | true/false | number | [a, b, "c, d"]
export function parseFrontMatter(source, file = 'markdown') {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  if (!match) return { meta: {}, body: source }
  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const m = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line)
    if (!m) throw new Error(`${file}: can't read front matter line: ${line}`)
    meta[m[1]] = parseValue(m[2].trim())
  }
  return { meta, body: source.slice(match[0].length) }
}

function parseValue(v) {
  if (v.startsWith('"')) return JSON.parse(v)
  if (v === 'true' || v === 'false') return v === 'true'
  if (/^-?\d+(\.\d+)?$/.test(v) && !/^\d{4}-/.test(v)) return Number(v)
  if (v.startsWith('[') && v.endsWith(']')) {
    const items = v.slice(1, -1).match(/"(?:[^"\\]|\\.)*"|[^,]+/g) ?? []
    return items.map((s) => s.trim()).filter(Boolean).map((s) => (s.startsWith('"') ? JSON.parse(s) : s))
  }
  return v
}

export function renderMarkdown(body) {
  return marked.parse(body, { gfm: true, async: false })
}

export default function markdownPlugin() {
  return {
    name: 'littledevlab-markdown',
    enforce: 'pre',
    transform(code, id) {
      const [file, query = ''] = id.split('?')
      if (!file.endsWith('.md')) return null
      const { meta, body } = parseFrontMatter(code, file)
      const metaOnly = new URLSearchParams(query).has('meta')
      const out = metaOnly ? { meta } : { meta, html: renderMarkdown(body) }
      return { code: `export default ${JSON.stringify(out)}`, map: null }
    },
  }
}
