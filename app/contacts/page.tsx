import type { Metadata } from "next";
import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { DeliverySection } from "@/components/DeliverySection";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты FLORÉ в Алматы: WhatsApp, телефон, Instagram, адрес склада и режим работы 24/7."
};

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Написать флористу",
    href: getWhatsAppUrl("Здравствуйте! Хочу заказать цветы в FLORÉ.")
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@flore.almaty",
    href: siteConfig.instagram
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: `${siteConfig.city}, ${siteConfig.address}`,
    href: "#map"
  },
  {
    icon: Clock,
    title: "Режим работы",
    value: siteConfig.workingHours,
    href: "#"
  }
];

export default function ContactsPage() {
  const message =
    "Здравствуйте! Хочу заказать букет в FLORÉ. Подскажите, пожалуйста, что есть в наличии сегодня?";

  return (
    <>
      <section className="bg-warmMilk py-12 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="контакты"
              title="Напишите в WhatsApp — флорист быстро подберёт букет"
              description="Подскажем, какие цветы есть в наличии сегодня, соберём букет под бюджет и согласуем доставку."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Написать в WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                  <Phone aria-hidden="true" />
                  Позвонить
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http") || item.href.startsWith("https://wa.me");
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="rounded-[28px] bg-white p-6 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-lightPink text-deepRose">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-softGraphite/55">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-graphite">{item.value}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div id="map">
        <DeliverySection />
      </div>
    </>
  );
}
