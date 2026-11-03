// Every Lab Note's front matter (no bodies), read from ../lab-notes/*.md.
// Front matter: title, date, category, skills, pinned, summary (The Lab card),
// excerpt (Lab Notes list), description (meta tag), optional status and image.
const files = import.meta.glob('../../../lab-notes/*.md', { eager: true, import: 'default', query: '?meta' })

export const noteSlug = (path) => path.split('/').pop().replace(/\.md$/, '')

// Newest first. Same-day notes: file name Z to A, which keeps the order the
// hand-kept list had.
export function labNotesIndex() {
  return Object.entries(files)
    .map(([path, { meta }]) => ({ slug: noteSlug(path), ...meta }))
    .sort((a, b) => (a.date !== b.date ? (a.date < b.date ? 1 : -1) : a.slug < b.slug ? 1 : -1))
}
