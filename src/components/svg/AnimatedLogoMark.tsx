"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const OUTER_PETAL = "M0,0 C5.4,-7 7.4,-16.5 0,-27 C-7.4,-16.5 -5.4,-7 0,0 Z";
const INNER_PETAL = "M0,0 C3.4,-4.4 4.6,-10.4 0,-16.6 C-4.6,-10.4 -3.4,-4.4 0,0 Z";

interface AnimatedLogoMarkProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

/**
 * Animated 8MART bloom mark. On mount the flower scales open from its
 * core, then turns on an extremely slow loop. Inspired by an SVGator
 * export — implemented in code so it needs no external asset.
 */
export function AnimatedLogoMark({
  size = 40,
  className,
  animate = true,
}: AnimatedLogoMarkProps) {
  const reducedMotion = useReducedMotion();
  const live = animate && !reducedMotion;

  const outer = Array.from({ length: 8 }, (_, i) => i * 45);
  const inner = Array.from({ length: 6 }, (_, i) => i * 60 + 30);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="logoMarkOuter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef62a0" />
          <stop offset="55%" stopColor="#d91572" />
          <stop offset="100%" stopColor="#8a123f" />
        </linearGradient>
        <linearGradient id="logoMarkInner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe4ef" />
          <stop offset="100%" stopColor="#ff9ec8" />
        </linearGradient>
      </defs>

      <motion.g
        style={{ transformOrigin: "40px 40px" }}
        animate={live ? { rotate: 360 } : undefined}
        transition={
          live ? { duration: 95, repeat: Infinity, ease: "linear" } : undefined
        }
      >
        <motion.g
          style={{ transformOrigin: "40px 40px" }}
          initial={live ? { scale: 0.4, opacity: 0, rotate: -45 } : false}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <g transform="translate(40 40)">
            {outer.map((deg) => (
              <path
                key={`o${deg}`}
                d={OUTER_PETAL}
                fill="url(#logoMarkOuter)"
                transform={`rotate(${deg})`}
              />
            ))}
            {inner.map((deg) => (
              <path
                key={`i${deg}`}
                d={INNER_PETAL}
                fill="url(#logoMarkInner)"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle r="6" fill="#fff6fa" />
            <circle r="3" fill="#d91572" />
          </g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
