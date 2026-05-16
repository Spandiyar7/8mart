"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPetalGeometry } from "./PremiumPetal";
import { scrollSignal } from "@/lib/scroll-progress";

/* ------------------------------------------------------------------ *
 * The central blooming floral sculpture.
 *
 * Petals are placed with a phyllotactic (golden-angle) spiral around the
 * +Z axis, layered from a deep raspberry core to pale outer petals. Each
 * petal opens from a tight bud with a staggered, eased bloom reveal, then
 * settles into a slow, calm rotation with a per-petal breathing sway.
 *
 * All petals are drawn with a single InstancedMesh — one draw call.
 * ------------------------------------------------------------------ */

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const R_MAX = 1.42;
const BUD_PHI = 1.5;
const TILT_X = 0.26;
const TILT_Y = -0.34;
const BLOOM_DURATION = 2.7;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (x: number, min: number, max: number) =>
  Math.min(max, Math.max(min, x));
const smoothstep = (x: number) => x * x * (3 - 2 * x);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/** Tiny deterministic RNG so the bloom looks identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Radial colour ramp — deep core to pale, milk-white edge. */
const COLOR_STOPS: { at: number; color: THREE.Color }[] = [
  { at: 0.0, color: new THREE.Color("#8a123f") },
  { at: 0.14, color: new THREE.Color("#b80f5e") },
  { at: 0.32, color: new THREE.Color("#d91572") },
  { at: 0.56, color: new THREE.Color("#ef62a0") },
  { at: 0.76, color: new THREE.Color("#ffc9de") },
  { at: 0.9, color: new THREE.Color("#ffe4ef") },
  { at: 1.0, color: new THREE.Color("#fff6fa") },
];

function sampleRamp(t: number): THREE.Color {
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const a = COLOR_STOPS[i];
    const b = COLOR_STOPS[i + 1];
    if (t <= b.at) {
      const k = (t - a.at) / (b.at - a.at);
      return a.color.clone().lerp(b.color, clamp(k, 0, 1));
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1].color.clone();
}

const GOLD = new THREE.Color("#d6b98c");
const LEAF = new THREE.Color("#3f6f3a");

interface PetalData {
  count: number;
  t: Float32Array;
  theta: Float32Array;
  radius: Float32Array;
  baseZ: Float32Array;
  phi: Float32Array;
  scale: Float32Array;
  roll: Float32Array;
  swaySpeed: Float32Array;
  swayPhase: Float32Array;
  colors: THREE.Color[];
}

function buildPetals(count: number): PetalData {
  const rng = mulberry32(20260516);
  const data: PetalData = {
    count,
    t: new Float32Array(count),
    theta: new Float32Array(count),
    radius: new Float32Array(count),
    baseZ: new Float32Array(count),
    phi: new Float32Array(count),
    scale: new Float32Array(count),
    roll: new Float32Array(count),
    swaySpeed: new Float32Array(count),
    swayPhase: new Float32Array(count),
    colors: [],
  };

  for (let i = 0; i < count; i++) {
    const tt = count > 1 ? i / (count - 1) : 0;
    const s = smoothstep(tt);
    data.t[i] = tt;
    data.theta[i] = i * GOLDEN_ANGLE + (rng() - 0.5) * 0.2;
    data.radius[i] = R_MAX * Math.pow(tt, 0.55) * (0.9 + rng() * 0.2);
    data.baseZ[i] = 0.34 * (1 - Math.pow(tt, 1.5)) - 0.04 + (rng() - 0.5) * 0.06;
    data.phi[i] = lerp(1.32, 0.26, s) + (rng() - 0.5) * 0.16;
    data.scale[i] = lerp(0.5, 1.32, s) * (0.86 + rng() * 0.26);
    data.roll[i] = (rng() - 0.5) * 0.7;
    data.swaySpeed[i] = 0.5 + rng() * 0.7;
    data.swayPhase[i] = rng() * Math.PI * 2;

    const color = sampleRamp(tt);
    const accent = rng();
    if (accent > 0.9) color.lerp(GOLD, 0.5);
    else if (accent > 0.86 && tt > 0.68) color.lerp(LEAF, 0.42);
    color.offsetHSL(0, (rng() - 0.5) * 0.05, (rng() - 0.5) * 0.05);
    data.colors.push(color);
  }
  return data;
}

