"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ExternalLink, Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

export const Footer: React.FC = () => {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-deep)] text-[var(--text-primary)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left column: Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/40 flex items-center justify-center font-display font-bold text-xs text-[var(--accent)]">
              HM
            </div>
            <span className="font-display font-bold text-base tracking-wide text-[var(--text-primary)]">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-md">
            {siteConfig.headline} • Crafting robust backends and elegant mobile/web experiences.
          </p>
        </div>

        {/* Center column: Company Badge */}
        <div className="flex flex-col items-center gap-2">
          <a
            href={siteConfig.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-all shadow-sm"
            data-cursor="TechNest Nova"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Part of {siteConfig.companyName}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
          <span className="text-[11px] text-[var(--text-muted)]">
            Location: {siteConfig.location}
          </span>
        </div>

        {/* Right column: Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
            aria-label="GitHub Profile"
            data-cursor="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
            aria-label="LinkedIn Profile"
            data-cursor="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
            aria-label="Send Email"
            data-cursor="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="p-2.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-stone-900 transition-all ml-2"
            data-cursor="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[var(--border-color)]/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-2">
        <div>
          © {year} {siteConfig.name}. All rights reserved.
        </div>
        <div>
          Designed & Built with Next.js, Three.js & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};
