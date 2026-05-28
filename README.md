# FLORÉ Flowers

Production-ready демо-сайт цветочного магазина FLORÉ в Алматы на Next.js 15, React, TypeScript и Tailwind CSS.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

- `app/` — страницы: главная, каталог, карточка товара, доставка, о магазине, контакты.
- `components/` — UI и e-commerce компоненты.
- `components/ui/` — shadcn/ui-совместимые примитивы.
- `config/site.ts` — контакты, адрес, WhatsApp, Instagram и основные настройки.
- `data/products.ts` — demo-каталог товаров и категорий.
- `lib/whatsapp.ts` — генерация WhatsApp-сообщений для товара, бюджета и корзины.
- `lib/cart-store.ts` — Zustand-store корзины.

## Настройка перед запуском владельцу

1. Подтвердить номер телефона и WhatsApp в `config/site.ts`.
2. Заменить demo-фото Unsplash в `data/products.ts` на реальные фото букетов.
3. Обновить цены, наличие и составы товаров в `data/products.ts`.
4. При необходимости заменить карту-заглушку в `components/DeliverySection.tsx` на 2GIS, Yandex или Google Maps.

## Команды

```bash
npm run dev
npm run build
npm run typecheck
```
