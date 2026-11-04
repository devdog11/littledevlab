// Build Log entries without their bodies (front matter only), for lists.
import { newestFirst } from './dates.js'
import { slugOf } from './buildLogSlug.js'

const files = import.meta.glob('../../../build-log/2*.md', { eager: true, import: 'default', query: '?meta' })

export function buildLogIndex() {
  return Object.entries(files)
    .map(([path, { meta }]) => ({ slug: slugOf(path), ...meta }))
    .sort(newestFirst)
}
