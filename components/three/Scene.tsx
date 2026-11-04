"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { useTheme } from "next-themes";
import { Lights } from "./Lights";
import { Particles } from "./Particles";
import { CameraRig } from "./CameraRig";
import { PortraitCard } from "./PortraitCard";
import { SkillConstellation } from "./SkillConstellation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SkillCategory } from "@/data/skills";

interface SceneProps {
  selectedCategory?: SkillCategory | "All";
}

export const SceneContent: React.FC<SceneProps> = ({ selectedCategory = "All" }) => {
  const { theme } = useTheme();
  const { progress } = useScrollProgress();
  const isMobile = useIsMobile();
  const isDark = theme !== "light";

  // Show SkillConstellation primarily when in or near Skills section
  const showConstellation = progress > 0.15 && progress < 0.6;
  // Show PortraitCard in Hero section
  const showPortrait = progress < 0.3;

  return (
    <>
      <color attach="background" args={[isDark ? "#0A2218" : "#F3EBDD"]} />
      <fog attach="fog" args={[isDark ? "#0A2218" : "#F3EBDD", 5, 20]} />

      <CameraRig />
      <Lights />
      <Particles count={isMobile ? 50 : 120} />

      {showPortrait && <PortraitCard position={isMobile ? [0, 0, 0] : [2.2, 0.2, 0]} />}

      {showConstellation && (
        <SkillConstellation selectedCategory={selectedCategory} />
      )}
    </>
  );
};

export const Scene: React.FC<SceneProps> = ({ selectedCategory = "All" }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-auto"
      >
        <PerformanceMonitor>
          <AdaptiveDpr pixelated />
          <Suspense fallback={null}>
            <SceneContent selectedCategory={selectedCategory} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};

export default Scene;
