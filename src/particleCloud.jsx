import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function ParticleCloud({
    rotationSpeed = 0.1,
    rotationDirection = [1, 1, 1],
    particleSize = 0.2,
    cloudSize = 4,
    particleCount = 100,
    particleColor = "#FFFFFF",
    widthSegments = 1,
    heightSegments = 1,
    particleOpacity = 1,
    emissiveIntensity = 0.5
  }) {
    const meshRef = useRef()
    const [particles] = useState(() => {
      const temp = []
      const radius = cloudSize
      for (let i = 0; i < particleCount; i++) {
        // Create particles in a rough sphere shape
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos(2 * Math.random() - 1)
        const r = radius * Math.cbrt(Math.random()) // Cube root for more uniform distribution
        
        temp.push({
          position: [
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          ],
          size: Math.random() * particleSize + (particleSize / 2)
        })
      }
      return temp
    })
  
    useFrame((state, delta) => {
      meshRef.current.rotation.x += delta * rotationSpeed * rotationDirection[0]
      meshRef.current.rotation.y += delta * rotationSpeed * rotationDirection[1]
      meshRef.current.rotation.z += delta * rotationSpeed * rotationDirection[2]
    })
  
    return (
      <group ref={meshRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.size, widthSegments, heightSegments]} />
            <meshStandardMaterial
              color={particleColor}
              transparent
              opacity={particleOpacity}
              emissive={particleColor}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
        ))}
      </group>
    )
  }

export default ParticleCloud