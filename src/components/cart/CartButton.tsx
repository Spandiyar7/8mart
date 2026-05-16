"use client";

import { useSyncExternalStore } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore, selectCartCount } from "@/store/cart-store";

// Resolves to `false` on the server / during hydration, then `true`.
const emptySubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * Header cart trigger with a live item-count badge. The count is only
 * rendered once hydrated so the persisted-cart value never mismatches the
 * server-rendered markup.
 */
export function CartButton() {
  const count = useCartStore(selectCartCount);
  const openCart = useCartStore((state) => state.openCart);
  const hydrated = useSyncExternalStore(emptySubscribe, onClient, onServer);

  const showCount = hydrated && count > 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={showCount ? `Корзина, товаров: ${count}` : "Корзина"}
      className="relative grid h-11 w-11 place-items-center rounded-full border border-graphite/10 bg-white/70 text-graphite backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-milk"
    >
      <ShoppingBag className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
      {showCount ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.66rem] font-bold text-white shadow-[0_4px_10px_-2px_rgba(217,21,114,0.8)]">
          {count}
        </span>
      ) : null}
    </button>
  );
}
