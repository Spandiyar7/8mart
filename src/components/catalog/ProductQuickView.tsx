"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, ShoppingBag, X } from "lucide-react";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import { buildProductMessage, getWhatsAppLink } from "@/lib/whatsapp";
import { badgeLabels, categoryLabels } from "@/data/products";
import type { Product, ProductBadge } from "@/types/product";

const badgeTone: Record<ProductBadge, "hit" | "new" | "deal"> = {
  hit: "hit",
  new: "new",
  deal: "deal",
};

interface ProductQuickViewProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

/** Lightweight product modal opened from a catalog card. */
export function ProductQuickView({
  product,
  open,
  onClose,
}: ProductQuickViewProps) {
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleAdd = () => {
    addItem(product);
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[75] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Быстрый просмотр: ${product.name}`}
        >
          <motion.div
            className="absolute inset-0 bg-graphite/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-warm-milk shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть быстрый просмотр"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full glass text-graphite transition-colors hover:text-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="grid sm:grid-cols-2">
              <ProductMedia
                product={product}
                rounded="rounded-none"
                className="aspect-square w-full sm:aspect-auto sm:h-full sm:min-h-[22rem]"
              />

              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-deep-rose/70">
                    {categoryLabels[product.category]}
                  </span>
                  {product.badge ? (
                    <Badge tone={badgeTone[product.badge]}>
                      {badgeLabels[product.badge]}
                    </Badge>
                  ) : null}
                </div>

                <h2 className="font-display text-2xl leading-tight text-graphite">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice ? (
                    <span className="text-sm text-soft-graphite/65 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  ) : null}
                </div>

                <p className="text-sm leading-relaxed text-soft-graphite">
                  {product.description}
                </p>

                <ul className="flex flex-col gap-1.5">
                  {product.composition.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm text-graphite"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-leaf-green"
                        aria-hidden="true"
                      />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-2.5 pt-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAdd}
                      disabled={!product.inStock}
                      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
                    >
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                      В корзину
                    </button>
                    <a
                      href={getWhatsAppLink(buildProductMessage(product))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-full border border-graphite/15 px-4 text-sm font-semibold text-graphite transition-colors hover:border-leaf-green/40 hover:text-leaf-green"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-1.5"
                  >
                    Подробнее о букете
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
