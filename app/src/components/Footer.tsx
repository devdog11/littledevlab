import { Logo } from './Logo';
import { contactHref, productHref, type PageId } from '../site';

interface FooterProps {
  current: PageId;
}

export function Footer({ current }: FooterProps) {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <Logo size={20} />
            LittleDevLab
          </div>
          <p className="footer-copy">© 2025 LittleDevLab. SF Bay Area. All designs are original.</p>
          <ul className="footer-links">
            <li>
              <a href="/index.html">Home</a>
            </li>
            <li>
              <a href={productHref('/products.html', current)}>Products</a>
            </li>
            <li>
              <a href="/lab-notes/index.html">Lab Journey</a>
            </li>
            <li>
              <a href={contactHref(current)}>Get in Touch</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
