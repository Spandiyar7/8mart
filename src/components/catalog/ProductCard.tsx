"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, MessageCircle, ShoppingBag } from "lucide-react";
import { DepthCard } from "@/components/motion/DepthCard";
import { ProductPhotoFrame } from "@/components/frames/ProductPhotoFrame";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProductQuickView } from "@/components/catalog/ProductQuickView";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import { buildProductMessage, getWhatsAppLink } from "@/lib/whatsapp";
import { badgeLabels } from "@/data/products";
import type { Product, ProductBadge } from "@/types/product";

const badgeTone: Record<ProductBadge, "hit" | "new" | "deal"> = {
  hit: "hit",
  new: "new",
  deal: "deal",
};

/** Catalog product card — 3D depth tilt, framed photo, quick add + WhatsApp. */
export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <>
      <DepthCard
        className="group h-full rounded-3xl"
        intensity={8}
        glare={false}
      >
        <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-graphite/8 bg-white shadow-[var(--shadow-card)] transition-shadow duration-300 group-hover:shadow-[0_32px_60px_-30px_rgba(138,18,63,0.42)]">
          <div className="relative">
            <Link
              href={`/product/${product.slug}`}
              className="block"
              aria-label={product.name}
            >
              <ProductPhotoFrame
                product={product}
                tilt={false}
                rounded="rounded-none"
                className="aspect-[4/5] w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </Link>

            {product.badge ? (
              <Badge
                tone={badgeTone[product.badge]}
                className="absolute left-3 top-3 z-20"
              >
                {badgeLabels[product.badge]}
              </Badge>
            ) : null}
            {!product.inStock ? (
              <Badge tone="glass" className="absolute bottom-3 right-3 z-20">
                Нет в наличии
              </Badge>
            ) : null}

            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              aria-label={`Быстрый просмотр: ${product.name}`}
              className="absolute right-3 top-3 z-20 grid h-9 w-9 translate-y-1 place-items-center rounded-full glass text-graphite opacity-0 transition-all duration-300 hover:text-primary group-hover:translate-y-0 group-hover:opacity-100"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <Link href={`/product/${product.slug}`}>
              <h3 className="line-clamp-1 font-semibold leading-snug text-graphite transition-colors hover:text-primary">
                {product.name}
              </h3>
            </Link>
            <p className="line-clamp-1 text-xs text-soft-graphite">
              {product.composition[0]}
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-xl text-graphite">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice ? (
                <span className="text-sm text-soft-graphite/65 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              ) : null}
            </div>

            <div className="mt-auto flex gap-2 pt-3">
              <motion.button
                type="button"
                onClick={() => addItem(product)}
                disabled={!product.inStock}
                whileTap={{ scale: 0.93 }}
                className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                В корзину
              </motion.button>
              <MagneticButton strength={0.3}>
                <a
                  href={getWhatsAppLink(buildProductMessage(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Заказать «${product.name}» в WhatsApp`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-graphite/12 text-graphite transition-colors duration-300 hover:border-leaf-green/40 hover:text-leaf-green"
                >
                  <MessageCircle
                    className="h-[1.05rem] w-[1.05rem]"
                    aria-hidden="true"
                  />
                </a>
              </MagneticButton>
            </div>
          </div>
        </article>
      </DepthCard>

      <ProductQuickView
        product={product}
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
      />
    </>
  );
}
