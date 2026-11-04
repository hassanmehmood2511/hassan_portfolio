"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxRotate?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(201, 138, 75, 0.25)",
  maxRotate = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setRotateX(-normY * maxRotate);
    setRotateY(normX * maxRotate);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md shadow-xl transition-shadow duration-300 hover:border-[var(--accent)] hover:shadow-2xl hover:shadow-[var(--accent)]/10 ${className}`}
    >
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
          opacity: glarePos.opacity,
        }}
      />
      {/* Content wrapper with inner depth */}
      <div className="relative z-0 h-full w-full transform-gpu transition-transform duration-200">
        {children}
      </div>
    </motion.div>
  );
};
