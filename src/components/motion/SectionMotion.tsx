"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

interface SectionMotionProps {
  children: React.ReactNode;
  className?: string;
  /** Entrance offset in px. */
  y?: number;
  delay?: number;
  as?: "div" | "section";
}

/**
 * Cinematic block reveal — content rises and fades as the section scrolls
 * into view. Renders a plain element in still mode / reduced motion.
 */
export function SectionMotion({
  children,
  className,
  y = 44,
  delay = 0,
  as = "div",
}: SectionMotionProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
