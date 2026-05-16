"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, ShoppingBag, X } from "lucide-react";
import {
  useCartStore,
  selectCartTotal,
  selectCartCount,
} from "@/store/cart-store";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { buildOrderMessage, getWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice, formatItemCount } from "@/lib/formatPrice";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

const inputClass =
  "h-11 w-full rounded-xl border border-graphite/12 bg-white px-3.5 text-sm text-graphite " +
  "outline-none transition-colors placeholder:text-soft-graphite/55 " +
  "focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold text-soft-graphite"
      >
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

const emptyForm = {
  name: "",
  phone: "",
  address: "",
  date: "",
  time: "",
  comment: "",
};

/**
 * Cart drawer — a right-side panel on desktop, a bottom sheet on mobile.
 * Checkout hands the full order off to WhatsApp; nothing is stored.
 */
export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectCartTotal);
  const count = useCartStore(selectCartCount);

  const [form, setForm] = useState(emptyForm);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const canCheckout =
    items.length > 0 && form.name.trim() !== "" && form.phone.trim() !== "";

  const update =
    (key: keyof typeof emptyForm) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleCheckout = () => {
    if (!canCheckout) return;
    const message = buildOrderMessage(items, form);
    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  const panelMotion = isDesktop
    ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70]"
          role="dialog"
          aria-modal="true"
          aria-label="Корзина"
        >
          <motion.div
            className="absolute inset-0 bg-graphite/45 backdrop-blur-sm"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={cn(
              "absolute flex flex-col bg-warm-milk shadow-2xl",
              isDesktop
                ? "right-0 top-0 h-full w-[min(27rem,100vw)]"
                : "inset-x-0 bottom-0 max-h-[92vh] rounded-t-3xl",
            )}
            {...panelMotion}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
          >
            <header className="flex items-center justify-between border-b border-graphite/8 px-5 py-4">
              <div>
                <h2 className="font-display text-xl text-graphite">Корзина</h2>
                <p className="text-xs text-soft-graphite">
                  {count > 0 ? formatItemCount(count) : "Пока пусто"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Закрыть корзину"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-graphite transition-colors hover:bg-light-pink hover:text-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-14 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-light-pink text-primary">
                    <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-graphite">
                      В корзине пока пусто
                    </p>
                    <p className="mt-1 text-sm text-soft-graphite">
                      Добавьте букеты из каталога — соберём заказ за пару минут.
                    </p>
                  </div>
                  <Button href="/catalog" onClick={closeCart} variant="primary">
                    Перейти в каталог
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </AnimatePresence>

                  <div className="mt-3 flex flex-col gap-3">
                    <h3 className="font-display text-base text-graphite">
                      Данные доставки
                    </h3>
                    <Field label="Имя" htmlFor="cart-name" required>
                      <input
                        id="cart-name"
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Как к вам обращаться"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Телефон" htmlFor="cart-phone" required>
                      <input
                        id="cart-phone"
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="+7 ___ ___ __ __"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Адрес доставки" htmlFor="cart-address">
                      <input
                        id="cart-address"
                        type="text"
                        value={form.address}
                        onChange={update("address")}
                        placeholder="Улица, дом, квартира"
                        className={inputClass}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Дата" htmlFor="cart-date">
                        <input
                          id="cart-date"
                          type="date"
                          min={today}
                          value={form.date}
                          onChange={update("date")}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Время" htmlFor="cart-time">
                        <input
                          id="cart-time"
                          type="time"
                          value={form.time}
                          onChange={update("time")}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <Field label="Комментарий" htmlFor="cart-comment">
                      <textarea
                        id="cart-comment"
                        rows={2}
                        value={form.comment}
                        onChange={update("comment")}
                        placeholder="Открытка, пожелания к букету"
                        className={cn(inputClass, "h-auto py-2.5")}
                      />
                    </Field>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 ? (
              <div className="flex flex-col gap-3 border-t border-graphite/8 bg-white/60 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-soft-graphite">Итого</span>
                  <span className="font-display text-2xl text-graphite">
                    {formatPrice(total)}
                  </span>
                </div>
                <MagneticButton className="w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                    className="w-full"
                  >
                    <MessageCircle
                      className="h-[1.05rem] w-[1.05rem]"
                      aria-hidden="true"
                    />
                    Оформить через WhatsApp
                  </Button>
                </MagneticButton>
                {!canCheckout ? (
                  <p className="text-center text-xs text-soft-graphite">
                    Укажите имя и телефон, чтобы оформить заказ.
                  </p>
                ) : null}
                <div className="flex items-center justify-between text-xs">
                  <Link
                    href="/catalog"
                    onClick={closeCart}
                    className="text-soft-graphite transition-colors hover:text-primary"
                  >
                    ← Продолжить выбор
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-soft-graphite transition-colors hover:text-primary"
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
