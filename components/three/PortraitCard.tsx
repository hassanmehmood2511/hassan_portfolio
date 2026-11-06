"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { usePointerRef } from "@/hooks/usePointerRef";

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export const PortraitCard: React.FC<{ position?: [number, number, number] }> = ({
  position = [2.2, 0.2, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.MeshBasicMaterial>(null);
  const photoRef = useRef<THREE.MeshStandardMaterial>(null);
  const pointerRef = usePointerRef();
  const fade = useRef(1);

  const texture = useTexture("/profile/hassan.jpg", (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.05);

    // Scroll-driven fade: fully visible in the hero, gently fading out
    // over the next screen of scrolling (eased, never an instant cut)
    const scrolled = window.scrollY / Math.max(window.innerHeight, 1);
    const target = 1 - smoothstep(0.3, 1.15, scrolled);
    fade.current += (target - fade.current) * (1 - Math.pow(0.004, delta));
    const f = fade.current;

    group.visible = f > 0.01;
    if (!group.visible) return;

    if (photoRef.current) photoRef.current.opacity = f;
    if (haloRef.current) haloRef.current.opacity = 0.25 * f;

    // Gentle float, plus a soft lift and shrink as it fades away
    const time = state.clock.getElapsedTime();
    group.position.y = position[1] + Math.sin(time * 1.2) * 0.12 + (1 - f) * 0.6;
    group.scale.setScalar(0.9 + 0.1 * f);

    // Mouse tilt parallax toward cursor
    const pointer = pointerRef.current;
    const ease = 1 - Math.pow(0.05, delta);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.35, ease);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 0.35, ease);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer Glow Halo Frame */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.5, 3.1]} />
        <meshBasicMaterial ref={haloRef} color="#C98A4B" transparent opacity={0.25} />
      </mesh>

      {/* Main Card Mesh */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.4, 3.0]} />
        <meshStandardMaterial
          ref={photoRef}
          map={texture}
          roughness={0.2}
          metalness={0.1}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
};
