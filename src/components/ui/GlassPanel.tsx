import * as React from "react";
import { cn } from "@/lib/cn";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "light" | "dark";
  as?: "div" | "section" | "header";
};

/**
 * Reusable frosted-glass surface. Used for the header, floating cards
 * and badge rows so the glassmorphism stays consistent across the hero.
 */
export function GlassPanel({
  tone = "light",
  as = "div",
  className,
  children,
  ...props
}: GlassPanelProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        tone === "light" ? "glass" : "glass-dark",
        "rounded-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
