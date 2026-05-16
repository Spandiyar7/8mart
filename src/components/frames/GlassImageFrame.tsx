"use client";

import type { ReactNode } from "react";
import { ImageRevealMask } from "@/components/motion/ImageRevealMask";
import { FrameImage } from "@/components/frames/FrameImage";
import { cn } from "@/lib/cn";

interface GlassImageFrameProps {
  src?: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  available?: boolean;
  sizes?: string;
}

/**
 * Glassmorphism photo frame — a frosted glass border around the photo.
 * Used for baskets/boxes categories and delivery imagery.
 */
export function GlassImageFrame({
  src,
  alt,
  fallback,
  className,
  available,
  sizes,
}: GlassImageFrameProps) {
  return (
    <div className={cn("glass card-shine rounded-3xl p-2.5", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.1rem]">
        <ImageRevealMask className="h-full w-full rounded-[1.1rem]">
          <div className="relative h-full w-full">
            <FrameImage
              src={src}
              alt={alt}
              fallback={fallback}
              available={available}
              sizes={sizes}
            />
          </div>
        </ImageRevealMask>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_45%)]"
        />
      </div>
    </div>
  );
}
