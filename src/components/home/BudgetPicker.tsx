"use client";

import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { RotatingFlowerOrb } from "@/components/three/RotatingFlowerOrb";
import { buildBudgetMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const groups = [
  {
    key: "occasion" as const,
    label: "Повод",
    options: ["День рождения", "Любовь", "Маме", "Извинение", "Свадьба", "Просто так"],
  },
  {
    key: "budget" as const,
    label: "Бюджет",
    options: ["до 10 000 ₸", "10–20 000 ₸", "20–40 000 ₸", "40 000+ ₸"],
  },
  {
    key: "style" as const,
    label: "Стиль",
    options: ["нежный", "яркий", "премиальный", "минималистичный"],
  },
  {
    key: "palette" as const,
    label: "Цветовая гамма",
    options: ["розовая", "белая", "красная", "микс"],
  },
];

type SelectionKey = (typeof groups)[number]["key"];

/** Glow colour reacts to the chosen palette. */
const paletteGlow: Record<string, string> = {
  розовая: "rgba(217,21,114,0.5)",
  белая: "rgba(214,185,140,0.45)",
  красная: "rgba(168,23,77,0.55)",
  микс: "rgba(239,98,160,0.5)",
};

/** Glow intensity reacts to the chosen budget. */
const budgetGlow: Record<string, string> = {
  "до 10 000 ₸": "26%",
  "10–20 000 ₸": "34%",
  "20–40 000 ₸": "44%",
  "40 000+ ₸": "56%",
};

/** Interactive bouquet configurator with a selection-reactive glow. */
export function BudgetPicker() {
  const [selection, setSelection] = useState<Record<SelectionKey, string>>({
    occasion: groups[0].options[0],
    budget: groups[1].options[1],
    style: groups[2].options[0],
    palette: groups[3].options[0],
  });

  const glowColor = paletteGlow[selection.palette] ?? paletteGlow["розовая"];
  const glowSize = budgetGlow[selection.budget] ?? "40%";

  return (
    <Section
      id="budget-picker"
      background={<ParallaxPetalLayer count={8} tone="pink" seed={6} />}
    >
      <SectionTitle
        eyebrow="Подбор букета"
        title={
          <>
            Не знаете, что выбрать?{" "}
            <span className="text-gradient">Соберём за вас</span>
          </>
        }
        description="Отметьте повод, бюджет и стиль — флорист подберёт варианты и пришлёт фото в WhatsApp."
      />

      <div className="relative mx-auto mt-12 max-w-4xl">
        <RotatingFlowerOrb
          size={150}
          className="absolute -left-16 -top-12 hidden lg:block"
        />
        <RotatingFlowerOrb
          size={120}
          className="absolute -bottom-12 -right-14 hidden lg:block"
        />
        {/* Selection-reactive glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[2.4rem] blur-3xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${glowColor}, transparent ${glowSize})`,
          }}
        />

        <div className="relative rounded-3xl bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur-xl sm:p-9">
          <div className="grid gap-7 sm:grid-cols-2">
            {groups.map((group) => (
              <fieldset key={group.key} className="flex flex-col gap-3">
                <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-graphite">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  {group.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => {
                    const active = selection[group.key] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setSelection((current) => ({
                            ...current,
                            [group.key]: option,
                          }))
                        }
                        className={cn(
                          "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200",
                          active
                            ? "-translate-y-0.5 bg-primary text-white shadow-[0_12px_26px_-10px_rgba(217,21,114,0.85)]"
                            : "border border-graphite/15 bg-white text-soft-graphite hover:border-primary/40 hover:text-primary",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-graphite/10 pt-7 sm:flex-row sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-soft-graphite">
              <Wand2 className="h-4 w-4 text-primary" aria-hidden="true" />
              Подберём 2–3 варианта под ваш запрос
            </p>
            <MagneticButton>
              <WhatsAppButton
                variant="primary"
                size="lg"
                label="Подобрать в WhatsApp"
                message={buildBudgetMessage(selection)}
              />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