/* Reusable scratch objects — no per-frame allocation. */
const _matrix = new THREE.Matrix4();
const _basis = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _roll = new THREE.Quaternion();
const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();
const _pos = new THREE.Vector3();
const _scl = new THREE.Vector3();

function writeMatrices(
  mesh: THREE.InstancedMesh,
  petals: PetalData,
  bloom: number,
  time: number,
  animate: boolean,
) {
  for (let i = 0; i < petals.count; i++) {
    const t = petals.t[i];
    const progress = easeOutCubic(clamp((bloom - t * 0.5) / 0.5, 0, 1));

    let phi = lerp(BUD_PHI, petals.phi[i], progress);
    const radius = lerp(petals.radius[i] * 0.12, petals.radius[i], progress);
    const baseZ = lerp(0.06, petals.baseZ[i], progress);
    const scale = petals.scale[i] * progress;
    let roll = petals.roll[i];

    if (animate) {
      const sway = Math.sin(time * petals.swaySpeed[i] + petals.swayPhase[i]);
      phi += sway * 0.045 * progress;
      roll += sway * 0.06 * progress;
    }

    const cosT = Math.cos(petals.theta[i]);
    const sinT = Math.sin(petals.theta[i]);
    const cosP = Math.cos(phi);
    const sinP = Math.sin(phi);

    // Analytic orthonormal basis: width / length / facing.
    _x.set(-sinT, cosT, 0);
    _y.set(cosT * cosP, sinT * cosP, sinP);
    _z.set(cosT * sinP, sinT * sinP, -cosP);
    _basis.makeBasis(_x, _y, _z);
    _quat.setFromRotationMatrix(_basis);
    _roll.setFromAxisAngle(_y, roll);
    _quat.premultiply(_roll);

    _pos.set(cosT * radius, sinT * radius, baseZ);
    _scl.setScalar(Math.max(scale, 0.0001));
    _matrix.compose(_pos, _quat, _scl);
    mesh.setMatrixAt(i, _matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

interface FloralSculptureProps {
  count: number;
  animate?: boolean;
}

export function FloralSculpture({ count, animate = true }: FloralSculptureProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const bloom = useRef(animate ? 0 : 1);

  const petals = useMemo(() => buildPetals(count), [count]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        roughness: 0.46,
        metalness: 0,
        sheen: 1,
        sheenRoughness: 0.55,
        sheenColor: new THREE.Color("#ffd9ea"),
        clearcoat: 0.2,
        clearcoatRoughness: 0.7,
        side: THREE.DoubleSide,
        envMapIntensity: 0.68,
      }),
    [],
  );
  const geometry = useMemo(() => getPetalGeometry(), []);

  const args = useMemo(
    () =>
      [geometry, material, count] as [
        THREE.BufferGeometry,
        THREE.Material,
        number,
      ],
    [geometry, material, count],
  );

  useEffect(() => () => material.dispose(), [material]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    bloom.current = animate ? 0 : 1;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    for (let i = 0; i < petals.count; i++) {
      mesh.setColorAt(i, petals.colors[i]);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    writeMatrices(mesh, petals, bloom.current, 0, animate);
  }, [petals, animate]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (animate && bloom.current < 1) {
      bloom.current = Math.min(1, bloom.current + delta / BLOOM_DURATION);
    }
    writeMatrices(
      mesh,
      petals,
      bloom.current,
      state.clock.elapsedTime,
      animate,
    );

    if (animate) {
      mesh.rotation.z += delta * 0.07;
      const group = groupRef.current;
      if (group) {
        const time = state.clock.elapsedTime;
        // Scroll-linked exit — the bloom turns and drifts up as the hero
        // scrolls away, tying the 3D scene to the rest of the page.
        const hero = scrollSignal.hero;
        group.rotation.x = TILT_X + Math.sin(time * 0.2) * 0.03 - hero * 0.22;
        group.rotation.y = TILT_Y + Math.sin(time * 0.16) * 0.045 + hero * 0.6;
        group.position.y = hero * 1.4;
        group.scale.setScalar(
          (1 + Math.sin(time * 0.5) * 0.012) * (1 - hero * 0.12),
        );
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[TILT_X, TILT_Y, 0]}>
      <instancedMesh ref={meshRef} args={args} />
    </group>
  );
}
