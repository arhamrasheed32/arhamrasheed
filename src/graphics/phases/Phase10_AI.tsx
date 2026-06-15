'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Massive pulsing neural network mesh
function NeuralMesh() {
  const ref = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const count = 300

  const { positions, linePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    // Arrange nodes on a sphere
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 8 + Math.random() * 4
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    // Connect nearby nodes
    const lineList: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < Math.min(i + 4, count); j++) {
        const dx = positions[i*3] - positions[j*3]
        const dy = positions[i*3+1] - positions[j*3+1]
        const dz = positions[i*3+2] - positions[j*3+2]
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < 6) {
          lineList.push(positions[i*3], positions[i*3+1], positions[i*3+2])
          lineList.push(positions[j*3], positions[j*3+1], positions[j*3+2])
        }
      }
    }
    return { positions, linePositions: new Float32Array(lineList) }
  }, [])

  useFrame((state) => {
    if (!ref.current || !linesRef.current) return
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    ref.current.scale.setScalar(scale)
    linesRef.current.scale.setScalar(scale)
    ref.current.rotation.y = state.clock.elapsedTime * 0.06
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.06
  })

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#A78BFA" size={0.12} transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7DD3FC" transparent opacity={0.15} />
      </lineSegments>
    </>
  )
}

export function Phase10_AI({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -90]}>
      <ambientLight intensity={0.1} color="#2E1065" />
      <pointLight position={[0, 0, 10]} intensity={4} color="#A78BFA" distance={50} />
      <pointLight position={[15, 10, -10]} intensity={2} color="#7DD3FC" distance={40} />
      <pointLight position={[-15, -10, -10]} intensity={2} color="#C4B5FD" distance={40} />

      <NeuralMesh />

      {/* Pulsing core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.3 + Math.sin(Date.now() * 0.001) * 0.1} />
      </mesh>
    </group>
  )
}
