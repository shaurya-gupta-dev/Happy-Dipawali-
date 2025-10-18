import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Individual Diya component
function Diya({ position, index }) {
  const meshRef = useRef();
  const lightRef = useRef();
  const flameRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Floating animation
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.5;
      meshRef.current.rotation.y += 0.005;
    }
    
    // Flame flicker
    if (flameRef.current && lightRef.current) {
      const flicker = 1 + Math.sin(time * 10 + index) * 0.1;
      flameRef.current.scale.y = flicker;
      lightRef.current.intensity = 2 + Math.sin(time * 8 + index) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {/* Diya bowl */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1.2, 0.5, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.9}
            roughness={0.1}
            emissive="#FFAA00"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Flame */}
        <mesh ref={flameRef} position={[0, 0.8, 0]}>
          <coneGeometry args={[0.15, 0.8, 8]} />
          <meshBasicMaterial color="#FF8C00" transparent opacity={0.9} />
        </mesh>
        
        {/* Flame light */}
        <pointLight
          ref={lightRef}
          position={[0, 0.8, 0]}
          color="#FF8C00"
          intensity={2}
          distance={10}
          castShadow
        />
      </group>
    </Float>
  );
}

// Particle system
function Particles() {
  const particlesRef = useRef();
  
  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.1, 1, 0.5);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera controller based on scroll
function CameraController({ scrollProgress }) {
  useFrame((state) => {
    state.camera.position.z = 30 - scrollProgress * 100;
    state.camera.position.y = 5 + Math.sin(scrollProgress * Math.PI) * 10;
    state.camera.rotation.x = -scrollProgress * 0.5;
  });
  
  return null;
}

// Main Scene component
const Scene3D = ({ scrollProgress }) => {
  // Generate diya positions in a spiral pattern
  const diyaPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 4;
      const radius = 15 + (i * 2);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - (i * 8);
      const y = Math.sin(i) * 3;
      positions.push([x, y, z]);
    }
    return positions;
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 bg-[#0A0A10]">
      <Canvas
        camera={{ position: [0, 5, 30], fov: 75 }}
        shadows
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0A0A10', 20, 120]} />
        
        {/* Lighting */}
        <ambientLight intensity={2} />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Diyas */}
        {diyaPositions.map((pos, i) => (
          <Diya key={i} position={pos} index={i} />
        ))}
        
        {/* Particles */}
        <Particles />
        
        {/* Camera controller */}
        <CameraController scrollProgress={scrollProgress} />
        
        {/* Background plane */}
        <mesh position={[0, 0, -50]}>
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial color="#1a0a2e" transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Scene3D;

