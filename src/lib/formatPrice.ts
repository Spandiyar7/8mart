/**
 * Format a tenge amount with grouped thousands, e.g. `18900` -> `18 900 ₸`.
 */
export function formatPrice(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₸`;
}

/** Format a number of items with the correct Russian plural form. */
export function formatItemCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  let word = "товаров";
  if (mod10 === 1 && mod100 !== 11) word = "товар";
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    word = "товара";
  return `${count} ${word}`;
}
