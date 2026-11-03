import { URLS } from '../site.js'
import Logo from './Logo.jsx'
import useReveal from './useReveal.js'

const HOME_TITLEBLOCK = [
  ['Title', 'LittleDevLab'],
  ['Material', 'PLA+ · Custom Colors'],
  ['Scale', 'Designed to Fit'],
  ['Dr. No.', 'littledevlab.com'],
]

// The drafting title block: four label/value cells.
export function Titleblock({ items, reveal = true }) {
  const [ref, revealClass] = useReveal()
  return (
    <div ref={reveal ? ref : undefined} className={reveal ? `sheet-titleblock ${revealClass}` : 'sheet-titleblock'}>
      <div className="container">
        <div className="titleblock">
          {items.map(([label, value]) => (
            <div key={label}><span className="label">{label}</span>{value}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Full footer used by Home, Products and Build Log. Pass titleblock={null} to
// leave out the title block (Build Log shows its own near the top).
export default function SiteFooter({ titleblock = HOME_TITLEBLOCK }) {
  return (
    <>
      {titleblock && <Titleblock items={titleblock} />}

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Logo size={20} />
              LittleDevLab
            </div>
            <p className="footer-copy">© 2025 LittleDevLab. SF Bay Area. All designs are original.</p>
            <ul className="footer-links">
              <li><a href={URLS.home}>Home</a></li>
              <li><a href={URLS.products}>Products</a></li>
              <li><a href={URLS.lab}>Lab Journey</a></li>
              <li><a href={URLS.contact}>Get in Touch</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

// One-line footer used by The Lab and Lab Notes. links: [[label, href], ...]
export function SimpleFooter({ links }) {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; 2026 LittleDevLab &middot; SF Bay Area
          {links.map(([label, href]) => (
            <span key={href + label}> &middot; <a href={href}>{label}</a></span>
          ))}
        </p>
      </div>
    </footer>
  )
}
