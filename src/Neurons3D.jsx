import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from 'three';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useControls } from 'leva'
import FakeGlowMaterial from './FakeGlowMaterial'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
//import perlinNoiseTexture from './perlinNoiseTexture'
import ParticleCloud from './particleCloud'
import './Neurons3D.css'


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

function NeuronModel() {
  const obj = useLoader(OBJLoader, '/Neuron.obj');
  return obj
}

function NeuronMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x112233) },
      emissiveColor: { value: new THREE.Color(0x335599) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform vec3 emissiveColor;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        
        // Enhanced fresnel effect with stronger parameters
        float fresnelBias = 0.2;
        float fresnelScale = 2.0;
        float fresnelPower = 4.0;
        float fresnelTerm = fresnelBias + fresnelScale * pow(1.0 + dot(normal, viewDir), fresnelPower);
        
        // Pulsing glow effect
        float pulse = sin(time * 0.2) * 0.15 + 0.85;
        
        // Stronger edge highlighting
        float edgeStrength = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
        vec3 edgeGlow = emissiveColor * edgeStrength * 2.0 * pulse;
        
        // Glass-like refraction effect
        vec3 refraction = reflect(-viewDir, normal);
        vec3 refractionColor = mix(color, emissiveColor, pow(refraction.y * 0.5 + 0.5, 2.0));
        
        // Combine effects with emphasis on fresnel
        vec3 finalColor = mix(refractionColor, edgeGlow, edgeStrength);
        finalColor += fresnelTerm * emissiveColor * pulse * 1.5;
        
        gl_FragColor = vec4(finalColor, 0.3 + edgeStrength * 0.6);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  })
}


function Neuron(props) {
  const neuronObj = NeuronModel()
  const clone = neuronObj.clone()
  clone.traverse((child) => {
    if (child.isMesh) {
      child.material = NeuronMaterial()
    }
  })
  return (
    <mesh {...props}>
      <primitive castShadow receiveShadow
        object={clone}
      />
      <sphereGeometry args={[2.5, 64, 64]} />
      <FakeGlowMaterial glowColor="#0099FF" intensity={1} />
    </mesh>
  )
}

function NeuronGroup(props) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    // Rotate slowly around y axis
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.1
      meshRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <Neuron position={[0, 0, 0]} scale={0.4} rotation={[0, 25, 0]} />
      <Neuron position={[0, 3, 1]} scale={0.5} rotation={[80, 0, 0]} />
      <Neuron position={[0, -3, 0]} scale={0.4} rotation={[-80, 0, 50]} />
      <Neuron position={[3, 0, -1]} scale={0.5} rotation={[80, 0, 0]} />
      <Neuron position={[-3, 0, 0]} scale={0.4} rotation={[-80, 0, 50]} />
    </mesh>
  )
}

function Neurons3D() {

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
      particleColor: "#8844AA"
    },
    yellow: {
      rotationSpeed: 0.3,
      rotationDirection: [-1, -1, -1],
      particleSize: 0.15,
      cloudSize: 0.35,
      particleCount: 500,
      particleColor: "#FF4400",
      widthSegments: 7,
      heightSegments: 7,
      particleOpacity: 0.1,
      emissiveIntensity: 20
    }
  })

  const bloomControls = {
    intensity: 1.2,
    luminanceThreshold: 0.2,
    luminanceSmoothing: 0.95,
    height: 1200
  }

  return (
    <div className="neurons-3d">
      <Canvas
        className="canvas"
        style={{position: "absolute", top: 0, width: "100%", height: "90%"}}
        camera={{
          position: [0, 0, 2],
          fov: 75,
          near: 0.001,
          far: 10
        }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true  // Enable depth buffer
        }}
      >
        <CameraController />
        <OrbitControls />
        <pointLight position={[5, 0, 0]} intensity={20} color="#FFFFFF" />
        <EffectComposer>
          <DepthOfField
            focusDistance={1}
            focalLength={0.1}
            bokehScale={200}
          />
        </EffectComposer>
        <ambientLight color="#0066FF" intensity={0.3} />
        <NeuronGroup position={[0, 0, 0]} handlePointClick={handlePointClick} />
        <ParticleCloud {...particleCloudProps.green} />
        <ParticleCloud {...particleCloudProps.white} />
        <ParticleCloud {...particleCloudProps.red} />
      </Canvas>
    </div>
  )
}

export default Neurons3D;