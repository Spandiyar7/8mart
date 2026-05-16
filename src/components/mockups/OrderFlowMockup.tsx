"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Camera, Check, Flower2, MessageCircle, Truck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DepthCard } from "@/components/motion/DepthCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { ProductPhotoFrame } from "@/components/frames/ProductPhotoFrame";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

const steps = [
  {
    icon: Flower2,
    title: "Выберите букет",
    text: "Каталог или подбор флористом под повод.",
  },
  {
    icon: MessageCircle,
    title: "Напишите в WhatsApp",
    text: "Заказ оформляется прямо в чате.",
  },
  {
    icon: Camera,
    title: "Фото перед доставкой",
    text: "Покажем готовый букет до отправки.",
  },
  {
    icon: Truck,
    title: "Доставка сегодня",
    text: "Привезём за 1,5–3 часа по Костанаю.",
  },
];

function ChatBubble({
  from,
  delay,
  children,
}: {
  from: "shop" | "me";
  delay: number;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        "max-w-[80%] px-3 py-2 text-[0.74rem] leading-snug shadow-sm",
        from === "shop"
          ? "self-start rounded-2xl rounded-bl-md bg-white text-graphite"
          : "self-end rounded-2xl rounded-br-md bg-primary text-white",
      )}
    >
      {children}
    </motion.div>
  );
}

/** Order Flow — a 3D-tilting phone with an animated WhatsApp conversation. */
export function OrderFlowMockup() {
  const previewProduct = products[2];

  return (
    <Section
      id="order-flow"
      className="bg-warm-milk"
      background={<ParallaxPetalLayer count={8} tone="warm" seed={11} />}
    >
      <SectionTitle
        eyebrow="Заказ за пару минут"
        title={
          <>
            Закажите букет,{" "}
            <span className="text-gradient">как пишете другу</span>
          </>
        }
        description="Никаких форм и звонков по кругу — флорист соберёт заказ в чате и пришлёт фото букета перед доставкой."
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 rounded-2xl border border-graphite/8 bg-white/70 p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm text-deep-rose/70">
                    0{index + 1}
                  </span>
                  <h3 className="font-semibold text-graphite">{step.title}</h3>
                </div>
                <p className="mt-0.5 text-sm text-soft-graphite">{step.text}</p>
              </div>
            </motion.div>
          ))}
          <MagneticButton>
            <WhatsAppButton
              size="lg"
              label="Заказать в WhatsApp"
              variant="primary"
              className="mt-2"
            />
          </MagneticButton>
        </div>

        <div className="order-1 lg:order-2">
          <DepthCard
            className="rounded-[2.7rem]"
            intensity={9}
            glare={false}
          >
            <PhoneMockup>
              <div className="flex items-center gap-2.5 bg-gradient-to-r from-primary to-deep-rose px-3.5 pb-2.5 pt-11 text-white">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 font-display text-sm font-bold">
                  8
                </span>
                <div className="leading-tight">
                  <p className="text-[0.82rem] font-semibold">8MART</p>
                  <p className="text-[0.62rem] text-white/75">
                    онлайн • отвечаем быстро
                  </p>
                </div>
              </div>

              <div className="flex h-[calc(100%-7.6rem)] flex-col gap-2 overflow-hidden bg-light-pink/40 px-3 py-3.5">
                <ChatBubble from="shop" delay={0.1}>
                  Здравствуйте! 💐 Поможем выбрать букет под повод и бюджет.
                </ChatBubble>
                <ChatBubble from="me" delay={0.55}>
                  Нужен букет на день рождения, до 20 000 ₸
                </ChatBubble>
                <ChatBubble from="shop" delay={1}>
                  Собрали вариант. Вот фото перед доставкой 📸
                </ChatBubble>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 1.3 }}
                  className="self-start overflow-hidden rounded-2xl rounded-bl-md bg-white p-1 shadow-sm"
                >
                  <ProductPhotoFrame
                    product={previewProduct}
                    tilt={false}
                    reveal={false}
                    petals={false}
                    corner={false}
                    rounded="rounded-xl"
                    className="h-24 w-40"
                  />
                </motion.div>
                <ChatBubble from="me" delay={1.7}>
                  Идеально! Беру, доставьте сегодня 🙌
                </ChatBubble>
                <ChatBubble from="shop" delay={2.05}>
                  Принято! Курьер привезёт за 1,5–3 часа 🚚
                </ChatBubble>
              </div>

              <div className="flex h-[3.4rem] items-center gap-2 border-t border-graphite/8 bg-white px-3">
                <div className="flex h-8 flex-1 items-center rounded-full bg-light-pink/70 px-3 text-[0.7rem] text-soft-graphite">
                  Сообщение…
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </PhoneMockup>
          </DepthCard>
        </div>
      </div>
    </Section>
  );
}
