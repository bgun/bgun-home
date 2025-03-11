import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import perlinNoiseTexture from './perlinNoiseTexture'
import ParticleCloud from './particleCloud'
import './ConstellationGame.css'

const NUM_PLANETS = 20;
const PLANETS = [];
for (let i = 0; i < NUM_PLANETS; i++) {
  PLANETS.push({
    position: [
      Math.random() * 12 - 6, // x between -5 and 5
      Math.random() * 6 - 3, // y between -5 and 5 
      Math.random() * 6 - 3  // z between -5 and 5
    ],
    size: Math.random() * 0.15 + 0.05
  });
}

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
    color = "cyan";
  }

  return (
    <mesh 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={(e) => {
        e.stopPropagation();
        setActive(!active);
        handlePointClick(active);
      }}
    >
      <sphereGeometry
        args={[size, 32, 32]}
      />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={active ? 0.5 : 0}
        transparent={true}
        opacity={1}
        map={noiseTexture}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

// Create a new camera controller component
function CameraController() {
  const { camera } = useThree()  // Get the camera from Three.js context
  useFrame((state, delta) => {
    // Slowly increase z position (zooming out)
    camera.position.z += delta * 0.1;
    // Optional: limit how far it can zoom out
    if (camera.position.z > 15) {
      camera.position.z = 15
    }
  })
  return null  // This component doesn't render anything
}

function Sun() {
  const [noiseTexture] = useState(() => perlinNoiseTexture([255, 100, 0], [255, 255, 100]));
  noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirrorWrapping;

  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 0.5)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={2 + Math.sin(Date.now() / 50)} // Oscillates between 1 and 3
        emissiveMap={noiseTexture}
        toneMapped={false}
        map={noiseTexture}
      />
      <pointLight position={[0, 0, 0]} decay={0} intensity={7} castShadow color="#FFAA00" />
    </mesh>
  )
}

function Planets(props) {    
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
              color={"#336699"}
            />
          )
        }
        return null
      })}
    </group>
  )
}

function ConstellationGame() {

  const [currentScore, setCurrentScore] = useState(0)
  const handlePointClick = (isActive) => {
    setCurrentScore(prev => isActive ? prev - 1 : prev + 1)
  }

  const [particleCloudProps, setParticleCloudProps] = useState({
    green: {
      rotationSpeed: 0.1,
      rotationDirection: [1, 1, 1],
      particleSize: 0.01,
      cloudSize: 6,
      particleCount: 100,
      particleColor: "#00CCAA"
    },
    white: {
      rotationSpeed: 0.1,
      rotationDirection: [-1, -1, -1],
      particleSize: 0.012,
      cloudSize: 8,
      particleCount: 300,
      particleColor: "#FFFFFF"
    },
    red: {
      rotationSpeed: 0.1,
      rotationDirection: [1, 1, 1],
      particleSize: 0.008,
      cloudSize: 5,
      particleCount: 200,
      particleColor: "#FFAA00"
    },
    yellow: {
      rotationSpeed: 0.3,
      rotationDirection: [-1, -1, -1],
      particleSize: 0.15,
      cloudSize: 0.35,
      particleCount: 500,
      particleColor: "#FFFF00",
      widthSegments: 5,
      heightSegments: 5,
      particleOpacity: 0.3
    }
  })

  return (
    <div className="constellation-game">
      <Canvas
        className="canvas"
        style={{position: "absolute", top: 0, width: "100%", height: "90%"}}
        camera={{
          position: [0, 0, 8],
          fov: 25,
          near: 0.1,
          far: 1000
        }}
      >
        <CameraController />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
        <ambientLight color="#00AAFF" intensity={0.7} />
        <Sun />
        <Planets position={[0, 0, 0]} handlePointClick={handlePointClick} />
        <ParticleCloud {...particleCloudProps.green} />
        <ParticleCloud {...particleCloudProps.white} />
        <ParticleCloud {...particleCloudProps.red} />
        <ParticleCloud {...particleCloudProps.yellow} />
      </Canvas>
      {currentScore > 0 && <h2 className="score">{currentScore} / {NUM_PLANETS}</h2>}
      {currentScore >= NUM_PLANETS && (
        <div className="a-winner-is-you">
          <h2>+1 dopamine for you!</h2>
          <button onClick={() => setCurrentScore(0)} className="close-button">Yay!</button>
        </div>
      )}
    </div>
  )
}

export default ConstellationGame;