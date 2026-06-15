'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function NebulaCloud({ position, color, radius = 6, opacity = 0.05 }: { position: [number,number,number], color: string, radius?: number, opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.1
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  )
}

function CosmicDustField() {
  const ref = useRef<THREE.Points>(null)
  const count = 800
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 28
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.006
    ref.current.rotation.z = state.clock.elapsedTime * 0.003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#A78BFA" size={0.09} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function Phase3_CosmicOrigin({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -20]}>
      {/* Rich layered nebula volumes */}
      <NebulaCloud position={[0, 0, 0]}    color="#0E2A4A" radius={22} opacity={0.12} />
      <NebulaCloud position={[0, 0, 0]}    color="#1E0A3C" radius={16} opacity={0.1}  />
      <NebulaCloud position={[8, -4, -5]}  color="#0A3040" radius={12} opacity={0.08} />
      <NebulaCloud position={[-6, 5, -8]}  color="#2D1B69" radius={10} opacity={0.07} />
      <NebulaCloud position={[3, -6, 3]}   color="#0C4A6E" radius={8}  opacity={0.09} />

      {/* Vivid volumetric light sources */}
      <pointLight position={[0, 4, 4]}    intensity={4}  color="#06B6D4" distance={45} />
      <pointLight position={[10, 0, -10]} intensity={3}  color="#7C3AED" distance={35} />
      <pointLight position={[-8, -4, 5]}  intensity={2}  color="#0EA5E9" distance={30} />
      <ambientLight intensity={0.05} color="#1E3A5F" />

      <CosmicDustField />

      {/* Multi-color particle layers */}
      <Sparkles count={500} scale={40} size={5} speed={0.04} opacity={0.35} color="#7DD3FC" />
      <Sparkles count={300} scale={28} size={7} speed={0.03} opacity={0.25} color="#A78BFA" />
      <Sparkles count={150} scale={18} size={9} speed={0.06} opacity={0.2}  color="#2DD4BF" />
    </group>
  )
}
