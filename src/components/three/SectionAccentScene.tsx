"use client";

import { RotatingFlowerOrb } from "@/components/three/RotatingFlowerOrb";
import { cn } from "@/lib/cn";

/**
 * A composed decorative accent — a rotating floral orb with a soft glow,
 * positioned in a section corner. CSS 3D, no canvas.
 */
export function SectionAccentScene({
  size = 240,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
    >
      <div className="relative">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,228,239,0.8),transparent_70%)] blur-2xl"
          style={{ width: size * 1.4, height: size * 1.4 }}
        />
        <RotatingFlowerOrb size={size} />
      </div>
    </div>
  );
}
