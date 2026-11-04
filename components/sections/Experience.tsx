"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { experiences } from "@/data/experience";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="03"
        title="Professional Experience"
        subtitle="A history of technical leadership, full-stack architecture, and agile sprint execution."
      />

      <div className="relative border-l-2 border-[var(--border-color)] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {/* Animated glowing vertical timeline line overlay */}
        <motion.div
          className="absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-[var(--accent)] via-[var(--green-mid)] to-[var(--accent)]"
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {experiences.map((exp, idx) => {
          const isProminent = exp.isProminent;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isProminent
                    ? "bg-[var(--accent)] border-[var(--sand-light)] shadow-lg shadow-[var(--accent)]/50 scale-125"
                    : "bg-[var(--bg-deep)] border-[var(--accent)]"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isProminent ? "bg-stone-900" : "bg-[var(--accent)]"
                  }`}
                />
              </div>

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
      </div>
    </section>
  );
};
