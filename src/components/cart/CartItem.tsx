"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore, type CartItem as CartItemType } from "@/store/cart-store";
import { ProductPhotoFrame } from "@/components/frames/ProductPhotoFrame";
import { formatPrice } from "@/lib/formatPrice";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** A single cart line — framed thumbnail, quantity stepper, animated entry. */
export function CartItem({ item }: { item: CartItemType }) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const closeCart = useCartStore((state) => state.closeCart);
  const reducedMotion = useReducedMotion();
  const { product, quantity } = item;

  const decrease = () => {
    if (quantity > 1) setQuantity(product.id, quantity - 1);
    else removeItem(product.id);
  };

  return (
    <motion.div
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, x: -24, scale: 0.92 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-3.5 rounded-2xl border border-graphite/8 bg-white/70 p-3"
    >
      <Link
        href={`/product/${product.slug}`}
        onClick={closeCart}
        className="shrink-0"
      >
        <ProductPhotoFrame
          product={product}
          tilt={false}
          reveal={false}
          petals={false}
          corner={false}
          rounded="rounded-xl"
          className="h-[4.75rem] w-[4.75rem]"
          sizes="80px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            onClick={closeCart}
            className="line-clamp-2 text-sm font-semibold text-graphite hover:text-primary"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Удалить «${product.name}» из корзины`}
            className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-soft-graphite transition-colors hover:bg-light-pink hover:text-primary"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1 rounded-full border border-graphite/12 bg-white p-0.5">
            <button
              type="button"
              onClick={decrease}
              aria-label="Уменьшить количество"
              className="grid h-7 w-7 place-items-center rounded-full text-graphite transition-colors hover:bg-light-pink hover:text-primary"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="w-6 text-center text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity + 1)}
              aria-label="Увеличить количество"
              className="grid h-7 w-7 place-items-center rounded-full text-graphite transition-colors hover:bg-light-pink hover:text-primary"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm font-bold text-graphite">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
