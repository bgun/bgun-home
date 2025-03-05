import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

// Component that creates the line between two points
function Line({ startPoint, midPoint, endPoint, color = "blue" }) {
  const points = [
    new THREE.Vector3(...startPoint),
    new THREE.Vector3(...midPoint),
    new THREE.Vector3(...endPoint)
  ]
    
  return (
    <mesh>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points, {
          closed: false,
          curveType: THREE.CatmullRomCurve3,
          tension: 0.5
        }),
        256, 0.005
      ]}/>
      <meshBasicMaterial color={color} transparent={true} opacity={0.1} />
    </mesh>
  )
}

// Component to visualize the points
function Point({ position, color = "red" }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh 
      position={position}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.03, 6, 6]} castShadow receiveShadow />
      <meshStandardMaterial 
        color={hovered ? "orange" : color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  )
}

function Constellation(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.y += (delta/5)))
  // Return view, these are regular three.js elements expressed in JSX

  const points = [];
  for (let i = 0; i < 20; i++) {
    points.push([
      Math.random() * 12 - 6, // x between -5 and 5
      Math.random() * 8 - 4, // y between -5 and 5 
      Math.random() * 12 - 6  // z between -5 and 5
    ]);
  }

  return (
    <group
      {...props}
      ref={meshRef}
    >
      {/* Stars */}
      {points.map((point, index) => (
        <Point key={index} position={point} color="#AAAAAA" />
      ))}

      {/* Connect points with lines */}
      {points.map((point, index) => {
        if (index < points.length - 2) {
          return (
            <Line 
              key={`line-${index}`}
              startPoint={point}
              midPoint={points[index + 1]}
              endPoint={points[index + 2]}
              color={`hsl(${(index / points.length) * 360}, 100%, 50%)`} 
            />
          )
        }
        return null
      })}
    </group>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas style={{height: "500px"}}>
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} intensity={5} radius={2} />
        </EffectComposer>
        <pointLight position={[0, 5, 0]} decay={0} intensity={5} castShadow />
        <Constellation position={[0, 0, 0]} />
      </Canvas>
      <h1>Benjamin Gundersen asdf</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
