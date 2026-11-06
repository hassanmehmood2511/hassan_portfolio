"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { FloatingGlassShapes } from "../ui/FloatingGlassShapes";
import { experiences } from "@/data/experience";
import { Briefcase, Calendar, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Timeline line draws itself as the user scrolls through the entries
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(timelineProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const disableParallax = isMobile || prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-gradient-to-b from-transparent via-[var(--bg-forest)]/10 to-transparent transition-colors duration-500"
    >
      <FloatingGlassShapes variant="A" />

      <motion.div style={disableParallax ? {} : { y: headingY }} className="relative z-10">
        <SectionHeading
          number="03"
          title="Professional Experience"
          subtitle="A history of technical leadership, full-stack architecture, and agile sprint execution."
        />
      </motion.div>

      <motion.div
        ref={timelineRef}
        style={disableParallax ? {} : { y: contentY }}
        className="relative z-10 border-l-2 border-[var(--border-color)] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12"
      >
        {/* Vertical timeline line that draws downward with scroll */}
        <motion.div
          aria-hidden
          className="absolute left-[-2px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-[var(--accent)] via-[var(--green-mid)] to-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
          style={{ scaleY: prefersReducedMotion ? 1 : lineScale }}
        />

        {experiences.map((exp) => {
          const isProminent = exp.isProminent;

          return (
            <motion.div
              key={exp.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 32, filter: "blur(6px)" }
              }
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Timeline Marker Dot */}
              <motion.div
                initial={prefersReducedMotion ? { scale: isProminent ? 1.25 : 1 } : { scale: 0 }}
                whileInView={
                  prefersReducedMotion
                    ? { scale: isProminent ? 1.25 : 1 }
                    : {
                        scale: isProminent ? 1.25 : 1,
                        boxShadow: [
                          "0 0 0 0px rgba(201, 138, 75, 0)",
                          "0 0 0 10px rgba(201, 138, 75, 0.35)",
                          isProminent
                            ? "0 0 14px 2px rgba(201, 138, 75, 0.5)"
                            : "0 0 0 18px rgba(201, 138, 75, 0)",
                        ],
                      }
                }
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  scale: { type: "spring", stiffness: 320, damping: 18, delay: 0.15 },
                  boxShadow: { duration: 1.2, delay: 0.3, ease: "easeOut" },
                }}
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isProminent
                    ? "bg-[var(--accent)] border-[var(--sand-light)] shadow-lg shadow-[var(--accent)]/50"
                    : "bg-[var(--bg-deep)] border-[var(--accent)]"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isProminent ? "bg-stone-900" : "bg-[var(--accent)]"
                  }`}
                />
              </motion.div>

              {/* Experience Card */}
              <TiltCard
                className={`p-6 sm:p-8 ${
                  isProminent
                    ? "border-2 border-[var(--accent)] bg-gradient-to-br from-[var(--card-bg)] via-[var(--bg-forest)]/60 to-[var(--card-bg)] shadow-2xl shadow-[var(--accent)]/15"
                    : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] ${
                          isProminent ? "text-[var(--accent)]" : ""
                        }`}
                      >
                        {exp.role}
                      </h3>
                      {isProminent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--accent)] text-stone-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Prominent Role
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)] mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-[var(--text-muted)] gap-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 my-6 text-sm sm:text-base text-[var(--text-primary)]">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-[var(--accent)] shrink-0 mt-1" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[var(--text-muted)] mr-2">
                    Technologies:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-deep)]/80 text-[var(--sand-light)] border border-[var(--border-color)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
