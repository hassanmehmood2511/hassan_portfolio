"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxRotate?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(201, 138, 75, 0.3)",
  maxRotate = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const disableEffects = isMobile || prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableEffects || !cardRef.current) return;
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
    setGlarePos({ x: glareX, y: glareY, opacity: 0.85 });
  };

  const handleMouseLeave = () => {
    if (disableEffects) return;
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={
        disableEffects
          ? { opacity: 0, y: 20 }
          : { opacity: 0, y: 35, z: -60, rotateX: 12, scale: 0.96 }
      }
      whileInView={
        disableEffects
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, z: 0, rotateX: 0, scale: 1 }
      }
      whileHover={
        disableEffects
          ? {}
          : { y: -6, z: 18, scale: 1.012, transition: { duration: 0.25, ease: "easeOut" } }
      }
      viewport={{ once: true, margin: "-60px" }}
      animate={disableEffects ? {} : { rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        transformStyle: disableEffects ? "flat" : "preserve-3d",
        perspective: 1000,
      }}
      className={`relative rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md shadow-xl transition-shadow duration-300 hover:border-[var(--accent)] hover:shadow-2xl hover:shadow-[var(--accent)]/15 ${className}`}
    >
      {/* Soft moving copper-gold glare overlay following cursor */}
      {!disableEffects && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(450px circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, rgba(201, 138, 75, 0.08) 45%, transparent 75%)`,
            opacity: glarePos.opacity,
          }}
        />
      )}

      {/* Content wrapper with inner depth */}
      <div className="relative z-0 h-full w-full transform-gpu">
        {children}
      </div>
    </motion.div>
  );
};
