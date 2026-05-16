"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Petal geometry
 *
 * A petal is a curved, tapered surface — never a flat rectangle. The
 * silhouette is an organic teardrop; the surface is cupped across its
 * width, bent along its length and lightly ruffled near the tip. The
 * base sits at the origin so petals scale and rotate from their stem.
 * ------------------------------------------------------------------ */
const LENGTH_SEGMENTS = 16;
const WIDTH_SEGMENTS = 12;

export function createPetalGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= LENGTH_SEGMENTS; i++) {
    const u = i / LENGTH_SEGMENTS; // 0 = base, 1 = tip
    const halfWidth = Math.sin(Math.PI * Math.pow(u, 0.72)) * 0.42;

    for (let j = 0; j <= WIDTH_SEGMENTS; j++) {
      const v = j / WIDTH_SEGMENTS;
      const across = v * 2 - 1; // -1 .. 1

      const x = across * halfWidth;
      const y = u;
      const cup = across * across * 0.17 * Math.sin(Math.PI * u);
      const bend = Math.pow(u, 1.8) * 0.3;
      const ruffle = Math.sin(across * Math.PI * 1.6) * 0.035 * Math.pow(u, 3);
      const z = cup + bend + ruffle;

      positions.push(x, y, z);
      uvs.push(v, u);
    }
  }

  const stride = WIDTH_SEGMENTS + 1;
  for (let i = 0; i < LENGTH_SEGMENTS; i++) {
    for (let j = 0; j < WIDTH_SEGMENTS; j++) {
      const a = i * stride + j;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  geometry.translate(0, -0.04, 0);
  return geometry;
}

/** Shared singleton — every petal in the scene reuses one geometry. */
let cachedGeometry: THREE.BufferGeometry | null = null;
export function getPetalGeometry(): THREE.BufferGeometry {
  if (!cachedGeometry) cachedGeometry = createPetalGeometry();
  return cachedGeometry;
}

/* ------------------------------------------------------------------ *
 * Floating petal — a single drifting petal used by FloatingPetalField.
 * Each one floats on a slow sine wave and parallaxes with the pointer.
 * ------------------------------------------------------------------ */
export interface PremiumPetalProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  phase: number;
  parallax: number;
  drift: number;
  opacity?: number;
  animate?: boolean;
}

export function PremiumPetal({
  position,
  rotation,
  scale,
  color,
  speed,
  phase,
  parallax,
  drift,
  opacity = 0.92,
  animate = true,
}: PremiumPetalProps) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => getPetalGeometry(), []);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh || !animate) return;
    const t = state.clock.elapsedTime;
    mesh.position.y = position[1] + Math.sin(t * speed + phase) * 0.34;
    mesh.position.x = position[0] + state.pointer.x * parallax;
    mesh.position.z = position[2] + state.pointer.y * parallax * 0.4;
    mesh.rotation.z = rotation[2] + t * drift;
    mesh.rotation.x = rotation[0] + Math.sin(t * speed * 0.7 + phase) * 0.26;
  });

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <meshPhysicalMaterial
        color={color}
        roughness={0.5}
        metalness={0}
        sheen={1}
        sheenRoughness={0.65}
        sheenColor="#ffe1ef"
        side={THREE.DoubleSide}
        transparent
        opacity={opacity}
        envMapIntensity={0.55}
      />
    </mesh>
  );
}
