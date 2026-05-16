import * as React from "react";
import { FloralOrnament } from "@/components/svg/FloralOrnament";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { FloatingBouquetMini } from "@/components/three/FloatingBouquetMini";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

/** Shared hero band for the inner pages (delivery, about, contacts). */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-light-pink/60 to-warm-milk pb-14 pt-32 sm:pb-20 sm:pt-36">
      <ParallaxPetalLayer count={8} tone="soft" seed={30} />
      <div className="pointer-events-none absolute -right-8 top-12 hidden w-56 opacity-30 sm:block">
        <FloralOrnament />
      </div>
      <FloatingBouquetMini
        size={116}
        className="absolute bottom-6 right-[8%] hidden lg:block"
      />
      <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(217,21,114,0.2),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-deep-rose">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl leading-tight text-graphite sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-soft-graphite">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
