import { useState, useRef, useEffect } from 'react'
import pressable from '../../components/pressable.js'
import useReveal from '../../components/useReveal.js'
import ThumbStrip from './ThumbStrip.jsx'

function CheckIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 12 12" fill="none">
        <polyline points="2,6 5,9 10,3" stroke="#2C2820" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

// The photo a variant choice should show, or null if it doesn't change the photo.
// product.variantPhoto fills {key} slots from each group's selected option slug
// (Hunter Douglas: style + color); otherwise the clicked option's own photo is used.
function variantPhoto(product, selected, option) {
  if (product.variantPhoto) {
    const labels = []
    const src = product.variantPhoto.replace(/\{(\w+)\}/g, (_, key) => {
      const gi = product.variants.findIndex((g) => g.key === key)
      const chosen = product.variants[gi].options[selected[gi]]
      labels.push(chosen.label)
      return chosen.slug
    })
    return { src, alt: `${product.name}, ${labels.join(', ')}` }
  }
  if (option.photo) return { src: option.photo, alt: `${product.name}, ${option.label}` }
  return null
}

function hexToRgb(hex) {
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
}

export default function ProductBlock({ product, onEnlarge }) {
  const [view, setView] = useState('3d')
  const [activeThumb, setActiveThumb] = useState(0)
  const [mainPhoto, setMainPhoto] = useState(product.photos[0])
  const [modelSrc, setModelSrc] = useState(product.model.src)
  const [selected, setSelected] = useState(() => product.variants.map((g) => g.selected ?? 0))
  const modelRef = useRef(null)
  const [revealRef, revealClass] = useReveal()

  function selectPhoto(i) {
    setActiveThumb(i)
    setMainPhoto(product.photos[i])
    setView('photo')
  }

  function selectOption(groupIndex, optionIndex) {
    const option = product.variants[groupIndex].options[optionIndex]
    if (option.disabled) return
    const next = selected.map((v, gi) => (gi === groupIndex ? optionIndex : v))
    setSelected(next)
    if (option.model) setModelSrc(option.model)
    const photo = variantPhoto(product, next, option)
    if (photo) setMainPhoto(photo)
  }

  const activeTint = product.variants
    .map((group, gi) => group.options[selected[gi]]?.tint)
    .find(Boolean)

  // model-viewer's color isn't a prop React can set - it's an imperative call
  // into the library's own API, so this reaches the element through a ref.
  // The load listener re-applies the tint whenever a new model (shape/style) loads.
  useEffect(() => {
    const mv = modelRef.current
    if (!mv || !activeTint) return
    const [r, g, b] = hexToRgb(activeTint)

    function applyTint() {
      const materials = mv.model?.materials
      if (!materials) return
      materials.forEach((m) => m.pbrMetallicRoughness?.setBaseColorFactor([r, g, b, 1]))
    }

    if (mv.loaded) applyTint()
    mv.addEventListener('load', applyTint)
    return () => mv.removeEventListener('load', applyTint)
  }, [activeTint])

  const blockClass = ['product-block', product.reverse && 'reverse', revealClass].filter(Boolean).join(' ')

  return (
    <div ref={revealRef} className={blockClass} id={product.id}>
      <div className="product-gallery" style={{ backgroundImage: `url('${product.blueprint}')` }}>
        <div className="gallery-view-toggle">
          <button className={view === 'photo' ? 'active' : undefined} type="button" onClick={() => setView('photo')}>Photo</button>
          <button className={view === '3d' ? 'active' : undefined} type="button" onClick={() => setView('3d')}>Rotate in 3D</button>
        </div>
        <model-viewer
          ref={modelRef}
          class={`main-photo main-3d${view === '3d' ? ' active' : ''}`}
          src={modelSrc}
          camera-controls=""
          auto-rotate=""
          auto-rotate-delay="0"
          rotation-per-second="18deg"
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          alt={product.model.alt}
        ></model-viewer>
        <div className="gallery-3d-hint" style={{ opacity: view === '3d' ? 1 : 0 }}>Drag to rotate · scroll to zoom</div>
        <img
          className={`main-photo${view === '3d' ? ' is-3d-hidden' : ''}`}
          src={mainPhoto.src}
          alt={mainPhoto.alt}
          style={mainPhoto.objectPosition ? { objectPosition: mainPhoto.objectPosition } : undefined}
          {...pressable(() => onEnlarge(mainPhoto))}
        />
        <div className="gallery-zoom-hint">Click to enlarge</div>
        <ThumbStrip photos={product.photos} active={activeThumb} onSelect={selectPhoto} />
      </div>
      <div className="product-info">
        <span className="tag">{product.tag}</span>
        <h3>{product.name}</h3>
        {product.price && <div className="price">{product.price}</div>}
        {product.variants.map((group, groupIndex) => (
          <div className="product-variants" key={group.label}>
            <span className="tag" style={{ fontSize: '.7rem', marginBottom: 8, display: 'block', width: '100%' }}>
              {group.label}
            </span>
            {group.options.map((option, i) =>
              option.disabled ? (
                <span key={option.label} className="variant-chip" style={{ opacity: .5, cursor: 'default' }} title="Model file pending" aria-disabled="true">
                  {option.label}
                </span>
              ) : (
                <span
                  key={option.label}
                  className={i === selected[groupIndex] ? 'variant-chip active' : 'variant-chip'}
                  aria-pressed={i === selected[groupIndex]}
                  {...pressable(() => selectOption(groupIndex, i))}
                >
                  {option.label}
                </span>
              ),
            )}
            {group.options[selected[groupIndex]]?.contact && (
              <a href="/index.html#contact" style={{ display: 'block', width: '100%', marginTop: 10, fontSize: '.82rem', color: 'var(--accent)' }}>
                Start a Custom Order →
              </a>
            )}
          </div>
        ))}
        {product.note && (
          <p style={{ fontSize: '.78rem', color: 'var(--gray-600)', marginTop: -20, marginBottom: 28, lineHeight: 1.6 }}>
            <em>{product.note}</em>
          </p>
        )}
        <p>{product.description}</p>
        <ul className="product-features">
          {product.features.map((feature) => (
            <li key={feature}><CheckIcon />{feature}</li>
          ))}
        </ul>
        <div className="product-actions">
          <a href="/index.html#contact" className="btn btn-primary">Order This</a>
          <a href="/index.html#contact" className="btn btn-outline">Request a Variation</a>
        </div>
      </div>
    </div>
  )
}
