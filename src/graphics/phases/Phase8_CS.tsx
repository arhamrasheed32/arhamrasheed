'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Floating binary digit planes
function BinaryField() {
  const ref = useRef<THREE.Points>(null)
  const count = 500
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime * 0.4
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= 0.02
      if (pos[i * 3 + 1] < -12.5) pos[i * 3 + 1] = 12.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#06B6D4" size={0.06} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Data flow graph edges
function DataFlowGraph() {
  const ref = useRef<THREE.Group>(null)
  const nodeCount = 20

  const nodes = useMemo(() =>
    Array.from({ length: nodeCount }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8
    )), [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <group ref={ref}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.8} />
        </mesh>
      ))}
      {nodes.map((nodeA, i) =>
        nodes.slice(i + 1, i + 2).map((nodeB, j) => {
          const mid = nodeA.clone().lerp(nodeB, 0.5)
          const dir = nodeB.clone().sub(nodeA)
          const len = dir.length()
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
          return (
            <mesh key={`${i}-${j}`} position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.01, 0.01, len, 4]} />
              <meshBasicMaterial color="#22D3EE" transparent opacity={0.3} />
            </mesh>
          )
        })
      )}
    </group>
  )
}

export function Phase8_CS({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -70]}>
      <ambientLight intensity={0.1} color="#164E63" />
      <pointLight position={[0, 5, 5]} intensity={3} color="#22D3EE" distance={35} />
      <pointLight position={[-8, -5, 0]} intensity={2} color="#6366F1" distance={30} />

      <BinaryField />
      <DataFlowGraph />
    </group>
  )
}
