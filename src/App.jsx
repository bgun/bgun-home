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
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.03, 6, 6]} castShadow receiveShadow />
      <meshStandardMaterial 
        color={color}
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
  for (let i = 0; i < 100; i++) {
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
      {/* Line between the two points */}
      {/* Connect points with lines */}
      {points.map((point, index) => {
        if (index < points.length - 2) {
          return (
            <Line 
              key={`line-${index}`}
              startPoint={point}
              midPoint={points[index + 1]}
              endPoint={points[index + 2]}
              color={`hsl(${(index / points.length) * 360}, 100%, 50%, 0.8)`} 
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
          <Bloom luminanceThreshold={0.1} intensity={2} radius={0.8} />
        </EffectComposer>
        <pointLight position={[0, 5, 0]} decay={0} intensity={5} castShadow />
        <Constellation position={[0, 0, 0]} />
      </Canvas>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ben Gundersen</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
