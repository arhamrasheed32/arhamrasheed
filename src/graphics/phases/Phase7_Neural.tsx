'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NeuralGraph() {
  const nodeCount = 60
  const ref = useRef<THREE.Group>(null)

  const nodes = useMemo(() =>
    Array.from({ length: nodeCount }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 12
      ),
    })), [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <group ref={ref}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#7DD3FC' : i % 3 === 1 ? '#A78BFA' : '#2DD4BF'} />
        </mesh>
      ))}
      {nodes.map((nodeA, i) =>
        nodes.slice(i + 1, i + 4).map((nodeB, j) => {
          const mid  = nodeA.pos.clone().lerp(nodeB.pos, 0.5)
          const dir  = nodeB.pos.clone().sub(nodeA.pos)
          const len  = dir.length()
          if (len > 14) return null
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir.normalize())
          return (
            <mesh key={`${i}-${j}`} position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.01, 0.01, len, 4]} />
              <meshBasicMaterial color="#7DD3FC" transparent opacity={0.25} />
            </mesh>
          )
        })
      )}
    </group>
  )
}

// Signals racing along circular paths
function PulsingSignals() {
  const ref = useRef<THREE.Points>(null)
  const count = 120
  const positions = useMemo(() => new Float32Array(count * 3).fill(0), [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const speed = 0.3 + (i % 5) * 0.15
      const r = 4 + (i % 6) * 1.8
      const angle = (i / count) * Math.PI * 2 + t * speed
      pos[i * 3]     = r * Math.cos(angle)
      pos[i * 3 + 1] = Math.sin(angle * 3 + t * 0.6) * 5
      pos[i * 3 + 2] = r * Math.sin(angle) * 0.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFFFFF" size={0.2} transparent opacity={0.95} sizeAttenuation />
    </points>
  )
}

export function Phase7_Neural({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -60]}>
      <ambientLight intensity={0.12} color="#1E40AF" />
      <pointLight position={[0, 5, 8]}   intensity={5} color="#7DD3FC" distance={45} />
      <pointLight position={[-10, -8, 0]} intensity={3} color="#A78BFA" distance={35} />
      <pointLight position={[10, 0, -5]}  intensity={2} color="#2DD4BF" distance={30} />

      <NeuralGraph />
      <PulsingSignals />
    </group>
  )
}
