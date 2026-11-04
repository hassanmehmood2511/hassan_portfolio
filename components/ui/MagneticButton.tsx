"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
  strength?: number; // How far the button moves
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  cursorLabel,
  strength = 0.35,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = left + width / 2;
    const middleY = top + height / 2;
    const offsetX = (e.clientX - middleX) * strength;
    const offsetY = (e.clientY - middleY) * strength;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.5 }}
      onClick={onClick}
      data-cursor={cursorLabel}
      className={`relative inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
