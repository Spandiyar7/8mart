import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/formatPrice";
import type { CartItem } from "@/store/cart-store";
import type { Product } from "@/types/product";

/** Message pre-filled when a customer opens WhatsApp without a specific order. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Здравствуйте! Хочу заказать цветы в 8MART.";

/**
 * Build a `wa.me` deep link for the brand number with a pre-filled message.
 * The phone number lives only in `siteConfig` — never hardcode it elsewhere.
 */
export function getWhatsAppLink(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Order a single product straight from a product card or product page. */
export function buildProductMessage(
  product: Product,
  quantity = 1,
  addons: string[] = [],
): string {
  const lines = [
    "Здравствуйте! Хочу заказать букет в 8MART:",
    "",
    `${product.name} — ${formatPrice(product.price)}`,
    `Количество: ${quantity} шт`,
  ];
  if (addons.length > 0) {
    lines.push(`Дополнения: ${addons.join(", ")}`);
  }
  lines.push("", "Подскажите, пожалуйста, по доставке.");
  return lines.join("\n");
}

/** Values collected by the homepage bouquet configurator. */
export interface BudgetPickerSelection {
  occasion: string;
  budget: string;
  style: string;
  palette: string;
}

/** Build the WhatsApp message for the "подобрать букет" configurator. */
export function buildBudgetMessage(selection: BudgetPickerSelection): string {
  return [
    "Здравствуйте! Хочу подобрать букет:",
    `Повод: ${selection.occasion}`,
    `Бюджет: ${selection.budget}`,
    `Стиль: ${selection.style}`,
    `Цветовая гамма: ${selection.palette}`,
  ].join("\n");
}

/** Customer details collected by the cart checkout form. */
export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  comment: string;
}

/** Build the full WhatsApp order message from cart items + customer fields. */
export function buildOrderMessage(
  items: CartItem[],
  customer: OrderCustomer,
): string {
  const lines: string[] = ["Здравствуйте! Хочу оформить заказ в 8MART.", ""];

  lines.push("Букеты:");
  items.forEach((item, index) => {
    const sum = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} — ${item.quantity} шт × ` +
        `${formatPrice(item.product.price)} = ${formatPrice(sum)}`,
    );
  });

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  lines.push("", `Итого: ${formatPrice(total)}`, "");

  const detail = (label: string, value: string) =>
    value.trim() ? `${label}: ${value.trim()}` : `${label}: —`;

  lines.push(
    detail("Имя", customer.name),
    detail("Телефон", customer.phone),
    detail("Адрес доставки", customer.address),
    detail("Дата", customer.date),
    detail("Время", customer.time),
    detail("Комментарий", customer.comment),
  );

  return lines.join("\n");
}
