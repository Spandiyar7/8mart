import { cn } from "@/lib/cn";

/**
 * Pure CSS/SVG floral bloom shown when WebGL is unavailable, while the
 * 3D bundle loads, or when the visitor prefers reduced motion.
 *
 * It is intentionally premium — layered raspberry glow, a soft spiral of
 * petal sectors and a bright core — so the hero never falls back to a
 * blank or grey area.
 */
export function SceneFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative flex items-center justify-center",
        className,
      )}
      aria-hidden="true"
    >
      <div className="relative aspect-square w-[min(86vw,38rem)]">
        {/* Ambient glow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(217,21,114,0.42),transparent_62%)] blur-2xl" />
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(214,185,140,0.34),transparent_60%)] blur-2xl" />

        {/* Petal spiral */}
        <div
          className="fx-spin-slow absolute inset-[15%] rounded-full opacity-90 blur-[6px]"
          style={{
            background:
              "conic-gradient(from 0deg, #ffe4ef, #d91572, #8a123f, #ffe4ef, #d6b98c, #ffffff, #d91572, #ffe4ef)",
            maskImage:
              "radial-gradient(circle at 50% 50%, transparent 16%, #000 22%, #000 78%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, transparent 16%, #000 22%, #000 78%, transparent 92%)",
          }}
        />
        <div
          className="fx-bloom absolute inset-[28%] rounded-full opacity-80 blur-[3px]"
          style={{
            background:
              "conic-gradient(from 90deg, #ffffff, #ffd9e7, #d91572, #ffe4ef, #ffffff)",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 38%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 38%, transparent 70%)",
          }}
        />

        {/* Bright core */}
        <div className="absolute inset-[42%] rounded-full bg-[radial-gradient(circle_at_42%_38%,#ffffff,#ffe4ef_55%,#f49ac6)] shadow-[0_0_60px_rgba(217,21,114,0.5)]" />

        {/* Film grain */}
        <div className="noise absolute inset-0 rounded-full" />
      </div>
    </div>
  );
}
