"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Cinematic lighting for the floral sculpture.
 *
 * A warm key light shapes the form, a soft pink fill keeps the shadows
 * alive, a raspberry rim light separates the bloom from the background,
 * and a procedural environment (built from Lightformers — no remote HDR
 * download) gives the physical material a premium specular response.
 */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#fff1f6" />

      {/* Key — warm, upper-front-left */}
      <directionalLight position={[-4, 5, 6]} intensity={2.2} color="#fff4ec" />

      {/* Fill — soft pink, lower-right */}
      <directionalLight position={[5, -1, 3]} intensity={0.95} color="#ffd9e7" />

      {/* Rim — raspberry, from behind */}
      <directionalLight position={[0, 2, -5]} intensity={1.5} color="#d91572" />

      {/* Inner glow leaking through the petals */}
      <pointLight
        position={[0, 0, 1.3]}
        intensity={3.4}
        distance={7}
        decay={2}
        color="#ff7bb5"
      />

      <Environment resolution={128} frames={1}>
        <Lightformer
          form="circle"
          intensity={2.1}
          position={[0, 1, 5]}
          scale={7}
          color="#ffffff"
        />
        <Lightformer
          form="circle"
          intensity={1.3}
          position={[-5, 2, 2]}
          scale={3.5}
          color="#ffd9e7"
        />
        <Lightformer
          form="circle"
          intensity={1.1}
          position={[5, -2, 3]}
          scale={3.5}
          color="#ffe9bf"
        />
        <Lightformer
          form="ring"
          intensity={0.9}
          position={[0, 0, -4]}
          scale={6}
          color="#d91572"
        />
      </Environment>
    </>
  );
}
