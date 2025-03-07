import React, { useRef, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'
import perlinNoiseTexture from './perlinNoiseTexture'
import ParticleCloud from './particleCloud'


const NUM_PLANETS = 20;
const PLANETS = [];
for (let i = 0; i < NUM_PLANETS; i++) {
  PLANETS.push({
    position: [
      Math.random() * 12 - 6, // x between -5 and 5
      Math.random() * 10 - 5, // y between -5 and 5 
      Math.random() * 10 - 5  // z between -5 and 5
    ],
    size: Math.random() * 0.15 + 0.05
  });
}

let zoomPosition = 3;

// Component that creates the line between two points
function Line({ startPoint, midPoint, endPoint, color = "blue" }) {
  const points = [
    new THREE.Vector3(...startPoint),
    new THREE.Vector3(...midPoint),
    new THREE.Vector3(...endPoint)
  ]
  const tubeSegments = 256;
  const tubeRadius = 0.001;
  const opacity = 0.5;
   
  return (
    <mesh>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points, {
          closed: true,
          curveType: THREE.CatmullRomCurve3,
          tension: 0.9
        }),
        tubeSegments,
        tubeRadius
      ]}/>
      <meshBasicMaterial color={color} transparent={true} opacity={opacity} />
    </mesh>
  )
}

// Component to visualize the points
function Point({ position, color = "red", size = 0.1, handlePointClick }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Create perlin noise texture
  const [noiseTexture] = useState(() => perlinNoiseTexture());
  noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirrorWrapping;

  if (hovered) {
    size *= 1.2;
    color = "orange";
  } else if (active) {
    size *= 1.25;
    color = "orange";
  }

  return (
    <mesh 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => {
        setActive(!active)
        handlePointClick(active)
      }}
    >
      <sphereGeometry
        args={[size, 32, 32]}
      />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={active ? 1 : 0}
        transparent={true}
        opacity={1}
        map={noiseTexture}
        bumpMap={noiseTexture}
        bumpScale={0.05}
        roughness={0.8}
        metalness={0.2}
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

  return (
    <group
      {...props}
      ref={meshRef}
    >
      {/* Stars */}
      {PLANETS.map((p, index) => (
        <Point key={index} position={p.position} color="#AAAAAA" size={p.size} handlePointClick={props.handlePointClick} />
      ))}

      {/* Connect points with lines */}
      {PLANETS.map((p, index) => {
        if (index < PLANETS.length - 2) {
          return (
            <Line 
              key={`line-${index}`}
              startPoint={PLANETS[index].position}
              midPoint={PLANETS[index + 1].position}
              endPoint={PLANETS[index + 2].position}
              color={`hsl(${(index / PLANETS.length) * 360}, 100%, 50%)`} 
            />
          )
        }
        return null
      })}
    </group>
  )
}

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const handlePointClick = (isActive) => {
    setCurrentScore(prev => isActive ? prev - 1 : prev + 1)
  }

  const [particleCloudProps, setParticleCloudProps] = useState({
    green: {
      rotationSpeed: 0.1,
      rotationDirection: [1, 1, 1],
      particleSize: 0.01,
      cloudSize: 4,
      particleCount: 100,
      particleColor: "#00CCAA"
    },
    white: {
      rotationSpeed: 0.1,
      rotationDirection: [-1, -1, -1],
      particleSize: 0.012,
      cloudSize: 5,
      particleCount: 300,
      particleColor: "#FFFFFF"
    },
    red: {
      rotationSpeed: 0.1,
      rotationDirection: [1, 1, 1],
      particleSize: 0.008,
      cloudSize: 4,
      particleCount: 200,
      particleColor: "#FFAA00"
    }
  })

  // Create a new camera controller component
  function CameraController() {
    const { camera } = useThree()  // Get the camera from Three.js context
    
    useFrame((state, delta) => {
      // Slowly increase z position (zooming out)
      camera.position.z += delta * 0.1;
      // Optional: limit how far it can zoom out
      if (camera.position.z > 6) {
        camera.position.z = 6
      }
    })

    return null  // This component doesn't render anything
  }

  return (
    <>
      <Canvas
        className="canvas"
        style={{position: "absolute", top: 0, width: "100%", height: "90%"}}
        camera={{
          position: [0, 0, 3],
          fov: 55,
          near: 0.1,
          far: 1000
        }}
      >
        <CameraController />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
        <ambientLight color="#00AAFF" intensity={0.7} />
        <pointLight position={[10, 5, 5]} decay={0} intensity={20} castShadow />
        <Constellation position={[0, 0, 0]} handlePointClick={handlePointClick} />
        <ParticleCloud {...particleCloudProps.green} />
        <ParticleCloud {...particleCloudProps.white} />
        <ParticleCloud {...particleCloudProps.red} />
      </Canvas>

      <h1 className="title">
        <span className="title-name">Ben Gundersen</span>
        <span className="title-subtitle fade1">Engineering Manager</span>
        <span className="title-subtitle fade2">Engineering Manager</span>
        <span className="title-subtitle fade3">Engineering Manager</span>
      </h1>

      { currentScore > 0 && <h2 className="score">{ currentScore } / { NUM_PLANETS }</h2> }
      { currentScore == NUM_PLANETS && (
        <div className="a-winner-is-you">
          <h2>+1 dopamine for you!</h2>
          <button onClick={() => setCurrentScore(0)} className="close-button">Yay!</button>
        </div>
      )}

      <div className="content-container">
      { /*}
        <div className="content">
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
        </div>
              */}
        <footer>
          <div className="footer-links">            
            <a href="https://bgun.github.io"><img src="/github.svg" alt="github" /></a>
          </div>
          <div className="footer-info">
            <a href="tel:+19187607778">918-760-7778</a><br />
            <a href="mailto:ben@bengundersen.com">ben@bengundersen.com</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
