import { useCallback, useLayoutEffect, useState } from 'react'
import productsCss from './products.css?url'
import products from '../../../products.js'
import ProductBlock from './ProductBlock.jsx'
import Nav from '../../components/Nav.jsx'
import { MODEL_VIEWER_SRC } from '../../site.js'
import SiteFooter from '../../components/SiteFooter.jsx'
import Lightbox from '../../components/Lightbox.jsx'
import useReveal from '../../components/useReveal.js'

// The browser jumps to #anchor before images, 3D models and the fade-in have
// settled, so the first jump can land in the wrong place. Snap to it once the
// page has hydrated, and again after everything has loaded.
function correctHashScroll() {
  let target
  try {
    target = document.querySelector(window.location.hash)
  } catch {
    return
  }
  if (!target) return
  // Measure the layout position (offsetTop ignores the fade-in slide, which can be
  // mid-animation here) and leave room for the fixed nav.
  let top = 0
  for (let el = target; el; el = el.offsetParent) top += el.offsetTop
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
  window.scrollTo({ top: top - navH - 16, behavior: 'instant' })
}

export function head() {
  return {
    title: 'Products — LittleDevLab',
    description: 'Custom 3D printed home organizers: glasses + contact lens holders, Chilewich coaster holders, trading card displays, Hunter Douglas remote mounts, steak knife holders, and gift carriers. Designed in Shapr3D, printed in the SF Bay Area.',
    path: '/products',
    image: products[0].photos[0].src,
    // This sheet has always loaded after the theme on this page.
    lateStyles: [productsCss],
    scripts: [MODEL_VIEWER_SRC],
  }
}

export default function ProductsPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null)
  const closeLightbox = useCallback(() => setLightboxPhoto(null), [])
  const [headerRef, headerReveal] = useReveal()

  // useLayoutEffect runs before the first paint, so the page never flashes at the top.
  useLayoutEffect(() => {
    if (!window.location.hash) return
    const timers = []
    function schedule() {
      correctHashScroll()
      // 3D models and images can still shift the layout after they load.
      timers.push(setTimeout(correctHashScroll, 600))
    }
    schedule()
    if (document.readyState !== 'complete') window.addEventListener('load', schedule, { once: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', schedule)
    }
  }, [])

  return (
    <>
      <Nav />
      <section id="products">
        <div className="container">
          <div ref={headerRef} className={`section-header ${headerReveal}`}>
            <span className="tag">Products</span>
            <h2>Designed for the things you actually use every day</h2>
            <p>Each product starts as a problem — a cluttered counter, a misplaced lens case — and ends as a clean, permanent solution. Designed in Shapr3D, printed on Bambu Lab.</p>
          </div>

          <div className="products-landing-grid">
            {products.map((product) => (
              <a key={product.id} className={`products-landing-tile tone-${product.tone}`} href={`#${product.id}`}>
                <img
                  src={product.photos[0].src}
                  alt={product.name}
                  loading="lazy"
                  style={product.photos[0].objectPosition ? { objectPosition: product.photos[0].objectPosition } : undefined}
                />
                <span>{product.name}</span>
              </a>
            ))}
          </div>

          {products.map((product) => (
            <ProductBlock key={product.id} product={product} onEnlarge={setLightboxPhoto} />
          ))}
        </div>
      </section>
      <SiteFooter />
      <Lightbox photo={lightboxPhoto} onClose={closeLightbox} />
    </>
  )
}
