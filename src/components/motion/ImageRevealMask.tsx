"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

type RevealDirection = "left" | "right" | "up" | "down";

const ORIGIN: Record<RevealDirection, string> = {
  left: "left",
  right: "right",
  up: "top",
  down: "bottom",
};

interface ImageRevealMaskProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
}

/**
 * Reveals its content with a coloured panel that wipes away on scroll-in,
 * while the content settles from a slight scale — a premium image reveal.
 */
export function ImageRevealMask({
  children,
  className,
  direction = "right",
  delay = 0,
}: ImageRevealMaskProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", className)}>{children}</div>
    );
  }

  const isHorizontal = direction === "left" || direction === "right";
  const maskInitial = isHorizontal ? { scaleX: 1 } : { scaleY: 1 };
  const maskTarget = isHorizontal ? { scaleX: 0 } : { scaleY: 0 };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-br from-primary to-deep-rose"
        style={{ transformOrigin: ORIGIN[direction] }}
        initial={maskInitial}
        whileInView={maskTarget}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, delay, ease: [0.7, 0, 0.2, 1] }}
      />
    </div>
  );
}
