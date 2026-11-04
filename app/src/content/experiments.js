// One experiment with its rendered body. Each is its own chunk, so a detail
// page downloads only its own text. Content: ../experiments/<slug>.md.
const files = import.meta.glob(['../../../experiments/*.md', '!../../../experiments/README.md'], { import: 'default' })

export async function loadExperiment(slug) {
  const load = files[`../../../experiments/${slug}.md`]
  if (!load) throw new Error(`No experiment named ${slug}`)
  const { meta, html } = await load()
  return { slug, ...meta, html }
}
