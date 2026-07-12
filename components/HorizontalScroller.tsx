'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function HorizontalScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getVisiblePanel = (): HTMLElement | null => {
      const panels = Array.from(el.querySelectorAll<HTMLElement>('[data-panel]'))
      const center = el.scrollLeft + window.innerWidth / 2
      return panels.reduce<HTMLElement | null>((closest, panel) => {
        const dist = Math.abs(panel.offsetLeft + window.innerWidth / 2 - center)
        const prevDist = closest
          ? Math.abs(closest.offsetLeft + window.innerWidth / 2 - center)
          : Infinity
        return dist < prevDist ? panel : closest
      }, null) ?? panels[0] ?? null
    }

    const isDesktop = () => window.innerWidth >= 1024

    const onWheel = (e: WheelEvent) => {
      if (!isDesktop()) return

      const panel = getVisiblePanel()

      // If scrolling vertically and panel still has room to scroll, let it
      if (panel && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atTop = panel.scrollTop <= 0
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return
      }

      e.preventDefault()
      el.scrollBy({ left: e.deltaY || e.deltaX, behavior: 'smooth' })
    }

    // Nav anchor clicks → scroll to the panel containing that section
    const onAnchorClick = (e: MouseEvent) => {
      if (!isDesktop()) return
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const section = el.querySelector<HTMLElement>(`#${id}`)
      if (!section) return
      const panel = section.closest<HTMLElement>('[data-panel]') ?? section
      e.preventDefault()
      el.scrollTo({ left: panel.offsetLeft, behavior: 'smooth' })
    }

    // Tell Nav how far we've scrolled horizontally
    const onScroll = () => {
      window.dispatchEvent(
        new CustomEvent('horizontalscroll', { detail: { scrollLeft: el.scrollLeft } })
      )
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onAnchorClick)

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onAnchorClick)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="horizontal-scroller"
    >
      {children}
    </div>
  )
}
