import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Clock,
  Flower2,
  Gift,
  HeartHandshake,
  MessageCircle,
  Phone,
  Sparkles,
  Truck
} from "lucide-react";
import { BudgetPicker } from "@/components/BudgetPicker";
import { CategoryGrid } from "@/components/CategoryGrid";
import { DeliverySection } from "@/components/DeliverySection";
import { Hero } from "@/components/Hero";
import { InstagramGrid } from "@/components/InstagramGrid";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getFeaturedProducts } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const whyItems = [
  {
    icon: Flower2,
    title: "Крупный цветочный склад",
    text: "Большой запас цветов в наличии, поэтому проще попасть в нужный бюджет и цветовую гамму."
  },
  {
    icon: BadgeCheck,
    title: "Свежие поставки",
    text: "Флорист подбирает живые цветы и показывает фото готового букета перед доставкой."
  },
  {
    icon: Sparkles,
    title: "Большой выбор",
    text: "Розы, монобукеты, сборные букеты, корзины, коробки и дополнения к подарку."
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: `В среднем ${siteConfig.deliveryTime} по Алматы, можно выбрать удобный интервал.`
  },
  {
    icon: MessageCircle,
    title: "Заказ онлайн",
    text: "Выбирайте на сайте или сразу пишите в WhatsApp — соберём заказ в переписке."
  },
  {
    icon: HeartHandshake,
    title: "Подбор под бюджет",
    text: "Не знаете, что выбрать? Флорист подскажет варианты под повод, стиль и сумму."
  }
];

const orderSteps = [
  {
    title: "Выберите букет",
    text: "Откройте каталог, добавьте букет в корзину или напишите флористу."
  },
  {
    title: "Укажите адрес и время",
    text: "Заполните детали доставки, получателя и желаемый интервал."
  },
  {
    title: "Получите фото перед доставкой",
    text: "Покажем готовый букет, чтобы вы могли спокойно согласовать заказ."
  },
  {
    title: "Курьер доставит получателю",
    text: "Аккуратно передадим букет по адресу или подготовим к самовывозу."
  }
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const whatsappMessage =
    "Здравствуйте! Нужен букет сегодня. Помогите подобрать вариант под бюджет и повод.";

  return (
    <>
      <Hero />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="категории"
              title="Быстро найдите нужный формат подарка"
              description="От классических роз до премиальных композиций в коробках и корзинах."
            />
            <Button asChild variant="outline" className="w-fit">
              <Link href="/catalog">
                Весь каталог
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <section className="bg-warmMilk py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="хиты продаж"
              title="Букеты, которые чаще всего выбирают для доставки"
              description="Популярные варианты для дня рождения, свидания, благодарности и подарка без повода."
            />
            <Button asChild variant="outline" className="w-fit bg-white">
              <Link href="/catalog">Смотреть все букеты</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionTitle
            eyebrow="почему FLORÉ"
            title="Красиво, быстро и без переплаты за лишнюю витрину"
            description="Сайт держит премиальное ощущение, но УТП остается коммерчески сильным: большой склад, свежие цветы и понятный заказ через WhatsApp."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-graphite/10 bg-white p-6 shadow-soft"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-lightPink text-deepRose">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-graphite">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-softGraphite">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-warmMilk py-16 sm:py-24">
        <div className="container-page">
          <SectionTitle
            eyebrow="как заказать"
            title="От выбора до доставки — четыре простых шага"
            description="Всё согласование происходит быстро: букет, адрес, время и фото перед отправкой."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {orderSteps.map((step, index) => (
              <article key={step.title} className="relative rounded-[28px] bg-white p-6 shadow-soft">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-graphite">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-softGraphite">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <BudgetPicker />
        </div>
      </section>

      <DeliverySection />
      <Reviews />
      <InstagramGrid />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="overflow-hidden rounded-[36px] bg-primary p-6 text-white shadow-premium sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                    <Clock className="size-4" aria-hidden="true" />
                    работаем {siteConfig.workingHours}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                    <Camera className="size-4" aria-hidden="true" />
                    фото перед доставкой
                  </span>
                </div>
                <h2 className="mt-6 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                  Нужен букет сегодня?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">
                  Напишите нам — флорист подберёт вариант под бюджет и повод,
                  покажет фото и оформит доставку по Алматы.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:w-[520px]">
                <Button asChild variant="dark" size="lg">
                  <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/35 bg-white/10 text-white hover:bg-white hover:text-primary">
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                    <Phone aria-hidden="true" />
                    Позвонить
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/35 bg-white text-primary hover:bg-lightPink">
                  <Link href="/catalog">Каталог</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
