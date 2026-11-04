"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { skills, skillCategories, SkillCategory, Skill } from "@/data/skills";
import { Cpu, Sparkles, Filter, CheckCircle2 } from "lucide-react";

interface SkillsProps {
  selectedCategory: SkillCategory | "All";
  onCategoryChange: (cat: SkillCategory | "All") => void;
}

export const Skills: React.FC<SkillsProps> = ({ selectedCategory, onCategoryChange }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0]);

  const categories: (SkillCategory | "All")[] = ["All", ...skillCategories];

  const displayedSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="02"
        title="Skill Constellation"
        subtitle="Explore the interconnected ecosystem of technologies, frameworks, and engineering methodologies."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
        <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5 text-[var(--accent)]" /> Filter:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-[var(--accent)] text-stone-900 shadow-lg shadow-[var(--accent)]/25 scale-105"
                  : "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
              data-cursor={cat}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Interactive Skill Detail Banner */}
      {selectedSkill && (
        <motion.div
          key={selectedSkill.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <TiltCard className="p-6 md:p-8 bg-gradient-to-r from-[var(--card-bg)] via-[var(--bg-forest)]/40 to-[var(--card-bg)] border-[var(--accent)]/40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40">
                    {selectedSkill.category}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Proficiency: <strong className="text-[var(--text-primary)]">{selectedSkill.level}</strong>
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--text-primary)]">
                  {selectedSkill.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
                  {selectedSkill.description}
                </p>
              </div>

              {/* Connected skill chips */}
              <div className="flex flex-col gap-1.5 w-full md:w-auto">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  Connected Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.connections.map((connId) => {
                    const conn = skills.find((s) => s.id === connId);
                    return (
                      <span
                        key={connId}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-deep)] text-[var(--sand-light)] border border-[var(--border-color)]"
                      >
                        {conn ? conn.name : connId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      )}

      {/* Grid of Skill Cards (Accessible HTML List & Card Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {displayedSkills.map((skill) => {
          const isSelected = selectedSkill?.id === skill.id;
          return (
            <motion.div
              key={skill.id}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setSelectedSkill(skill)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-[var(--accent)]/15 border-[var(--accent)] shadow-md shadow-[var(--accent)]/20"
                    : "bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[var(--accent)]/60"
                }`}
                data-cursor={skill.name}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {skill.level}
                  </span>
                </div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  {skill.name}
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] truncate mt-0.5">
                  {skill.category}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
