"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setProgress, setActiveSection } = useScrollProgress();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function onScroll(e: any) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / (scrollHeight || 1)));
      setProgress(progress);

      // Determine active section
      const sections = ["hero", "about", "skills", "experience", "projects", "education", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.1) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    }

    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [setProgress, setActiveSection]);

  return <>{children}</>;
};
