"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { FloatingGlassShapes } from "../ui/FloatingGlassShapes";
import { educationList, languagesList } from "@/data/education";
import { GraduationCap, Calendar, Languages, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const disableParallax = isMobile || prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-gradient-to-b from-transparent via-[var(--bg-forest)]/10 to-transparent transition-colors duration-500"
    >
      <FloatingGlassShapes variant="C" />

      <motion.div style={disableParallax ? {} : { y: headingY }} className="relative z-10">
        <SectionHeading
          number="05"
          title="Education & Languages"
          subtitle="Academic foundations and linguistic capabilities supporting global collaboration."
        />
      </motion.div>

      <motion.div
        style={disableParallax ? {} : { y: contentY }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Education Timeline Cards (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--accent)]" /> Academic Degrees
          </h3>

          {educationList.map((edu) => (
            <div key={edu.id}>
              <TiltCard className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {edu.degree}
                  </h4>
                  <span className="flex items-center gap-1 font-mono text-xs text-[var(--accent)]">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>

                <div className="text-sm font-semibold text-[var(--accent)] mb-2">
                  {edu.institution}
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                    {edu.description}
                  </p>
                )}

                {edu.highlights && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-color)]/60">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-deep)] text-[var(--sand-light)] border border-[var(--border-color)]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[var(--accent)]" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Languages Mini-List (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Languages className="w-5 h-5 text-[var(--accent)]" /> Spoken Languages
          </h3>

          <TiltCard className="p-8 h-full flex flex-col justify-between">
            <div className="space-y-6">
              {languagesList.map((lang, idx) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="font-bold text-[var(--text-primary)]">{lang.name}</span>
                    <span className="text-xs text-[var(--accent)]">{lang.proficiency}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[var(--bg-deep)] overflow-hidden border border-[var(--border-color)]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--green-mid)] to-[var(--accent)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.levelPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)] leading-relaxed">
              Equipped to communicate effectively across diverse multi-national remote engineering teams and client calls.
            </div>
          </TiltCard>
        </div>
      </motion.div>
    </section>
  );
};
