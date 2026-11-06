"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { useTheme } from "next-themes";
import { Lights } from "./Lights";
import { ParticleField } from "./ParticleField";
import { CameraRig } from "./CameraRig";
import { PortraitCard } from "./PortraitCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const SceneContent: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDark = theme !== "light";

  return (
    <>
      <fog attach="fog" args={[isDark ? "#0A2218" : "#F3EBDD", 5, 20]} />

      <CameraRig />
      <Lights />
      <ParticleField isDark={isDark} isMobile={isMobile} />

      {/* Portrait fades out smoothly on scroll (handled inside PortraitCard) */}
      <PortraitCard position={isMobile ? [0, 0, 0] : [2.2, 0.2, 0]} />
    </>
  );
};

export const Scene: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [tabVisible, setTabVisible] = useState(true);

  // Pause rendering while the browser tab is hidden
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={tabVisible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-auto"
      >
        <PerformanceMonitor>
          <AdaptiveDpr pixelated />
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};

export default Scene;
