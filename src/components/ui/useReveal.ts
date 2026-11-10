import { useEffect, useRef } from 'react'

/**
 * Fade and rise an element in the first time it scrolls into view.
 *
 * The page is pre-rendered with everything visible. Only after hydration, and
 * only for elements still below the fold, do we hide them and wait. So search
 * engines, link previews, failed scripts and reduced-motion users all get plain
 * visible content, and nothing above the fold ever flashes.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return // already in view

    el.dataset.reveal = 'pending'
    // Reveal once the element's top is inside the viewport, or already above it.
    // (Checking position, not intersection, so sections skipped by a jump
    // link or a fast scroll still appear.)
    let frame = 0
    const check = () => {
      frame = 0
      if (el.getBoundingClientRect().top >= window.innerHeight * 0.92) return
      el.dataset.reveal = 'shown'
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return ref
}
