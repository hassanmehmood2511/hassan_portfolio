"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePointer } from "@/hooks/usePointer";

export const CustomCursor: React.FC = () => {
  const pointer = usePointer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !pointer.isPointerFine) {
    return null;
  }

  const hasLabel = Boolean(pointer.hoverText);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[var(--accent)] pointer-events-none z-50"
        animate={{
          x: pointer.pixelX - 5,
          y: pointer.pixelY - 5,
          scale: hasLabel ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Outer Glow Ring / Label Container */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--accent)]/60 bg-[var(--accent)]/15 backdrop-blur-[2px] pointer-events-none z-40 flex items-center justify-center text-center shadow-lg shadow-[var(--accent)]/20"
        animate={{
          x: pointer.pixelX - (hasLabel ? 36 : 18),
          y: pointer.pixelY - (hasLabel ? 36 : 18),
          width: hasLabel ? 72 : 36,
          height: hasLabel ? 72 : 36,
          scale: hasLabel ? 1.1 : 1,
          borderColor: hasLabel ? "var(--accent)" : "rgba(201, 138, 75, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
      >
        {hasLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono font-bold text-[var(--accent)] px-1 leading-tight select-none uppercase tracking-tighter"
          >
            {pointer.hoverText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
