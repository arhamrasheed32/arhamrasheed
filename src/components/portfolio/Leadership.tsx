'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  {
    role: 'Technical Team Lead',
    description: 'Led cross-functional project teams, coordinated development activities, and drove successful project execution across academic and innovation initiatives.'
  },
  {
    role: 'Head Boy',
    description: 'Represented the student body, managed institutional events, coordinated with faculty and administration, and led student governance initiatives.'
  },
  {
    role: 'Academic & Event Representative',
    description: 'Facilitated communication between students and faculty, organized academic activities, and supported the execution of technical and institutional events.'
  }
]

function LeadershipCard({ item, idx }: { item: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const stopColor = isHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
      whileHover={{
        scale: 1.02,
        borderColor: 'rgba(125, 211, 252, 0.35)',
        boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className="relative rounded-3xl border border-white/10 p-6 md:p-8 overflow-hidden transition-colors duration-300 flex flex-col justify-between h-full bg-white/[0.02] backdrop-blur-[24px]"
    >
      {/* Dynamic Glowing Border Beam SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
        <defs>
          <linearGradient id={`silver-gradient-lead-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          rx="23"
          ry="23"
          fill="none"
          stroke={`url(#silver-gradient-lead-${idx})`}
          strokeWidth="1.5"
          className="transition-all duration-300"
          style={{
            strokeDasharray: isHovered ? "180 450" : "130 500",
            animation: isHovered ? "borderBeam 3.5s linear infinite" : "borderBeam 7s linear infinite",
            opacity: isHovered ? 0.8 : 0.4
          }}
        />
      </svg>

      <div>
        <h3 className="text-2xl md:text-3xl font-medium text-white/95 leading-snug tracking-tight mb-4 text-left border-b border-white/5 pb-3">
          {item.role}
        </h3>
        <p className="text-base md:text-lg text-white/60 font-light leading-relaxed text-left">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Leadership() {
  return (
    <section className="w-full py-20">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-transparent bg-clip-text pb-1"
          style={{
            backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 8s linear infinite',
          }}
        >
          Leadership & Extracurriculars
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 md:px-0">
        {ROLES.map((item, idx) => (
          <LeadershipCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  )
}
