"use client";

import * as React from "react";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppLink } from "@/lib/whatsapp";

const inputClass =
  "h-11 w-full rounded-xl border border-graphite/12 bg-white px-3.5 text-sm text-graphite " +
  "outline-none transition-colors placeholder:text-soft-graphite/55 " +
  "focus:border-primary focus:ring-2 focus:ring-primary/20";

const emptyForm = { name: "", contact: "", question: "" };

/**
 * "Задать вопрос" form. With no backend, a submission opens WhatsApp with
 * the question pre-filled — consistent with the rest of the order flow.
 */
export function ContactForm() {
  const [form, setForm] = useState(emptyForm);

  const canSend = form.name.trim() !== "" && form.question.trim() !== "";

  const update =
    (key: keyof typeof emptyForm) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSend) return;
    const message = [
      "Здравствуйте! Вопрос с сайта 8MART.",
      `Имя: ${form.name.trim()}`,
      form.contact.trim() ? `Контакт: ${form.contact.trim()}` : "",
      `Вопрос: ${form.question.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-graphite/8 bg-white p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-xs font-semibold text-soft-graphite">
          Имя <span className="text-primary">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder="Как к вам обращаться"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-contact"
          className="text-xs font-semibold text-soft-graphite"
        >
          Телефон или WhatsApp
        </label>
        <input
          id="contact-contact"
          type="text"
          value={form.contact}
          onChange={update("contact")}
          placeholder="+7 ___ ___ __ __"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-question"
          className="text-xs font-semibold text-soft-graphite"
        >
          Вопрос <span className="text-primary">*</span>
        </label>
        <textarea
          id="contact-question"
          rows={4}
          value={form.question}
          onChange={update("question")}
          placeholder="Напишите, что хотите уточнить"
          className={`${inputClass} h-auto py-2.5`}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={!canSend}>
        <MessageCircle className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
        Отправить в WhatsApp
      </Button>
      <p className="text-center text-xs text-soft-graphite">
        Ответим в течение нескольких минут — 8MART работает круглосуточно.
      </p>
    </form>
  );
}
