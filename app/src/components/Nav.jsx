import { useEffect, useState } from 'react'
import { MENUS, URLS } from '../site.js'
import Logo from './Logo.jsx'

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Highlights the dropdown link of the home section in view (home page only).
function useSectionSpy(enabled) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.3 },
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [enabled])
  return active
}

/**
 * Site navigation.
 *  variant  "bar"    <nav class="nav"> + sibling mobile menu (home, products, build log)
 *           "header" <header class="site-nav"> with the mobile menu inside (The Lab, Lab Notes)
 *  current  label of the dropdown link for this page, e.g. "Build Log"
 *  ctaClassName  classes for the Get in Touch button (pages styled it differently)
 *  spy      highlight home sections while scrolling (home page)
 */
export default function Nav({ variant = 'bar', current, ctaClassName = 'btn btn-primary nav-cta', spy = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState({})
  const activeSection = useSectionSpy(spy)

  const closeMobile = () => setMobileOpen(false)
  const toggleSubmenu = (id) => setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }))
  const isCurrent = (label) => label === current
  const spyStyle = (href) => (spy && activeSection && href === `/#${activeSection}` ? { color: 'var(--navy)' } : undefined)

  const links = (
    <ul className="nav-links">
      {MENUS.map((menu) => (
        <li key={menu.id} className="nav-item-dropdown" data-accent={menu.id}>
          <a href={menu.href}>{menu.label}</a>
          <div className="nav-dropdown-menu">
            {menu.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className={isCurrent(link.label) ? 'current' : undefined}
                aria-current={isCurrent(link.label) ? 'page' : undefined}
                style={spyStyle(link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )

  const cta = variant === 'bar'
    ? <a href={URLS.contact} className={ctaClassName} style={{ padding: '10px 20px', fontSize: '.84rem' }}>Get in Touch</a>
    : <a href={URLS.contact} className={ctaClassName}>Get in Touch</a>

  const toggle = (
    <button
      type="button"
      className={mobileOpen ? 'nav-toggle open' : 'nav-toggle'}
      id="navToggle"
      aria-label="Menu"
      aria-expanded={mobileOpen}
      aria-controls="mobileNav"
      onClick={() => setMobileOpen((open) => !open)}
    >
      <span></span><span></span><span></span>
    </button>
  )

  const mobile = (
    <div className={mobileOpen ? 'mobile-nav open' : 'mobile-nav'} id="mobileNav">
      <ul>
        {MENUS.map((menu) => {
          const open = Boolean(openSubmenus[menu.id])
          const submenuId = `mobile-${menu.id}-submenu`
          return (
            <li key={menu.id}>
              <button
                type="button"
                className={open ? 'mobile-link-toggle open' : 'mobile-link-toggle'}
                data-accent={menu.id}
                aria-expanded={open}
                aria-controls={submenuId}
                onClick={() => toggleSubmenu(menu.id)}
              >
                {menu.label}
                <Chevron />
              </button>
              <div className={open ? 'mobile-submenu open' : 'mobile-submenu'} id={submenuId}>
                {menu.links.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className={isCurrent(link.label) ? 'mobile-link current' : 'mobile-link'}
                    aria-current={isCurrent(link.label) ? 'page' : undefined}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </li>
          )
        })}
        <li><a href={URLS.contact} className="mobile-link" onClick={closeMobile}>Get in Touch</a></li>
      </ul>
    </div>
  )

  if (variant === 'header') {
    return (
      <header className="site-nav">
        <div className="container">
          <a href={URLS.home} className="nav-logo"><Logo size={24} />LittleDevLab</a>
          {links}
          {cta}
          {toggle}
        </div>
        {mobile}
      </header>
    )
  }

  return (
    <>
      <nav className="nav">
        <div className="container">
          <a href={URLS.home} className="nav-logo">
            <Logo size={28} />
            LittleDevLab
          </a>
          {links}
          {cta}
          {toggle}
        </div>
      </nav>
      {mobile}
    </>
  )
}
