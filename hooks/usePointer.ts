"use client";

import { useEffect, useState } from "react";

export interface PointerState {
  x: number; // Normalized -1 to 1
  y: number; // Normalized -1 to 1
  pixelX: number;
  pixelY: number;
  hoverText: string | null;
  isPointerFine: boolean;
}

export function usePointer(): PointerState {
  const [pointer, setPointer] = useState<PointerState>({
    x: 0,
    y: 0,
    pixelX: 0,
    pixelY: 0,
    hoverText: null,
    isPointerFine: true,
  });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Check for cursor text data attribute on target or ancestor
      let target = e.target as HTMLElement | null;
      let label: string | null = null;

      while (target && target !== document.body) {
        if (target.dataset && target.dataset.cursor) {
          label = target.dataset.cursor;
          break;
        }
        if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.getAttribute("role") === "button"
        ) {
          label = label || "Click";
        }
        target = target.parentElement;
      }

      setPointer({
        x: normX,
        y: normY,
        pixelX: e.clientX,
        pixelY: e.clientY,
        hoverText: label,
        isPointerFine: isFine,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return pointer;
}
