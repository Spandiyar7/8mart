"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const PETAL = "M0,0 C4,-6 5,-14 0,-21 C-5,-14 -4,-6 0,0 Z";

function MiniBloom({ x, y, scale, color }: { x: number; y: number; scale: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path key={deg} d={PETAL} fill={color} transform={`rotate(${deg})`} />
      ))}
      <circle r="3" fill="#fff6fa" />
    </g>
  );
}

/**
 * A small floating bouquet accent in a glass disc — CSS 3D float, no
 * canvas. Used as a decorative motion accent beside section content.
 */
export function FloatingBouquetMini({
  size = 132,
  className,
  delay = 0,
}: {
  size?: number;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={cn("h-full w-full", !reducedMotion && "fx-float")}>
        <div className="glass grid h-full w-full place-items-center rounded-full">
          <svg viewBox="0 0 120 120" className="h-[78%] w-[78%]">
            <g transform="rotate(-12 60 60)">
              <path
                d="M60 96 C46 78 40 60 44 40 M60 96 C74 78 80 60 76 40 M60 96 L60 52"
                stroke="#3f6f3a"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <MiniBloom x={44} y={38} scale={1} color="#d91572" />
              <MiniBloom x={76} y={38} scale={0.92} color="#ef62a0" />
              <MiniBloom x={60} y={48} scale={1.08} color="#ffb3d2" />
              <path
                d="M40 96 Q60 88 80 96 L74 110 Q60 116 46 110 Z"
                fill="#ffe4ef"
                stroke="#f7a8ca"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
