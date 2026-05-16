"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Loaded on demand — `lottie-web` only ships if a real animation is found.
const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.default), {
  ssr: false,
});

interface LottieSlotProps {
  /** Path to a Lottie JSON, e.g. `/motion/jitter/badge.json`. */
  src: string;
  /** Code-based animation shown when the JSON is missing. */
  fallback: React.ReactNode;
  className?: string;
  loop?: boolean;
}

/**
 * Renders a Jitter-exported Lottie animation when its JSON file exists,
 * otherwise the code-based Framer Motion fallback. The site never breaks
 * when motion assets are absent.
 */
export function LottieSlot({
  src,
  fallback,
  className,
  loop = true,
}: LottieSlotProps) {
  const reducedMotion = useReducedMotion();
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error("missing");
        return response.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        /* No exported asset — the fallback stays. */
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (data) {
    return (
      <div className={className}>
        <Lottie animationData={data} loop={loop} autoplay={!reducedMotion} />
      </div>
    );
  }

  return <>{fallback}</>;
}
