'use client'
import { useEffect, useRef } from 'react'
import { useJourneyStore } from '@/store/useJourneyStore'

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const setScrollProgress = useJourneyStore((s) => s.setScrollProgress)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current
        if (!el) return
        const scrollTop = window.scrollY
        const maxScroll = el.scrollHeight - window.innerHeight
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1)
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, setScrollProgress])
}
