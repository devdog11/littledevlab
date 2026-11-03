import { useEffect } from 'react'

// Direct links to a #section can land in the wrong place: smooth scrolling
// turns the browser's first jump into an animation aimed at a position that
// moves while images and fonts settle. Once the page has fully loaded, snap
// (instantly) to the real position, then once more shortly after for late
// image decodes. Ported from the home page's inline script.
function correctHashScroll() {
  if (!window.location.hash) return
  let target
  try {
    target = document.querySelector(window.location.hash)
  } catch {
    return
  }
  if (!target) return
  const root = document.documentElement
  const prev = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  target.scrollIntoView({ block: 'start' })
  root.style.scrollBehavior = prev
}

export default function useHashScrollFix() {
  useEffect(() => {
    let timer
    let frame
    const onLoad = () => {
      // Double rAF: let layout from the load event itself finish painting first.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(correctHashScroll)
      })
      timer = setTimeout(correctHashScroll, 600)
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => {
      window.removeEventListener('load', onLoad)
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [])
}
