"use client";

import * as React from "react";
import { useEffect } from "react";
import { useLenis } from "@/lib/useLenis";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollSceneController } from "@/components/motion/ScrollSceneController";

/**
 * Mounts Lenis smooth scrolling and the global scroll signal for the
 * whole app. Also toggles the `motion-off` class on `<html>` so visual-QA
 * still mode freezes every CSS animation. Rendered once in the root layout.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", reducedMotion);
  }, [reducedMotion]);

  return (
    <>
      <ScrollSceneController />
      {children}
    </>
  );
}
