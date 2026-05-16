"use client";

import { FlowerPhotoFrame } from "@/components/frames/FlowerPhotoFrame";
import { ProductMedia } from "@/components/ui/ProductMedia";
import type { Product } from "@/types/product";

interface ProductPhotoFrameProps {
  product: Product;
  /** Which gallery image to show (index into `product.images`). */
  imageIndex?: number;
  className?: string;
  rounded?: string;
  tilt?: boolean;
  reveal?: boolean;
  petals?: boolean;
  corner?: boolean;
  sizes?: string;
}

/**
 * Luxury display frame for a product photo. Uses the real photo from
 * `product.images` when available, otherwise the generated bloom.
 */
export function ProductPhotoFrame({
  product,
  imageIndex = 0,
  className,
  rounded = "rounded-3xl",
  tilt = true,
  reveal = true,
  petals = true,
  corner = true,
  sizes,
}: ProductPhotoFrameProps) {
  const src = product.images[imageIndex] ?? product.image;

  return (
    <FlowerPhotoFrame
      src={src}
      alt={product.name}
      fallback={
        <ProductMedia
          product={product}
          seed={imageIndex}
          rounded="rounded-none"
          className="h-full w-full"
        />
      }
      className={className}
      rounded={rounded}
      tilt={tilt}
      reveal={reveal}
      petals={petals}
      corner={corner}
      sizes={sizes}
    />
  );
}
