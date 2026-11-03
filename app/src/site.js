// Site-wide settings used by the pages and the pre-render step.

export const SITE_NAME = 'LittleDevLab'
export const SITE_URL = 'https://littledevlab.com'

// Shared social preview image when a page doesn't name its own.
export const DEFAULT_IMAGE = '/images/glasses/glasses-holder-counter.jpg'

// The 3D viewer is a web component loaded from a CDN, only on pages that use it.
export const MODEL_VIEWER_SRC = 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js'

// Clean URLs, as Cloudflare Pages serves them (x.html is served at /x,
// folder/index.html at /folder/). Linking to these avoids a redirect per click.
export const URLS = {
  home: '/',
  products: '/products',
  lab: '/lab/',
  labNotes: '/lab-notes/',
  buildLog: '/build-log',
  contact: '/#contact',
  note: (slug) => `/lab-notes/${slug}`,
}

// The one site menu. Replaces partials/site-nav.html + tools/sync-nav.py and
// the old products-only SiteNav. Edit the links here and every page follows.
export const MENUS = [
  {
    id: 'home',
    label: 'Home',
    href: URLS.home,
    links: [
      { href: '/#about', label: 'About' },
      { href: '/#gallery', label: 'Gallery' },
      { href: '/#process', label: "How It's Made" },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    href: URLS.products,
    links: [
      { href: '/products#glasses-holder', label: 'Glasses + Contact Lens Holder' },
      { href: '/products#coaster-holder', label: 'Chilewich Coaster Holder' },
      { href: '/products#gaming-card-display', label: 'Trading Card Display Rack' },
      { href: '/products#hunter-douglas-mount', label: 'Hunter Douglas Remote Wall Mount' },
      { href: '/products#steak-knife-holder', label: 'Steak Knife Holder' },
      { href: '/products#zbiotic-gift-box', label: 'ZBiotic Six-Pack Gift Carrier' },
    ],
  },
  {
    id: 'journey',
    label: 'Lab Journey',
    href: URLS.lab,
    links: [
      { href: URLS.lab, label: 'The Lab (overview)' },
      { href: URLS.labNotes, label: 'Lab Notes' },
      { href: URLS.buildLog, label: 'Build Log' },
    ],
  },
]
