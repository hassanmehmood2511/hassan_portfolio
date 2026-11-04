"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { usePointer } from "@/hooks/usePointer";

export const CameraRig: React.FC = () => {
  const { progress } = useScrollProgress();
  const pointer = usePointer();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Determine keyframe target based on scroll progress (0 to 1)
    const p = progress;

    if (p < 0.2) {
      // Hero section
      targetPos.current.set(pointer.x * 0.3, pointer.y * 0.3, 5.5);
      targetLook.current.set(0, 0, 0);
    } else if (p < 0.45) {
      // Skills constellation section
      targetPos.current.set(pointer.x * 0.5, 0, 6.5);
      targetLook.current.set(0, 0, 0);
    } else if (p < 0.7) {
      // Experience section
      targetPos.current.set(-1.0 + pointer.x * 0.2, 0, 5.2);
      targetLook.current.set(0, 0, 0);
    } else if (p < 0.88) {
      // Projects section
      targetPos.current.set(1.0 + pointer.x * 0.2, 0, 5.5);
      targetLook.current.set(0, 0, 0);
    } else {
      // Contact section
      targetPos.current.set(pointer.x * 0.2, -0.5, 5.0);
      targetLook.current.set(0, 0, 0);
    }

    // Smoothly interpolate camera position and lookAt
    state.camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(delta * 2.5, 0.01, 0.1));
    state.camera.lookAt(targetLook.current);
  });

  return null;
};
