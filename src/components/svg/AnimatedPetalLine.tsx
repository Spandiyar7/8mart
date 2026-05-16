"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const STROKE = "M6 36 C 58 8 100 64 152 36 C 204 8 246 64 296 36";
const BUDS = [
  { x: 6, y: 36 },
  { x: 79, y: 22 },
  { x: 152, y: 36 },
  { x: 225, y: 50 },
  { x: 296, y: 36 },
];
const TINY_PETAL = "M0,0 C1.7,-2.2 2.4,-5 0,-8 C-2.4,-5 -1.7,-2.2 0,0 Z";

/**
 * Decorative petal line — a flowing gradient stroke that draws itself in,
 * with small blooms popping along the curve. Used as a section accent.
 */
export function AnimatedPetalLine({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 302 72"
      fill="none"
      className={cn("w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="petalLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffd9e7" />
          <stop offset="50%" stopColor="#d91572" />
          <stop offset="100%" stopColor="#d6b98c" />
        </linearGradient>
      </defs>

      <motion.path
        d={STROKE}
        stroke="url(#petalLine)"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {BUDS.map((bud, index) => (
        <motion.g
          key={index}
          transform={`translate(${bud.x} ${bud.y})`}
          initial={
            reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5 + index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d={TINY_PETAL}
              transform={`rotate(${deg})`}
              fill="#d91572"
            />
          ))}
          <circle r="1.7" fill="#fff6fa" />
        </motion.g>
      ))}
    </svg>
  );
}
