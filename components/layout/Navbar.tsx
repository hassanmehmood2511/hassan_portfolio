"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "../ui/MagneticButton";
import { Menu, X, Download } from "lucide-react";
import { MenuOverlay } from "./MenuOverlay";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[var(--bg-deep)]/80 backdrop-blur-md border-b border-[var(--border-color)] shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group"
            data-cursor="Home"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[var(--accent)]/60 ring-offset-2 ring-offset-[var(--bg-deep)] shrink-0 group-hover:ring-[var(--accent)] group-hover:scale-105 group-hover:shadow-md group-hover:shadow-[var(--accent)]/25 transition-all">
              <Image
                src="/profile/hassan.jpg"
                alt={siteConfig.name}
                fill
                sizes="40px"
                priority
                className="object-cover object-top"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm tracking-wide text-[var(--text-primary)]">
                {siteConfig.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                Senior Dev @ TechNest Nova
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--card-bg)]/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[var(--border-color)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-full hover:bg-[var(--accent)]/10"
                data-cursor={link.name}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Hire Me Button: glides to the contact form */}
            <a href="#contact" className="inline-flex" aria-label="Hire me: go to the contact form">
              <MagneticButton
                cursorLabel="Hire Me"
                className="relative px-4 py-2 text-xs font-semibold rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-stone-900 transition-colors flex items-center gap-2"
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span>Hire Me</span>
              </MagneticButton>
            </a>

            {/* Download CV Button */}
            <a
              href={siteConfig.cvUrl}
              download="Hafiz_Hassan_Mehmood_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex"
            >
              <MagneticButton
                cursorLabel="Download CV"
                className="px-4 py-2 text-xs font-semibold rounded-full bg-[var(--accent)] text-stone-900 hover:bg-[var(--accent-hover)] shadow-md shadow-[var(--accent)]/20 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </MagneticButton>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <MenuOverlay
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
};
