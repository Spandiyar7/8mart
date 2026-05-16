"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Clock, Flower2, Leaf, Truck } from "lucide-react";
import { SceneFallback } from "@/components/three/SceneFallback";
import { HeroContent } from "@/components/hero/HeroContent";
import { FloatingGlassCard } from "@/components/hero/FloatingGlassCard";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

// The WebGL bundle is client-only and code-split out of the initial load.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback className="absolute inset-0" />,
});

const iconClass = "h-[1.05rem] w-[1.05rem]";

// One-time, cached WebGL capability check.
let webglSupport: boolean | null = null;
function detectWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};
const noWebglOnServer = () => false;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const webglReady = useSyncExternalStore(
    noopSubscribe,
    detectWebGL,
    noWebglOnServer,
  );
  // Pause the WebGL render loop while the hero is scrolled out of view.
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.04 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-label="8MART — доставка цветов в Костанае"
    >
      {/* Premium layered background */}
      <div className="absolute inset-0 -z-10 bg-warm-milk" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="fx-aurora absolute -right-[10%] -top-[14%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(217,21,114,0.32),transparent_68%)] blur-2xl" />
        <div className="absolute -bottom-[16%] -left-[12%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(214,185,140,0.4),transparent_70%)] blur-2xl" />
        <div className="absolute left-1/3 top-1/4 h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(255,228,239,0.75),transparent_72%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(138,18,63,0.12))]" />
      </div>
      <div className="noise pointer-events-none absolute inset-0 -z-10" />

      {/* 3D floral sculpture */}
      <div className="absolute inset-0">
        {webglReady ? (
          <HeroScene
            quality={isDesktop ? "desktop" : "mobile"}
            animate={!reducedMotion}
            paused={!heroInView}
            eventSource={heroRef}
          />
        ) : (
          <SceneFallback className="absolute inset-0" />
        )}
      </div>

      {/* Readability scrim — keeps the copy crisp over the artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warm-milk via-warm-milk/45 to-transparent lg:bg-gradient-to-r lg:from-warm-milk lg:via-warm-milk/35 lg:to-transparent"
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pb-28 pt-28 sm:px-6">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <HeroContent />

          {/* Desktop floating cards around the sculpture */}
          <div className="relative hidden h-full min-h-[32rem] lg:block">
            <FloatingGlassCard
              className="left-0 top-[8%]"
              icon={<Leaf className={iconClass} />}
              label="Свежая поставка"
              sublabel="Розы, пионы, тюльпаны"
              accent="green"
              delay={1}
              floatClassName="fx-float"
            />
            <FloatingGlassCard
              className="-right-[4%] top-[36%]"
              icon={<Truck className={iconClass} />}
              label="Доставка сегодня"
              sublabel="За 1,5–3 часа"
              accent="pink"
              delay={1.18}
              floatClassName="fx-float-soft"
            />
            <FloatingGlassCard
              className="-left-[6%] bottom-[22%]"
              icon={<Clock className={iconClass} />}
              label="Открыты 24/7"
              sublabel="Принимаем заказы ночью"
              accent="gold"
              delay={1.36}
              floatClassName="fx-float"
            />
            <FloatingGlassCard
              className="bottom-[3%] right-[7%]"
              icon={<Flower2 className={iconClass} />}
              label="500+ цветов"
              sublabel="Всегда в наличии"
              accent="pink"
              delay={1.54}
              floatClassName="fx-float-soft"
            />
          </div>
        </div>
      </div>

      {/* Mobile floating cards — simplified */}
      <FloatingGlassCard
        className="right-[4%] top-[19%] lg:hidden"
        icon={<Truck className={iconClass} />}
        label="Доставка сегодня"
        accent="pink"
        delay={1}
        floatClassName="fx-float"
      />
      <FloatingGlassCard
        className="bottom-[22%] right-[4%] lg:hidden"
        icon={<Clock className={iconClass} />}
        label="Открыты 24/7"
        accent="gold"
        delay={1.2}
        floatClassName="fx-float-soft"
      />

      {/* Scroll cue */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex"
      >
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-soft-graphite">
          Листайте вниз
        </span>
        <motion.span
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="glass grid h-8 w-8 place-items-center rounded-full text-primary"
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.div>
    </section>
  );
}
