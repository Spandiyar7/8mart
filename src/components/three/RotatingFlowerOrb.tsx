"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const PETAL = "M0,0 C9,-13 11,-30 0,-44 C-11,-30 -9,-13 0,0 Z";

function PetalRing({
  count,
  color,
  scale,
  depth,
  opacity,
}: {
  count: number;
  color: string;
  scale: number;
  depth: number;
  opacity: number;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `translateZ(${depth}px)` }}
    >
      <svg viewBox="-60 -60 120 120" className="h-full w-full">
        <g>
          {Array.from({ length: count }, (_, i) => (
            <path
              key={i}
              d={PETAL}
              fill={color}
              fillOpacity={opacity}
              transform={`rotate(${i * (360 / count)}) scale(${scale})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * A layered floral bloom that turns gently in 3D — pure CSS 3D transforms
 * (petal rings at staggered depths), no WebGL canvas. A premium section
 * accent that keeps the site's 3D language without the cost of a canvas.
 */
export function RotatingFlowerOrb({
  size = 220,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{ width: size, height: size, perspective: 720 }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={
          reducedMotion
            ? undefined
            : { rotateY: [-26, 26, -26], rotateX: [12, -8, 12] }
        }
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(217,21,114,0.42),transparent_70%)] blur-xl" />
        <PetalRing count={12} color="#ffd9e7" scale={1.05} depth={0} opacity={0.55} />
        <PetalRing count={10} color="#f7a8ca" scale={0.82} depth={28} opacity={0.7} />
        <PetalRing count={8} color="#d91572" scale={0.58} depth={54} opacity={0.85} />
        <div
          className="absolute inset-[43%] rounded-full bg-[radial-gradient(circle,#fff6fa,#f49ac6)]"
          style={{ transform: "translateZ(70px)" }}
        />
      </motion.div>
    </div>
  );
}
