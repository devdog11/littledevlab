import { useState } from 'react';
import { Logo } from './Logo';
import {
  contactHref,
  homeSectionHref,
  homeSections,
  journeyLinks,
  productHref,
  productLinks,
  type PageId,
} from '../site';

interface NavProps {
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

export function Nav({ current }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  // The original markup toggled each mobile submenu independently, so more
  // than one can be open at a time.
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

  const homeLinks = homeSections.map((s) => ({
    href: homeSectionHref(s, current),
    label: s.label,
  }));

  const groups = [
    { key: 'home', accent: 'home', label: 'Home', href: '/index.html', links: homeLinks },
    {
      key: 'products',
      accent: 'products',
      label: 'Products',
      href: productHref('/products.html', current),
      links: productLinks.map((l) => ({ href: productHref(l.href, current), label: l.label })),
    },
    { key: 'journey', accent: 'journey', label: 'Lab Journey', href: '/lab-notes/index.html', links: journeyLinks },
  ];

  return (
    <>
      <nav className="nav">
        <div className="container">
          <a href="/index.html" className="nav-logo">
            <Logo size={28} />
            LittleDevLab
          </a>
          <ul className="nav-links">
            {groups.map((g) => (
              <li className="nav-item-dropdown" data-accent={g.accent} key={g.key}>
                <a href={g.href}>{g.label}</a>
                <div className="nav-dropdown-menu">
                  {g.links.map((l) => (
                    <a href={l.href} key={l.href}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <a
            href={contactHref(current)}
            className="btn btn-primary nav-cta"
            style={{ padding: '10px 20px', fontSize: '.84rem' }}
          >
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
      </nav>

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
                  data-accent={g.accent}
                  aria-expanded={isOpen}
                  onClick={() => toggleSubmenu(submenuId)}
                >
                  {g.label}
                  {CHEVRON}
                </button>
                <div className={`mobile-submenu${isOpen ? ' open' : ''}`} id={submenuId}>
                  {g.links.map((l) => (
                    <a href={l.href} className="mobile-link" key={l.href} onClick={closeMenu}>
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
    </>
  );
}
