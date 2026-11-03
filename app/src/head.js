import { DEFAULT_IMAGE, SITE_NAME, SITE_URL } from './site.js'

// A page's head() returns:
//   title, description, path (clean canonical URL path)
//   image       social preview image path (optional)
//   type        Open Graph type, "website" or "article" (optional)
//   styles      stylesheets loaded BEFORE the theme (images/theme/blueprint.css)
//   lateStyles  stylesheets loaded AFTER the theme
//   scripts     extra module scripts (e.g. model-viewer)
// The theme loads between the two lists because pages relied on that order:
// the theme overrides most page CSS, and a few page sheets override the theme.

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const absolute = (path) => (/^https?:/.test(path) ? path : SITE_URL + path)

// The tags that go before the theme stylesheet.
export function headTags(head) {
  const t = escapeHtml
  const url = absolute(head.path)
  const image = absolute(head.image ?? DEFAULT_IMAGE)
  return [
    `<title>${t(head.title)}</title>`,
    `<meta name="description" content="${t(head.description)}" />`,
    `<link rel="canonical" href="${t(url)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${t(head.type ?? 'website')}" />`,
    `<meta property="og:title" content="${t(head.ogTitle ?? head.title)}" />`,
    `<meta property="og:description" content="${t(head.description)}" />`,
    `<meta property="og:url" content="${t(url)}" />`,
    `<meta property="og:image" content="${t(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(head.styles ?? []).map((href) => `<link rel="stylesheet" href="${t(href)}" />`),
    ...(head.scripts ?? []).map((src) => `<script type="module" src="${t(src)}"></script>`),
  ].join('\n    ')
}

// The tags that go after the theme stylesheet.
export function lateHeadTags(head) {
  return (head.lateStyles ?? []).map((href) => `<link rel="stylesheet" href="${escapeHtml(href)}" />`).join('\n    ')
}

// Dev server only: there is no pre-rendered HTML, so add the page's title and
// stylesheets in the browser, in the same order the pre-render uses.
export function applyHead(head) {
  document.title = head.title
  const theme = document.querySelector('link[href$="/theme/blueprint.css"]')
  const add = (tag, attrs, before) => {
    const el = document.createElement(tag)
    Object.assign(el, attrs)
    document.head.insertBefore(el, before)
    return el
  }
  ;(head.styles ?? []).forEach((href) => add('link', { rel: 'stylesheet', href }, theme))
  let last = theme
  ;(head.lateStyles ?? []).forEach((href) => {
    last = add('link', { rel: 'stylesheet', href }, last?.nextSibling ?? null)
  })
  ;(head.scripts ?? []).forEach((src) => add('script', { type: 'module', src }, null))
}
