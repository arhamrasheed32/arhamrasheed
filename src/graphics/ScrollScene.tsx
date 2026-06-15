'use client'
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useJourneyStore, PHASE_CAMERA_Z, TOTAL_PHASES, PHASE_RANGES } from '@/store/useJourneyStore'
import { Phase1_Present } from './phases/Phase1_Present'
import { Phase2_EnteringCore } from './phases/Phase2_EnteringCore'
import { Phase3_CosmicOrigin } from './phases/Phase3_CosmicOrigin'
import { Phase4_BigBang } from './phases/Phase4_BigBang'
import { Phase6_DNA } from './phases/Phase6_DNA'

// Smooth camera spline through all phase z-positions
const SPLINE_POINTS = PHASE_CAMERA_Z.map((z, i) => new THREE.Vector3(0, 0, z))
const cameraCurve = new THREE.CatmullRomCurve3(SPLINE_POINTS)

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function phaseLocalProgress(globalProgress: number, phaseIndex: number) {
  const range = PHASE_RANGES[phaseIndex]
  if (!range) return 0
  return Math.max(0, Math.min(1, (globalProgress - range.start) / (range.end - range.start)))
}

function CinematicCamera() {
  const { camera } = useThree()
  const scrollProgress = useJourneyStore((s) => s.scrollProgress)
  const currentCamZ = useRef(12)

  useFrame(() => {
    // Smooth lerp to target position on the spline
    const target = cameraCurve.getPoint(scrollProgress)
    currentCamZ.current = lerp(currentCamZ.current, target.z, 0.12)
    camera.position.set(0, 0, currentCamZ.current)

    // Slight forward lean — camera tilts very softly with scroll velocity
    camera.rotation.set(0, 0, 0)
    camera.lookAt(0, 0, currentCamZ.current - 10)
  })

  return null
}


function JourneyScene() {
  const scrollProgress = useJourneyStore((s) => s.scrollProgress)

  const p = (phaseIdx: number) => phaseLocalProgress(scrollProgress, phaseIdx)

  return (
    <>
      <color attach="background" args={['#020305']} />
      <fogExp2 attach="fog" args={['#020305', 0.015]} />

      <CinematicCamera />

      {/* Global Starfield and Cosmos Sparkles visible from start to finish */}
      <Stars radius={150} depth={70} count={4000} factor={6} saturation={0} fade speed={0.4} />
      <Sparkles count={350} scale={45} size={3} speed={0.12} opacity={0.15} color="#7DD3FC" />

      {/* Only first 5 phases exist simultaneously in world-space; camera travels to each */}
      <Phase1_Present phaseProgress={p(0)} />
      <Phase2_EnteringCore phaseProgress={p(1)} />
      <Phase3_CosmicOrigin phaseProgress={p(2)} />
      <Phase4_BigBang phaseProgress={p(3)} />
      <Phase6_DNA phaseProgress={p(4)} />

      <Environment preset="city" />
    </>
  )
}

export function ScrollScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <JourneyScene />
      </Canvas>
    </div>
  )
}
