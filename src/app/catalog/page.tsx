import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Каталог цветов и букетов",
  description:
    "Каталог 8MART: розы, авторские букеты, монобукеты, корзины и коробки. " +
    "Доставка по Костанаю за 1,5–3 часа, заказ через WhatsApp.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <main className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
        <header className="relative">
          {/* Petals are clipped to the header band so the sticky filter
              sidebar below is never trapped by an overflow ancestor. */}
          <div className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 overflow-hidden">
            <ParallaxPetalLayer count={7} tone="soft" seed={40} />
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-pink px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-deep-rose">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Каталог
            </span>
            <h1 className="font-display text-4xl leading-tight text-graphite sm:text-5xl">
              Букеты и цветы 8MART
            </h1>
            <p className="max-w-xl text-soft-graphite">
              Свежие поставки каждый день. Выберите букет, добавьте в корзину
              или закажите напрямую в WhatsApp.
            </p>
          </div>
        </header>

        <div className="mt-9">
          <Suspense fallback={null}>
            <CatalogView />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
