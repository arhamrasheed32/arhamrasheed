'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Contact() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCardHovered, setIsCardHovered] = useState(false)

  const stopColor = isCardHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isCardHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <section className="w-full py-28 relative flex flex-col items-center">
      {/* Small uppercase category label */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-sm md:text-base font-mono tracking-[0.4em] text-[#7DD3FC] uppercase mb-4"
      >
        OPEN FOR COLLABORATION
      </motion.p>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-transparent bg-clip-text text-center px-4 max-w-4xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.5) 50%, #FFFFFF 100%)',
          backgroundSize: '200% auto',
          animation: 'shimmer 8s linear infinite',
        }}
      >
        Engineering Intelligence, Transforming Tomorrow
      </motion.h2>

      {/* Description text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.1 }}
        className="text-lg md:text-xl text-white/55 font-light text-center max-w-2xl mt-6 px-6 leading-relaxed"
      >
        I enjoy connecting with ambitious individuals, innovative teams, and forward-thinking organizations. Whether you have a vision to build, a challenge to solve, an exciting opportunity to discuss, or simply want to say hello, I'd be delighted to hear from you.
      </motion.p>

      {/* Glassmorphic Action Card */}
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        whileHover={{
          scale: 1.015,
          borderColor: 'rgba(125, 211, 252, 0.35)',
          boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        className="relative rounded-3xl border border-white/10 p-8 md:p-12 mt-12 max-w-2xl w-full mx-auto overflow-hidden bg-white/[0.01] backdrop-blur-[24px] text-center"
      >
        {/* Dynamic Glowing Border Beam SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
          <defs>
            <linearGradient id="silver-gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
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
            stroke="url(#silver-gradient-contact)"
            strokeWidth="1.5"
            className="transition-all duration-300"
            style={{
              strokeDasharray: isCardHovered ? "200 500" : "150 550",
              animation: isCardHovered ? "borderBeam 4s linear infinite" : "borderBeam 8s linear infinite",
              opacity: isCardHovered ? 0.8 : 0.4
            }}
          />
        </svg>

        <h3 className="text-3xl md:text-4xl font-medium text-white/90 tracking-tight mb-3">
          Ready to Make an Impact?
        </h3>
        <p className="text-base md:text-lg text-white/50 font-light mb-8 max-w-md mx-auto leading-relaxed">
          Let's transform bold ideas into scalable, intelligent, and meaningful solutions that create real-world value.
        </p>

        {/* Action Button */}
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=arhamrasheed32@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold text-base md:text-lg px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-colors duration-300 pointer-events-auto shadow-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Get in Touch
          <ArrowRight className="w-4.5 h-4.5" />
        </motion.a>
      </motion.div>

      {/* Connect & Follow Section */}
      <div className="mt-20 flex flex-col items-center gap-6 w-full max-w-4xl px-4">
        <p className="text-sm md:text-base font-mono tracking-[0.3em] text-[#7DD3FC]/80 uppercase">
          CONNECT & FOLLOW
        </p>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center items-center w-full mt-4">
          {[
            {
              label: 'Email',
              value: 'arhamrasheed32@gmail.com',
              link: 'https://mail.google.com/mail/?view=cm&fs=1&to=arhamrasheed32@gmail.com',
              icon: (
                <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )
            },
            {
              label: 'GitHub',
              value: 'github.com/arhamrasheed32',
              link: 'https://github.com/arhamrasheed32',
              icon: (
                <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              )
            },
            {
              label: 'LinkedIn',
              value: 'linkedin.com/in/arham-rasheed-10b5513b6',
              link: 'https://linkedin.com/in/arham-rasheed-10b5513b6',
              icon: (
                <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" rx="1" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              )
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 text-center">
              <motion.a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black pointer-events-auto shadow-xl"
              >
                {item.icon}
              </motion.a>
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono tracking-widest text-[#7DD3FC]/80 uppercase">{item.label}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base text-white/55 hover:text-white font-light mt-1.5 transition-colors pointer-events-auto break-all px-2 block max-w-[240px]"
                >
                  {item.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Closing phrase */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xl md:text-2xl font-light tracking-widest text-white/60 mt-4 text-center italic"
        >
          Let's build something extraordinary together.
        </motion.p>
      </div>

      {/* Bottom Footer Border Separator */}
      <div className="w-full border-t border-white/5 mt-24 pt-8 px-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        <p className="text-sm md:text-base text-white/35 font-light">
          © 2026 Arham Rasheed. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm md:text-base text-white/50 font-light">Available for opportunities</span>
        </div>

        <div className="flex gap-6 text-sm md:text-base text-white/35 font-light">
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </section>
  )
}
