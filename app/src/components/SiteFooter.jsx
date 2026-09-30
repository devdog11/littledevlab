import Logo from './Logo.jsx'
import useReveal from './useReveal.js'

export default function SiteFooter() {
  const [titleRef, titleReveal] = useReveal()

  return (
    <>
      <div ref={titleRef} className={`sheet-titleblock ${titleReveal}`}>
        <div className="container">
          <div className="titleblock">
            <div><span className="label">Title</span>LittleDevLab</div>
            <div><span className="label">Material</span>PLA+ · Custom Colors</div>
            <div><span className="label">Scale</span>Designed to Fit</div>
            <div><span className="label">Dr. No.</span>littledevlab.com</div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Logo size={20} />
              LittleDevLab
            </div>
            <p className="footer-copy">© 2025 LittleDevLab. SF Bay Area. All designs are original.</p>
            <ul className="footer-links">
              <li><a href="/index.html">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="/lab-notes/index.html">Lab Journey</a></li>
              <li><a href="/index.html#contact">Get in Touch</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
