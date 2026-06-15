'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const LANGUAGES = [
  { name: 'English', proficiency: 'Professional Proficiency', code: 'EN' },
  { name: 'Urdu', proficiency: 'Native Speaker', code: 'UR' },
  { name: 'Hindi', proficiency: 'Native Speaker', code: 'HI' },
  { name: 'German', proficiency: 'Basic Proficiency', code: 'DE' }
]

function LanguageCard({ lang, idx }: { lang: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const stopColor = isHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
      whileHover={{
        scale: 1.03,
        borderColor: 'rgba(125, 211, 252, 0.35)',
        boxShadow: '0 0 25px rgba(125, 211, 252, 0.04)',
        transition: { duration: 0.2 }
      }}
      className="relative flex items-center gap-4 rounded-2xl border border-white/10 p-4 md:p-6 overflow-hidden bg-white/[0.02] backdrop-blur-[24px] cursor-default"
    >
      {/* Dynamic Glowing Border Beam SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-20">
        <defs>
          <linearGradient id={`silver-gradient-lang-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stopColorEdge} />
            <stop offset="30%" stopColor={stopColor} />
            <stop offset="50%" stopColor={stopColor} />
            <stop offset="100%" stopColor={stopColorEdge} />
          </linearGradient>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          rx="15"
          ry="15"
          fill="none"
          stroke={`url(#silver-gradient-lang-${idx})`}
          strokeWidth="1.5"
          className="transition-all duration-300"
          style={{
            strokeDasharray: isHovered ? "120 300" : "80 340",
            animation: isHovered ? "borderBeam 3s linear infinite" : "borderBeam 6s linear infinite",
            opacity: isHovered ? 0.8 : 0.4
          }}
        />
      </svg>

      {/* Language Indicator */}
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-base md:text-lg text-[#7DD3FC] font-semibold shrink-0">
        {lang.code}
      </div>

      <div className="text-left">
        <h3 className="text-lg md:text-xl font-medium text-white/90 leading-tight">
          {lang.name}
        </h3>
        <p className="text-sm md:text-base font-light text-white/50 mt-0.5">
          {lang.proficiency}
        </p>
      </div>
    </motion.div>
  )
}

export function Languages() {
  return (
    <section className="w-full py-20">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col items-center text-center"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-transparent bg-clip-text pb-1"
          style={{
            backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 8s linear infinite',
          }}
        >
          Languages
        </h2>
        <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 md:px-0">
        {LANGUAGES.map((lang, idx) => (
          <LanguageCard key={idx} lang={lang} idx={idx} />
        ))}
      </div>
    </section>
  )
}
