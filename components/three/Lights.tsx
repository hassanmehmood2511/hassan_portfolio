"use client";

import React from "react";
import { useTheme } from "next-themes";

export const Lights: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <>
      <ambientLight intensity={isDark ? 0.7 : 1.2} color={isDark ? "#123D2B" : "#F3EBDD"} />

      {/* Key Accent Light (Copper Gold) */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={isDark ? 2.5 : 1.8}
        color="#C98A4B"
        castShadow={false}
      />

      {/* Secondary Fill Light */}
      <directionalLight
        position={[-10, -10, -5]}
        intensity={isDark ? 1.0 : 0.8}
        color={isDark ? "#2F6B4F" : "#E8DCC4"}
      />

      {/* Point lights for spatial glow */}
      <pointLight position={[0, 2, 3]} intensity={1.5} color="#C98A4B" distance={10} />
      <pointLight position={[-5, -2, -2]} intensity={1.0} color="#2F6B4F" distance={12} />
    </>
  );
};
