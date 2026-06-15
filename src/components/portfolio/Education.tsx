'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function LoopCGPACounter({ target = 9.76 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let animationFrameId: number
    let intervalId: NodeJS.Timeout

    const runCounter = () => {
      const duration = 2500 // Count up takes 2.5 seconds
      const start = performance.now()

      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        setValue(eased * target)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(tick)
        }
      }
      animationFrameId = requestAnimationFrame(tick)
    }

    runCounter()

    // Reset and count up again every 10 seconds
    intervalId = setInterval(() => {
      setValue(0)
      runCounter()
    }, 10000)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervalId)
    }
  }, [target])

  return (
    <span className="font-mono tabular-nums">
      {value.toFixed(2)}
    </span>
  )
}

export function Education() {
  const [isHovered, setIsHovered] = useState(false)

  const stopColor = isHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <section className="w-full py-20">
      {/* Section heading — Zoom in & blur reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-transparent bg-clip-text pb-1"
          style={{
            backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 8s linear infinite',
          }}
        >
          Education
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* University card — High-impact zoom entrance */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.82, filter: 'blur(16px)', y: 50 }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          scale: 1.01,
          borderColor: 'rgba(125, 211, 252, 0.35)',
          boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        className="relative rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden max-w-5xl mx-auto"
        style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(24px)' }}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            {/* SRM Logo */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-black flex items-center justify-center p-2">
              <img
                src="/srm_logo.png?v=2"
                alt="SRM IST Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs md:text-sm font-mono tracking-[0.35em] text-white/85 uppercase">
                2023 — 2027
              </p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 leading-tight tracking-tight">
                SRM Institute of Science and Technology
              </h3>
              <p className="text-base md:text-lg text-white/60 font-mono tracking-wider uppercase">
                Chennai, India
              </p>
              <p className="text-lg md:text-xl text-white/60 font-light mt-3">
                B.Tech in Computer Science and Engineering
              </p>
            </div>
          </div>

          {/* CGPA counter */}
          <div className="flex flex-col items-center lg:items-end gap-2 shrink-0 border-t border-white/5 lg:border-t-0 pt-6 lg:pt-0">
            <span className="text-xs md:text-sm font-mono tracking-[0.35em] text-white/40 uppercase">CGPA</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">
                <LoopCGPACounter target={9.76} />
              </span>
              <span className="text-xl md:text-2xl font-mono text-white/25">/ 10.00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
