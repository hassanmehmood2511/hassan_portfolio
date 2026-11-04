"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { Code2, Cpu, GraduationCap, MapPin, Layers, Award } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="01"
        title="About Me"
        subtitle="Bridging clean backend architecture with modern responsive user experiences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Biography Card */}
        <div className="lg:col-span-7">
          <TiltCard className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                  Senior Developer & Technical Lead
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  TechNest Nova • BUILTIN Soft
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-sans font-normal">
              {siteConfig.aboutText}
            </p>

            <div className="mt-8 pt-6 border-t border-[var(--border-color)] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                <span>BS IT Candidate</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent)]" />
                <span>Full-Stack & Mobile</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Highlight Grid / Stats */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {siteConfig.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <TiltCard className="p-6 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[var(--accent)]">
                    0{idx + 1}
                  </span>
                  <Award className="w-5 h-5 text-[var(--accent)]/60" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-[var(--text-primary)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
