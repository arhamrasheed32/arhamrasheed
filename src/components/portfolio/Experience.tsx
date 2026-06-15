'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  {
    company: 'Universiti Sains Malaysia (USM) — In collaboration with SRMIST',
    role: 'Research Intern (Cloud-Edge & Metaverse)',
    period: 'Nov 2025 — Present',
    location: 'Malaysia / India',
    logoUrl: '/USM_logo.png',
    bullets: [
      'Conducting research on Metaverse architectures, Cloud–Edge–Fog Computing, and scalable virtual environment systems.',
      'Researching low-latency communication, distributed computing, and performance optimization techniques for immersive applications.',
    ]
  },
  {
    company: 'R.M.C., Chennai',
    role: 'Event Member',
    period: 'Jan 2025 — Present',
    location: 'Chennai, India',
    logoUrl: '/rmc_logo',
    bullets: [
      'Contributed to educational and community outreach initiatives.',
      'Coordinated cross-functional activities to improve engagement and event delivery.',
    ]
  },
  {
    company: 'SOCH Beyond The Imagination',
    role: 'NGO Volunteer',
    period: 'June 2025',
    location: 'Aligarh, India',
    logoUrl: '/SOCH_logo',
    bullets: [
      'Participated in grassroots educational and social initiatives.',
      'Conducted AI awareness sessions, educating students on emerging technologies, career opportunities, and real-world applications of AI.',
    ]
  }
]

function ExperienceCard({ roleInfo, idx }: { roleInfo: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const stopColor = isHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <div className="relative flex gap-8 md:gap-12 pl-4 md:pl-8">
      {/* Timeline Node */}
      <div className="absolute left-0 top-8 -translate-x-1/2 flex flex-col items-center z-20">
        <motion.div
          animate={{
            scale: isHovered ? 1.3 : 1,
            backgroundColor: isHovered ? '#7DD3FC' : 'rgba(255, 255, 255, 0.2)',
            boxShadow: isHovered ? '0 0 12px #7DD3FC' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4 rounded-full border-2 border-[#020305] bg-white/20"
        />
      </div>

      {/* Card Content Container */}
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', x: 40 }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
        whileHover={{
          scale: 1.01,
          borderColor: 'rgba(125, 211, 252, 0.35)',
          boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        className="relative flex-1 rounded-3xl border border-white/10 p-6 md:p-10 overflow-hidden transition-colors duration-300"
        style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(24px)' }}
      >
        {/* Dynamic Glowing Border Beam SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
          <defs>
            <linearGradient id={`silver-gradient-exp-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
            stroke={`url(#silver-gradient-exp-${idx})`}
            strokeWidth="1.5"
            className="transition-all duration-300"
            style={{
              strokeDasharray: isHovered ? "220 550" : "160 610",
              animation: isHovered ? "borderBeam 4.5s linear infinite" : "borderBeam 8.5s linear infinite",
              opacity: isHovered ? 0.8 : 0.4
            }}
          />
        </svg>

        {/* Header Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* Logo Container */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-black flex items-center justify-center p-2">
              <img
                src={roleInfo.logoUrl}
                alt={`${roleInfo.company} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-medium text-white/90 leading-tight tracking-tight">
                {roleInfo.role}
              </h3>
              <p className="text-sm font-mono tracking-widest text-[#7DD3FC]/80 uppercase">
                {roleInfo.company}
              </p>
            </div>
          </div>
          <div className="text-left md:text-right space-y-1.5 md:self-start">
            <p className="text-base md:text-lg font-mono text-white/85">{roleInfo.period}</p>
            <p className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-wider">{roleInfo.location}</p>
          </div>
        </div>

        {/* Roles & Achievements List */}
        <ul className="mt-6 space-y-3.5 text-base md:text-lg text-white/60 font-light leading-relaxed list-none pl-0 text-left">
          {roleInfo.bullets.map((bullet: string, i: number) => (
            <li key={i} className="relative pl-6">
              <span className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-white/25" />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export function Experience() {
  return (
    <section className="w-full py-20">
      {/* Section heading — Zoom in & blur reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 flex flex-col items-center text-center"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-transparent bg-clip-text pb-1"
          style={{
            backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 8s linear infinite',
          }}
        >
          Work Experience
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Timeline flow */}
      <div className="relative max-w-5xl mx-auto flex flex-col gap-16">
        {/* Central Vertical Timeline Cable */}
        <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent z-10" />

        {ROLES.map((roleInfo, idx) => (
          <ExperienceCard key={idx} roleInfo={roleInfo} idx={idx} />
        ))}
      </div>
    </section>
  )
}
