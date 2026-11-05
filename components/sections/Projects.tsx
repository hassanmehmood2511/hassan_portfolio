"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { MagneticButton } from "../ui/MagneticButton";
import { FloatingGlassShapes } from "../ui/FloatingGlassShapes";
import { projects } from "@/data/projects";
import { ExternalLink, ShieldCheck, Smartphone, Cpu, ShoppingBag, BarChart3 } from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MotifIcon: React.FC<{ motif: string }> = ({ motif }) => {
  switch (motif) {
    case "mobile":
      return <Smartphone className="w-12 h-12 text-[var(--accent)]" />;
    case "system":
      return <Cpu className="w-12 h-12 text-[var(--accent)]" />;
    case "ecommerce":
      return <ShoppingBag className="w-12 h-12 text-[var(--accent)]" />;
    case "analytics":
      return <BarChart3 className="w-12 h-12 text-[var(--accent)]" />;
    default:
      return <Cpu className="w-12 h-12 text-[var(--accent)]" />;
  }
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const disableParallax = isMobile || prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-gradient-to-b from-transparent via-[var(--card-bg)]/20 to-transparent transition-colors duration-500"
    >
      <FloatingGlassShapes variant="B" />

      <motion.div style={disableParallax ? {} : { y: headingY }} className="relative z-10">
        <SectionHeading
          number="04"
          title="Featured Projects"
          subtitle="A collection of web, backend, and mobile software applications built for real-world impact."
        />
      </motion.div>

      <motion.div
        style={disableParallax ? {} : { y: gridY }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project, idx) => {
          return (
            <motion.div key={project.id} className="h-full">
              <TiltCard className="h-full flex flex-col justify-between group">
                <div>
                  {/* Generated Cover vs Real Screenshot Image Container */}
                  <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden border-b border-[var(--border-color)]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Abstract Generated Cover */
                      <div
                        className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${project.coverGradient.from} 0%, ${project.coverGradient.to} 100%)`,
                        }}
                      >
                        {/* Decorative mesh grid pattern */}
                        <div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, ${project.coverGradient.accent} 1px, transparent 0)`,
                            backgroundSize: "24px 24px",
                          }}
                        />

                        <motion.div
                          whileHover={disableParallax ? {} : { rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="p-5 rounded-2xl bg-[var(--bg-deep)]/60 backdrop-blur-md border border-[var(--accent)]/40 shadow-xl z-10"
                        >
                          <MotifIcon motif={project.coverGradient.motif} />
                        </motion.div>

                        <span className="mt-3 font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] font-semibold z-10">
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold shadow-md ${
                          project.status === "Ongoing"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        {project.status}
                      </span>
                      {project.isClientProject && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Client Project
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-deep)] text-[var(--sand-light)] border border-[var(--border-color)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons (Shown ONLY when URLs exist) */}
                <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <MagneticButton
                        cursorLabel="GitHub Repo"
                        className="px-4 py-2 rounded-full text-xs font-mono border border-[var(--border-color)] bg-[var(--bg-deep)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-2"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </MagneticButton>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <MagneticButton
                        cursorLabel="Live Demo"
                        className="px-4 py-2 rounded-full text-xs font-mono bg-[var(--accent)] text-stone-900 font-bold hover:bg-[var(--accent-hover)] flex items-center gap-2 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </MagneticButton>
                    </a>
                  )}

                  {project.isClientProject && !project.githubUrl && !project.liveUrl && (
                    <span className="text-xs font-mono text-[var(--text-muted)] italic">
                      Client Confidentiality • Protected Repository
                    </span>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
