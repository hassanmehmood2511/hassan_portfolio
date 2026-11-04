"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Download, ExternalLink, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-30 bg-[var(--bg-deep)]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 md:hidden"
        >
          {/* Links */}
          <div className="flex flex-col gap-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-2">
              Navigation
            </div>
            {links.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="font-display text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between py-2 border-b border-[var(--border-color)]/40"
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs text-[var(--accent)]">0{idx + 1}</span>
              </motion.a>
            ))}
          </div>

          {/* Company Badge & Actions */}
          <div className="flex flex-col gap-4 pt-6">
            <a
              href={siteConfig.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-xs font-mono text-[var(--accent)]"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Part of {siteConfig.companyName}
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.cvUrl}
              download="Hafiz_Hassan_Mehmood_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-stone-900 font-bold text-center text-sm flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center justify-around pt-2 border-t border-[var(--border-color)]">
              <a
                href={siteConfig.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
