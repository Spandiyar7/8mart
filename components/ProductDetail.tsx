"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Clock, Gift, MessageCircle, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categoryLabels } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

const addonOptions = ["Открытка", "Клубника", "Шарики", "Игрушка"];

type ProductDetailProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? product.image);
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const whatsappUrl = useMemo(
    () => getWhatsAppUrl(productWhatsAppMessage(product, quantity, addons)),
    [addons, product, quantity]
  );

  const toggleAddon = (addon: string) => {
    setAddons((current) =>
      current.includes(addon)
        ? current.filter((item) => item !== addon)
        : [...current, addon]
    );
  };

  const handleAdd = () => {
    addItem(product, quantity, addons);
    openCart();
  };

  return (
    <div>
      <section className="bg-warmMilk py-10 sm:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <div className="relative aspect-[4/4.25] overflow-hidden rounded-[36px] bg-white shadow-premium">
              <Image
                src={selectedImage}
                alt={`${product.name} - фото букета 8MART`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-cover"
              />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                {product.badge && <Badge>{product.badge}</Badge>}
                <Badge tone={product.inStock ? "green" : "neutral"}>
                  {product.inStock ? "В наличии" : "Под заказ"}
                </Badge>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {product.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-[20px] border bg-white transition-colors",
                    selectedImage === image
                      ? "border-primary"
                      : "border-transparent hover:border-graphite/20"
                  )}
                  aria-label={`Показать фото ${product.name}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name}, миниатюра`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] bg-white p-5 shadow-premium sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-softGraphite/55">
              {categoryLabels[product.category]}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-normal text-graphite sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-softGraphite">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice && (
                <p className="pb-1 text-lg font-medium text-softGraphite/50 line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
            </div>

            <div className="mt-7 grid gap-4 rounded-[28px] bg-warmMilk p-5">
              <div>
                <h2 className="text-sm font-semibold text-graphite">Состав</h2>
                <p className="mt-2 text-sm leading-6 text-softGraphite">
                  {product.composition.join(", ")}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold text-graphite">Размер</h2>
                  <p className="mt-1 text-sm text-softGraphite">{product.size}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-graphite">Доступность</h2>
                  <p className="mt-1 text-sm text-softGraphite">
                    {product.inStock ? "Есть на складе сегодня" : "Соберём под заказ"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-4">
              <div>
                <h2 className="text-sm font-semibold text-graphite">Количество</h2>
                <div className="mt-3 inline-flex items-center rounded-full border border-graphite/10 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="inline-flex size-11 items-center justify-center rounded-full hover:bg-lightPink"
                    aria-label="Уменьшить количество"
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="inline-flex size-11 items-center justify-center rounded-full hover:bg-lightPink"
                    aria-label="Увеличить количество"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold text-graphite">
                  Дополнения
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {addonOptions.map((addon) => (
                    <button
                      key={addon}
                      type="button"
                      aria-pressed={addons.includes(addon)}
                      onClick={() => toggleAddon(addon)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                        addons.includes(addon)
                          ? "border-primary bg-lightPink text-deepRose"
                          : "border-graphite/10 bg-white text-softGraphite hover:border-primary hover:text-primary"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border",
                          addons.includes(addon)
                            ? "border-primary bg-primary text-white"
                            : "border-graphite/20"
                        )}
                      >
                        {addons.includes(addon) && (
                          <Check className="size-3" aria-hidden="true" />
                        )}
                      </span>
                      {addon}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button type="button" size="lg" onClick={handleAdd}>
                <ShoppingBag aria-hidden="true" />
                Добавить в корзину
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Заказать в WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-7 grid gap-3 rounded-[28px] border border-leafGreen/15 bg-leafGreen/5 p-5">
              <div className="flex gap-3">
                <Truck className="mt-0.5 size-5 shrink-0 text-leafGreen" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-graphite">Доставка сегодня</h2>
                  <p className="mt-1 text-sm leading-6 text-softGraphite">
                    По Костанаю в среднем {siteConfig.deliveryTime}, доставка {siteConfig.deliveryPriceFrom}.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-leafGreen" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-graphite">Фото перед доставкой</h2>
                  <p className="mt-1 text-sm leading-6 text-softGraphite">
                    Покажем готовый букет перед отправкой, чтобы вы были спокойны.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Gift className="mt-0.5 size-5 shrink-0 text-leafGreen" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-graphite">Подарок готов к вручению</h2>
                  <p className="mt-1 text-sm leading-6 text-softGraphite">
                    Добавим открытку, шарики или сладкий подарок по запросу.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-leafGreen" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-graphite">Работаем {siteConfig.workingHours}</h2>
                  <p className="mt-1 text-sm leading-6 text-softGraphite">
                    Можно написать в WhatsApp в любое время.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-normal text-graphite sm:text-4xl">
                Похожие букеты
              </h2>
              <p className="mt-4 text-base leading-7 text-softGraphite">
                Ещё варианты из той же категории, которые можно заказать сегодня.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
