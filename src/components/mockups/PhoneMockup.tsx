import * as React from "react";
import { cn } from "@/lib/cn";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Code-based phone mockup — a clean device frame with a dynamic island.
 * Inspired by Shots.so presentation mockups; drop a Shots.so export into
 * `public/mockups/shots/` and render it inside instead when available.
 */
export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto w-[16.5rem] sm:w-[18rem]", className)}>
      <div className="absolute -inset-7 -z-10 rounded-[3.4rem] bg-[radial-gradient(circle_at_50%_36%,rgba(217,21,114,0.4),transparent_68%)] blur-2xl" />

      <div className="relative aspect-[9/19.2] rounded-[2.7rem] border-[3px] border-graphite bg-graphite p-2.5 shadow-[0_40px_80px_-30px_rgba(37,38,43,0.6)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-warm-milk">
          <div className="absolute left-1/2 top-3 z-20 h-[1.35rem] w-[5.25rem] -translate-x-1/2 rounded-full bg-graphite" />
          {children}
        </div>
      </div>
    </div>
  );
}
