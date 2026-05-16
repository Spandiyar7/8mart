"use client";

import { motion } from "framer-motion";
import { Camera, Clock, Flower2, Sparkles, Truck } from "lucide-react";
import { KineticTitle } from "@/components/motion/KineticTitle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

const badges = [
  { icon: <Flower2 className="h-3.5 w-3.5" />, label: "500+ видов цветов" },
  { icon: <Truck className="h-3.5 w-3.5" />, label: "Доставка 1,5–3 часа" },
  { icon: <Clock className="h-3.5 w-3.5" />, label: "Работаем 24/7" },
  { icon: <Camera className="h-3.5 w-3.5" />, label: "Фото перед доставкой" },
];

/** The textual hero column — eyebrow, kinetic title, subtitle, CTAs, proof. */
export function HeroContent() {
  const reducedMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="relative z-10 flex max-w-xl flex-col items-start gap-6">
      <motion.span
        {...rise(0.1)}
        className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-graphite"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-green/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-green" />
        </span>
        Свежая поставка каждый день
      </motion.span>

      <KineticTitle
        lines={["Свежие цветы", "с доставкой по Костанаю"]}
        accent={["цветы", "Костанаю"]}
        delay={0.25}
        className="text-[2.6rem] leading-[1.05] sm:text-[3.4rem] lg:text-[4rem]"
      />

      <motion.p
        {...rise(0.95)}
        className="max-w-md text-[1.02rem] leading-relaxed text-soft-graphite text-pretty"
      >
        8MART — цветочный склад с большим выбором букетов, роз и композиций.
        Соберём и доставим букет за 1,5–3 часа.
      </motion.p>

      <motion.div {...rise(1.08)} className="flex flex-wrap items-center gap-3">
        <MagneticButton>
          <Button href="/catalog" variant="primary" size="lg">
            <Sparkles className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            Выбрать букет
          </Button>
        </MagneticButton>
        <MagneticButton>
          <WhatsAppButton size="lg" label="Написать в WhatsApp" />
        </MagneticButton>
      </motion.div>

      <motion.ul
        {...rise(1.22)}
        className="flex flex-wrap gap-2"
        aria-label="Преимущества 8MART"
      >
        {badges.map((badge) => (
          <li key={badge.label}>
            <Badge tone="glass" icon={badge.icon}>
              {badge.label}
            </Badge>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
