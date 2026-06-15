'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const PROJECTS = [
  { name: 'Project Alpha',   color: '#7DD3FC', radius: 1.8, orbitR: 9,  speed: 0.28 },
  { name: 'Project Beta',    color: '#A78BFA', radius: 1.4, orbitR: 14, speed: 0.18 },
  { name: 'Project Gamma',   color: '#2DD4BF', radius: 1.6, orbitR: 7,  speed: 0.38 },
  { name: 'Project Delta',   color: '#818CF8', radius: 1.2, orbitR: 18, speed: 0.13 },
  { name: 'Project Epsilon', color: '#38BDF8', radius: 1.5, orbitR: 11, speed: 0.23 },
]

function ProjectPlanet({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const ref = useRef<THREE.Group>(null)
  const startAngle = (index / PROJECTS.length) * Math.PI * 2

  useFrame((state) => {
    if (!ref.current) return
    const angle = startAngle + state.clock.elapsedTime * project.speed
    ref.current.position.x = Math.cos(angle) * project.orbitR
    ref.current.position.z = Math.sin(angle) * project.orbitR
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25 + index) * 2
  })

  return (
    <group ref={ref}>
      {/* Planet core */}
      <mesh>
        <sphereGeometry args={[project.radius, 28, 28]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.9} />
      </mesh>
      {/* Thick atmosphere glow */}
      <mesh>
        <sphereGeometry args={[project.radius * 1.4, 24, 24]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[project.radius * 1.9, 24, 24]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      {/* Saturn-like ring */}
      <mesh rotation={[Math.PI / 2 + 0.4, 0, index * 0.6]}>
        <ringGeometry args={[project.radius * 1.7, project.radius * 2.2, 48]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function OrbitPaths() {
  return (
    <>
      {PROJECTS.map((p, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[p.orbitR - 0.03, p.orbitR + 0.03, 128]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </>
  )
}

export function Phase11_Projects({ phaseProgress }: { phaseProgress: number }) {
  return (
    <group position={[0, 0, -100]}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={6}  color="#FFFFFF" distance={70} />
      <pointLight position={[0, 0, 0]} intensity={4}  color="#7DD3FC" distance={90} />
      <pointLight position={[15, 10, -10]} intensity={2} color="#A78BFA" distance={60} />

      <OrbitPaths />
      {PROJECTS.map((project, i) => (
        <ProjectPlanet key={i} project={project} index={i} />
      ))}
    </group>
  )
}
