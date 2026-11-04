"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 0,
  wordMode = false,
}) => {
  const items = wordMode ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: wordMode ? 0.08 : 0.03, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -40,
    },
  };

  return (
    <motion.span
      className={`inline-block perspective-1000 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {items.map((item, idx) => (
        <motion.span
          key={idx}
          variants={child}
          className="inline-block transform-gpu"
          style={{ whiteSpace: item === " " ? "pre" : "normal" }}
        >
          {item}
          {wordMode && idx < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
