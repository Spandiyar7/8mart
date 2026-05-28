"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, MessageCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { categoryLabels } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const whatsappUrl = getWhatsAppUrl(productWhatsAppMessage(product));

  const handleAdd = () => {
    addItem(product);
    setPreviewOpen(false);
    openCart();
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-graphite/10 bg-white shadow-soft"
    >
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          "relative block overflow-hidden bg-warmMilk",
          compact ? "aspect-[4/3]" : "aspect-[4/4.4]"
        )}
      >
        <Image
          src={product.image}
          alt={`${product.name} - доставка цветов FLORÉ в Алматы`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badge && <Badge>{product.badge}</Badge>}
          {!product.inStock && <Badge tone="neutral">Под заказ</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-softGraphite/55">
              {categoryLabels[product.category]}
            </p>
            <Link href={`/product/${product.slug}`} className="mt-2 block">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-graphite transition-colors group-hover:text-primary">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-softGraphite">
          {product.composition.join(", ")}
        </p>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end gap-2">
            <span className="text-2xl font-bold text-graphite">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="pb-1 text-sm font-medium text-softGraphite/55 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" onClick={handleAdd} aria-label={`Добавить ${product.name} в корзину`}>
              <ShoppingBag aria-hidden="true" />
              В корзину
            </Button>
            <Button asChild variant="outline">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Заказать ${product.name} в WhatsApp`}>
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>

          <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-softGraphite transition-colors hover:bg-lightPink hover:text-deepRose"
              >
                <Eye className="size-4" aria-hidden="true" />
                Быстрый просмотр
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="max-h-[92vh] overflow-y-auto p-5 sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-[460px] sm:rounded-none sm:data-[state=closed]:translate-x-full sm:data-[state=closed]:translate-y-0 sm:data-[state=open]:translate-x-0"
            >
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[28px] bg-warmMilk sm:mt-10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="460px"
                  className="object-cover"
                />
              </div>
              <div className="mt-6">
                <SheetTitle className="text-2xl font-semibold text-graphite">
                  {product.name}
                </SheetTitle>
                <SheetDescription className="mt-3 text-base leading-7 text-softGraphite">
                  {product.description}
                </SheetDescription>
                <div className="mt-5 rounded-[24px] bg-warmMilk p-4">
                  <p className="text-sm font-semibold text-graphite">Состав</p>
                  <p className="mt-2 text-sm leading-6 text-softGraphite">
                    {product.composition.join(", ")}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <Badge tone={product.inStock ? "green" : "neutral"}>
                    {product.inStock ? "В наличии" : "Под заказ"}
                  </Badge>
                </div>
                <div className="mt-6 grid gap-3">
                  <Button type="button" onClick={handleAdd}>
                    <ShoppingBag aria-hidden="true" />
                    Добавить в корзину
                  </Button>
                  <Button asChild variant="outline">
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      <MessageCircle aria-hidden="true" />
                      Заказать в WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href={`/product/${product.slug}`}>Открыть карточку</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.article>
  );
}
