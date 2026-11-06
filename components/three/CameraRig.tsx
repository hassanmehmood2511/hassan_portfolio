"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePointerRef } from "@/hooks/usePointerRef";

export const CameraRig: React.FC = () => {
  const pointerRef = usePointerRef();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Read scroll position directly each frame (no React re-renders while scrolling)
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    const pointer = pointerRef.current;

    if (p < 0.2) {
      // Hero section
      targetPos.current.set(pointer.x * 0.3, pointer.y * 0.3, 5.5);
    } else if (p < 0.45) {
      // Skills section
      targetPos.current.set(pointer.x * 0.5, 0, 6.5);
    } else if (p < 0.7) {
      // Experience section
      targetPos.current.set(-1.0 + pointer.x * 0.2, 0, 5.2);
    } else if (p < 0.88) {
      // Projects section
      targetPos.current.set(1.0 + pointer.x * 0.2, 0, 5.5);
    } else {
      // Contact section
      targetPos.current.set(pointer.x * 0.2, -0.5, 5.0);
    }

    // Frame-rate independent easing for smooth camera motion
    const ease = 1 - Math.pow(0.05, Math.min(delta, 0.05));
    state.camera.position.lerp(targetPos.current, ease);
    state.camera.lookAt(targetLook.current);
  });

  return null;
};
