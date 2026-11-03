// Every Build Log entry, read straight from ../build-log/*.md at build time.
// Files: YYYY-MM-DD-NN-slug.md with front matter (see build-log/README.md).
import { slugOf } from './buildLogSlug.js'
import { newestFirst } from './dates.js'

const files = import.meta.glob('../../../build-log/2*.md', { eager: true, import: 'default' })

export function buildLogEntries() {
  return Object.entries(files)
    .map(([path, { meta, html }]) => ({ slug: slugOf(path), ...meta, html }))
    .sort(newestFirst)
}
