import { ArrowRight, Clock, MapPin, Package, Truck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DepthCard } from "@/components/motion/DepthCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { DeliveryRouteLine } from "@/components/svg/DeliveryRouteLine";
import { siteConfig } from "@/config/site";

const facts = [
  {
    icon: Truck,
    title: "Доставка по Костанаю",
    text: "Курьер привезёт букет в любой район города.",
  },
  {
    icon: Clock,
    title: "Среднее время — 1,5–3 часа",
    text: "Срочные заказы собираем и отправляем быстрее.",
  },
  {
    icon: Package,
    title: "Доставка курьером — от 3000 ₸",
    text: "Точная стоимость зависит от района доставки.",
  },
  {
    icon: MapPin,
    title: "Самовывоз и работа 24/7",
    text: `${siteConfig.address}. Принимаем заказы круглосуточно.`,
  },
];

/** Delivery preview — a tilting glass map card with a glowing route. */
export function DeliveryPreview() {
  return (
    <Section
      id="delivery-preview"
      background={<ParallaxPetalLayer count={7} tone="pink" seed={8} />}
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle
            align="left"
            eyebrow="Доставка"
            title={
              <>
                Привезём букет <span className="text-gradient">сегодня</span>
              </>
            }
            description="Доставляем по всему Костанаю и ближайшим адресам. Букет едет к получателю аккуратно упакованным и свежим."
          />

          <ul className="mt-8 flex flex-col gap-4">
            {facts.map((fact) => (
              <li key={fact.title} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <fact.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-graphite">{fact.title}</h3>
                  <p className="text-sm text-soft-graphite">{fact.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/delivery" variant="primary">
              Подробнее о доставке
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <WhatsAppButton label="Уточнить доставку" />
          </div>
        </div>

        <DepthCard className="rounded-3xl" intensity={7} glare={false}>
          <div className="relative overflow-hidden rounded-3xl border border-graphite/8 bg-gradient-to-br from-light-pink/70 to-warm-milk p-6 shadow-[var(--shadow-soft)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(217,21,114,0.16)_1px,transparent_1px)] [background-size:26px_26px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,21,114,0.4),transparent_70%)] blur-2xl"
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-deep-rose">
                  {siteConfig.city}
                </span>
                <span className="fx-pulse rounded-full bg-leaf-green/14 px-3 py-1 text-xs font-semibold text-leaf-green">
                  Курьер в пути
                </span>
              </div>

              <DeliveryRouteLine className="my-6" />

              <div className="fx-float glass flex items-start gap-3 rounded-2xl p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-graphite">
                    Цветочный склад 8MART
                  </p>
                  <p className="text-sm text-soft-graphite">
                    {siteConfig.address}, {siteConfig.city}
                  </p>
                  <p className="mt-1 text-xs text-leaf-green">
                    Открыто сейчас · {siteConfig.workingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DepthCard>
      </div>
    </Section>
  );
}
