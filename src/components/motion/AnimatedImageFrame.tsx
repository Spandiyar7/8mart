import * as React from "react";
import { ImageRevealMask } from "@/components/motion/ImageRevealMask";
import { cn } from "@/lib/cn";

interface AnimatedImageFrameProps {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
  /** Disable the wipe reveal (e.g. for already-revealed contexts). */
  reveal?: boolean;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

/**
 * Generic animated image frame — a soft-shadowed, glass-edged surface
 * with a hover shine and an inner highlight, plus a scroll reveal.
 */
export function AnimatedImageFrame({
  children,
  className,
  rounded = "rounded-3xl",
  reveal = true,
  direction = "right",
  delay = 0,
}: AnimatedImageFrameProps) {
  const inner = (
    <>
      {children}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          rounded,
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_42%)]",
        )}
      />
    </>
  );

  return (
    <div
      className={cn(
        "card-shine relative ring-1 ring-white/60 shadow-[var(--shadow-soft)]",
        rounded,
        className,
      )}
    >
      {reveal ? (
        <ImageRevealMask
          direction={direction}
          delay={delay}
          className={cn("h-full w-full", rounded)}
        >
          {inner}
        </ImageRevealMask>
      ) : (
        <div className={cn("relative h-full w-full overflow-hidden", rounded)}>
          {inner}
        </div>
      )}
    </div>
  );
}
