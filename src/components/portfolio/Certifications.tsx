'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const GLOBAL_CERTS = [
  {
    title: 'SAP | Back-End Developer – ABAP Cloud',
    issuer: 'SAP',
    id: '2ac0861f-e206-4986-9dd8-93d176aaaf8a',
    period: 'Apr 2026 — Apr 2027',
    bullets: [
      'Validated expertise in ABAP programming, RAP model, Clean Core principles, and SAP S/4HANA extension development.'
    ]
  }
]

const COURSE_CERTS = [
  'AWS Academy Graduate (Cloud Development, Cloud Security, Data Engineering, Generative AI)',
  'AWS Well-Architected Proficient',
  'Red Hat OpenShift Development I: Containers with Podman (DO188)',
  'Cisco Networking Basics',
  'C++ Programming (Udemy)'
]

export function Certifications() {
  const sapCardRef = useRef<HTMLDivElement>(null)
  const [sapHovered, setSapHovered] = useState(false)

  const stopColor = sapHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = sapHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

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
          Certifications
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto px-4 md:px-0 items-start">
        {/* Left Side: Global Credentials */}
        <div className="lg:col-span-7 flex flex-col h-full justify-between">
          <p className="text-sm font-mono tracking-[0.25em] text-white/40 uppercase mb-4 text-left">
            Global Credentials
          </p>
          {GLOBAL_CERTS.map((cert, idx) => (
            <motion.div
              key={idx}
              ref={sapCardRef}
              onMouseEnter={() => setSapHovered(true)}
              onMouseLeave={() => setSapHovered(false)}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.01,
                borderColor: 'rgba(125, 211, 252, 0.35)',
                boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="relative rounded-3xl border border-white/10 p-6 md:p-8 overflow-hidden transition-colors duration-300 bg-white/[0.02] backdrop-blur-[24px]"
            >
              {/* Dynamic Glowing Border Beam SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
                <defs>
                  <linearGradient id={`silver-gradient-cert-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                  stroke={`url(#silver-gradient-cert-${idx})`}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                  style={{
                    strokeDasharray: sapHovered ? "200 500" : "150 550",
                    animation: sapHovered ? "borderBeam 4s linear infinite" : "borderBeam 8s linear infinite",
                    opacity: sapHovered ? 0.8 : 0.4
                  }}
                />
              </svg>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium text-white/90 leading-tight text-left">
                    {cert.title}
                  </h3>
                  <p className="text-base font-mono tracking-widest text-[#7DD3FC]/80 uppercase mt-1.5 text-left">
                    Credential Issuer: {cert.issuer}
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <span className="text-sm font-mono text-white/70 block">{cert.period}</span>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <p className="text-sm font-mono text-white/45">
                  CREDENTIAL ID: <span className="text-white/75">{cert.id}</span>
                </p>
                <ul className="space-y-2.5 text-base md:text-lg text-white/60 font-light leading-relaxed list-none pl-0">
                  {cert.bullets.map((bullet, i) => (
                    <li key={i} className="relative pl-5">
                      <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-white/25" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Course Certifications */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <p className="text-sm font-mono tracking-[0.25em] text-white/40 uppercase mb-4 text-left">
            Course & Specialization Certifications
          </p>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 p-6 md:p-8 bg-white/[0.02] backdrop-blur-[24px] flex-1 flex flex-col justify-center"
          >
            <ul className="space-y-4 text-base md:text-lg text-white/75 font-light leading-relaxed list-none pl-0 text-left">
              {COURSE_CERTS.map((cert, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-6 py-2 border-b border-white/5 last:border-0"
                >
                  <span className="absolute left-0 top-[15px] w-1.5 h-1.5 rounded-full bg-[#7DD3FC]/70" />
                  {cert}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
