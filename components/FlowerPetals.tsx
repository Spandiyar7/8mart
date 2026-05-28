"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vy: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  hue: number;
  saturation: number;
  lightness: number;
  tilt: number;
  tiltSpeed: number;
};

const PETAL_COUNT_DESKTOP = 28;
const PETAL_COUNT_MOBILE = 14;

function makePetal(width: number, height: number, fromTop = false): Petal {
  const z = Math.random();
  const size = 14 + z * 26;
  return {
    x: Math.random() * width,
    y: fromTop ? -size - Math.random() * height : Math.random() * height,
    z,
    size,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.012,
    vy: 0.25 + z * 0.6,
    swayAmplitude: 14 + z * 28,
    swayFrequency: 0.0006 + Math.random() * 0.0012,
    swayOffset: Math.random() * Math.PI * 2,
    hue: 335 + Math.random() * 18,
    saturation: 70 + Math.random() * 18,
    lightness: 72 + Math.random() * 14,
    tilt: Math.random() * Math.PI * 2,
    tiltSpeed: 0.01 + Math.random() * 0.025
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  const { x, y, z, size, rotation, tilt, hue, saturation, lightness } = petal;
  const scaleX = Math.cos(tilt);
  const alpha = 0.28 + z * 0.38;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(Math.max(0.18, Math.abs(scaleX)), 1);

  const gradient = ctx.createRadialGradient(0, -size * 0.2, size * 0.05, 0, 0, size);
  gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${Math.min(96, lightness + 10)}%, ${alpha})`);
  gradient.addColorStop(0.55, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.85})`);
  gradient.addColorStop(1, `hsla(${hue}, ${saturation - 12}%, ${lightness - 12}%, 0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.6, -size * 0.7, size * 0.55, size * 0.65, 0, size);
  ctx.bezierCurveTo(-size * 0.55, size * 0.65, -size * 0.6, -size * 0.7, 0, -size);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = alpha * 0.5;
  ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness - 20}%, ${alpha * 0.6})`;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.85);
  ctx.quadraticCurveTo(0, 0, 0, size * 0.85);
  ctx.stroke();

  ctx.restore();
}

export function FlowerPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const isMobile = width < 768;
    const petalCount = isMobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP;
    let petals: Petal[] = Array.from({ length: petalCount }, () => makePetal(width, height));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let last = performance.now();
    let running = !document.hidden;

    const visibilityHandler = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    const loop = (time: number) => {
      if (!running) return;
      const elapsed = time - last;
      last = time;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.vy * (elapsed / 16);
        p.x += Math.sin(time * p.swayFrequency + p.swayOffset) * p.swayAmplitude * 0.012;
        p.rotation += p.rotationSpeed * (elapsed / 16);
        p.tilt += p.tiltSpeed * (elapsed / 16);

        if (p.y - p.size > height + 30) {
          petals[i] = makePetal(width, height, true);
          continue;
        }
        if (p.x < -p.size * 2) p.x = width + p.size;
        if (p.x > width + p.size * 2) p.x = -p.size;

        drawPetal(ctx, p);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[35] h-full w-full"
    />
  );
}
