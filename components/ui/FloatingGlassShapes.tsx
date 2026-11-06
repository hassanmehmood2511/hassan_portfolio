"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FloatingGlassShapes: React.FC<{ variant?: "A" | "B" | "C" }> = ({
  variant = "A",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  if (isMobile || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {variant === "A" && (
        <>
          <motion.div
            style={{ y: y1, rotate: rotate1 }}
            className="absolute -top-10 left-[8%] w-44 h-44 rounded-3xl bg-gradient-to-br from-[var(--accent)]/10 via-[var(--green-mid)]/15 to-transparent border border-[var(--accent)]/20 transform-gpu"
          />
          <motion.div
            style={{ y: y2, rotate: rotate2 }}
            className="absolute bottom-10 right-[6%] w-36 h-36 rounded-2xl bg-gradient-to-tr from-[var(--bg-forest)]/30 via-[var(--accent)]/10 to-transparent border border-[var(--border-color)] transform-gpu"
          />
        </>
      )}

      {variant === "B" && (
        <>
          <motion.div
            style={{ y: y2, rotate: rotate1 }}
            className="absolute top-1/4 right-[10%] w-52 h-52 rounded-full bg-gradient-to-bl from-[var(--accent)]/12 via-[var(--bg-forest)]/20 to-transparent border border-[var(--accent)]/25 transform-gpu"
          />
          <motion.div
            style={{ y: y1, rotate: rotate2 }}
            className="absolute bottom-1/3 left-[5%] w-40 h-40 rounded-3xl bg-gradient-to-tr from-[var(--green-mid)]/15 via-[var(--accent)]/8 to-transparent border border-[var(--border-color)] transform-gpu"
          />
        </>
      )}

      {variant === "C" && (
        <>
          <motion.div
            style={{ y: y1, rotate: rotate2 }}
            className="absolute top-10 left-[12%] w-48 h-48 rounded-2xl bg-gradient-to-r from-[var(--accent)]/15 via-transparent to-[var(--green-mid)]/15 border border-[var(--accent)]/30 transform-gpu"
          />
          <motion.div
            style={{ y: y2, rotate: rotate1 }}
            className="absolute bottom-12 right-[12%] w-32 h-32 rounded-3xl bg-gradient-to-tl from-[var(--bg-forest)]/40 via-[var(--accent)]/10 to-transparent border border-[var(--border-color)] transform-gpu"
          />
        </>
      )}
    </div>
  );
};
