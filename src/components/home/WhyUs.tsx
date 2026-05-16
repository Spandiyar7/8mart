import { Camera, Flower2, Sprout, Truck, Wallet, Warehouse } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DepthCard } from "@/components/motion/DepthCard";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { cn } from "@/lib/cn";

const reasons = [
  {
    icon: Warehouse,
    title: "Крупный цветочный склад",
    text: "Своя база цветов в Костанае — большие объёмы и честные цены.",
  },
  {
    icon: Sprout,
    title: "Свежие поставки",
    text: "Цветы приходят регулярно, поэтому букеты дольше стоят дома.",
  },
  {
    icon: Flower2,
    title: "Большой выбор цветов",
    text: "Более 500 видов: розы, пионы, тюльпаны, сезонные новинки.",
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: "Привезём букет по городу за 1,5–3 часа в удобное время.",
  },
  {
    icon: Camera,
    title: "Фото перед доставкой",
    text: "Покажем готовый букет до отправки — никаких сюрпризов.",
  },
  {
    icon: Wallet,
    title: "Подберём под бюджет",
    text: "Флорист соберёт красивый букет на любую сумму — от и до.",
  },
];

/** Six glass depth-cards with floating icons over a petal layer. */
export function WhyUs() {
  return (
    <Section
      id="why-us"
      className="bg-warm-milk"
      background={<ParallaxPetalLayer count={10} tone="warm" seed={4} />}
    >
      <SectionTitle
        eyebrow="Почему 8MART"
        title={
          <>
            Цветочный склад, которому{" "}
            <span className="text-gradient">доверяют</span>
          </>
        }
        description="Мы держим цены низкими, а качество — высоким. Вот что это значит для вас."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <JitterMotionCard key={reason.title} index={index}>
            <DepthCard className="group h-full rounded-3xl" intensity={9}>
              <article className="glass flex h-full flex-col gap-3 rounded-3xl p-6">
                <span
                  className={cn(
                    "inline-block w-fit",
                    index % 2 === 0 ? "fx-float" : "fx-float-soft",
                  )}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <reason.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                </span>
                <h3 className="font-display text-lg text-graphite">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-soft-graphite">
                  {reason.text}
                </p>
              </article>
            </DepthCard>
          </JitterMotionCard>
        ))}
      </div>
    </Section>
  );
}
