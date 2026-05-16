import * as React from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  /** Full-bleed layer rendered behind the container (petals, glows). */
  background?: React.ReactNode;
  /** Render without the centered max-width container. */
  bare?: boolean;
}

/**
 * Consistent vertical rhythm + max-width container for page sections,
 * with an optional full-bleed background layer for motion accents.
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
  background,
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-20 sm:py-28", className)}
    >
      {background}
      {bare ? (
        children
      ) : (
        <div
          className={cn(
            "relative z-10 mx-auto max-w-7xl px-5 sm:px-6",
            containerClassName,
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
