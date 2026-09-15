export type PageId =
  | 'home'
  | 'products'
  | 'lab-notes'
  | 'in-development'
  | 'build-log';

export interface NavLink {
  href: string;
  label: string;
}

/** Sections on the home page, reached by anchor. */
export const homeSections: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#process', label: "How It's Made" },
];

export const productLinks: NavLink[] = [
  { href: '/products.html#glasses-holder', label: 'Glasses + Contact Lens Holder' },
  { href: '/products.html#coaster-holder', label: 'Chilewich Coaster Holder' },
  { href: '/products.html#gaming-card-display', label: 'Trading Card Display Rack' },
  { href: '/products.html#hunter-douglas-mount', label: 'Hunter Douglas Remote Wall Mount' },
  { href: '/products.html#steak-knife-holder', label: 'Steak Knife Holder' },
  { href: '/products.html#zbiotic-gift-box', label: 'ZBiotic Six-Pack Gift Carrier' },
];

export const journeyLinks: NavLink[] = [
  { href: '/lab-notes/index.html', label: 'Lab Notes' },
  { href: '/in-development/index.html', label: 'In Development' },
  { href: '/build-log.html', label: 'Build Log' },
];

/**
 * Home-page anchors stay bare (`#about`) when already on the home page so the
 * browser scrolls in place; from any other page they need the full path.
 */
export function homeSectionHref(section: NavLink, current: PageId): string {
  return current === 'home' ? section.href : `/index.html${section.href}`;
}

export function contactHref(current: PageId): string {
  return current === 'home' ? '#contact' : '/index.html#contact';
}

/**
 * Product links point at sections of the products page, so while you are
 * already on it they stay in-page anchors rather than full navigations.
 */
export function productHref(href: string, current: PageId): string {
  if (current !== 'products') return href;
  if (href === '/products.html') return '#products';
  return href.replace('/products.html', '');
}

/** The Lab Journey entry that should be marked `current`, if any. */
export function currentJourneyHref(current: PageId): string | null {
  switch (current) {
    case 'lab-notes':
      return '/lab-notes/index.html';
    case 'in-development':
      return '/in-development/index.html';
    case 'build-log':
      return '/build-log.html';
    default:
      return null;
  }
}
