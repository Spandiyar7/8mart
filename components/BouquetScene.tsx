"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PRIMARY = "#d91572";
const DEEP_ROSE = "#a01060";
const ACCENT_ROSE = "#e84a9c";
const LEAF_GREEN = "#4f8a40";
const STEM_GREEN = "#3f6b32";
const PAPER = "#f4e6cc";
const RIBBON = "#c98a4b";

const CYCLE_SECONDS = 9;

function smoothStep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

type RoseProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  scaleBase?: number;
  color?: string;
  innerColor?: string;
  delay: number;
};

function Rose({
  position,
  rotation,
  scaleBase = 1,
  color = PRIMARY,
  innerColor = ACCENT_ROSE,
  delay
}: RoseProps) {
  const groupRef = useRef<THREE.Group>(null);

  const outerPetals = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * 0.075, 0.015, Math.sin(angle) * 0.075] as [number, number, number],
          rotation: [Math.PI * 0.5 - 0.35, angle, 0] as [number, number, number]
        };
      }),
    []
  );

  const innerPetals = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const angle = ((i + 0.5) / 7) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * 0.04, 0.04, Math.sin(angle) * 0.04] as [number, number, number],
          rotation: [Math.PI * 0.5 - 0.6, angle, 0] as [number, number, number]
        };
      }),
    []
  );

  useFrame((state) => {
    const t = (state.clock.elapsedTime % CYCLE_SECONDS) / CYCLE_SECONDS;
    const appear = smoothStep(delay, delay + 0.08, t) * (1 - smoothStep(0.94, 1, t));
    const swayPhase = state.clock.elapsedTime * 0.6 + delay * 8;
    if (groupRef.current) {
      const scale = appear * scaleBase;
      groupRef.current.scale.set(scale, scale, scale);
      groupRef.current.rotation.x = rotation[0] + Math.sin(swayPhase) * 0.05 * appear;
      groupRef.current.rotation.z = rotation[2] + Math.cos(swayPhase * 0.85) * 0.04 * appear;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={0}>
      {/* Stem */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.018, 0.024, 1.7, 10]} />
        <meshStandardMaterial color={STEM_GREEN} roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Leaves on stem */}
      <mesh position={[0.05, -0.4, 0]} rotation={[0, 0, -0.6]}>
        <planeGeometry args={[0.18, 0.32]} />
        <meshStandardMaterial color={LEAF_GREEN} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.04, -0.55, 0.03]} rotation={[0, 0.5, 0.7]}>
        <planeGeometry args={[0.15, 0.28]} />
        <meshStandardMaterial color={LEAF_GREEN} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Receptacle (where flower meets stem) */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.055, 12, 10]} />
        <meshStandardMaterial color={LEAF_GREEN} roughness={0.6} />
      </mesh>

      {/* Bud center */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={DEEP_ROSE} roughness={0.55} />
      </mesh>

      {/* Outer petals */}
      {outerPetals.map((p, i) => (
        <mesh key={`o-${i}`} position={p.position} rotation={p.rotation}>
          <coneGeometry args={[0.085, 0.16, 5, 1, true]} />
          <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Inner petals */}
      {innerPetals.map((p, i) => (
        <mesh key={`i-${i}`} position={p.position} rotation={p.rotation}>
          <coneGeometry args={[0.06, 0.12, 5, 1, true]} />
          <meshStandardMaterial color={innerColor} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

type GypsoProps = {
  position: [number, number, number];
  delay: number;
};

function Gypsophila({ position, delay }: GypsoProps) {
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => {
        const r = 0.18 + Math.random() * 0.12;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        return [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.6,
          r * Math.sin(phi) * Math.sin(theta)
        ] as [number, number, number];
      }),
    []
  );

  useFrame((state) => {
    const t = (state.clock.elapsedTime % CYCLE_SECONDS) / CYCLE_SECONDS;
    const appear = smoothStep(delay, delay + 0.1, t) * (1 - smoothStep(0.94, 1, t));
    if (groupRef.current) {
      groupRef.current.scale.set(appear, appear, appear);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0}>
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.012, 0.018, 1.5, 6]} />
        <meshStandardMaterial color={STEM_GREEN} roughness={0.8} />
      </mesh>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#fff5f8" roughness={0.4} emissive="#ffe7ee" emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function WrapperPaper() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime % CYCLE_SECONDS) / CYCLE_SECONDS;
    const paperAppear = smoothStep(0.7, 0.85, t) * (1 - smoothStep(0.94, 1, t));
    const ribbonAppear = smoothStep(0.85, 0.93, t) * (1 - smoothStep(0.94, 1, t));
    if (meshRef.current) {
      meshRef.current.scale.set(paperAppear, paperAppear, paperAppear);
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = paperAppear;
      mat.transparent = true;
    }
    if (ribbonRef.current) {
      ribbonRef.current.scale.set(ribbonAppear, ribbonAppear * 0.6, ribbonAppear);
      const mat = ribbonRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = ribbonAppear;
      mat.transparent = true;
    }
  });

  return (
    <group position={[0, -0.55, 0]}>
      {/* Paper cone */}
      <mesh ref={meshRef} scale={0}>
        <coneGeometry args={[0.55, 1.25, 18, 1, true]} />
        <meshStandardMaterial
          color={PAPER}
          roughness={0.85}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      {/* Ribbon */}
      <mesh ref={ribbonRef} position={[0, 0.08, 0]} scale={0}>
        <torusGeometry args={[0.32, 0.04, 8, 24]} />
        <meshStandardMaterial color={RIBBON} roughness={0.4} metalness={0.2} transparent />
      </mesh>
    </group>
  );
}

function BouquetGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  const roses = useMemo(() => {
    const items: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      color: string;
      innerColor: string;
      scaleBase: number;
      delay: number;
    }> = [];

    // Central rose
    items.push({
      position: [0, 0.1, 0],
      rotation: [-0.15, 0, 0],
      color: PRIMARY,
      innerColor: ACCENT_ROSE,
      scaleBase: 1.05,
      delay: 0.02
    });

    // Inner ring of 5 roses
    const innerCount = 5;
    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2;
      const radius = 0.18;
      items.push({
        position: [Math.cos(angle) * radius, 0.03, Math.sin(angle) * radius],
        rotation: [-0.3, angle, Math.cos(angle) * 0.25],
        color: i % 2 === 0 ? PRIMARY : ACCENT_ROSE,
        innerColor: i % 2 === 0 ? ACCENT_ROSE : "#ff6fb0",
        scaleBase: 0.92,
        delay: 0.1 + i * 0.08
      });
    }

    // Outer ring of 6 roses (lighter, pinker)
    const outerCount = 6;
    for (let i = 0; i < outerCount; i++) {
      const angle = ((i + 0.5) / outerCount) * Math.PI * 2;
      const radius = 0.33;
      items.push({
        position: [Math.cos(angle) * radius, -0.05, Math.sin(angle) * radius],
        rotation: [-0.45, angle, Math.cos(angle) * 0.3],
        color: "#ec5fa0",
        innerColor: "#f8a8cb",
        scaleBase: 0.88,
        delay: 0.5 + i * 0.04
      });
    }

    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {roses.map((rose, i) => (
        <Rose
          key={i}
          position={rose.position}
          rotation={rose.rotation}
          color={rose.color}
          innerColor={rose.innerColor}
          scaleBase={rose.scaleBase}
          delay={rose.delay}
        />
      ))}
      <Gypsophila position={[0.32, 0.15, -0.15]} delay={0.62} />
      <Gypsophila position={[-0.3, 0.18, 0.05]} delay={0.66} />
      <Gypsophila position={[0.1, 0.22, 0.3]} delay={0.7} />
      <WrapperPaper />
    </group>
  );
}

export function BouquetScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.35, 2.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 3.5, 2]} intensity={1.1} color="#fff5ec" />
      <directionalLight position={[-2, 1.2, -1.5]} intensity={0.5} color="#ffd0e6" />
      <pointLight position={[0, -1, 2]} intensity={0.3} color="#ffe9f1" />
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.18}>
        <BouquetGroup />
      </Float>
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.32}
        scale={4}
        blur={2.4}
        far={1.4}
        color="#5a1a3a"
      />
    </Canvas>
  );
}

export default BouquetScene;
