import {
  Banknote,
  CreditCard,
  Clock,
  Headset,
  MapPin,
  Package,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { DepthCard } from "@/components/motion/DepthCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { HowToOrder } from "@/components/home/HowToOrder";
import { FinalCTA } from "@/components/home/FinalCTA";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Доставка цветов в Костанае",
  description:
    "Условия доставки 8MART: по Костанаю за 1,5–3 часа, от 3000 ₸, " +
    "самовывоз и работа 24/7. Фото букета перед отправкой.",
  path: "/delivery",
});

const conditions = [
  {
    icon: MapPin,
    title: "Зона доставки",
    text: "Доставляем по всему Костанаю и ближайшему пригороду.",
  },
  {
    icon: Clock,
    title: "Время доставки",
    text: "В среднем 1,5–3 часа. Срочные заказы — быстрее.",
  },
  {
    icon: Banknote,
    title: "Стоимость",
    text: "От 3000 ₸ по городу. Точную сумму назовём при заказе.",
  },
  {
    icon: Package,
    title: "Самовывоз",
    text: `Бесплатно по адресу ${siteConfig.address}.`,
  },
  {
    icon: CreditCard,
    title: "Оплата",
    text: "Наличными, переводом или через Kaspi — как удобно.",
  },
  {
    icon: Headset,
    title: "Работаем 24/7",
    text: "Принимаем и собираем заказы круглосуточно, без выходных.",
  },
];

const faq = [
  {
    question: "Сколько стоит доставка?",
    answer:
      "Доставка по Костанаю — от 3000 ₸. Точная стоимость зависит от района; мы озвучим её при оформлении заказа в WhatsApp.",
  },
  {
    question: "Как быстро вы доставите букет?",
    answer:
      "В среднем 1,5–3 часа от подтверждения заказа. Срочные заказы стараемся собрать и доставить быстрее.",
  },
  {
    question: "Можно доставить к определённому времени?",
    answer:
      "Да. Укажите желаемые дату и время при оформлении — курьер привезёт букет в нужный интервал.",
  },
  {
    question: "Покажете букет перед доставкой?",
    answer:
      "Обязательно. Перед отправкой флорист пришлёт фото готового букета в WhatsApp — чтобы вы были спокойны.",
  },
  {
    question: "Есть ли самовывоз?",
    answer: `Да, забрать заказ можно по адресу ${siteConfig.address}. Самовывоз бесплатный.`,
  },
  {
    question: "В какое время вы работаете?",
    answer:
      "8MART принимает заказы круглосуточно, 24/7. Ночная доставка возможна по договорённости.",
  },
];

export default function DeliveryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Доставка"
        title={
          <>
            Доставим букет <span className="text-gradient">за 1,5–3 часа</span>
          </>
        }
        description="Привезём свежий букет по всему Костанаю в удобное время. Аккуратно упакуем и покажем фото перед отправкой."
      >
        <MagneticButton>
          <WhatsAppButton size="lg" label="Уточнить доставку" variant="primary" />
        </MagneticButton>
      </PageHero>

      <Section background={<ParallaxPetalLayer count={8} tone="pink" seed={34} />}>
        <SectionTitle
          align="left"
          eyebrow="Условия"
          title="Как устроена доставка"
          description="Прозрачно и без сюрпризов — вот всё, что важно знать перед заказом."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition, index) => (
            <JitterMotionCard key={condition.title} index={index}>
              <DepthCard className="group h-full rounded-3xl" intensity={9}>
                <article className="glass flex h-full flex-col gap-2.5 rounded-3xl p-6">
                  <span className="inline-block w-fit fx-float-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <condition.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </span>
                  <h3 className="font-display text-lg text-graphite">
                    {condition.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-soft-graphite">
                    {condition.text}
                  </p>
                </article>
              </DepthCard>
            </JitterMotionCard>
          ))}
        </div>
      </Section>

      <HowToOrder />

      <Section background={<ParallaxPetalLayer count={6} tone="warm" seed={35} />}>
        <SectionTitle
          eyebrow="Вопросы и ответы"
          title="Частые вопросы о доставке"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={faq} />
        </div>
      </Section>

      <FinalCTA />
    </main>
  );
}
