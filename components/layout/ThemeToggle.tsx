"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full border border-[var(--border-color)]" />;
  }

  const isDark = theme === "dark" || theme === "system";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      data-cursor="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-amber-500" />
      </motion.div>
    </button>
  );
};
