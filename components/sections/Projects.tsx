"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { MagneticButton } from "../ui/MagneticButton";
import { FloatingGlassShapes } from "../ui/FloatingGlassShapes";
import { projects, Project } from "@/data/projects";
import { ShieldCheck, Check, ArrowUpRight, MousePointerClick } from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

const StatusBadge: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex flex-wrap items-center justify-end gap-2">
    {project.status && (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${
          project.status === "In Development"
            ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            project.status === "In Development" ? "bg-amber-500" : "bg-emerald-500"
          }`}
        />
        {project.status}
      </span>
    )}
    {project.isClientProject && (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
        <ShieldCheck className="w-3 h-3" /> Client
      </span>
    )}
  </div>
);

const TechChips: React.FC<{ tags: string[]; size?: "sm" | "md" }> = ({ tags, size = "sm" }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <li
        key={tag}
        className={`rounded-md font-mono bg-[var(--bg-deep)]/70 text-[var(--text-primary)] border border-[var(--border-color)] ${
          size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"
        }`}
      >
        {tag}
      </li>
    ))}
  </ul>
);

interface ProjectCardProps {
  project: Project;
  index: number;
  reduced: boolean;
  hoveredId: string | null;
  canHover: boolean;
  onHoverChange: (id: string | null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  reduced,
  hoveredId,
  canHover,
  onHoverChange,
}) => {
  const ref = useRef<HTMLElement>(null);
  // "In focus" = the card is crossing the middle band of the screen while scrolling
  const inFocus = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const active = hoveredId ? hoveredId === project.id : inFocus;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 48, scale: reduced ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: reduced ? 0 : (index % 2) * 0.12, ease: EASE }}
      onMouseEnter={canHover ? () => onHoverChange(project.id) : undefined}
      onMouseLeave={canHover ? () => onHoverChange(null) : undefined}
      onFocus={() => onHoverChange(project.id)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onHoverChange(null);
      }}
      tabIndex={0}
      aria-label={`${project.title}: ${project.summary}`}
      className={`group relative overflow-hidden rounded-3xl border bg-[var(--card-solid)] shadow-lg outline-none transition-[border-color,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
        active
          ? "border-[var(--accent)]/60 shadow-2xl shadow-[var(--accent)]/10"
          : "border-[var(--border-color)]"
      }`}
    >
      {/* Accent line that draws across the top when the card is active */}
      <motion.span
        aria-hidden
        className="absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--sand)] to-transparent"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
      />
      {/* Soft corner glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,138,75,0.16) 0%, transparent 65%)" }}
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
      />

      {/* Both states share one grid cell, so the card never changes height */}
      <div className="relative grid p-7 sm:p-9 min-h-[360px]">
        {/* ---------- Resting state: name + tech only ---------- */}
        <motion.div
          className="[grid-area:1/1] flex flex-col"
          initial={false}
          animate={{
            opacity: active ? 0 : 1,
            scale: active && !reduced ? 0.97 : 1,
          }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
          style={{ pointerEvents: active ? "none" : "auto" }}
          aria-hidden={active}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="font-display font-bold text-6xl leading-none text-[var(--accent)]/20 select-none">
              {number}
            </span>
            <StatusBadge project={project} />
          </div>

          <div className="mt-auto pt-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] mb-3">
              {project.category}
            </p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-6">
              {project.title}
            </h3>
            <TechChips tags={project.tags} size="md" />
            <p className="mt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
              <MousePointerClick className="w-3.5 h-3.5 text-[var(--accent)]" />
              {canHover ? "Hover to explore" : "Scroll to explore"}
            </p>
          </div>
        </motion.div>

        {/* ---------- Active state: full details ---------- */}
        <motion.div
          className="[grid-area:1/1] flex flex-col"
          initial={false}
          animate={active ? "show" : "hide"}
          variants={{
            show: { opacity: 1, transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: reduced ? 0 : 0.12 } },
            hide: { opacity: 0, transition: { duration: reduced ? 0 : 0.25 } },
          }}
          style={{ pointerEvents: active ? "auto" : "none" }}
          aria-hidden={!active}
        >
          {(() => {
            const item = {
              show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: EASE } },
              hide: { opacity: 0, y: reduced ? 0 : 14, transition: { duration: reduced ? 0 : 0.2 } },
            };
            return (
              <>
                <motion.div variants={item} className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] mb-1.5">
                      {number} · {project.category}
                    </p>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                  </div>
                  <StatusBadge project={project} />
                </motion.div>

                <motion.p variants={item} className="text-sm sm:text-[15px] text-[var(--text-muted)] leading-relaxed mb-5">
                  {project.summary}
                </motion.p>

                <motion.ul variants={item} className="space-y-2 mb-6">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                      <span className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div variants={item} className="mt-auto flex flex-col gap-5">
                  <TechChips tags={project.tags} />
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit"
                      tabIndex={active ? 0 : -1}
                    >
                      <MagneticButton
                        cursorLabel="GitHub Repo"
                        className="px-4 py-2 rounded-full text-xs font-mono border border-[var(--border-color)] bg-[var(--bg-deep)]/80 text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-2"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>View on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </MagneticButton>
                    </a>
                  ) : project.isClientProject ? (
                    <span className="text-xs font-mono text-[var(--text-muted)] italic">
                      Confidential client work
                    </span>
                  ) : null}
                </motion.div>
              </>
            );
          })()}
        </motion.div>
      </div>
    </motion.article>
  );
};

export const Projects: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <FloatingGlassShapes variant="B" />

      <div className="relative z-10">
        <SectionHeading
          number="04"
          title="Featured Projects"
          subtitle="Selected mobile, web, and backend work, from community apps to client systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              reduced={prefersReducedMotion}
              hoveredId={hoveredId}
              canHover={canHover}
              onHoverChange={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
