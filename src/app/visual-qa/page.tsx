import type { Metadata } from "next";
import * as React from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductPhotoFrame } from "@/components/frames/ProductPhotoFrame";
import { FlowerPhotoFrame } from "@/components/frames/FlowerPhotoFrame";
import { EditorialPhotoFrame } from "@/components/frames/EditorialPhotoFrame";
import { PolaroidFlowerFrame } from "@/components/frames/PolaroidFlowerFrame";
import { GlassImageFrame } from "@/components/frames/GlassImageFrame";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { DepthCard } from "@/components/motion/DepthCard";
import { RotatingFlowerOrb } from "@/components/three/RotatingFlowerOrb";
import { FloatingBouquetMini } from "@/components/three/FloatingBouquetMini";
import { AnimatedLogoMark } from "@/components/svg/AnimatedLogoMark";
import { AnimatedPetalLine } from "@/components/svg/AnimatedPetalLine";
import { FloralOrnament } from "@/components/svg/FloralOrnament";
import { DeliveryRouteLine } from "@/components/svg/DeliveryRouteLine";
import { BloomGlyph, ProductMedia } from "@/components/ui/ProductMedia";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Visual QA",
  robots: { index: false, follow: false },
};

function Tile({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={
        wide
          ? "sm:col-span-2 lg:col-span-3"
          : "flex flex-col"
      }
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-deep-rose">
        {label}
      </p>
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-graphite/10 bg-white p-5">
        {children}
      </div>
    </div>
  );
}

function PreviewBloom() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-light-pink via-[#f48fbe] to-deep-rose">
      <BloomGlyph
        rotation={20}
        className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 opacity-75"
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}

export default function VisualQaPage() {
  const product = products[0];

  return (
    <main className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
        <header className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-pink px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-deep-rose">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Visual QA
          </span>
          <h1 className="font-display text-4xl leading-tight text-graphite sm:text-5xl">
            Витрина компонентов и QA-режим
          </h1>
          <p className="max-w-2xl text-soft-graphite">
            Превью ключевых блоков сайта. Чтобы заморозить анимацию для
            скриншотов, добавьте к адресу любой из параметров:{" "}
            <code className="rounded bg-light-pink px-1.5 py-0.5 text-deep-rose">
              ?qa=1
            </code>
            ,{" "}
            <code className="rounded bg-light-pink px-1.5 py-0.5 text-deep-rose">
              ?motion=off
            </code>{" "}
            или{" "}
            <code className="rounded bg-light-pink px-1.5 py-0.5 text-deep-rose">
              ?scene=freeze
            </code>
            .
          </p>
        </header>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/visual-qa?motion=off" variant="primary" size="sm">
            Заморозить эту страницу
          </Button>
          <Button href="/?motion=off" variant="ghost" size="sm">
            Главная (frozen)
          </Button>
          <Button href="/catalog?motion=off" variant="ghost" size="sm">
            Каталог (frozen)
          </Button>
          <Button href="/product/25-krasnyh-roz?motion=off" variant="ghost" size="sm">
            Товар (frozen)
          </Button>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Tile label="ProductPhotoFrame">
            <ProductPhotoFrame
              product={product}
              className="aspect-[4/5] w-48"
            />
          </Tile>

          <Tile label="Каталожная карточка">
            <div className="w-56">
              <ProductCard product={product} />
            </div>
          </Tile>

          <Tile label="FlowerPhotoFrame">
            <FlowerPhotoFrame
              alt="Превью"
              fallback={<PreviewBloom />}
              className="aspect-square w-48"
              corner
              petals
            />
          </Tile>

          <Tile label="EditorialPhotoFrame">
            <EditorialPhotoFrame
              alt="Превью"
              fallback={<PreviewBloom />}
              caption="Editorial frame"
              className="w-40"
            />
          </Tile>

          <Tile label="PolaroidFlowerFrame">
            <PolaroidFlowerFrame
              alt="Превью"
              fallback={<PreviewBloom />}
              caption="Polaroid frame"
              className="w-44"
            />
          </Tile>

          <Tile label="GlassImageFrame">
            <GlassImageFrame
              alt="Превью"
              fallback={<PreviewBloom />}
              className="aspect-square w-44"
            />
          </Tile>

          <Tile label="Галерея товара">
            <div className="flex w-48 flex-col gap-2">
              <ProductPhotoFrame
                product={product}
                className="aspect-square w-full"
              />
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((_, index) => (
                  <ProductPhotoFrame
                    key={index}
                    product={product}
                    imageIndex={index}
                    tilt={false}
                    reveal={false}
                    petals={false}
                    corner={false}
                    rounded="rounded-xl"
                    className="aspect-square w-full"
                  />
                ))}
              </div>
            </div>
          </Tile>

          <Tile label="DepthCard">
            <DepthCard className="rounded-3xl">
              <div className="grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br from-light-pink to-primary text-center font-display text-lg text-white">
                3D-карта
              </div>
            </DepthCard>
          </Tile>

          <Tile label="RotatingFlowerOrb">
            <RotatingFlowerOrb size={160} />
          </Tile>

          <Tile label="FloatingBouquetMini">
            <FloatingBouquetMini size={150} />
          </Tile>

          <Tile label="Order mockup (PhoneMockup)">
            <div className="w-44">
              <PhoneMockup>
                <div className="grid h-full w-full place-items-center bg-gradient-to-b from-light-pink to-warm-milk pt-10">
                  <ProductMedia
                    product={product}
                    className="h-32 w-28"
                    rounded="rounded-2xl"
                  />
                </div>
              </PhoneMockup>
            </div>
          </Tile>

          <Tile label="AnimatedLogoMark">
            <AnimatedLogoMark size={88} />
          </Tile>

          <Tile label="AnimatedPetalLine / FloralOrnament" wide>
            <div className="flex w-full flex-wrap items-center justify-around gap-6">
              <AnimatedPetalLine className="max-w-sm" />
              <FloralOrnament className="w-32" />
              <div className="w-64">
                <DeliveryRouteLine />
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </main>
  );
}
