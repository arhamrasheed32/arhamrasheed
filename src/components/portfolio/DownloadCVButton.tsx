'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function DownloadCVButton() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [assemblyParticles, setAssemblyParticles] = useState<Array<{
    id: number
    xOffset: number
    yOffset: number
    delay: number
    duration: number
    size: number
    color: string
  }>>([])

  const handleClick = (e: React.MouseEvent) => {
    if (isAnimating) {
      e.preventDefault()
      return
    }
    
    // Prevent default to run the cinematic sequence first
    e.preventDefault()
    
    // Generate particles here so window is only accessed in the browser
    const colors = [
      'bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,1)]', 
      'bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)]', 
      'bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,1)]',
      'bg-fuchsia-300 shadow-[0_0_15px_rgba(240,171,252,1)]'
    ]
    const particles = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      xOffset: (Math.random() - 0.5) * window.innerWidth * 1.5,
      yOffset: Math.random() * window.innerHeight * 1.2 + 200,
      delay: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 1.0 + 0.8,
      size: Math.random() * 3 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setAssemblyParticles(particles)
    setIsAnimating(true)

    // Sequence timing: End at 4.0s, triggering download
    setTimeout(() => {
      setIsAnimating(false)
      // Use window.open for cross-platform compatibility (iOS/Android block programmatic anchor clicks)
      window.open('/Arham_Rasheed_CV.pdf', '_blank')
    }, 4000)
  }


  return (
    <div className="relative">
      {/* Main Download Button */}
      <motion.button
        onClick={handleClick}
        animate={isAnimating ? { scale: 0.95 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 group overflow-hidden z-[60]"
      >
        <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="relative z-10 flex flex-col items-start leading-tight">
          <span className="font-medium text-sm md:text-base">Download CV</span>
          <span className="text-[10px] md:text-xs text-white/40 font-light tracking-wide">Optimized for Desktop Browsers</span>
        </span>
        
        {/* 0.0s - 0.5s: Bright energy pulse inside button */}
        <AnimatePresence>
          {isAnimating && (
            <>
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 bg-cyan-400/50 rounded-full pointer-events-none mix-blend-screen blur-md"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="absolute inset-0 border-[4px] border-purple-400/50 rounded-full pointer-events-none mix-blend-screen"
              />
            </>
          )}
        </AnimatePresence>

        {/* 0.0s - 0.5s: Small glowing burst from button itself */}
        <AnimatePresence>
          {isAnimating && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    x: Math.cos(i * (Math.PI / 6)) * 100, 
                    y: Math.sin(i * (Math.PI / 6)) * 100,
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,1)]"
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full-screen Cinematic Overlay Sequence */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Subtle Glassmorphism Blur Background */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
              animate={{ backdropFilter: "blur(16px)", backgroundColor: "rgba(0,0,0,0.4)" }}
              exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            />

            {/* Multi-Color Radial Aura Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, delay: 1.0 }}
              className="absolute w-[900px] h-[900px] rounded-full mix-blend-screen pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, rgba(45,212,191,0.15) 30%, rgba(14,165,233,0.1) 60%, transparent 80%)',
              }}
            />

            {/* Glassmorphic Panel holding the text (0.8s) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 px-12 py-10 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="relative">
                {/* Assembled Typography (1.0s) */}
                <motion.h2
                  initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                  className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest text-transparent bg-clip-text text-center uppercase leading-tight"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff, #a5f3fc, #ffffff)',
                  }}
                >
                  Engineering Intelligence,
                  <br />
                  <span className="font-medium bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]">Transforming Tomorrow</span>
                </motion.h2>

                {/* Light Sweep Effect (1.5s - 2.5s) */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2.5, delay: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
                />
              </div>

              {/* Holographic Shimmer inside panel (1.5s) */}
              <motion.div
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/20 to-transparent pointer-events-none mix-blend-screen"
              />

              {/* Digital Network Connecting Lines (Brief flash at 1.2s) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.3, 0], scale: 1 }}
                transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
                className="absolute inset-0 border border-cyan-400/30 rounded-3xl pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 95%, rgba(34,211,238,0.2) 100%)',
                  backgroundSize: '20px 20px'
                }}
              />
            </motion.div>

            {/* Thousands of tiny particles flow upward and assemble */}
            {assemblyParticles.map((p) => (
              <motion.div
                key={`assembly-${p.id}`}
                initial={{ opacity: 0, x: p.xOffset, y: p.yOffset, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  x: [p.xOffset, p.xOffset * 0.2, 0], 
                  y: [p.yOffset, p.yOffset * 0.2, 0], 
                  scale: [0, p.size, 0] 
                }}
                transition={{ 
                  duration: p.duration, 
                  delay: p.delay, 
                  ease: "easeInOut" 
                }}
                className={`absolute rounded-full mix-blend-screen ${p.color}`}
                style={{ width: p.size, height: p.size }}
              />
            ))}

            {/* Orbiting background magical particles */}
            {[...Array(60)].map((_, i) => {
              const size = Math.random() * 4 + 1.5;
              const colors = [
                'bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,1)]',
                'bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)]',
                'bg-purple-400 shadow-[0_0_20px_rgba(192,132,252,1)]',
                'bg-white shadow-[0_0_20px_rgba(255,255,255,1)]'
              ];
              const color = colors[Math.floor(Math.random() * colors.length)];
              return (
              <motion.div
                key={`orbit-${i}`}
                initial={{ opacity: 0, rotate: Math.random() * 360 }}
                animate={{ 
                  opacity: [0, Math.random() * 0.8 + 0.4, 0], 
                  rotate: `+=${Math.random() * 200 + 100}` 
                }}
                transition={{ 
                  duration: Math.random() * 2.5 + 2, 
                  delay: Math.random() * 0.5 + 0.8, 
                  ease: "linear" 
                }}
                className="absolute w-[1000px] h-[1000px] pointer-events-none mix-blend-screen"
              >
                <div 
                  className={`absolute rounded-full ${color}`}
                  style={{ 
                    top: '50%', 
                    left: `${Math.random() * 50 + 50}%`, // Orbit around varied distances
                    marginTop: `${(Math.random() - 0.5) * 300}px`,
                    width: size,
                    height: size
                  }}
                />
              </motion.div>
            )})}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
