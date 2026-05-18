import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Flower2, MessageCircle, Sparkles, Truck } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "О магазине",
  description:
    "8MART — цветочный склад и доставка цветов в Костанае. Большой выбор, свежие поставки, WhatsApp-заказ 24/7."
};

const stats = [
  { value: "500+", label: "видов цветов и позиций" },
  { value: "24/7", label: "принимаем заказы" },
  { value: "1,5–3 ч", label: "средняя доставка" },
  { value: "3000 ₸", label: "доставка от" }
];

const values = [
  {
    icon: Flower2,
    title: "Выбор как на складе",
    text: "Сильная сторона 8MART — большой ассортимент цветов, упаковки и готовых решений."
  },
  {
    icon: Sparkles,
    title: "Подача как у премиального магазина",
    text: "Букет должен выглядеть аккуратно, актуально и уместно для повода."
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: "Помогаем решить задачу сегодня: подобрать, собрать, сфотографировать и доставить."
  },
  {
    icon: BadgeCheck,
    title: "Честное согласование",
    text: "Если нужного цветка нет, флорист предложит близкую замену и покажет результат."
  }
];

export default function AboutPage() {
  const message =
    "Здравствуйте! Расскажите, пожалуйста, какие букеты и цветы есть в наличии сегодня.";

  return (
    <>
      <section className="bg-warmMilk py-12 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="о 8MART"
              title="Большой цветочный склад с сервисом современного онлайн-магазина"
              description="8MART помогает быстро заказать свежие цветы в Костанае: от одной розы до крупной композиции для важного события."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/catalog">Перейти в каталог</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white">
                <a href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Спросить флориста
                </a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3.2] overflow-hidden rounded-[36px] bg-white shadow-premium">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=85"
              alt="Свежие цветы на складе 8MART в Костанае"
              fill
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[28px] bg-warmMilk p-6">
                <p className="text-4xl font-bold text-primary">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-softGraphite">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionTitle
              title="Что важно в работе 8MART"
              description="Складской формат даёт выбор и цену, а флористический сервис делает заказ красивым и спокойным."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[28px] border border-graphite/10 bg-white p-6 shadow-soft">
                    <div className="flex size-12 items-center justify-center rounded-full bg-lightPink text-deepRose">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-graphite">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-softGraphite">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
