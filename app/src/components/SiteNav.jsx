import { useEffect, useState } from 'react'
import products from '../../products.js'
import Logo from './Logo.jsx'

const menus = [
  {
    id: 'home',
    label: 'Home',
    href: '/index.html',
    links: [
      { href: '/index.html#about', label: 'About' },
      { href: '/index.html#gallery', label: 'Gallery' },
      { href: '/index.html#process', label: "How It's Made" },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    href: '#products',
    links: products.map((p) => ({ href: `#${p.id}`, label: p.name })),
  },
  {
    id: 'journey',
    label: 'Lab Journey',
    href: '/lab-notes/index.html',
    links: [
      { href: '/lab-notes/index.html', label: 'Lab Notes' },
      { href: '/build-log.html', label: 'Build Log' },
    ],
  },
]

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState({})
  const [activeSection, setActiveSection] = useState(null)

  // Scroll spy: highlight the top-level link for the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 },
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function toggleSubmenu(id) {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav className="nav">
        <div className="container">
          <a href="/index.html" className="nav-logo">
            <Logo size={28} />
            LittleDevLab
          </a>
          <ul className="nav-links">
            {menus.map((menu) => (
              <li key={menu.id} className="nav-item-dropdown" data-accent={menu.id}>
                <a
                  href={menu.href}
                  style={menu.href === `#${activeSection}` ? { color: 'var(--navy)' } : undefined}
                >
                  {menu.label}
                </a>
                <div className="nav-dropdown-menu">
                  {menu.links.map((link) => (
                    <a key={link.href} href={link.href}>{link.label}</a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <a href="/index.html#contact" className="btn btn-primary nav-cta" style={{ padding: '10px 20px', fontSize: '.84rem' }}>
            Get in Touch
          </a>
          <button
            type="button"
            className={mobileOpen ? 'nav-toggle open' : 'nav-toggle'}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={mobileOpen ? 'mobile-nav open' : 'mobile-nav'}>
        <ul>
          {menus.map((menu) => {
            const open = Boolean(openSubmenus[menu.id])
            return (
              <li key={menu.id}>
                <button
                  type="button"
                  className={open ? 'mobile-link-toggle open' : 'mobile-link-toggle'}
                  data-accent={menu.id}
                  aria-expanded={open}
                  onClick={() => toggleSubmenu(menu.id)}
                >
                  {menu.label}
                  <Chevron />
                </button>
                <div className={open ? 'mobile-submenu open' : 'mobile-submenu'}>
                  {menu.links.map((link) => (
                    <a key={link.href} href={link.href} className="mobile-link" onClick={closeMobile}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </li>
            )
          })}
          <li><a href="/index.html#contact" className="mobile-link" onClick={closeMobile}>Get in Touch</a></li>
        </ul>
      </div>
    </>
  )
}
