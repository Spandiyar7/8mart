"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur";

const OFFSETS: Record<RevealDirection, { x?: number; y?: number; scale?: number }> =
  {
    up: { y: 32 },
    down: { y: -32 },
    left: { x: 36 },
    right: { x: -36 },
    scale: { scale: 0.94 },
    blur: {},
  };

interface JitterRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Jitter-inspired reveal wrapper — content fades in with a soft
 * blur-to-clear transition and a directional slide as it enters the
 * viewport. Renders children statically under reduced motion.
 */
export function JitterReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
}: JitterRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
