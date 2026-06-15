import { create } from 'zustand'

interface JourneyState {
  scrollProgress: number // 0 → 1
  phase: number          // 0 → 10
  cameraZ: number
  setScrollProgress: (p: number) => void
}

export const PHASE_RANGES = [
  { start: 0.0,  end: 0.18 }, // Phase 0: Arham Rasheed
  { start: 0.18, end: 0.36 }, // Phase 1: Entering the Core
  { start: 0.36, end: 0.54 }, // Phase 2: Cosmic Origin
  { start: 0.54, end: 0.70 }, // Phase 3: The Big Bang
  { start: 0.70, end: 1.00 }, // Phase 4: DNA (longer stage, 30% of scroll)
]

export const TOTAL_PHASES = PHASE_RANGES.length
export const PHASE_DURATION = 1 / TOTAL_PHASES

// Camera Z positions for each phase milestone
export const PHASE_CAMERA_Z = [12, 5, -5, -18, -28]

export const useJourneyStore = create<JourneyState>((set) => ({
  scrollProgress: 0,
  phase: 0,
  cameraZ: 12,
  setScrollProgress: (p) => {
    const phase = PHASE_RANGES.findIndex((r) => p >= r.start && p <= r.end)
    const activePhase = phase === -1 ? PHASE_RANGES.length - 1 : phase
    const cameraZ = PHASE_CAMERA_Z[activePhase]
    set({ scrollProgress: p, phase: activePhase, cameraZ })
  },
}))
