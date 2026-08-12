"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Plate() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Main plate */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[2.5, 2.2, 0.3, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Inner rim */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[2, 1.7, 0.15, 64]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Center food mound */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Garnish particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.8 + Math.random() * 0.4;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0.6 + Math.random() * 0.3, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.08 + Math.random() * 0.05, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#228B22" : "#DC143C"}
              emissive={i % 2 === 0 ? "#0f4f0f" : "#5c0a0a"}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      <Sparkles count={50} scale={6} size={2} speed={0.4} color="#c9a227" />
    </group>
  );
}

function Steam() {
  const particles = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particles.current) {
      particles.current.children.forEach((child, i) => {
        child.position.y += 0.01;
        child.scale.setScalar(1 + Math.sin(state.clock.elapsedTime + i) * 0.3);
        if (child.position.y > 3) {
          child.position.y = 0.5;
        }
      });
    }
  });

  return (
    <group ref={particles}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 0.5, 0.5 + i * 0.4, Math.cos(i) * 0.5]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroPlate() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 4, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#c9a227" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#f5f0e8" />
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Plate />
        </Float>
        <Steam />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
