'use client'
import { motion } from 'framer-motion'

const LINES = [
  { text: '3rd-Year Computer Science Engineering Student', delay: 0.3 },
  { text: 'Artificial Intelligence  ·  Machine Learning  ·  Cloud Computing  ·  Distributed Systems', delay: 0.45 },
  { text: 'Building scalable full-stack, DevOps, and data-driven applications.', delay: 0.6 },
  { text: 'Focused on performance optimization, automation, and next-generation computing.', delay: 0.75 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

export function ProfessionalSummary() {
  return (
    <section className="py-32 px-10 md:px-20 max-w-4xl mx-auto">
      {/* Section heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        className="mb-14"
      >
        <p className="text-[10px] font-mono tracking-[0.35em] text-white/40 uppercase mb-3">
          01 — Overview
        </p>
        <h2
          className="text-4xl md:text-5xl font-medium tracking-tighter text-transparent bg-clip-text pb-1"
          style={{
            backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 8s linear infinite',
          }}
        >
          Professional Summary
        </h2>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-white/20 to-transparent" />
      </motion.div>

      {/* Staggered lines */}
      <div className="space-y-5">
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={line.delay}
            variants={fadeUp}
            className={
              i === 0
                ? 'text-xl md:text-2xl font-light text-white/80 tracking-tight'
                : i === 1
                ? 'text-sm font-mono tracking-widest text-[#7DD3FC]/70 uppercase'
                : 'text-base md:text-lg text-white/40 font-light leading-relaxed'
            }
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </section>
  )
}
