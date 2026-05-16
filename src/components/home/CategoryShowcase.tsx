"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DepthCard } from "@/components/motion/DepthCard";
import { ImageRevealMask } from "@/components/motion/ImageRevealMask";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { FrameImage } from "@/components/frames/FrameImage";
import { BloomGlyph } from "@/components/ui/ProductMedia";
import { categoryShowcase, type ShowcaseCategory } from "@/data/products";
import type { ProductColor } from "@/types/product";
import { cn } from "@/lib/cn";

const cardTheme: Record<ProductColor, { gradient: string; glow: string }> = {
  pink: { gradient: "from-[#ffd2e4] to-[#d91572]", glow: "rgba(217,21,114,0.5)" },
  red: { gradient: "from-[#ffc9d4] to-[#a8174d]", glow: "rgba(168,23,77,0.55)" },
  white: { gradient: "from-[#ffffff] to-[#f3a8c8]", glow: "rgba(247,168,202,0.5)" },
  burgundy: {
    gradient: "from-[#f0bccd] to-[#8a123f]",
    glow: "rgba(138,18,63,0.55)",
  },
  mix: { gradient: "from-[#ffe1bf] to-[#e0508f]", glow: "rgba(224,80,143,0.5)" },
};

const categoryImages: Record<string, string> = {
  roses: "/products/rose-25.jpg",
  bouquets: "/products/mixed-soft.jpg",
  mono: "/products/chrysanthemum.jpg",
  boxes: "/products/box.jpg",
  seasonal: "/products/tulips.jpg",
  gifts: "/products/basket.jpg",
};

function CategoryFallback({
  theme,
  index,
}: {
  theme: { gradient: string };
  index: number;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-gradient-to-br",
        theme.gradient,
      )}
    >
      <BloomGlyph
        rotation={index * 38}
        className="absolute -right-10 -top-10 w-52 opacity-55"
      />
      <div className="noise absolute inset-0 opacity-60" />
    </div>
  );
}

function CornerVine() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="pointer-events-none absolute left-3 top-3 w-16 opacity-80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6 C26 10 22 30 40 36"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M40,36 C41.8,32 42.8,27 40,21 C37.2,27 38.2,32 40,36 Z"
          fill="rgba(255,255,255,0.95)"
          transform={`rotate(${deg} 40 36)`}
        />
      ))}
    </svg>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: ShowcaseCategory;
  index: number;
}) {
  const theme = cardTheme[category.accent];

  return (
    <JitterMotionCard index={index} hover={false}>
      <Link href={category.href} className="block h-full">
        <DepthCard className="group h-full rounded-3xl" intensity={9} glare={false}>
          <article className="card-shine relative flex h-full min-h-[17rem] flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-white/55 shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0">
              <ImageRevealMask
                className="h-full w-full"
                direction={index % 2 === 0 ? "right" : "left"}
              >
                <div className="relative h-full w-full">
                  <FrameImage
                    src={categoryImages[category.key]}
                    alt={category.title}
                    fallback={<CategoryFallback theme={theme} index={index} />}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </ImageRevealMask>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 72% 16%, ${theme.glow}, transparent 60%)`,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.4),transparent_42%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-graphite/60 to-transparent"
            />
            <CornerVine />

            <div className="relative p-6">
              <h3 className="font-display text-2xl text-white drop-shadow-sm">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                {category.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                Смотреть
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </article>
        </DepthCard>
      </Link>
    </JitterMotionCard>
  );
}

/** Category showcase — framed 3D cards with image-reveal masks + petals. */
export function CategoryShowcase() {
  return (
    <Section
      id="categories"
      background={<ParallaxPetalLayer count={8} tone="soft" seed={2} />}
    >
      <SectionTitle
        eyebrow="Каталог"
        title={
          <>
            Выберите <span className="text-gradient">категорию</span>
          </>
        }
        description="От одной розы до большой авторской композиции — соберём под повод, вкус и бюджет."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categoryShowcase.map((category, index) => (
          <CategoryCard key={category.key} category={category} index={index} />
        ))}
      </div>
    </Section>
  );
}
