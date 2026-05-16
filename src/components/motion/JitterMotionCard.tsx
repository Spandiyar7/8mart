"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

interface JitterMotionCardProps {
  children: React.ReactNode;
  className?: string;
  /** Position in a list — drives the staggered reveal. */
  index?: number;
  hover?: boolean;
}

/**
 * Jitter-inspired card reveal — the card scales and fades up with a
 * timeline-style stagger, then lifts on hover. Used for category,
 * feature and proof cards across the site.
 */
export function JitterMotionCard({
  children,
  className,
  index = 0,
  hover = true,
}: JitterMotionCardProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.62, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -6 } : undefined}
    >
      {children}
    </motion.div>
  );
}
