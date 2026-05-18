import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product";

export type WhatsAppCartItem = {
  name: string;
  quantity: number;
  price: number;
  addons?: string[];
};

export type CustomerDraft = {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  date?: string;
  time?: string;
  comment?: string;
};

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppMessage(product: Product, quantity = 1, addons: string[] = []) {
  const addonLine = addons.length ? `\nДополнения: ${addons.join(", ")}` : "";

  return [
    `Здравствуйте! Хочу заказать букет в ${siteConfig.brandName}.`,
    "",
    `Букет: ${product.name}`,
    `Количество: ${quantity}`,
    `Цена: ${formatPrice(product.price)}`,
    `Состав: ${product.composition.join(", ")}${addonLine}`,
    "",
    "Подскажите, пожалуйста, доступен ли букет и когда можно доставить?"
  ].join("\n");
}

export function budgetWhatsAppMessage(params: {
  occasion: string;
  budget: string;
  style: string;
}) {
  return [
    "Здравствуйте! Помогите подобрать букет.",
    "",
    `Повод: ${params.occasion}`,
    `Бюджет: ${params.budget}`,
    `Стиль: ${params.style}`,
    "",
    "Хочу получить варианты с фото и ценой."
  ].join("\n");
}

export function cartWhatsAppMessage(
  items: WhatsAppCartItem[],
  total: number,
  customer: CustomerDraft
) {
  const productLines = items.map((item, index) => {
    const addons = item.addons?.length ? `, дополнения: ${item.addons.join(", ")}` : "";
    return `${index + 1}. ${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}${addons}`;
  });

  const customerLines = [
    customer.name ? `Имя: ${customer.name}` : "",
    customer.phone ? `Телефон: ${customer.phone}` : "",
    customer.city ? `Город: ${customer.city}` : "",
    customer.address ? `Адрес: ${customer.address}` : "",
    customer.date ? `Дата: ${customer.date}` : "",
    customer.time ? `Время: ${customer.time}` : "",
    customer.comment ? `Комментарий: ${customer.comment}` : ""
  ].filter(Boolean);

  return [
    `Здравствуйте! Хочу оформить заказ в ${siteConfig.brandName}.`,
    "",
    "Состав заказа:",
    ...productLines,
    "",
    `Итого: ${formatPrice(total)}`,
    "",
    "Данные для доставки:",
    customerLines.length ? customerLines.join("\n") : "Заполню данные в переписке.",
    "",
    "Оплату согласуем в WhatsApp."
  ].join("\n");
}
