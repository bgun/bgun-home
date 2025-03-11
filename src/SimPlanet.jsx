import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, TextureLoader } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import perlinNoiseTexture from './perlinNoiseTexture'
import ParticleCloud from './particleCloud'
import './SimPlanet.css'

function Planet() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2 // Rotate 0.2 radians per second
  })

  const [noiseTexture] = useState(() => perlinNoiseTexture());
  noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirroredRepeatWrapping;

  // Generate 10 random positions on sphere surface
  const conePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 10; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      positions.push([x, y, z]);
    }
    return positions;
  }, []);

  return (
    <group ref={meshRef} rotation={[0, 0, 0]}>
      <mesh receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#556677"
          displacementMap={noiseTexture}
          map={noiseTexture}
          displacementScale={0.1}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      {conePositions.map((position, i) => (
        <mesh 
          key={i} 
          position={position}
          rotation={[
            Math.PI/2 - Math.acos(position[1]), // Pitch rotation
            Math.atan2(position[0], position[2]), // Yaw rotation
            0 // No roll needed
          ]}
        >
          <coneGeometry args={[0.1, 0.3, 8]} />
          <meshStandardMaterial color="#AA4444" />
        </mesh>
      ))}
    </group>
  )
}

function SimPlanet() {
  return (
    <div className="sim-planet">
      <Canvas shadows camera={{
        position: [0, 0, 5],
        fov: 50,
        near: 0.1,
        far: 1000
      }}>
        <OrbitControls />
        <ambientLight color="#FF0000" intensity={5} />
        <pointLight position={[10, 55, 55]} decay={0} intensity={30} castShadow shadow-mapSize-width={4096} shadow-mapSize-height={2048} />
        <Planet />
        <ParticleCloud
            rotationSpeed={0.3}
            rotationDirection={[1, 1, 1]}
            particleSize={0.01}
            cloudSize={2}
            particleCount={100}
            particleColor="#FFFFFF"
        />
        <ParticleCloud
            rotationSpeed={0.3}
            rotationDirection={[-1, -1, -1]}
            particleSize={0.01}
            cloudSize={2}
            particleCount={100}
            particleColor="#FFFFFF"
        />
      </Canvas>
    </div>
  )
}

export default SimPlanet;