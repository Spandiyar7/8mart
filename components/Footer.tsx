import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappMessage =
    "Здравствуйте! Хочу заказать цветы в FLORÉ. Подскажите, пожалуйста, что есть в наличии сегодня?";

  return (
    <footer className="border-t border-graphite/10 bg-graphite text-white">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-2xl font-bold tracking-normal"
            aria-label="FLORÉ, на главную"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-white">
              F
            </span>
            <span>{siteConfig.brandName}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/72">
            Цветочный склад и доставка букетов в Алматы. Большой выбор цветов,
            свежие поставки, сборка под повод и бюджет, заказ через WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-graphite">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Phone aria-hidden="true" />
                Позвонить
              </a>
            </Button>
          </div>
        </div>

        <nav aria-label="Навигация в подвале">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
            Разделы
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
            Контакты
          </h3>
          <div className="mt-5 space-y-4 text-sm text-white/75">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-goldBeige" aria-hidden="true" />
              <span>
                {siteConfig.city}, {siteConfig.address}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-goldBeige" aria-hidden="true" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
            </p>
            <p className="flex gap-3">
              <Instagram className="mt-0.5 size-4 shrink-0 text-goldBeige" aria-hidden="true" />
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
                Instagram FLORÉ
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. Доставка цветов в {siteConfig.city}.</p>
          <p>Онлайн-оплата будет добавлена позже.</p>
        </div>
      </div>
    </footer>
  );
}
