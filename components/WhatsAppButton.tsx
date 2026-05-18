"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const message =
    "Здравствуйте! Хочу заказать букет в 8MART. Подскажите, пожалуйста, что можно доставить сегодня?";

  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Написать 8MART в WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition-transform hover:scale-105 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 motion-safe:animate-ping" />
      <MessageCircle className="relative size-7" aria-hidden="true" />
    </a>
  );
}
