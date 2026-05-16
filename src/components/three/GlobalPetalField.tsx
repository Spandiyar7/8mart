"use client";

import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";

type Density = "light" | "medium" | "rich";

const DENSITY: Record<Density, number> = {
  light: 6,
  medium: 10,
  rich: 16,
};

/**
 * The site-wide petal system — one tuned, lightweight (CSS/SVG) petal
 * layer reused across sections so the whole site shares one petal
 * language without a canvas per section.
 */
export function GlobalPetalField({
  density = "medium",
  tone = "pink",
  seed = 1,
  className,
}: {
  density?: Density;
  tone?: "pink" | "soft" | "warm" | "deep";
  seed?: number;
  className?: string;
}) {
  return (
    <ParallaxPetalLayer
      count={DENSITY[density]}
      tone={tone}
      seed={seed}
      className={className}
    />
  );
}
