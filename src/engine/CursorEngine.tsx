"use client"

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursorStore } from '@/store/useCursorStore'

export function CursorEngine() {
  const { mode, text } = useCursorStore()
  const [isVisible, setIsVisible] = useState(false)

  // Raw position coordinates (updated instantly on mousemove)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring settings tuned for minimal latency but smooth organic momentum
  const cursorXSpring = useSpring(cursorX, { damping: 38, stiffness: 320, mass: 0.15 })
  const cursorYSpring = useSpring(cursorY, { damping: 38, stiffness: 320, mass: 0.15 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  // Single Glass Sphere Variants
  const glassVariants = {
    default: {
      width: 22,
      height: 22,
      border: '1.5px solid rgba(255, 255, 255, 0.45)',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      borderRadius: '50%',
      opacity: 1,
    },
    button: {
      width: 52,
      height: 52,
      border: '1.5px solid rgba(255, 255, 255, 0.7)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      borderRadius: '50%',
      opacity: 1,
    },
    text: {
      width: 6,
      height: 24,
      border: '1px solid rgba(255, 255, 255, 0.5)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)',
      borderRadius: '3px',
      opacity: 0.9,
    },
    hidden: {
      opacity: 0,
    }
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={glassVariants}
      animate={mode}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      {mode === 'button' && text && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[9px] font-semibold tracking-widest text-white uppercase pointer-events-none select-none"
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  )
}
