"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, budgetWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const occasions = ["День рождения", "Любовь", "Извинение", "Маме", "Свадьба", "Просто так"];
const budgets = ["до 10 000", "10–20 000", "20–40 000", "40 000+"];
const styles = ["нежный", "яркий", "премиальный", "минималистичный"];

type OptionGroupProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function OptionGroup({ label, options, value, onChange }: OptionGroupProps) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold text-graphite">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              value === option
                ? "border-primary bg-primary text-white"
                : "border-graphite/12 bg-white text-softGraphite hover:border-primary hover:text-primary"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function BudgetPicker() {
  const [occasion, setOccasion] = useState(occasions[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [style, setStyle] = useState(styles[0]);

  const message = budgetWhatsAppMessage({ occasion, budget, style });

  return (
    <div className="rounded-[32px] bg-graphite p-5 text-white shadow-premium sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-goldBeige">
            быстрый подбор
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Букет под ваш бюджет
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-white/72">
            Не знаете, что выбрать? Отметьте повод, бюджет и стиль — флорист
            предложит варианты с фото и ценой в WhatsApp.
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-5 text-graphite sm:p-6">
          <div className="grid gap-6">
            <OptionGroup
              label="Повод"
              options={occasions}
              value={occasion}
              onChange={setOccasion}
            />
            <OptionGroup
              label="Бюджет"
              options={budgets}
              value={budget}
              onChange={setBudget}
            />
            <OptionGroup
              label="Стиль"
              options={styles}
              value={style}
              onChange={setStyle}
            />
            <Button asChild size="lg" className="w-full">
              <a href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                Подобрать в WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
