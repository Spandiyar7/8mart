"use client";

import Link from "next/link";
import { Menu, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/lib/cart-store";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Header() {
  const count = useCartStore((state) => state.count());
  const openCart = useCartStore((state) => state.openCart);
  const whatsappMessage =
    "Здравствуйте! Хочу заказать цветы в FLORÉ. Помогите подобрать букет.";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-graphite/10 bg-white/88 backdrop-blur-xl">
        <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="FLORÉ, на главную"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white shadow-sm">
              F
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-normal text-graphite">
                {siteConfig.brandName}
              </span>
              <span className="block text-xs font-medium text-softGraphite/70">
                цветы 24/7
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-softGraphite transition-colors hover:bg-lightPink hover:text-deepRose"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden xl:inline-flex">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Phone aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label={`Открыть корзину, товаров: ${count}`}
              onClick={openCart}
              className="relative"
            >
              <ShoppingBag aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Открыть меню">
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-sm p-6">
                <SheetTitle className="text-xl font-semibold text-graphite">
                  Меню
                </SheetTitle>
                <nav className="mt-8 grid gap-2" aria-label="Мобильная навигация">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl px-4 py-3 text-base font-semibold text-graphite transition-colors hover:bg-lightPink hover:text-deepRose"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 grid gap-3">
                  <Button asChild>
                    <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                      <MessageCircle aria-hidden="true" />
                      Написать в WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                      <Phone aria-hidden="true" />
                      Позвонить
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
