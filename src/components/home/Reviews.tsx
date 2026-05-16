import { Info, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DepthCard } from "@/components/motion/DepthCard";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { cn } from "@/lib/cn";

const reviews = [
  {
    name: "Алия",
    rating: 5,
    text: "Заказывала букет маме на юбилей. Прислали фото перед доставкой, всё привезли вовремя. Цветы свежие, стоят уже вторую неделю.",
  },
  {
    name: "Дмитрий",
    rating: 5,
    text: "Нужен был букет срочно вечером. Написал в WhatsApp — собрали и доставили за два часа. Очень выручили!",
  },
  {
    name: "Сауле",
    rating: 5,
    text: "Большой выбор и адекватные цены. Флорист помог собрать букет под бюджет, получилось нежно и со вкусом.",
  },
  {
    name: "Марина",
    rating: 4,
    text: "Брала корзину цветов на день рождения подруги. Выглядит дороже, чем стоила. Спасибо за подачу!",
  },
  {
    name: "Ержан",
    rating: 5,
    text: "Удобно, что работают круглосуточно. Заказал поздно ночью — утром уже доставили. Жена была в восторге.",
  },
  {
    name: "Виктория",
    rating: 5,
    text: "Постоянно заказываю здесь. Цветы всегда свежие, упаковка аккуратная, доставка быстрая. Рекомендую.",
  },
];

const avatarTones = [
  "bg-primary",
  "bg-deep-rose",
  "bg-leaf-green",
  "bg-gold-beige",
  "bg-soft-graphite",
  "bg-primary-hover",
];

const restAngles = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-2", "-rotate-2"];

/** Reviews — a gently fanned 3D card stack. Clearly marked as demo. */
export function Reviews() {
  return (
    <Section
      id="reviews"
      className="bg-warm-milk"
      background={<ParallaxPetalLayer count={8} tone="soft" seed={5} />}
    >
      <SectionTitle
        eyebrow="Отзывы"
        title={
          <>
            Что говорят <span className="text-gradient">покупатели</span>
          </>
        }
        description="Тёплые слова приятнее любой рекламы — и мы стараемся их заслужить."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <JitterMotionCard key={review.name} index={index}>
            <DepthCard className="group h-full rounded-3xl" intensity={8}>
              <article
                className={cn(
                  "flex h-full flex-col gap-4 rounded-3xl border border-graphite/8 bg-white p-6 shadow-[var(--shadow-card)] transition-transform duration-500 group-hover:rotate-0",
                  restAngles[index % restAngles.length],
                )}
              >
                <div
                  className="flex items-center gap-1"
                  aria-label={`Оценка ${review.rating} из 5`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating
                          ? "fill-gold-beige text-gold-beige"
                          : "fill-graphite/10 text-graphite/15",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-soft-graphite">
                  «{review.text}»
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full font-display text-base font-semibold text-white",
                      avatarTones[index % avatarTones.length],
                    )}
                    aria-hidden="true"
                  >
                    {review.name.charAt(0)}
                  </span>
                  <span className="text-sm font-semibold text-graphite">
                    {review.name}
                  </span>
                </div>
              </article>
            </DepthCard>
          </JitterMotionCard>
        ))}
      </div>

      <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-2xl bg-light-pink/70 px-4 py-3 text-center text-xs text-deep-rose">
        <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
        Демо-отзывы — заменить на реальные после подключения 2GIS / Yandex /
        Instagram.
      </p>
    </Section>
  );
}
