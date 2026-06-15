'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ExplosionParticles({ phaseProgress }: { phaseProgress: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 3500

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#E0F2FE'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#FCD34D'),
      new THREE.Color('#A78BFA'),
    ]
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 0.3 + Math.random() * 2.2
      velocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta)
      velocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta)
      velocities[i * 3 + 2] = speed * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }
    return { positions, velocities, colors }
  }, [])

  const lastProgress = useRef(-1)
  useFrame(() => {
    if (!ref.current) return
    if (phaseProgress === lastProgress.current) return
    lastProgress.current = phaseProgress
    
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const spread = phaseProgress * 18
      pos[i * 3]     = velocities[i * 3] * spread
      pos[i * 3 + 1] = velocities[i * 3 + 1] * spread
      pos[i * 3 + 2] = velocities[i * 3 + 2] * spread
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.06} transparent opacity={0.95} sizeAttenuation />
    </points>
  )
}

function ShockwaveRing({ phaseProgress, color, tilt = 0 }: { phaseProgress: number, color: string, tilt?: number }) {
  const scale = phaseProgress * 28
  const opacity = Math.max(0, 0.6 - phaseProgress * 0.6)
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <ringGeometry args={[scale * 0.92, scale, 96]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

export function Phase4_BigBang({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -30]}>
      {/* Singularity core — intense glow */}
      <pointLight position={[0, 0, 0]} intensity={15 + phaseProgress * 80} color="#FFFFFF" distance={35} />
      <pointLight position={[0, 0, 0]} intensity={8 + phaseProgress * 30} color="#06B6D4" distance={60} />
      <pointLight position={[0, 0, 0]} intensity={5 + phaseProgress * 20} color="#FCD34D" distance={50} />

      {/* Singularity point */}
      <mesh>
        <sphereGeometry args={[Math.max(0.03, 0.5 - phaseProgress * 0.47), 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Multi-color particles */}
      <ExplosionParticles phaseProgress={phaseProgress} />

      {/* Three layered shockwave rings */}
      <ShockwaveRing phaseProgress={phaseProgress} color="#06B6D4" tilt={0} />
      <ShockwaveRing phaseProgress={phaseProgress} color="#A78BFA" tilt={0.5} />
      <ShockwaveRing phaseProgress={phaseProgress} color="#FCD34D" tilt={-0.4} />
    </group>
  )
}
