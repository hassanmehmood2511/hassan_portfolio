"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "../ui/MagneticButton";
import { SplitText } from "../ui/SplitText";
import { ArrowDownRight, Sparkles, Building2, Download } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Vignette / Scrim gradient backdrop overlay for crisp contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--bg-deep)]/90 via-[var(--bg-deep)]/60 to-transparent pointer-events-none rounded-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-7 flex flex-col gap-6 z-10">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs w-fit shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hello, I'm</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          </motion.div>

          {/* Name SplitText Reveal */}
          <div className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--text-primary)] leading-[1.08]">
            <SplitText text={siteConfig.name} delay={0.1} />
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display font-semibold text-xl sm:text-2xl lg:text-3xl text-[var(--accent)]"
          >
            {siteConfig.headline}
          </motion.h2>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed"
          >
            {siteConfig.subline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a href="#projects">
              <MagneticButton
                cursorLabel="Projects"
                className="px-6 py-3.5 rounded-full bg-[var(--accent)] text-stone-900 font-bold text-sm hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent)]/25 flex items-center gap-2"
              >
                <span>View My Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </MagneticButton>
            </a>

            <a href="#contact">
              <MagneticButton
                cursorLabel="Contact"
                className="px-6 py-3.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-2"
              >
                <span>Let's Talk</span>
              </MagneticButton>
            </a>

            <a
              href={siteConfig.cvUrl}
              download="Hafiz_Hassan_Mehmood_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden"
            >
              <button className="px-5 py-3 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold text-xs flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </a>
          </motion.div>

          {/* "Currently" Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 pt-6 border-t border-[var(--border-color)]/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[var(--accent)]" />
              <strong className="text-[var(--text-primary)] font-sans">TechNest Nova</strong>
              <span>(Senior Software Developer)</span>
            </span>
            <span className="text-[var(--border-color)] hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <strong className="text-[var(--text-primary)] font-sans">BUILTIN Soft</strong>
              <span>(Team Lead Intern)</span>
            </span>
          </motion.div>
        </div>

        {/* Right Column: 3D Portrait space on desktop or CSS fallback frame */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[480px]">
          {/* Subtle decorative card border for mobile or overlay */}
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl border border-[var(--accent)]/30 p-2 bg-[var(--card-bg)]/40 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center overflow-hidden group">
            <img
              src="/profile/hassan.jpg"
              alt="Hafiz Hassan Mehmood"
              className="w-full h-full object-cover rounded-2xl filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                // Hide image if missing, reveal avatar fallback
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            {/* Fallback avatar overlay if image fails */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-forest)] text-[var(--sand-light)] p-6 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[var(--accent)]/20 border-2 border-[var(--accent)] flex items-center justify-center font-display font-bold text-2xl text-[var(--accent)] mb-3">
                HHM
              </div>
              <h3 className="font-display font-bold text-lg">{siteConfig.name}</h3>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                TechNest Nova Senior Developer
              </p>
            </div>

            {/* Accent Corner Label */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[var(--bg-deep)]/85 backdrop-blur-md border border-[var(--accent)]/40 flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--accent)] font-bold">Hafiz Hassan Mehmood</span>
              <span className="text-[var(--text-muted)]">Bahawalpur, PK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
