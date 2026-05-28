"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Camera, Clock, MessageCircle, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const heroImage =
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1500&q=88";

const badges = [
  { label: "500+ видов цветов", icon: Sparkles },
  { label: "Доставка 1,5–3 часа", icon: Truck },
  { label: "Работаем 24/7", icon: Clock },
  { label: "Фото букета перед доставкой", icon: Camera }
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.2]);
  const floatALeft = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -40]);
  const floatBRight = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 50]);

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65, ease: "easeOut" as const }
      };

  const whatsappMessage =
    "Здравствуйте! Хочу заказать букет с доставкой по Алматы. Помогите выбрать вариант.";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-warmMilk via-lightPink/40 to-warmMilk"
    >
      <div className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-[380px] rounded-full bg-goldBeige/30 blur-3xl" aria-hidden="true" />
      <div className="container-page grid min-h-[calc(100vh-var(--header-height))] items-center gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
        <motion.div {...motionProps} style={{ y: textY, opacity: textOpacity }}>
          <Badge tone="green" className="mb-5">
            Самый крупный цветочный склад в Алматы
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-normal text-graphite sm:text-6xl lg:text-7xl">
            Свежие цветы с доставкой по Алматы
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-softGraphite sm:text-xl">
            {siteConfig.brandName} — цветочный склад с большим выбором букетов,
            роз и композиций. Соберём и доставим букет за {siteConfig.deliveryTime}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/catalog">Выбрать букет</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                Написать в WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {badges.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-white bg-white/78 p-3 shadow-sm"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-lightPink text-deepRose">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-graphite">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
        >
          <motion.div
            className="relative aspect-[4/4.55] overflow-hidden rounded-[36px] bg-lightPink shadow-premium sm:aspect-[4/4.25] lg:aspect-[4/4.65]"
            style={{ y: imageY, scale: imageScale }}
          >
            <Image
              src={heroImage}
              alt="Большой свежий букет цветов FLORÉ с доставкой по Алматы"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5" />
          </motion.div>

          <motion.div
            className="absolute -left-2 top-8 rounded-[24px] bg-white/92 p-4 shadow-premium backdrop-blur sm:-left-7"
            style={{ x: floatALeft }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-softGraphite/55">
              розы
            </p>
            <p className="mt-1 text-lg font-bold text-primary">от 450 ₸</p>
          </motion.div>

          <motion.div
            className="absolute -right-2 bottom-24 rounded-[24px] bg-white/92 p-4 shadow-premium backdrop-blur sm:-right-5"
            style={{ x: floatBRight }}
          >
            <p className="text-sm font-semibold text-graphite">свежая поставка</p>
            <p className="mt-1 text-xs text-softGraphite">каждый день</p>
          </motion.div>

          <div className="absolute bottom-4 left-5 right-5 rounded-[28px] bg-graphite/88 p-5 text-white shadow-premium backdrop-blur">
            <p className="text-sm text-white/70">соберём сегодня</p>
            <p className="mt-1 text-xl font-semibold">под ваш повод и бюджет</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
