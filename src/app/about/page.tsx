import { Flower2, HeartHandshake, Sprout, Wallet } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { DepthCard } from "@/components/motion/DepthCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { EditorialPhotoFrame } from "@/components/frames/EditorialPhotoFrame";
import { BloomGlyph } from "@/components/ui/ProductMedia";
import { FinalCTA } from "@/components/home/FinalCTA";
import { createMetadata } from "@/lib/seo";
import { brandPhotosAvailable } from "@/config/media";

export const metadata = createMetadata({
  title: "О нас — цветочный склад 8MART",
  description:
    "8MART — цветочный склад в Костанае. Свежие цветы, большой выбор, " +
    "помощь флористов и доставка букетов каждый день.",
  path: "/about",
});

const stats = [
  { value: "500+", label: "видов цветов в наличии" },
  { value: "1,5–3 ч", label: "среднее время доставки" },
  { value: "24/7", label: "принимаем заказы" },
  { value: "100%", label: "фото букета перед доставкой" },
];

const values = [
  {
    icon: Sprout,
    title: "Свежие поставки",
    text: "Цветы приходят регулярно — букеты дольше радуют дома.",
  },
  {
    icon: Flower2,
    title: "Большой выбор",
    text: "Розы, пионы, тюльпаны, эустома и сезонные новинки.",
  },
  {
    icon: HeartHandshake,
    title: "Флористы рядом",
    text: "Поможем выбрать и соберём букет под повод и настроение.",
  },
  {
    icon: Wallet,
    title: "Любой бюджет",
    text: "Красивый букет можно собрать на любую сумму — от и до.",
  },
];

function StoryFallback() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-light-pink via-[#f48fbe] to-deep-rose">
      <BloomGlyph
        rotation={18}
        className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 opacity-75"
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="О нас"
        title={
          <>
            Цветочный склад <span className="text-gradient">8MART</span> в
            Костанае
          </>
        }
        description="Мы каждый день превращаем свежие цветы в букеты, которые приятно дарить и получать."
      />

      <Section
        background={<ParallaxPetalLayer count={8} tone="soft" seed={31} />}
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionTitle
              align="left"
              eyebrow="Наша история"
              title="Цветы — это про эмоции"
            />
            <div className="flex flex-col gap-4 text-[1.0rem] leading-relaxed text-soft-graphite">
              <p>
                8MART — это цветочный склад в Костанае. Мы каждый день работаем
                с живыми цветами: принимаем свежие поставки, собираем букеты и
                отправляем их по всему городу.
              </p>
              <p>
                У нас большой выбор — от одной розы до авторских композиций.
                Флористы помогут собрать букет под повод, настроение и бюджет, а
                вы получите фото готового букета перед доставкой.
              </p>
              <p>
                Мы любим, когда цветы дарят радость. Поэтому держим честные
                цены, бережно упаковываем каждый букет и доставляем быстро —
                чтобы повод не остыл.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <MagneticButton>
                <Button href="/catalog" variant="primary">
                  Смотреть каталог
                </Button>
              </MagneticButton>
              <WhatsAppButton label="Задать вопрос" />
            </div>
          </div>

          <EditorialPhotoFrame
            src="/brand-photos/florist.jpg"
            alt="Флористы 8MART за работой"
            available={brandPhotosAvailable}
            fallback={<StoryFallback />}
            caption="Флористы 8MART собирают букеты каждый день"
            className="w-full"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </Section>

      <Section
        className="bg-light-pink/35"
        background={<ParallaxPetalLayer count={7} tone="pink" seed={32} />}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <JitterMotionCard key={stat.label} index={index}>
              <DepthCard className="rounded-3xl" intensity={9}>
                <div className="rounded-3xl border border-graphite/8 bg-white p-6 text-center">
                  <p className="font-display text-4xl text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-soft-graphite">
                    {stat.label}
                  </p>
                </div>
              </DepthCard>
            </JitterMotionCard>
          ))}
        </div>
      </Section>

      <Section
        background={<ParallaxPetalLayer count={8} tone="warm" seed={33} />}
      >
        <SectionTitle
          eyebrow="Что для нас важно"
          title={
            <>
              Почему с нами <span className="text-gradient">тепло</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <JitterMotionCard key={value.title} index={index}>
              <DepthCard className="group h-full rounded-3xl" intensity={9}>
                <article className="glass flex h-full flex-col gap-2.5 rounded-3xl p-6">
                  <span className="inline-block w-fit fx-float">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <value.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </span>
                  <h3 className="font-display text-lg text-graphite">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-soft-graphite">
                    {value.text}
                  </p>
                </article>
              </DepthCard>
            </JitterMotionCard>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </main>
  );
}
