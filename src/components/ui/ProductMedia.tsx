import { cn } from "@/lib/cn";
import type { Product, ProductColor } from "@/types/product";

/**
 * Premium gradient + SVG bloom placeholder for product imagery.
 *
 * Real photography can be dropped in later (paths live in
 * `data/products.ts`); until then every product renders a colour-matched
 * abstract bloom — never an empty grey box.
 */

const THEMES: Record<
  ProductColor,
  { from: string; via: string; to: string; glow: string }
> = {
  pink: { from: "#fff1f6", via: "#f7a8ca", to: "#d91572", glow: "rgba(217,21,114,0.45)" },
  red: { from: "#ffe1e6", via: "#e8537f", to: "#8a123f", glow: "rgba(138,18,63,0.5)" },
  white: { from: "#ffffff", via: "#fff0f5", to: "#ffd2e4", glow: "rgba(214,185,140,0.42)" },
  burgundy: { from: "#f6cdda", via: "#b80f5e", to: "#5c0c2b", glow: "rgba(92,12,43,0.55)" },
  mix: { from: "#ffe9c9", via: "#f29ac4", to: "#d91572", glow: "rgba(217,21,114,0.42)" },
};

const PETAL = "M0,0 C9,-13 13,-30 0,-50 C-13,-30 -9,-13 0,0 Z";
const RINGS = [
  { count: 12, scale: 1, opacity: 0.26, offset: 0 },
  { count: 9, scale: 0.72, opacity: 0.4, offset: 20 },
  { count: 6, scale: 0.46, opacity: 0.56, offset: 12 },
];

export function BloomGlyph({
  className,
  rotation,
}: {
  className?: string;
  rotation: number;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g transform={`translate(100 100) rotate(${rotation})`}>
        {RINGS.map((ring, ringIndex) => (
          <g key={ringIndex}>
            {Array.from({ length: ring.count }, (_, i) => (
              <path
                key={i}
                d={PETAL}
                fill="#ffffff"
                fillOpacity={ring.opacity}
                transform={`rotate(${i * (360 / ring.count) + ring.offset}) scale(${ring.scale})`}
              />
            ))}
          </g>
        ))}
        <circle r="9" fill="#ffffff" fillOpacity="0.82" />
        <circle r="4.5" fill="#d91572" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

interface ProductMediaProps {
  product: Product;
  /** Varies the gradient angle + bloom rotation for gallery variants. */
  seed?: number;
  className?: string;
  rounded?: string;
}

export function ProductMedia({
  product,
  seed = 0,
  className,
  rounded = "rounded-3xl",
}: ProductMediaProps) {
  const theme = THEMES[product.colors[0] ?? "pink"];
  const angle = 128 + seed * 26;
  const rotation = seed * 23;

  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${angle}deg, ${theme.from}, ${theme.via} 56%, ${theme.to})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${28 + seed * 11}% 30%, ${theme.glow}, transparent 64%)`,
        }}
      />
      <BloomGlyph
        className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2"
        rotation={rotation}
      />
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.42),transparent_42%)]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
