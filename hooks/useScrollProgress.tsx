"use client";

import React, { createContext, useContext, useState } from "react";

interface ScrollContextType {
  progress: number; // 0 to 1
  activeSection: string;
  setProgress: (p: number) => void;
  setActiveSection: (section: string) => void;
  scrollToSection: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  progress: 0,
  activeSection: "hero",
  setProgress: () => {},
  setActiveSection: () => {},
  scrollToSection: () => {},
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        progress,
        activeSection,
        setProgress,
        setActiveSection,
        scrollToSection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export function useScrollProgress() {
  return useContext(ScrollContext);
}
