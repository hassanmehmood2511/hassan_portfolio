"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SECTIONS = ["hero", "about", "skills", "experience", "projects", "education", "contact"];

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setActiveSection } = useScrollProgress();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !reduced,
      touchMultiplier: 1.6,
      // Smoothly glide to in-page links (#contact etc.), clearing the fixed header
      anchors: { offset: -88 },
    });

    function onScroll() {
      // Only updates React state when the active section actually changes
      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.1) {
          setActiveSection(sectionId);
          break;
        }
      }
    }

    lenis.on("scroll", onScroll);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [setActiveSection]);

  return <>{children}</>;
};
