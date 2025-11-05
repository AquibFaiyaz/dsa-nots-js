import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null)

  useEffect(() => {
    if (sectionIds.length === 0) return
    const options: IntersectionObserverInit = {
      // Trigger when section passes near top, accounting for header height
      root: null,
      rootMargin: '-64px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 1],
    }
    const handler: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveId(visible[0].target.id)
    }
    const observer = new IntersectionObserver(handler, options)
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  return { activeId }
}


