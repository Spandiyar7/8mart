"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

type CardAccent = "pink" | "green" | "gold";

const accents: Record<CardAccent, string> = {
  pink: "bg-primary/12 text-primary",
  green: "bg-leaf-green/14 text-leaf-green",
  gold: "bg-gold-beige/30 text-deep-rose",
};

interface FloatingGlassCardProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
  delay?: number;
  accent?: CardAccent;
  /** Idle float keyframe class — vary across cards so they drift apart. */
  floatClassName?: string;
}

/**
 * A frosted glass proof card that floats around the hero sculpture —
 * fades and scales in, then drifts gently on a slow loop.
 */
export function FloatingGlassCard({
  icon,
  label,
  sublabel,
  className,
  delay = 0,
  accent = "pink",
  floatClassName = "fx-float",
}: FloatingGlassCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute", className)}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.8, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "glass flex items-center gap-3 rounded-2xl px-3.5 py-2.5",
          !reducedMotion && floatClassName,
        )}
      >
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
            accents[accent],
          )}
        >
          {icon}
        </span>
        <div className="leading-tight">
          <p className="whitespace-nowrap text-sm font-semibold text-graphite">
            {label}
          </p>
          {sublabel ? (
            <p className="whitespace-nowrap text-xs text-soft-graphite">
              {sublabel}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
