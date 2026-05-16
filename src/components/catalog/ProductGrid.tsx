"use client";

import { SearchX } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  onReset?: () => void;
}

/** Responsive product grid with a graceful empty state. */
export function ProductGrid({ products, onReset }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-graphite/8 bg-white px-6 py-16 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-light-pink text-primary">
          <SearchX className="h-7 w-7" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-xl text-graphite">Ничего не нашлось</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-soft-graphite">
            Попробуйте изменить фильтры или напишите нам — флорист подберёт
            букет вручную под ваш запрос.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="h-11 rounded-full border border-graphite/15 px-5 text-sm font-semibold text-graphite transition-colors hover:border-primary/40 hover:text-primary"
            >
              Сбросить фильтры
            </button>
          ) : null}
          <WhatsAppButton variant="primary" label="Подобрать в WhatsApp" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <JitterMotionCard key={product.id} index={index % 3} hover={false}>
          <ProductCard product={product} />
        </JitterMotionCard>
      ))}
    </div>
  );
}
