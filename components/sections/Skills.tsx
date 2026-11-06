"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { skills, skillCategories, SkillCategory } from "@/data/skills";
import { Code2, Server, Smartphone, LayoutTemplate, Wrench, LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const categoryMeta: Record<SkillCategory, { icon: LucideIcon; blurb: string }> = {
  Languages: { icon: Code2, blurb: "Core programming languages" },
  "Backend & Database": { icon: Server, blurb: "APIs, services and data" },
  Mobile: { icon: Smartphone, blurb: "Cross-platform and native apps" },
  Frontend: { icon: LayoutTemplate, blurb: "Modern web interfaces" },
  "Tools & Practices": { icon: Wrench, blurb: "Workflow, delivery and craft" },
};

export const Skills: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: prefersReducedMotion ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const chipVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 6 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, delay: prefersReducedMotion ? 0 : 0.25 + i * 0.04 },
    }),
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="02"
        title="Skills & Technologies"
        subtitle="The languages, frameworks, and tools I use to design, build, and ship reliable software."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {skillCategories.map((category, idx) => {
          const { icon: Icon, blurb } = categoryMeta[category];
          const items = skills.filter((s) => s.category === category);

          return (
            <motion.article
              key={category}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.25 }}
              className={`group relative flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--card-solid)] p-6 md:p-7 shadow-lg transition-colors duration-300 hover:border-[var(--accent)]/60 hover:shadow-xl hover:shadow-[var(--accent)]/10 ${
                category === "Tools & Practices" ? "lg:col-span-2" : ""
              }`}
            >
              {/* Accent top line */}
              <span className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <header className="flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--accent)]/12 border border-[var(--accent)]/30 text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] leading-tight">
                    {category}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{blurb}</p>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                  {String(items.length).padStart(2, "0")}
                </span>
              </header>

              <ul className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <motion.li
                    key={skill.id}
                    custom={i}
                    variants={chipVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    title={skill.description}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--bg-deep)]/70 text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {skill.name}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
