'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Stretched star streaks as camera accelerates into the crystal
function StarStreaks({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60
      arr[i * 3 + 2] = -5 - Math.random() * 30
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7DD3FC" size={0.05} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function Phase2_EnteringCore({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -10]}>
      {/* Intensifying glass reflections */}
      <ambientLight intensity={0.2 + phaseProgress * 0.4} />
      <pointLight position={[0, 0, -5]} intensity={phaseProgress * 3} color="#7DD3FC" distance={20} />
      <pointLight position={[0, 0, -5]} intensity={phaseProgress * 2} color="#A78BFA" distance={20} />
      <StarStreaks />
      {/* Volumetric inner glow sphere */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#7DD3FC" transparent opacity={phaseProgress * 0.15} side={THREE.BackSide} />
      </mesh>
      <Sparkles count={200} scale={20} size={5} speed={0.3} opacity={phaseProgress * 0.4} color="#A78BFA" />
    </group>
  )
}
