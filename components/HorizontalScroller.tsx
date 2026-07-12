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

    let locked = false
    let accumulator = 0
    // How much scroll delta must build up before snapping to next section
    const SNAP_THRESHOLD = 120

    const snapToPanel = (index: number) => {
      const panels = Array.from(el.querySelectorAll<HTMLElement>('[data-panel]'))
      const target = panels[Math.max(0, Math.min(panels.length - 1, index))]
      if (!target) return
      locked = true
      accumulator = 0
      el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
      setTimeout(() => { locked = false }, 900)
    }

    const getPanelIndex = (panel: HTMLElement) => {
      const panels = Array.from(el.querySelectorAll<HTMLElement>('[data-panel]'))
      return panels.indexOf(panel)
    }

    const onWheel = (e: WheelEvent) => {
      if (!isDesktop()) return

      const panel = getVisiblePanel()

      // If the panel still has vertical content to scroll through, let it scroll
      if (panel && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atTop = panel.scrollTop <= 0
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          accumulator = 0
          return
        }
      }

      // Panel is at its boundary — accumulate scroll intent before snapping
      e.preventDefault()
      if (locked || !panel) return

      const delta = e.deltaY || e.deltaX
      accumulator += delta

      if (Math.abs(accumulator) < SNAP_THRESHOLD) return

      const direction = accumulator > 0 ? 1 : -1
      snapToPanel(getPanelIndex(panel) + direction)
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
      snapToPanel(getPanelIndex(panel as HTMLElement))
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
