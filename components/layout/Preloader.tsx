"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already saw preloader in this session
    const hasSeen = sessionStorage.getItem("hm_preloader_seen");
    if (hasSeen) {
      setIsLoading(false);
      if (onComplete) onComplete();
      return;
    }

    // Smoothly step up percentage
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const next = Math.max(prev + 2, Math.floor(progress));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hm_preloader_seen", "true");
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-[#0A2218] text-[#F3EBDD] flex flex-col justify-between p-8 md:p-12 font-sans select-none"
        >
          {/* Top Wordmark */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C98A4B]/20 border border-[#C98A4B] flex items-center justify-center font-display font-bold text-xs text-[#C98A4B]">
                HM
              </div>
              <span className="font-display font-bold text-sm tracking-wider uppercase">
                Hafiz Hassan Mehmood
              </span>
            </div>
            <span className="font-mono text-xs text-[#E8DCC4]/60">PORTFOLIO '25</span>
          </div>

          {/* Center Title */}
          <div className="my-auto text-center max-w-xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F3EBDD] mb-3"
            >
              Crafting Digital Architecture
            </motion.h1>
            <p className="font-mono text-xs text-[#E8DCC4]/70 tracking-widest uppercase">
              TechNest Nova • Senior Software Developer
            </p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-md mx-auto flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#E8DCC4]/60 uppercase tracking-wider">Loading Environment</span>
              <span className="text-[#C98A4B] font-bold">{displayProgress}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[3px] bg-[#123D2B] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2F6B4F] via-[#C98A4B] to-[#F3EBDD]"
                style={{ width: `${displayProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
