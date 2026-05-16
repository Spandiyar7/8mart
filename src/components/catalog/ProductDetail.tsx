"use client";

import { useState } from "react";
import {
  Camera,
  Check,
  Clock,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ProductPhotoFrame } from "@/components/frames/ProductPhotoFrame";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import { buildProductMessage, getWhatsAppLink } from "@/lib/whatsapp";
import {
  badgeLabels,
  categoryLabels,
  colorLabels,
  occasionLabels,
} from "@/data/products";
import type { Product, ProductBadge } from "@/types/product";
import { cn } from "@/lib/cn";

const badgeTone: Record<ProductBadge, "hit" | "new" | "deal"> = {
  hit: "hit",
  new: "new",
  deal: "deal",
};

const ADDONS = [
  "Открытка",
  "Клубника в шоколаде",
  "Воздушные шары",
  "Мягкая игрушка",
];

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-soft-graphite">{label}</dt>
      <dd className="font-medium text-graphite">{value}</dd>
    </div>
  );
}

/** Interactive product detail — framed gallery, quantity, add-ons, ordering. */
export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);

  const toggleAddon = (addon: string) =>
    setAddons((current) =>
      current.includes(addon)
        ? current.filter((item) => item !== addon)
        : [...current, addon],
    );

  const whatsappHref = getWhatsAppLink(
    buildProductMessage(product, quantity, addons),
  );

  return (
    <div className="relative">
      <ParallaxPetalLayer count={7} tone="soft" seed={21} />

      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <ProductPhotoFrame
            key={activeImage}
            product={product}
            imageIndex={activeImage}
            rounded="rounded-3xl"
            className="aspect-square w-full"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Показать фото ${index + 1}`}
                aria-pressed={activeImage === index}
                className={cn(
                  "overflow-hidden rounded-2xl ring-2 transition-all duration-200",
                  activeImage === index
                    ? "ring-primary"
                    : "ring-transparent hover:ring-primary/30",
                )}
              >
                <ProductPhotoFrame
                  product={product}
                  imageIndex={index}
                  tilt={false}
                  reveal={false}
                  petals={false}
                  corner={false}
                  rounded="rounded-2xl"
                  className="aspect-square w-full"
                  sizes="20vw"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
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

          <h1 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl text-primary">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice ? (
              <span className="text-lg text-soft-graphite/65 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : null}
          </div>

          <p
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              product.inStock ? "text-leaf-green" : "text-soft-graphite",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                product.inStock ? "bg-leaf-green" : "bg-soft-graphite",
              )}
            />
            {product.inStock
              ? "В наличии — соберём и отправим сегодня"
              : "Под заказ — уточните срок у флориста"}
          </p>

          <p className="text-[0.97rem] leading-relaxed text-soft-graphite">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl bg-light-pink/45 p-4">
            <Detail label="Формат" value={categoryLabels[product.category]} />
            <Detail
              label="Цветовая гамма"
              value={product.colors
                .map((color) => colorLabels[color])
                .join(", ")}
            />
            <Detail
              label="Подходит для"
              value={product.occasion
                .map((occasion) => occasionLabels[occasion])
                .join(", ")}
            />
            <Detail label="Свежесть" value="5–10 дней при уходе" />
          </dl>

          <div>
            <h2 className="mb-2 font-semibold text-graphite">Состав букета</h2>
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
          </div>

          <div>
            <h2 className="mb-2 font-semibold text-graphite">
              Добавить к букету
            </h2>
            <div className="flex flex-wrap gap-2">
              {ADDONS.map((addon) => {
                const active = addons.includes(addon);
                return (
                  <button
                    key={addon}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleAddon(addon)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200",
                      active
                        ? "-translate-y-0.5 bg-primary text-white shadow-[0_10px_22px_-10px_rgba(217,21,114,0.85)]"
                        : "border border-graphite/15 bg-white text-soft-graphite hover:border-primary/40 hover:text-primary",
                    )}
                  >
                    {addon}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-[3.35rem] w-fit items-center gap-1 rounded-full border border-graphite/12 bg-white px-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Уменьшить количество"
                className="grid h-10 w-10 place-items-center rounded-full text-graphite transition-colors hover:bg-light-pink hover:text-primary"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-9 text-center font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Увеличить количество"
                className="grid h-10 w-10 place-items-center rounded-full text-graphite transition-colors hover:bg-light-pink hover:text-primary"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => addItem(product, quantity)}
              disabled={!product.inStock}
              className="flex-1"
            >
              <ShoppingBag
                className="h-[1.05rem] w-[1.05rem]"
                aria-hidden="true"
              />
              Добавить в корзину
            </Button>
          </div>

          <MagneticButton className="w-full">
            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="w-full"
            >
              <MessageCircle
                className="h-[1.05rem] w-[1.05rem]"
                aria-hidden="true"
              />
              Заказать в WhatsApp
            </Button>
          </MagneticButton>

          <div className="flex flex-col gap-2.5 rounded-2xl border border-graphite/8 bg-white p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-graphite">
              <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
              Доставка сегодня
            </p>
            <p className="flex items-center gap-2 text-sm text-soft-graphite">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              Среднее время — 1,5–3 часа по Костанаю
            </p>
            <p className="flex items-center gap-2 text-sm text-soft-graphite">
              <Camera className="h-4 w-4 text-primary" aria-hidden="true" />
              Пришлём фото готового букета перед отправкой
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
