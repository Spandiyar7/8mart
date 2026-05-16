"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

interface ScrollMarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
}

function MarqueeRow({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-lg text-graphite sm:text-xl">
            {item}
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((deg) => (
              <path
                key={deg}
                d="M8,8 C9,5.5 9.6,3 8,0.5 C6.4,3 7,5.5 8,8 Z"
                fill="#d91572"
                transform={`rotate(${deg} 8 8)`}
              />
            ))}
          </svg>
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite horizontal ribbon of brand phrases — a motion-design accent
 * strip. Frozen (static) in still mode / reduced motion.
 */
export function ScrollMarquee({
  items,
  className,
  speed = 32,
}: ScrollMarqueeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-graphite/8 bg-light-pink/40 py-4",
        className,
      )}
    >
      <div
        className={cn("flex", !reducedMotion && "fx-marquee")}
        style={reducedMotion ? undefined : { animationDuration: `${speed}s` }}
      >
        <MarqueeRow items={items} />
        <MarqueeRow items={items} hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-warm-milk to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-warm-milk to-transparent" />
    </div>
  );
}
