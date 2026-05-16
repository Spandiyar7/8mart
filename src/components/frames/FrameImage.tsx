"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import { productPhotosAvailable } from "@/config/media";
import { cn } from "@/lib/cn";

interface FrameImageProps {
  /** Photo path under `public/`, e.g. `/products/rose-25.jpg`. */
  src?: string;
  alt: string;
  /** Premium generated visual shown when no real photo is available. */
  fallback: ReactNode;
  /** Override the global availability flag (e.g. brand photos). */
  available?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Renders a real photo with `next/image` when one is available, otherwise
 * a premium generated fallback — so the layout is ready for real photos
 * but never shows a broken image or grey box.
 *
 * The caller must provide a `relative`, sized container.
 */
export function FrameImage({
  src,
  alt,
  fallback,
  available = productPhotosAvailable,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className,
}: FrameImageProps) {
  const [failed, setFailed] = useState(false);

  if (available && src && !failed) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", className)}
        onError={() => setFailed(true)}
      />
    );
  }

  return <div className="absolute inset-0">{fallback}</div>;
}
