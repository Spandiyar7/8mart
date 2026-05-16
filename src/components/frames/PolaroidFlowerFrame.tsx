"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FrameImage } from "@/components/frames/FrameImage";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

interface PolaroidFlowerFrameProps {
  src?: string;
  alt: string;
  fallback: ReactNode;
  caption?: string;
  /** Resting tilt in degrees. */
  rotate?: number;
  className?: string;
  available?: boolean;
  sizes?: string;
}

/**
 * Polaroid-style frame — thick white border, caption strip and a resting
 * tilt that straightens and lifts on hover.
 */
export function PolaroidFlowerFrame({
  src,
  alt,
  fallback,
  caption,
  rotate = -4,
  className,
  available,
  sizes,
}: PolaroidFlowerFrameProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "card-shine rounded-[4px] bg-white p-3 pb-11 shadow-[0_28px_56px_-26px_rgba(37,38,43,0.5)]",
        className,
      )}
      initial={reducedMotion ? false : { rotate, opacity: 0, y: 24 }}
      whileInView={{ rotate, opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { rotate: 0, y: -8, scale: 1.03 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[2px]">
        <FrameImage
          src={src}
          alt={alt}
          fallback={fallback}
          available={available}
          sizes={sizes}
        />
      </div>
      {caption ? (
        <p className="mt-3 text-center font-display text-sm text-graphite">
          {caption}
        </p>
      ) : null}
    </motion.div>
  );
}
