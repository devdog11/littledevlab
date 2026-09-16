import { useState } from 'react';
import { Logo } from './Logo';
import {
  contactHref,
  currentJourneyHref,
  homeSectionHref,
  homeSections,
  journeyLinks,
  productLinks,
  type PageId,
} from '../site';

interface SiteNavProps {
  current: PageId;
}

const CHEVRON = (
  <svg width="10" height="10" viewBox="0 0 10 10">
    <path
      d="M2 3.5L5 6.5L8 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Nav used by the article pages (lab-notes, in-development). Structurally
 * different from the main-site <Nav>: it is a <header class="site-nav"> that
 * contains the mobile menu, uses a smaller logo, and marks the active Lab
 * Journey entry with `current`.
 */
export function SiteNav({ current }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<ReadonlySet<string>>(new Set());

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSubmenus(new Set());
  };

  const activeJourney = currentJourneyHref(current);

  const groups = [
    {
      key: 'home',
      label: 'Home',
      href: '/index.html',
      links: homeSections.map((s) => ({ href: homeSectionHref(s, current), label: s.label })),
    },
    { key: 'products', label: 'Products', href: '/products.html', links: productLinks },
    { key: 'journey', label: 'Lab Journey', href: '/lab-notes/index.html', links: journeyLinks },
  ];

  return (
    <header className="site-nav">
      <div className="container">
        <a href="/index.html" className="nav-logo">
          <Logo size={24} />
          LittleDevLab
        </a>
        <ul className="nav-links">
          {groups.map((g) => (
            <li className="nav-item-dropdown" data-accent={g.key} key={g.key}>
              <a href={g.href}>{g.label}</a>
              <div className="nav-dropdown-menu">
                {g.links.map((l) => (
                  <a
                    href={l.href}
                    key={l.href}
                    className={l.href === activeJourney ? 'current' : undefined}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <a href={contactHref(current)} className="nav-cta">
          Get in Touch
        </a>
        <button
          className={`nav-toggle${menuOpen ? ' open' : ''}`}
          id="navToggle"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} id="mobileNav">
        <ul>
          {groups.map((g) => {
            const submenuId = `mobile-${g.key}-submenu`;
            const isOpen = openSubmenus.has(submenuId);
            return (
              <li key={g.key}>
                <button
                  type="button"
                  className={`mobile-link-toggle${isOpen ? ' open' : ''}`}
                  data-accent={g.key}
                  aria-expanded={isOpen}
                  onClick={() => toggleSubmenu(submenuId)}
                >
                  {g.label}
                  {CHEVRON}
                </button>
                <div className={`mobile-submenu${isOpen ? ' open' : ''}`} id={submenuId}>
                  {g.links.map((l) => (
                    <a
                      href={l.href}
                      key={l.href}
                      className={`mobile-link${l.href === activeJourney ? ' current' : ''}`}
                      onClick={closeMenu}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </li>
            );
          })}
          <li>
            <a href={contactHref(current)} className="mobile-link" onClick={closeMenu}>
              Get in Touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
