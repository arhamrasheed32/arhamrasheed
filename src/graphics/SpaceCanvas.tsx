"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Sparkles, Float, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function MassiveCore() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      // Medium speed rotation for the core
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0, -5]}>
      <mesh ref={ref}>
        {/* Massive central object */}
        <icosahedronGeometry args={[4, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1.5}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#0A0D12"
          transmission={1}
          opacity={1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function ShootingStar({ color = "#ffffff", zLayer }: { color?: string, zLayer: number }) {
  const ref = useRef<THREE.Mesh>(null)

  // Z layer goes from 0 (closest) to 1 (furthest)
  const zPos = -10 - (zLayer * 30)

  // Parallax speed: Closer stars (zLayer ~0) move faster
  const baseSpeed = (1 - zLayer) * 2 + 0.5

  const startPos = useRef(new THREE.Vector3(
    10 + Math.random() * 30,
    10 + Math.random() * 30,
    zPos
  ))
  const speed = useRef(baseSpeed + Math.random() * 0.5)
  // Higher delay = less frequent
  const delay = useRef(Math.random() * 15)

  useFrame((state) => {
    if (ref.current) {
      if (state.clock.elapsedTime > delay.current) {
        // Smooth linear movement
        ref.current.position.x -= speed.current
        ref.current.position.y -= speed.current * 0.5
        ref.current.position.z += speed.current * 0.2 // Slight depth approach

        // Reset when out of bounds
        if (ref.current.position.x < -40 || ref.current.position.y < -40) {
          ref.current.position.copy(startPos.current)
          delay.current = state.clock.elapsedTime + 5 + Math.random() * 15
        }
      }
    }
  })

  // Align the cylinder to the direction of travel
  const dir = new THREE.Vector3(-1, -0.5, 0.2).normalize()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)

  // Softness/Blur: Further stars are thicker but less opaque to simulate out-of-focus blur
  const thickness = 0.01 + zLayer * 0.03
  const opacity = 0.8 - zLayer * 0.6
  // Closer stars stretch longer due to speed
  const length = 4 + (1 - zLayer) * 8

  return (
    <mesh ref={ref} position={startPos.current} quaternion={quaternion}>
      <cylinderGeometry args={[thickness, thickness, length, 4]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

function ShootingStarsSystem() {
  const starsCount = 4
  const stars = useRef(Array.from({ length: starsCount }))
  return (
    <>
      {stars.current.map((_, i) => (
        <ShootingStar
          key={i}
          color={i % 2 === 0 ? "#7DD3FC" : "#ffffff"}
          zLayer={i / (starsCount - 1)}
        />
      ))}
    </>
  )
}


function RotatingCosmos({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
      ref.current.rotation.x = state.clock.elapsedTime * 0.005
    }
  })
  return <group ref={ref}>{children}</group>
}

function Scene() {
  return (
    <>
      {/* Layer 1: Far Universe with subtle volumetric fog */}
      <color attach="background" args={['#020305']} />
      <fogExp2 attach="fog" args={['#020305', 0.025]} />

      {/* Lighting: Soft glow, Blue ambient, Purple rim */}
      <ambientLight intensity={0.1} color="#ffffff" />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} color="#7DD3FC" />
      {/* Harsh purple rim light from the back right */}
      <spotLight position={[10, 5, -15]} intensity={100} distance={50} angle={0.5} penumbra={1} color="#A78BFA" />

      {/* Layer 2 & 3: Rotating Cosmic Background */}
      <RotatingCosmos>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={300} scale={30} size={3} speed={0.1} opacity={0.1} color="#7DD3FC" />
      </RotatingCosmos>

      {/* Layer 3.5: Parallax Shooting Stars */}
      <ShootingStarsSystem />

      {/* Layer 4: Hero Object */}
      <MassiveCore />

      <Environment preset="city" />
    </>
  )
}

export function SpaceCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  )
}
