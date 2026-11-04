import { useEffect, useState } from 'react'

// Port of images/theme/blueprint.js: the drafting dimension labels show the
// real rendered size of a photo, in CSS pixels, and follow it as it resizes.
// axis "x" = width, "y" = height. Returns '' until measured, so the
// pre-rendered HTML and the first browser render match (empty label).
export default function useDimension(targetRef, axis = 'x') {
  const [size, setSize] = useState('')

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    const measure = () => {
      const box = el.getBoundingClientRect()
      setSize(String(Math.round(axis === 'y' ? box.height : box.width)))
    }
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      measure()
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(el) // fires once right away with the current size
    return () => observer.disconnect()
  }, [targetRef, axis])

  return size
}
