'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Particles that self-organize from chaos to clusters
function OrganizingParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 800

  const { chaosPos, orderPos } = useMemo(() => {
    const chaosPos = new Float32Array(count * 3)
    const orderPos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Start: chaotic random spread
      chaosPos[i * 3] = (Math.random() - 0.5) * 30
      chaosPos[i * 3 + 1] = (Math.random() - 0.5) * 30
      chaosPos[i * 3 + 2] = (Math.random() - 0.5) * 30
      // End: organized clusters around key points
      const cluster = Math.floor(Math.random() * 6)
      const clusterCenters = [[0,0,0],[4,2,-3],[-4,3,2],[2,-4,1],[-2,-3,-2],[5,-2,3]]
      const c = clusterCenters[cluster]
      orderPos[i * 3] = c[0] + (Math.random() - 0.5) * 3
      orderPos[i * 3 + 1] = c[1] + (Math.random() - 0.5) * 3
      orderPos[i * 3 + 2] = c[2] + (Math.random() - 0.5) * 3
    }
    return { chaosPos, orderPos }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = (Math.sin(state.clock.elapsedTime * 0.3) * 0.5 + 0.5)
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count * 3; i++) {
      pos[i] = chaosPos[i] * (1 - t) + orderPos[i] * t
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[chaosPos, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#F59E0B" size={0.08} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export function Phase5_Matter({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -40]}>
      <ambientLight intensity={0.15} color="#F59E0B" />
      <pointLight position={[0, 5, 0]} intensity={3} color="#FCD34D" distance={30} />
      <pointLight position={[-5, -3, 5]} intensity={2} color="#ffffff" distance={20} />

      <OrganizingParticles />

      {/* Atom-like orbital rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * Math.PI / 3, i * Math.PI / 4, 0]}>
          <torusGeometry args={[2 + i * 0.8, 0.01, 8, 64]} />
          <meshBasicMaterial color="#FCD34D" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}
