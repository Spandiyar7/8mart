"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const ROUTE = "M34 96 C 120 26 210 132 306 52";

/**
 * Animated delivery route — a dashed path that draws from the 8MART
 * warehouse to the customer, with a courier marker travelling the line.
 * The marker uses SMIL so it follows the path reliably without JS.
 */
export function DeliveryRouteLine({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 340 140"
      fill="none"
      className={cn("w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="route" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#d91572" />
          <stop offset="100%" stopColor="#8a123f" />
        </linearGradient>
      </defs>

      <motion.path
        d={ROUTE}
        stroke="url(#route)"
        strokeWidth="2.6"
        strokeDasharray="2 9"
        strokeLinecap="round"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Start — the warehouse */}
      <g transform="translate(34 96)">
        <circle r="11" fill="#ffe4ef" />
        <circle r="5.5" fill="#d91572" />
      </g>

      {/* End — the customer */}
      <g transform="translate(306 52)">
        <circle r="13" fill="#d91572" />
        <path d="M-5 2 L0 -6 L5 2 L5 7 L-5 7 Z" fill="#fff6fa" />
      </g>

      {/* Courier marker */}
      {reducedMotion ? (
        <g transform="translate(170 74)">
          <circle r="6.5" fill="#fff6fa" stroke="#d91572" strokeWidth="2.5" />
        </g>
      ) : (
        <circle r="6.5" fill="#fff6fa" stroke="#d91572" strokeWidth="2.5">
          <animateMotion
            dur="4.4s"
            repeatCount="indefinite"
            path={ROUTE}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          />
        </circle>
      )}
    </svg>
  );
}
