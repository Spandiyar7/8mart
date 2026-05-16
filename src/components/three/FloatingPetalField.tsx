"use client";

import { useMemo } from "react";
import { PremiumPetal } from "./PremiumPetal";

/**
 * Foreground and background petals drifting around the central sculpture.
 * Petals are spread across depth layers — nearer petals are larger, more
 * opaque and parallax more strongly with the pointer — to build depth.
 */

const ACCENT_COLORS = [
  "#ffe4ef",
  "#ffffff",
  "#f7a8ca",
  "#d91572",
  "#ffd9b3",
  "#ffc2dc",
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface FloatingPetalFieldProps {
  count: number;
  animate?: boolean;
}

export function FloatingPetalField({
  count,
  animate = true,
}: FloatingPetalFieldProps) {
  const petals = useMemo(() => {
    const rng = mulberry32(8801);
    return Array.from({ length: count }, (_, i) => {
      const z = -2.4 + rng() * 5.6;
      const depth = (z + 2.4) / 5.6; // 0 = far, 1 = near
      return {
        id: i,
        position: [-5.6 + rng() * 11.2, -3.2 + rng() * 6.6, z] as [
          number,
          number,
          number,
        ],
        rotation: [
          rng() * Math.PI,
          rng() * Math.PI,
          rng() * Math.PI,
        ] as [number, number, number],
        scale: 0.16 + depth * 0.36 + rng() * 0.08,
        color: ACCENT_COLORS[Math.floor(rng() * ACCENT_COLORS.length)],
        speed: 0.3 + rng() * 0.5,
        phase: rng() * Math.PI * 2,
        parallax: 0.12 + depth * 0.6,
        drift: (rng() - 0.5) * 0.26,
        opacity: 0.48 + depth * 0.46,
      };
    });
  }, [count]);

  return (
    <group>
      {petals.map((petal) => (
        <PremiumPetal
          key={petal.id}
          position={petal.position}
          rotation={petal.rotation}
          scale={petal.scale}
          color={petal.color}
          speed={petal.speed}
          phase={petal.phase}
          parallax={petal.parallax}
          drift={petal.drift}
          opacity={petal.opacity}
          animate={animate}
        />
      ))}
    </group>
  );
}
