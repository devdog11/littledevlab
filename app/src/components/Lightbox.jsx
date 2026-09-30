import { useEffect, useRef } from 'react'

export default function Lightbox({ photo, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!photo) return
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
      // The close button is the only control, so keep focus on it.
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previousFocus?.focus?.()
    }
  }, [photo, onClose])

  return (
    <div
      className={photo ? 'lightbox open' : 'lightbox'}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged photo"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>✕</button>
      {photo && <img src={photo.src} alt={photo.alt} onClick={(e) => e.stopPropagation()} />}
    </div>
  )
}
