"use client";

import { useEffect } from "react";
import { scrollSignal } from "@/lib/scroll-progress";

/**
 * Writes the global scroll signal once per frame. The WebGL hero reads
 * `scrollSignal` (outside React) to drive scroll-linked motion without
 * prop drilling or re-renders. Rendered once, near the app root.
 */
export function ScrollSceneController() {
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const viewport = window.innerHeight || 1;
      scrollSignal.y = y;
      scrollSignal.hero = Math.min(1, Math.max(0, y / viewport));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
