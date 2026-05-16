"use client";

import { Suspense } from "react";
import type { RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneLights } from "./SceneLights";
import { CameraRig } from "./CameraRig";
import { FloralSculpture } from "./FloralSculpture";
import { FloatingPetalField } from "./FloatingPetalField";

export interface HeroSceneProps {
  quality: "mobile" | "desktop";
  animate: boolean;
  /** Pause the render loop while the hero is scrolled out of view. */
  paused?: boolean;
  /** DOM element R3F listens on for pointer parallax (the hero section). */
  eventSource: RefObject<HTMLElement | null>;
}

/**
 * The WebGL hero scene. Loaded only on the client via `next/dynamic`, so
 * the Three.js bundle never ships in the initial server payload. The
 * render loop stops when the hero leaves the viewport.
 */
export default function HeroScene({
  quality,
  animate,
  paused = false,
  eventSource,
}: HeroSceneProps) {
  const isDesktop = quality === "desktop";
  const sculptureCount = isDesktop ? 122 : 50;
  const floatingCount = isDesktop ? 14 : 7;
  const offsetX = isDesktop ? 1.7 : 0;
  const offsetY = isDesktop ? 0.05 : 0.4;
  const groupScale = isDesktop ? 1 : 0.82;

  const frameloop = paused ? "never" : animate ? "always" : "demand";

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <SceneLights />
        <CameraRig animate={animate} lookAt={[offsetX * 0.42, 0, 0]} />
        <group position={[offsetX, offsetY, 0]} scale={groupScale}>
          <FloralSculpture count={sculptureCount} animate={animate} />
        </group>
        <FloatingPetalField count={floatingCount} animate={animate} />
      </Suspense>
    </Canvas>
  );
}
