"use client";

import React, { useEffect, useRef } from "react";

/**
 * Fixed, full-page ambient background.
 * A forest-green base with soft sand-beige light that slowly drifts on its own
 * and warms gradually as the page scrolls. Only transform and opacity change,
 * so the browser can animate it on the GPU without repainting the page.
 */
export const AmbientBackground: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    let target = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    const tick = () => {
      // Ease toward the scroll position so the colour shift never jumps
      current += (target - current) * (reduced ? 1 : 0.08);
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translate3d(0, ${(-current * 18).toFixed(3)}%, 0)`;
      }
      if (washRef.current) {
        washRef.current.style.setProperty("--p", current.toFixed(4));
      }
      if (Math.abs(target - current) > 0.0005) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onScroll = () => {
      readScroll();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    readScroll();
    current = target;
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="ambient-bg fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Scroll-shifted gradient sheet */}
      <div ref={sheetRef} className="ambient-sheet absolute will-change-transform">
        <div className="ambient-glow ambient-glow--forest" />
        <div className="ambient-glow ambient-glow--sand" />
        <div className="ambient-glow ambient-glow--copper" />
      </div>
      {/* Sand-beige wash that grows slightly stronger further down the page */}
      <div ref={washRef} className="ambient-wash absolute inset-0" />
    </div>
  );
};
