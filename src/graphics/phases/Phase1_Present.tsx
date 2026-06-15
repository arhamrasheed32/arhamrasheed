'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CrystalCore({ transparency }: { transparency: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.05
    ref.current.rotation.y = state.clock.elapsedTime * 0.1
  })
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0, 0]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[4, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1.5}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#0A0D12"
          transmission={1}
          opacity={1 - transparency}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          ior={1.2}
        />
      </mesh>
    </Float>
  )
}

export function Phase1_Present({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, 0]}>
      <CrystalCore transparency={phaseProgress * 0.8} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} color="#7DD3FC" />
      <spotLight position={[10, 5, -15]} intensity={100} distance={50} angle={0.5} penumbra={1} color="#A78BFA" />
    </group>
  )
}
