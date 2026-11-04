"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  centered = false,
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2"
      >
        <span className="font-semibold text-[var(--accent)]">{number}</span>
        <span className="w-8 h-[1px] bg-[var(--accent)] opacity-60"></span>
        <span>SECTION</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
