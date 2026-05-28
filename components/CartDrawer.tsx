"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import { cartWhatsAppMessage, getWhatsAppUrl, type CustomerDraft } from "@/lib/whatsapp";

const defaultCustomer: CustomerDraft = {
  city: siteConfig.city
};

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const openCart = useCartStore((state) => state.openCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = useCartStore((state) => state.total());
  const [customer, setCustomer] = useState<CustomerDraft>(defaultCustomer);

  const whatsappUrl = useMemo(() => {
    const message = cartWhatsAppMessage(
      items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        addons: item.addons
      })),
      total,
      customer
    );

    return getWhatsAppUrl(message);
  }, [customer, items, total]);

  const updateCustomer = (field: keyof CustomerDraft, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent
        side="bottom"
        className="flex h-[92vh] flex-col overflow-hidden p-0 sm:inset-x-auto sm:bottom-auto sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-[500px] sm:rounded-none sm:data-[state=closed]:translate-x-full sm:data-[state=closed]:translate-y-0 sm:data-[state=open]:translate-x-0"
      >
        <div className="border-b border-graphite/10 px-5 py-5 pr-16 sm:px-7">
          <SheetTitle className="text-2xl font-semibold text-graphite">
            Корзина
          </SheetTitle>
          <SheetDescription className="mt-1 text-sm text-softGraphite">
            Оформление происходит через WhatsApp. Онлайн-оплата будет добавлена позже.
          </SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {items.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-[28px] bg-warmMilk p-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-lightPink text-deepRose">
                <CalendarDays className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-graphite">
                Корзина пока пустая
              </h3>
              <p className="mt-2 text-sm leading-6 text-softGraphite">
                Добавьте букет из каталога или напишите флористу, если нужна помощь с выбором.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.lineId}
                  className="grid grid-cols-[82px_1fr] gap-4 rounded-[24px] border border-graphite/10 bg-white p-3 shadow-sm"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[20px] bg-warmMilk">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="82px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-semibold text-graphite">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-primary">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-softGraphite transition-colors hover:bg-lightPink hover:text-deepRose"
                        aria-label={`Удалить ${item.product.name}`}
                        onClick={() => removeItem(item.lineId)}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    {item.addons.length > 0 && (
                      <p className="mt-2 text-xs text-softGraphite">
                        Дополнения: {item.addons.join(", ")}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-graphite/10">
                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-lightPink"
                          aria-label="Уменьшить количество"
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        >
                          <Minus className="size-4" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-lightPink"
                          aria-label="Увеличить количество"
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-graphite">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-7 rounded-[28px] bg-warmMilk p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-graphite">
              <MapPin className="size-4 text-leafGreen" aria-hidden="true" />
              Доставка по Алматы
            </div>
            <p className="mt-2 text-sm leading-6 text-softGraphite">
              Среднее время доставки {siteConfig.deliveryTime}. Курьерская доставка {siteConfig.deliveryPriceFrom}.
            </p>
          </div>

          <form className="mt-7 grid gap-4" aria-label="Данные для оформления заказа">
            <div className="grid gap-2">
              <Label htmlFor="cart-name">Имя</Label>
              <Input
                id="cart-name"
                value={customer.name ?? ""}
                onChange={(event) => updateCustomer("name", event.target.value)}
                placeholder="Как к вам обращаться"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cart-phone">Телефон</Label>
              <Input
                id="cart-phone"
                value={customer.phone ?? ""}
                onChange={(event) => updateCustomer("phone", event.target.value)}
                placeholder="+7..."
                inputMode="tel"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="cart-city">Город</Label>
                <Input
                  id="cart-city"
                  value={customer.city ?? ""}
                  onChange={(event) => updateCustomer("city", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cart-date">Дата</Label>
                <Input
                  id="cart-date"
                  type="date"
                  value={customer.date ?? ""}
                  onChange={(event) => updateCustomer("date", event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cart-address">Адрес доставки</Label>
              <Input
                id="cart-address"
                value={customer.address ?? ""}
                onChange={(event) => updateCustomer("address", event.target.value)}
                placeholder="Улица, дом, квартира или ориентир"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cart-time">Интервал времени</Label>
              <Input
                id="cart-time"
                value={customer.time ?? ""}
                onChange={(event) => updateCustomer("time", event.target.value)}
                placeholder="Например, 14:00-16:00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cart-comment">Комментарий</Label>
              <Textarea
                id="cart-comment"
                value={customer.comment ?? ""}
                onChange={(event) => updateCustomer("comment", event.target.value)}
                placeholder="Текст открытки, пожелания по цвету, имя получателя"
              />
            </div>
          </form>
        </div>

        <div className="border-t border-graphite/10 bg-white px-5 py-4 sm:px-7">
          <div className="mb-4 flex items-center justify-between text-base font-semibold">
            <span>Итого</span>
            <span className="text-xl text-primary">{formatPrice(total)}</span>
          </div>
          {items.length > 0 ? (
            <Button asChild size="lg" className="w-full">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Оформить через WhatsApp
              </a>
            </Button>
          ) : (
            <Button size="lg" className="w-full" disabled>
              Оформить через WhatsApp
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
