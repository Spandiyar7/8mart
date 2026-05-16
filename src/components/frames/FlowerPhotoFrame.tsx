"use client";

import type { ReactNode } from "react";
import { DepthCard } from "@/components/motion/DepthCard";
import { ImageRevealMask } from "@/components/motion/ImageRevealMask";
import { FrameImage } from "@/components/frames/FrameImage";
import { cn } from "@/lib/cn";

function FloralCorner() {
  return (
    <svg
      viewBox="0 0 60 60"
      className="pointer-events-none absolute right-2 top-2 w-12 opacity-70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M56 4 C40 8 44 24 30 30"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M30,30 C31.6,26.6 32.4,22.6 30,18 C27.6,22.6 28.4,26.6 30,30 Z"
          fill="rgba(255,255,255,0.9)"
          transform={`rotate(${deg} 30 30)`}
        />
      ))}
    </svg>
  );
}

function PetalBurst() {
  const petals = [
    { left: "12%", top: "18%", size: 18, delay: "0ms" },
    { left: "82%", top: "62%", size: 14, delay: "70ms" },
    { left: "30%", top: "80%", size: 22, delay: "140ms" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {petals.map((petal, index) => (
        <div
          key={index}
          className="absolute -translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-90"
          style={{ left: petal.left, top: petal.top, transitionDelay: petal.delay }}
        >
          <svg width={petal.size} height={petal.size} viewBox="0 0 40 40">
            <path
              d="M20,3 C27,11 26,27 20,37 C14,27 13,11 20,3 Z"
              fill="#ffe4ef"
              transform={`rotate(${index * 55} 20 20)`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

interface FlowerPhotoFrameProps {
  src?: string;
  alt: string;
  fallback: ReactNode;
  /** Sizing classes (aspect ratio / width / height). */
  className?: string;
  rounded?: string;
  tilt?: boolean;
  reveal?: boolean;
  corner?: boolean;
  petals?: boolean;
  sizes?: string;
  available?: boolean;
}

/**
 * The core premium photo frame — glass edge, soft shadow, inner highlight,
 * hover shine, optional 3D tilt, scroll reveal, floral corner and petal
 * overlay. Shows a real photo when available, a generated bloom otherwise.
 */
export function FlowerPhotoFrame({
  src,
  alt,
  fallback,
  className,
  rounded = "rounded-3xl",
  tilt = true,
  reveal = true,
  corner = false,
  petals = false,
  sizes,
  available,
}: FlowerPhotoFrameProps) {
  const photo = (
    <div className="relative h-full w-full">
      <FrameImage
        src={src}
        alt={alt}
        fallback={fallback}
        sizes={sizes}
        available={available}
      />
    </div>
  );

  const frame = (
    <div
      className={cn(
        "card-shine group relative overflow-hidden ring-1 ring-white/65 shadow-[var(--shadow-soft)]",
        rounded,
        className,
      )}
    >
      {reveal ? (
        <ImageRevealMask className={cn("h-full w-full", rounded)}>
          {photo}
        </ImageRevealMask>
      ) : (
        photo
      )}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          rounded,
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.42),transparent_44%)]",
        )}
      />
      {corner ? <FloralCorner /> : null}
      {petals ? <PetalBurst /> : null}
    </div>
  );

  return tilt ? (
    <DepthCard className={rounded} glare={false}>
      {frame}
    </DepthCard>
  ) : (
    frame
  );
}
