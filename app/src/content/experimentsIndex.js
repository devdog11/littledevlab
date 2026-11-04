// Every experiment's front matter (no bodies), read from ../experiments/*.md.
// Front matter: title, date, order (optional), status, summary, description,
// image (optional). See experiments/README.md.
const files = import.meta.glob(['../../../experiments/*.md', '!../../../experiments/README.md'], { eager: true, import: 'default', query: '?meta' })

export const STATUSES = ['In the lab', 'Almost real', 'Failed']

const slugOf = (path) => path.split('/').pop().replace(/\.md$/, '')

// Newest date first; same date: lower `order` first, then file name A to Z.
export function experimentsIndex() {
  return Object.entries(files)
    .map(([path, { meta }]) => ({ slug: slugOf(path), ...meta }))
    .sort((a, b) =>
      a.date !== b.date ? (a.date < b.date ? 1 : -1)
        : (a.order ?? 99) !== (b.order ?? 99) ? (a.order ?? 99) - (b.order ?? 99)
          : a.slug < b.slug ? -1 : 1)
}
