"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

type BgTone = "pink" | "warm" | "rose" | "milk";

const TONES: Record<BgTone, [string, string]> = {
  pink: ["rgba(217,21,114,0.22)", "rgba(255,228,239,0.6)"],
  warm: ["rgba(214,185,140,0.34)", "rgba(255,228,239,0.5)"],
  rose: ["rgba(138,18,63,0.2)", "rgba(217,21,114,0.18)"],
  milk: ["rgba(255,228,239,0.7)", "rgba(214,185,140,0.28)"],
};

/**
 * Soft animated gradient-glow backdrop for a section. Sits behind content
 * as `absolute inset-0`. The glow drifts slowly; frozen in still mode.
 */
export function MotionBackground({
  tone = "pink",
  className,
}: {
  tone?: BgTone;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [a, b] = TONES[tone];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute -left-[12%] top-[-18%] h-[48vh] w-[48vh] rounded-full blur-3xl",
          !reducedMotion && "fx-aurora",
        )}
        style={{ background: `radial-gradient(circle, ${a}, transparent 70%)` }}
      />
      <div
        className={cn(
          "absolute -right-[10%] bottom-[-20%] h-[44vh] w-[44vh] rounded-full blur-3xl",
          !reducedMotion && "fx-aurora",
        )}
        style={{
          background: `radial-gradient(circle, ${b}, transparent 72%)`,
          animationDelay: "-7s",
        }}
      />
    </div>
  );
}
