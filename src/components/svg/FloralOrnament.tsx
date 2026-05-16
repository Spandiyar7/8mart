"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const VINE = "M206 14 C 150 36 178 92 120 112 C 70 130 100 168 42 196";
const LEAF = "M0,0 C6,-5 14,-4 20,2 C13,5 4,6 0,0 Z";
const PETAL = "M0,0 C2.6,-3.4 3.6,-7.6 0,-12 C-3.6,-7.6 -2.6,-3.4 0,0 Z";

const LEAVES = [
  { x: 178, y: 48, r: 40 },
  { x: 140, y: 96, r: -28 },
  { x: 96, y: 140, r: 68 },
  { x: 62, y: 172, r: -8 },
];
const BLOOMS = [
  { x: 120, y: 112 },
  { x: 42, y: 196 },
];

interface FloralOrnamentProps {
  className?: string;
  flip?: boolean;
}

/**
 * Decorative floral flourish — a curling vine with leaves and blooms that
 * draw themselves in. Used as a soft background ornament inside sections.
 */
export function FloralOrnament({ className, flip = false }: FloralOrnamentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 220 210"
      fill="none"
      aria-hidden="true"
      className={cn(flip && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id="ornament" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#d91572" />
          <stop offset="100%" stopColor="#d6b98c" />
        </linearGradient>
      </defs>

      <motion.path
        d={VINE}
        stroke="url(#ornament)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {LEAVES.map((leaf, index) => (
        <motion.path
          key={index}
          d={LEAF}
          fill="url(#ornament)"
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}
          initial={
            reducedMotion ? { scale: 1, opacity: 0.9 } : { scale: 0, opacity: 0 }
          }
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.16 }}
        />
      ))}

      {BLOOMS.map((bloom, index) => (
        <motion.g
          key={index}
          transform={`translate(${bloom.x} ${bloom.y})`}
          initial={
            reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 + index * 0.25 }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d={PETAL}
              transform={`rotate(${deg})`}
              fill="#d91572"
            />
          ))}
          <circle r="2.6" fill="#fff6fa" />
        </motion.g>
      ))}
    </svg>
  );
}
