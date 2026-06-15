'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useJourneyStore } from '@/store/useJourneyStore'

const PHASE_LABELS = [
  { index: 0,  title: 'Arham Rasheed',           sub: 'Computer Science Engineer',              accent: '#7DD3FC' },
  { index: 1,  title: 'Entering the Core',        sub: 'Crossing the threshold',                 accent: '#A78BFA' },
  { index: 2,  title: 'Cosmic Origin',            sub: '13.8 billion years ago',                 accent: '#06B6D4' },
  { index: 3,  title: 'The Big Bang',             sub: 'A singularity. Everything from nothing.', accent: '#FCD34D' },
  { index: 4,  title: 'DNA',                      sub: 'The first code ever written',            accent: '#2DD4BF' },
]

export function PhaseOverlay() {
  const phase = useJourneyStore((s) => s.phase)
  const scrollProgress = useJourneyStore((s) => s.scrollProgress)
  const label = PHASE_LABELS[phase]

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">

      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: (phase + 1) / PHASE_LABELS.length,
            background: `linear-gradient(to right, ${label?.accent}, #A78BFA)`,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>



      {/* Center-bottom scroll cue (phase 0 only) */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase font-mono">Scroll to explore</p>
            <motion.div
              animate={{ scaleY: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent origin-top"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right phase count */}
      <div className="absolute bottom-8 right-10">
        <p className="text-[10px] font-mono tracking-widest text-white/20">
          {String(phase + 1).padStart(2, '0')} / {String(PHASE_LABELS.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
