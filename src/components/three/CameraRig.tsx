"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  /** World-space point the camera looks at. */
  lookAt?: [number, number, number];
  animate?: boolean;
}

/**
 * Smooth pointer parallax for the hero camera. The camera eases toward a
 * target derived from the pointer plus a slow idle drift — calm, never
 * spinning. Disabled entirely when the visitor prefers reduced motion.
 */
export function CameraRig({ lookAt = [0.4, 0, 0], animate = true }: CameraRigProps) {
  const target = useRef(new THREE.Vector3(0, 0, 7));
  const focus = useRef(new THREE.Vector3(...lookAt));

  useFrame((state, delta) => {
    if (!animate) {
      state.camera.lookAt(focus.current);
      return;
    }
    const time = state.clock.elapsedTime;
    target.current.set(
      state.pointer.x * 0.9 + Math.sin(time * 0.18) * 0.18,
      state.pointer.y * 0.55 + Math.cos(time * 0.15) * 0.12,
      7,
    );
    // Frame-rate independent easing.
    const ease = 1 - Math.pow(0.0015, delta);
    state.camera.position.lerp(target.current, ease);
    state.camera.lookAt(focus.current);
  });

  return null;
}
