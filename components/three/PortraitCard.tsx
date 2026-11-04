"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePointer } from "@/hooks/usePointer";

export const PortraitCard: React.FC<{ position?: [number, number, number] }> = ({
  position = [2.2, 0.2, 0],
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const [imageLoaded, setImageLoaded] = useState(true);

  // Load texture safely
  let texture: THREE.Texture | null = null;
  try {
    texture = useTexture("/profile/hassan.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  } catch (err) {
    // Handled by imageLoaded state
  }

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle float animation
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.12;

      // Mouse tilt parallax toward cursor
      const targetRotateX = -pointer.y * 0.35;
      const targetRotateY = pointer.x * 0.35;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotateX,
        delta * 3
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotateY,
        delta * 3
      );
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Glow Halo Frame */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.5, 3.1]} />
        <meshBasicMaterial color="#C98A4B" transparent opacity={0.25} />
      </mesh>

      {/* Main Card Mesh */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.4, 3.0]} />
        {texture && imageLoaded ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.1}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial color="#123D2B" roughness={0.3} metalness={0.2} />
        )}
      </mesh>

      {/* Fallback Initials Text if Texture Fails */}
      {(!texture || !imageLoaded) && (
        <group position={[0, 0, 0.05]}>
          <Text
            fontSize={0.6}
            color="#C98A4B"
            font="/fonts/SpaceGrotesk-Bold.ttf"
            anchorX="center"
            anchorY="middle"
          >
            HHM
          </Text>
          <Text
            position={[0, -0.6, 0]}
            fontSize={0.16}
            color="#F3EBDD"
            anchorX="center"
            anchorY="middle"
          >
            HAFIZ HASSAN MEHMOOD
          </Text>
        </group>
      )}

      {/* Copper-Gold Inner Border Rim */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[1.18, 1.22, 4]} />
        <meshBasicMaterial color="#C98A4B" wireframe />
      </mesh>
    </group>
  );
};
