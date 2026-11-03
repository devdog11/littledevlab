// One Lab Note with its rendered body. Each note is its own chunk, so a post
// page downloads only its own text.
const files = import.meta.glob(['../../../lab-notes/*.md', '!../../../lab-notes/README.md'], { import: 'default' })

export async function loadNote(slug) {
  const load = files[`../../../lab-notes/${slug}.md`]
  if (!load) throw new Error(`No Lab Note named ${slug}`)
  const { meta, html } = await load()
  return { slug, ...meta, html }
}
