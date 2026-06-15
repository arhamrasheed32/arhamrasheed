'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Floating microservice node
function ServiceNode({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <Float speed={1 + Math.random()} floatIntensity={0.3} position={position}>
      <mesh>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

// Connection lines between services
function ApiConnections({ nodes }: { nodes: [number, number, number][] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <group ref={ref}>
      {nodes.map((nodeA, i) =>
        nodes.slice(i + 1, i + 3).map((nodeB, j) => {
          const a = new THREE.Vector3(...nodeA)
          const b = new THREE.Vector3(...nodeB)
          const mid = a.clone().lerp(b, 0.5)
          const dir = b.clone().sub(a)
          const len = dir.length()
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
          return (
            <mesh key={`${i}-${j}`} position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.008, 0.008, len, 4]} />
              <meshBasicMaterial color="#7DD3FC" transparent opacity={0.25} />
            </mesh>
          )
        })
      )}
    </group>
  )
}

export function Phase9_SWE({ phaseProgress }: { phaseProgress: number }) {
  const serviceNodes: [number, number, number][] = useMemo(() => [
    [0, 0, 0], [5, 3, -2], [-5, 2, -1], [3, -4, 2], [-3, -3, -3],
    [7, -1, 1], [-6, -2, 2], [1, 5, -3], [-1, -5, 2], [4, 4, 1]
  ], [])

  const colors = ['#7DD3FC', '#A78BFA', '#38BDF8', '#818CF8', '#7DD3FC']

  return (
    <group position={[0, 0, -80]}>
      <ambientLight intensity={0.1} color="#1E3A5F" />
      <pointLight position={[0, 0, 8]} intensity={3} color="#7DD3FC" distance={35} />
      <pointLight position={[10, -5, -5]} intensity={2} color="#A78BFA" distance={30} />

      {serviceNodes.map((pos, i) => (
        <ServiceNode key={i} position={pos} color={colors[i % colors.length]} />
      ))}
      <ApiConnections nodes={serviceNodes} />
    </group>
  )
}
