'use client'

import { useRef } from 'react'
import { ScrollScene } from '@/graphics/ScrollScene'
import { PhaseOverlay } from '@/components/PhaseOverlay'
import { CursorEngine } from '@/engine/CursorEngine'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useJourneyStore } from '@/store/useJourneyStore'
import { Education } from '@/components/portfolio/Education'
import { TechSkills } from '@/components/portfolio/TechSkills'
import { Experience } from '@/components/portfolio/Experience'
import { Projects } from '@/components/portfolio/Projects'
import { Certifications } from '@/components/portfolio/Certifications'
import { Leadership } from '@/components/portfolio/Leadership'
import { Languages } from '@/components/portfolio/Languages'
import { Contact } from '@/components/portfolio/Contact'
import { ProfessionalSummary } from '@/components/portfolio/ProfessionalSummary'
import { motion } from 'framer-motion'

function SilverySeparator() {
  return (
    <div className="relative w-full h-px my-16 overflow-hidden bg-white/5 max-w-5xl mx-auto rounded-full">
      <motion.div
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  )
}


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollProgress(containerRef)
  const scrollProgress = useJourneyStore((s) => s.scrollProgress)

  // Fade out hero text as user enters Phase 2
  const heroOpacity = Math.max(0, 1 - scrollProgress * 12)

  return (
    <>
      {/* Physics cursor */}
      <CursorEngine />

      {/* Fixed WebGL scene */}
      <ScrollScene />

      {/* Fixed phase labels, progress bar, scroll indicator */}
      <PhaseOverlay />

      {/* Hero text — centered over crystal, fades out on scroll */}
      <div
        className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-medium tracking-tighter text-transparent bg-clip-text leading-[1.1] pb-2 whitespace-nowrap font-dune"
            style={{
              backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
              backgroundSize: '200% auto',
              animation: 'shimmer 8s linear infinite',
            }}
          >
            Arham Rasheed
          </h1>
          <p className="text-base md:text-lg text-white/40 font-light tracking-widest uppercase font-dune">
            Computer Science Engineer
          </p>
        </motion.div>
      </div>

      {/* Jet black end screen — fades in at the very end of the cinematic journey */}
      <div
        className="fixed inset-0 z-20 pointer-events-none bg-black/75"
        style={{ opacity: Math.max(0, (scrollProgress - 0.94) / 0.06) }}
      />

      {/* ── Cinematic journey scroll container (580vh) ── */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: '580vh' }}
      >
        <div className="sticky top-0 h-screen w-full pointer-events-none" />
      </div>

      {/* ── Professional Portfolio Section ── */}
      {/* Transparent background so stars are visible behind cards */}
      <div className="relative z-30 bg-transparent min-h-screen flex flex-col items-center py-32 overflow-hidden">
        {/* Pulsing ambient light orb */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, rgba(167,139,250,0.2) 50%, transparent 70%)',
          }}
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center text-center px-10"
        >
          {/* Mask container for "Arham" */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={{
                initial: { y: "110%", filter: 'blur(8px)' },
                animate: { y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tighter text-transparent bg-clip-text leading-[1.1] font-dune"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Arham
            </motion.h1>
          </div>

          {/* Mask container for "Rasheed" */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={{
                initial: { y: "110%", filter: 'blur(8px)' },
                animate: { y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tighter text-transparent bg-clip-text leading-[1.1] font-dune"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Rasheed
            </motion.h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mt-6 py-1">
            <motion.p
              variants={{
                initial: { opacity: 0, y: "100%", filter: 'blur(4px)' },
                animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-2xl md:text-4xl font-medium tracking-tighter text-transparent bg-clip-text uppercase mt-2 pb-1 font-dune"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Software Engineer
            </motion.p>
          </div>

          {/* Detailed Shimmering Intro Text */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
            }}
            className="max-w-3xl md:max-w-6xl mt-64 space-y-8 text-left px-4"
          >
            <p
              className="text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Hi, I'm <span className="text-white font-semibold">Arham Rasheed</span>, a Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, Cloud Computing, Distributed Systems, and Full-Stack Development.
            </p>
            <p
              className="text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              I build scalable applications, intelligent systems, and cloud-native solutions that solve real-world problems. My interests span software engineering, automation, data-driven technologies, and modern computing architectures.
            </p>
            <p
              className="text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              This portfolio highlights my projects, research, technical skills, certifications, and professional journey as I continue exploring emerging technologies and building impactful solutions.
            </p>
          </motion.div>

          {/* Education Section */}
          <div className="w-full mt-64">
            <Education />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Experience Section */}
          <div className="w-full mt-64">
            <Experience />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Projects Section */}
          <div className="w-full mt-64">
            <Projects />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Technical Skills Section */}
          <div className="w-full mt-64">
            <TechSkills />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Certifications Section */}
          <div className="w-full mt-64">
            <Certifications />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Leadership Section */}
          <div className="w-full mt-64">
            <Leadership />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Languages Section */}
          <div className="w-full mt-64">
            <Languages />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-64">
            <SilverySeparator />
          </div>

          {/* Contact & Footer Section */}
          <div className="w-full mt-64">
            <Contact />
          </div>
        </motion.div>
      </div>
    </>
  )
}

