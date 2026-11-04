"use client";

import React from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export const ScrollProgress: React.FC = () => {
  const { progress } = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--green-mid)] via-[var(--accent)] to-[var(--sand-light)] transition-all duration-150 ease-out shadow-sm shadow-[var(--accent)]/50"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
};
