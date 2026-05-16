"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

interface KineticTitleProps {
  /** One entry per visual line of the title. */
  lines: string[];
  /** Words rendered with the raspberry gradient (case-insensitive). */
  accent?: string[];
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
}

const normalize = (word: string) =>
  word.replace(/[.,!?;:«»()]/g, "").toLowerCase();

/**
 * Kinetic hero typography — words reveal one by one with a soft
 * perspective lift and a blur-to-clear transition. Inspired by the
 * Typeface Animator workflow, recreated entirely in code.
 */
export function KineticTitle({
  lines,
  accent = [],
  as = "h1",
  className,
  delay = 0,
}: KineticTitleProps) {
  const reducedMotion = useReducedMotion();
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  const accentSet = new Set(accent.map((word) => word.toLowerCase()));

  const hidden = { opacity: 0, y: "0.7em", rotateX: -60, filter: "blur(12px)" };
  const shown = { opacity: 1, y: "0em", rotateX: 0, filter: "blur(0px)" };

  let wordIndex = 0;

  return (
    <Tag
      className={cn("font-display tracking-tight text-graphite", className)}
      style={{ perspective: 900 }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word) => {
            const index = wordIndex++;
            const isAccent = accentSet.has(normalize(word));
            return (
              <motion.span
                key={index}
                className="mr-[0.26em] inline-block [transform-style:preserve-3d] last:mr-0"
                initial={reducedMotion ? shown : hidden}
                animate={shown}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.85, delay: delay + index * 0.075, ease: EASE }
                }
              >
                <span className={isAccent ? "text-gradient" : undefined}>
                  {word}
                </span>
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
