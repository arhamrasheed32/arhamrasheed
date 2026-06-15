'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HelixStrand({ offset, color, opacity }: { offset: number; color: string; opacity: number }) {
  const count = 80
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => {
        const t = (i / count) * Math.PI * 5 + offset
        const x = Math.cos(t) * 2.5
        const y = (i / count) * 24 - 12
        const z = Math.sin(t) * 2.5
        const scale = 0.08 + Math.sin(i * 0.5) * 0.04
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[scale, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
        )
      })}
    </group>
  )
}

function HelixBridges({ opacity }: { opacity: number }) {
  const count = 28
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => {
        const t = (i / count) * Math.PI * 5
        const x1 = Math.cos(t) * 2.5,      z1 = Math.sin(t) * 2.5
        const x2 = Math.cos(t + Math.PI) * 2.5, z2 = Math.sin(t + Math.PI) * 2.5
        const y  = (i / count) * 24 - 12
        const mid = new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2)
        const dir = new THREE.Vector3(x2 - x1, 0, z2 - z1)
        const len = dir.length()
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
        const paired = i % 4 < 2 ? '#2DD4BF' : '#818CF8'
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.025, 0.025, len, 4]} />
            <meshBasicMaterial color={paired} transparent opacity={0.7 * opacity} />
          </mesh>
        )
      })}
    </group>
  )
}

// Particles flowing upward through the helix
function HelixParticles({ opacity }: { opacity: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 120
  const positions = new Float32Array(count * 3).fill(0)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.25
    const offset = (state.clock.elapsedTime * 0.6) % 1
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const t = ((i / count) + offset) % 1
      const angle = t * Math.PI * 5
      pos[i * 3]     = Math.cos(angle) * 2.5
      pos[i * 3 + 1] = t * 24 - 12
      pos[i * 3 + 2] = Math.sin(angle) * 2.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.2} transparent opacity={0.9 * opacity} sizeAttenuation />
    </points>
  )
}

export function Phase6_DNA({ phaseProgress }: { phaseProgress: number }) {
  const opacity = phaseProgress < 0.8
    ? 1
    : Math.max(0, 1 - (phaseProgress - 0.8) / 0.15)

  if (opacity <= 0) return null

  return (
    <group position={[0, 0, -50]}>
      <ambientLight intensity={0.15 * opacity} color="#0D9488" />
      <pointLight position={[0, 5, 5]}   intensity={5 * opacity} color="#2DD4BF" distance={40} />
      <pointLight position={[5, -5, -5]} intensity={3 * opacity} color="#818CF8" distance={30} />
      <pointLight position={[-5, 0, 5]}  intensity={2 * opacity} color="#7DD3FC" distance={25} />

      <HelixStrand offset={0}       color="#2DD4BF" opacity={opacity} />
      <HelixStrand offset={Math.PI} color="#818CF8" opacity={opacity} />
      <HelixBridges opacity={opacity} />
      <HelixParticles opacity={opacity} />
    </group>
  )
}
