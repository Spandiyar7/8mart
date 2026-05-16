import { Clock, MapPin, Phone, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DepthCard } from "@/components/motion/DepthCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { ContactForm } from "@/components/contacts/ContactForm";
import { InstagramIcon } from "@/components/svg/InstagramIcon";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Контакты",
  description:
    "Контакты 8MART в Костанае: адрес, телефон, WhatsApp и Instagram. " +
    "Принимаем заказы круглосуточно.",
  path: "/contacts",
});

type ContactCard = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

const contactCards: ContactCard[] = [
  {
    icon: MapPin,
    label: "Адрес",
    value: `${siteConfig.city}, ${siteConfig.address}`,
  },
  {
    icon: Phone,
    label: "Телефон",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Clock,
    label: "Часы работы",
    value: `Круглосуточно — ${siteConfig.workingHours}`,
  },
];

export default function ContactsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Контакты"
        title={
          <>
            Свяжитесь с <span className="text-gradient">8MART</span>
          </>
        }
        description="Поможем выбрать букет, подскажем по доставке и оформим заказ. Мы на связи круглосуточно."
      />

      <Section background={<ParallaxPetalLayer count={8} tone="soft" seed={36} />}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              {contactCards.map((card) => (
                <DepthCard
                  key={card.label}
                  className="rounded-2xl"
                  intensity={6}
                  glare={false}
                >
                  <div className="flex items-start gap-4 rounded-2xl border border-graphite/8 bg-white p-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-soft-graphite">{card.label}</p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="font-semibold text-graphite transition-colors hover:text-primary"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-graphite">
                          {card.value}
                        </p>
                      )}
                    </div>
                  </div>
                </DepthCard>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <WhatsAppButton size="md" label="Написать в WhatsApp" />
              </MagneticButton>
              <Button href={siteConfig.phoneHref} variant="ghost">
                <Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                Позвонить
              </Button>
              <Button
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                <InstagramIcon className="h-[1.05rem] w-[1.05rem]" />
                Instagram
              </Button>
            </div>

            <DepthCard className="rounded-3xl" intensity={7} glare={false}>
              <div className="relative h-64 overflow-hidden rounded-3xl border border-graphite/8 bg-gradient-to-br from-light-pink/70 to-warm-milk">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(217,21,114,0.16)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-white/65" />
                <div className="absolute inset-y-0 left-1/3 w-1.5 bg-white/65" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <span className="fx-float grid h-12 w-12 rotate-45 place-items-center rounded-full rounded-bl-none bg-primary text-white shadow-[0_12px_24px_-8px_rgba(217,21,114,0.9)]">
                    <MapPin
                      className="h-5 w-5 -rotate-45"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="glass absolute inset-x-3 bottom-3 rounded-2xl px-4 py-2.5">
                  <p className="text-sm font-semibold text-graphite">
                    Цветочный склад 8MART
                  </p>
                  <p className="text-xs text-soft-graphite">
                    {siteConfig.address}, {siteConfig.city}
                  </p>
                </div>
              </div>
            </DepthCard>
            <p className="text-xs text-soft-graphite">
              Схематичная карта. Точную геолокацию пришлём в WhatsApp при
              оформлении заказа.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-graphite">
              Задать вопрос
            </h2>
            <p className="mb-5 mt-1 text-sm text-soft-graphite">
              Оставьте сообщение — флорист ответит в WhatsApp в течение
              нескольких минут.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
