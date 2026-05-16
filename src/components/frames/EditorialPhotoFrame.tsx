"use client";

import type { ReactNode } from "react";
import { ImageRevealMask } from "@/components/motion/ImageRevealMask";
import { FrameImage } from "@/components/frames/FrameImage";
import { cn } from "@/lib/cn";

interface EditorialPhotoFrameProps {
  src?: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  caption?: string;
  available?: boolean;
  sizes?: string;
}

/**
 * Editorial photo frame — an offset accent border behind a tall image,
 * with a caption. Magazine feel; used on the About page.
 */
export function EditorialPhotoFrame({
  src,
  alt,
  fallback,
  className,
  caption,
  available,
  sizes,
}: EditorialPhotoFrameProps) {
  return (
    <figure className={cn("group relative", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[1.6rem] border border-primary/30 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 sm:-inset-4"
      />
      <div className="card-shine relative overflow-hidden rounded-2xl ring-1 ring-white/55 shadow-[var(--shadow-soft)]">
        <ImageRevealMask direction="up" className="rounded-2xl">
          <div className="relative aspect-[4/5] w-full">
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
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.4),transparent_44%)]"
        />
      </div>
      {caption ? (
        <figcaption className="mt-5 flex items-center gap-2 text-sm text-soft-graphite">
          <span className="h-px w-6 bg-primary" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
