import type { Metadata } from "next";
import { Clock, CreditCard, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { DeliverySection } from "@/components/DeliverySection";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Условия доставки цветов 8MART по Костанаю: доставка 1,5–3 часа, самовывоз, оплата после согласования заказа."
};

const rules = [
  {
    icon: Truck,
    title: "Доставка по Костанаю",
    text: `Среднее время — ${siteConfig.deliveryTime}. Точное время зависит от адреса и загрузки курьеров.`
  },
  {
    icon: Clock,
    title: "Интервал доставки",
    text: "Можно указать удобное окно. Срочную доставку лучше согласовать в WhatsApp."
  },
  {
    icon: ShieldCheck,
    title: "Фото перед отправкой",
    text: "Перед доставкой флорист отправит фото букета для финального согласования."
  },
  {
    icon: CreditCard,
    title: "Оплата",
    text: "Онлайн-оплата будет добавлена позже. Сейчас заказ и оплату согласуем в WhatsApp."
  }
];

export default function DeliveryPage() {
  const message = "Здравствуйте! Хочу уточнить доставку цветов по Костанаю.";

  return (
    <>
      <section className="bg-warmMilk py-12 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="доставка и оплата"
              title="Доставляем букеты по Костанаю каждый день"
              description="Соберём букет, пришлём фото перед доставкой и передадим получателю через курьера."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Уточнить доставку
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                  Позвонить
                </a>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {rules.map((rule) => {
              const Icon = rule.icon;
              return (
                <article key={rule.title} className="rounded-[28px] bg-white p-6 shadow-soft">
                  <div className="flex size-12 items-center justify-center rounded-full bg-lightPink text-deepRose">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-graphite">
                    {rule.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-softGraphite">
                    {rule.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <DeliverySection />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="rounded-[32px] border border-graphite/10 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-leafGreen/10 text-leafGreen">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-graphite">Самовывоз</h2>
                <p className="mt-3 text-base leading-7 text-softGraphite">
                  Можно забрать заказ самостоятельно: {siteConfig.city}, {siteConfig.address}.
                  Напишите заранее, чтобы флорист подготовил букет к вашему приезду.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
