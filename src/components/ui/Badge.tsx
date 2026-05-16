import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "hit" | "new" | "deal" | "neutral" | "glass" | "fresh";

const tones: Record<BadgeTone, string> = {
  hit: "bg-primary text-white shadow-[0_8px_20px_-8px_rgba(217,21,114,0.8)]",
  new: "bg-graphite text-white",
  deal: "bg-gold-beige text-graphite",
  neutral: "bg-light-pink text-deep-rose",
  glass: "glass text-graphite",
  fresh: "bg-leaf-green/12 text-leaf-green ring-1 ring-leaf-green/25",
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Compact pill — merchandising flags, hero proof points and freshness tags.
 */
export function Badge({ tone = "neutral", className, icon, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-tight",
        tones[tone],
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
    </span>
  );
}
