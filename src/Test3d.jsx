import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, TextureLoader } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import perlinNoiseTexture from './perlinNoiseTexture'
import ParticleCloud from './particleCloud'
import './Test3d.css'
import { Physics, usePlane, useBox, useHeightfield } from '@react-three/cannon'

function Box(props) {
  const [ref] = useBox(() => ({ 
    mass: 1,
    position: [props.position[0], props.position[1], props.position[2]],
    rotation: [props.rotation[0], props.rotation[1], props.rotation[2]],
    ...props
  }))

  return (
    <mesh
      ref={ref}
      castShadow
      {...props}
    >
      <boxGeometry args={[props.size, props.size, props.size]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

function Terrain(props) {
  const size = 100 // Size of the terrain plane
  const segments = 99 // Number of segments (must be size-1 for physics)
  const heightScale = 25 // Scale factor for height values
  const [heights, setHeights] = useState(Array(size).fill().map(() => Array(size).fill(0)))
  const heightMap = useLoader(TextureLoader, 'heightmap.png')

  useEffect(() => {
    // Create temporary canvas to read heightmap data
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    ctx.drawImage(heightMap.image, 0, 0, size, size)
    const imageData = ctx.getImageData(0, 0, size, size)

    // Convert heightmap data to height values
    const newHeights = Array(size).fill().map((_, i) => 
      Array(size).fill().map((_, j) => {
        const idx = (i * size + j) * 4
        return (imageData.data[idx] / 255) * heightScale
      })
    )
    setHeights(newHeights)
  }, [heightMap])

  // Create physics body - centered at origin
  const [ref] = useHeightfield(() => ({
    args: [heights, { elementSize: 1 }],
    position: [0, -2, 0], // Centered at origin
    rotation: [-Math.PI / 2, 0, 0]
  }))

  // Create visual geometry
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
  const vertices = geometry.attributes.position.array
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      vertices[(i * size + j) * 3 + 2] = heights[i][j]
    }
  }
  geometry.computeVertexNormals()

  return (
    <mesh ref={ref} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial 
        color="#556677"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

function Test3d() {
  return (
    <div className="test3d">
      <Canvas shadows camera={{
          position: [0, 1, 10],
          fov: 45,
          near: 0.1,
          far: 1000
        }}>
        <OrbitControls />
        <Physics>
          <ambientLight color="#FF0000" intensity={2} />
          <pointLight position={[10, 55, 55]} decay={0} intensity={20} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          {Array.from({ length: 20 }).map((_, i) => {
            const size = 0.5 + Math.random() * 1.5;
            const x = (Math.random() - 0.5) * 8;
            const y = Math.random() * 6 + 100; // Raised initial height for better physics effect
            const z = (Math.random() - 0.5) * 8;
            const rotX = Math.random() * Math.PI;
            const rotY = Math.random() * Math.PI;
            const rotZ = Math.random() * Math.PI;
            return (
              <Box
                key={i}
                size={size}
                position={[x, y, z]}
                rotation={[rotX, rotY, rotZ]}
                color={`hsl(${Math.random() * 60}, 70%, 50%)`}
              />
            );
          })}
          <Terrain />
        </Physics>
        <EffectComposer>
            <Bloom
                intensity={1.5}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
                height={300}
            />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default Test3d;
