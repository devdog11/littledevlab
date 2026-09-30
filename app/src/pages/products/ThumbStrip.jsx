import { useCallback, useEffect, useRef, useState } from 'react'
import pressable from '../../components/pressable.js'

export default function ThumbStrip({ photos, active, onSelect }) {
  const thumbsRef = useRef(null)
  const timerRef = useRef(null)
  const [edges, setEdges] = useState({ left: false, right: false })

  const updateEdges = useCallback(() => {
    const el = thumbsRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < maxScroll - 4 })
  }, [])

  const stopScroll = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }, [])

  function startScroll(dir) {
    stopScroll()
    timerRef.current = setInterval(() => {
      thumbsRef.current.scrollLeft += dir * 8
    }, 16)
  }

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => {
      window.removeEventListener('resize', updateEdges)
      stopScroll()
    }
  }, [updateEdges, stopScroll])

  const wrapClass = ['product-thumbs-wrap', edges.left && 'scrollable-left', edges.right && 'scrollable-right']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapClass}>
      <div className="thumb-scroll-zone left" onMouseEnter={() => startScroll(-1)} onMouseLeave={stopScroll}>&#10094;</div>
      <div className="product-thumbs" ref={thumbsRef} onScroll={updateEdges}>
        {photos.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className={i === active ? 'active' : undefined}
            style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
            {...pressable(() => onSelect(i))}
          />
        ))}
      </div>
      <div className="thumb-scroll-zone right" onMouseEnter={() => startScroll(1)} onMouseLeave={stopScroll}>&#10094;</div>
    </div>
  )
}
