"use client";

import { motion } from "framer-motion";
import { Camera, MapPin, Sparkles, Truck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { useReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  {
    icon: Sparkles,
    title: "Выберите букет",
    text: "В каталоге или с помощью флориста.",
  },
  {
    icon: MapPin,
    title: "Укажите адрес и время",
    text: "Оформите заказ в WhatsApp за минуту.",
  },
  {
    icon: Camera,
    title: "Получите фото",
    text: "Покажем готовый букет перед доставкой.",
  },
  {
    icon: Truck,
    title: "Курьер доставит букет",
    text: "Привезём за 1,5–3 часа по Костанаю.",
  },
];

/** How-to-order timeline with an SVG route that draws in on scroll. */
export function HowToOrder() {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      id="how-to-order"
      className="bg-light-pink/35"
      background={<ParallaxPetalLayer count={8} tone="warm" seed={7} />}
    >
      <SectionTitle
        eyebrow="Как заказать"
        title={
          <>
            Четыре шага <span className="text-gradient">до букета</span>
          </>
        }
        description="Прозрачный процесс без звонков по кругу и долгого ожидания."
      />

      <ol className="relative mt-14 grid gap-9 lg:grid-cols-4">
        <svg
          className="absolute left-[12%] right-[12%] top-7 hidden h-3 lg:block"
          viewBox="0 0 1000 12"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="htoRoute" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ffd9e7" />
              <stop offset="50%" stopColor="#d91572" />
              <stop offset="100%" stopColor="#8a123f" />
            </linearGradient>
          </defs>
          <motion.path
            d="M4 6 L996 6"
            stroke="url(#htoRoute)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 lg:flex-col lg:gap-3">
            <motion.div
              className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-white shadow-[0_14px_30px_-12px_rgba(217,21,114,0.85)]"
              initial={reducedMotion ? false : { scale: 0, rotate: -120 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35 + index * 0.16,
                type: "spring",
                stiffness: 200,
                damping: 13,
              }}
            >
              <step.icon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-graphite text-[0.7rem] font-bold text-white">
                {index + 1}
              </span>
            </motion.div>
            {index < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className="absolute left-7 top-14 h-[calc(100%+0.6rem)] w-0.5 -translate-x-1/2 bg-primary/20 lg:hidden"
              />
            ) : null}
            <div className="lg:pt-1">
              <h3 className="font-display text-lg text-graphite">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-soft-graphite">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
