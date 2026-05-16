# 8MART — премиальный 3D/WebGL сайт доставки цветов

Цветочный склад **8MART** (Костанай) — премиальный motion-сайт с
кинематографичным 3D-героем, каталогом, корзиной и быстрым заказом через
WhatsApp.

Стек: **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** ·
**React Three Fiber / Three.js / Drei** · **Framer Motion** · **GSAP** ·
**Lenis** · **Zustand**.

---

## Быстрый старт

```bash
npm install      # установить зависимости
npm run dev      # локальный сервер разработки → http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск production-сборки
npm run lint     # проверка ESLint
```

Требуется Node.js 20.9+.

---

## Что и где менять

### Контакты, телефон, WhatsApp, адрес

Все контактные данные — **единственный источник**: `src/config/site.ts`.

```ts
export const siteConfig = {
  brandName: "8MART",
  city: "Костанай",
  address: "ул. Тәуелсіздік, 37",
  phone: "+7 777 478 48 22",
  phoneHref: "tel:+77774784822",
  whatsapp: "77774784822", // ← номер для wa.me (только цифры)
  instagram: "https://www.instagram.com/8mart_kostanay",
  workingHours: "24/7",
  deliveryTime: "1,5–3 часа",
  deliveryPriceFrom: "от 3000 ₸",
};
```

Меняете в одном месте — обновляется на всём сайте (шапка, подвал, кнопки
WhatsApp, JSON-LD). **Номер WhatsApp** — поле `whatsapp`.

### Товары (каталог)

`src/data/products.ts` — массив `products` (16 демо-букетов). Поля товара
описаны в `src/types/product.ts`. Там же — русские названия категорий,
поводов и цветов.

### Фотографии (товары и бренд)

Фото показываются внутри премиальных рамок (`src/components/frames/`).
Пока реальных фото нет, рамки рисуют генеративный цветок — система уже
готова к настоящим снимкам.

Подключить фото товаров:

1. Положите `.jpg` в `public/products/` — полный список имён, размеры и
   правила в `public/products/README.md` (16 товаров × 3 фото).
2. Откройте `src/config/media.ts` и поставьте `productPhotosAvailable = true`.

Бренд- и лайфстайл-фото (About, Instagram, Final CTA) — папка
`public/brand-photos/` + флаг `brandPhotosAvailable`. Пути товаров
прописаны в `src/data/products.ts` (поля `image` / `images`).

### Визуальная проверка / скриншоты

Сайт насыщен анимацией. Чтобы заморозить движение для ревью или
скриншотов, добавьте к адресу `?motion=off` (или `?qa=1`, `?scene=freeze`).
Витрина компонентов — страница `/visual-qa`. Подробности —
`README_VISUAL_QA.md`.

### Отзывы

Демо-отзывы (помечены прямо на странице) — в
`src/components/home/Reviews.tsx`, массив `reviews`. Замените на реальные
после подключения 2GIS / Yandex / Instagram и уберите блок с пометкой
«Демо-отзывы».

### Бренд-цвета

Токены темы — `src/app/globals.css` (блок `@theme`). Для 3D-сцены те же
цвета продублированы в `brandColors` (`src/config/site.ts`).

---

## Ассеты анимации (Jitter / Typeface Animator / SVGator / Shots.so)

Сайт **не зависит** от этих сервисов в рантайме — везде есть код-фолбэки.
Экспортируете ассет — кладёте в нужную папку:

| Инструмент        | Папка для экспортов       | Где используется в коде                                   |
| ----------------- | ------------------------- | --------------------------------------------------------- |
| Jitter (Lottie)   | `public/motion/jitter/`   | `components/motion/LottieSlot.tsx`                         |
| Typeface Animator | `public/motion/typeface/` | `components/motion/KineticTitle.tsx`, `AnimatedWords.tsx`  |
| SVGator           | `public/motion/svgator/`  | `components/svg/*`                                         |
| Shots.so          | `public/mockups/shots/`   | `components/mockups/PhoneMockup.tsx`                       |

В каждой папке есть `README.md` с инструкцией. Если файла нет — сайт
показывает код-анимацию (Framer Motion / CSS / SVG).

---

## Структура

```
src/
  app/            — маршруты: / /catalog /product/[slug] /delivery /about /contacts
  components/
    three/        — 3D-сцена героя (React Three Fiber)
    hero/         — герой-секция
    home/         — секции главной страницы
    catalog/      — карточки, грид, фильтры, страница товара
    cart/         — корзина и drawer (Zustand)
    motion/       — Jitter/Typeface-style анимации
    svg/          — анимированная SVG-система
    mockups/      — Shots.so-style мокапы
    layout/       — шапка, подвал, меню
    ui/           — кнопки, бейджи, стекло, тайлы
  config/site.ts  — контакты и бренд
  data/products.ts— каталог
  lib/            — утилиты (cn, whatsapp, seo, formatPrice, хуки)
  store/          — Zustand-стор корзины
```

---

## 3D-герой

Центральная флоральная скульптура — `InstancedMesh` из 50–122 изогнутых
лепестков (кастомная `BufferGeometry`), разложенных по золотому углу
(филлотаксис), с анимацией раскрытия бутона, кинематографичным светом и
процедурным окружением. Сцена грузится через `next/dynamic` (`ssr: false`)
и имеет CSS-фолбэк для устройств без WebGL и режима reduced-motion.

---

## Деплой на Vercel

1. Запушьте репозиторий на GitHub.
2. На [vercel.com](https://vercel.com) → **New Project** → импортируйте репозиторий.
3. Framework определится автоматически (**Next.js**). Build / Install —
   стандартные. Переменные окружения не нужны.
4. **Deploy**. Перед запуском пропишите реальный домен в `siteUrl`
   (`src/config/site.ts`) — он используется в SEO, sitemap и JSON-LD.

---

## Перед реальным запуском

- [ ] Заменить контакты и номер WhatsApp в `src/config/site.ts`.
- [ ] Указать реальный домен в `siteUrl`.
- [ ] Загрузить реальные фото товаров в `public/products/`.
- [ ] Заменить демо-отзывы реальными.
- [ ] Добавить `public/og.jpg` (картинка для Open Graph).
- [ ] Проверить актуальность цен и наличия в `src/data/products.ts`.
