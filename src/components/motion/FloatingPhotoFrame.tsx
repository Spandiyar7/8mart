"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

interface FloatingPhotoFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Idle float keyframe — vary across instances. */
  floatClassName?: string;
  delay?: number;
  rounded?: string;
}

/**
 * A glass-edged photo frame that fades in, then drifts on a slow loop.
 * Used for floating decorative photos around hero / editorial sections.
 */
export function FloatingPhotoFrame({
  children,
  className,
  floatClassName = "fx-float",
  delay = 0,
  rounded = "rounded-3xl",
}: FloatingPhotoFrameProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.86, y: 22 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={cn(!reducedMotion && floatClassName)}>
        <div
          className={cn(
            "card-shine relative overflow-hidden ring-1 ring-white/70",
            "shadow-[0_34px_70px_-30px_rgba(138,18,63,0.5)]",
            rounded,
          )}
        >
          {children}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              rounded,
              "bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_40%)]",
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
