"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { mulberry32 } from "@/lib/rng";
import { cn } from "@/lib/cn";

const PETAL_PATH = "M20,3 C27,11 26,27 20,37 C14,27 13,11 20,3 Z";

const TONES = {
  pink: ["#ffd9e7", "#f7a8ca", "#d91572", "#ffe4ef"],
  soft: ["#ffe4ef", "#ffffff", "#ffc2dc", "#fbd4e4"],
  warm: ["#ffe9c9", "#f29ac4", "#d6b98c", "#ffd9e7"],
  deep: ["#ef62a0", "#d91572", "#b80f5e", "#ffd9e7"],
};

const FLOAT_CLASSES = ["fx-float", "fx-float-soft"];

interface PetalSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  rotate: number;
  color: string;
  opacity: number;
  drift: number;
  floatClass: string;
}

function Petal({
  petal,
  progress,
  reducedMotion,
}: {
  petal: PetalSpec;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const y = useTransform(progress, [0, 1], [petal.drift, -petal.drift]);
  return (
    <motion.div
      className="absolute"
      style={{ left: petal.left, top: petal.top, y: reducedMotion ? 0 : y }}
    >
      <div className={cn(!reducedMotion && petal.floatClass)}>
        <svg
          width={petal.size}
          height={petal.size}
          viewBox="0 0 40 40"
          fill="none"
          style={{ opacity: petal.opacity }}
        >
          <path
            d={PETAL_PATH}
            fill={petal.color}
            transform={`rotate(${petal.rotate} 20 20)`}
          />
        </svg>
      </div>
    </motion.div>
  );
}

interface ParallaxPetalLayerProps {
  count?: number;
  tone?: keyof typeof TONES;
  seed?: number;
  className?: string;
}

/**
 * A drifting petal layer with scroll-linked depth parallax. Lightweight
 * (DOM + SVG, no canvas) so it can sit behind many sections cheaply.
 * Petal count is halved on mobile; motion freezes in still mode.
 */
export function ParallaxPetalLayer({
  count = 9,
  tone = "pink",
  seed = 1,
  className,
}: ParallaxPetalLayerProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const petals = useMemo<PetalSpec[]>(() => {
    const rng = mulberry32(seed * 7919 + count);
    const total = isMobile ? Math.ceil(count / 2) : count;
    const palette = TONES[tone];
    return Array.from({ length: total }, (_, i) => ({
      id: i,
      left: `${Math.round(rng() * 100)}%`,
      top: `${Math.round(rng() * 100)}%`,
      size: 14 + Math.round(rng() * 34),
      rotate: Math.round(rng() * 360),
      color: palette[Math.floor(rng() * palette.length)],
      opacity: 0.3 + rng() * 0.5,
      drift: 40 + rng() * 150,
      floatClass: FLOAT_CLASSES[Math.floor(rng() * FLOAT_CLASSES.length)],
    }));
  }, [count, tone, seed, isMobile]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {petals.map((petal) => (
        <Petal
          key={petal.id}
          petal={petal}
          progress={scrollYProgress}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
