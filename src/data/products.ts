import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductColor,
  ProductOccasion,
} from "@/types/product";

/* ------------------------------------------------------------------ *
 * Russian labels for the catalog taxonomy
 * ------------------------------------------------------------------ */
export const categoryLabels: Record<ProductCategory, string> = {
  roses: "Розы",
  bouquets: "Букеты",
  mono: "Монобукеты",
  boxes: "Цветы в коробке",
  baskets: "Корзины с цветами",
  seasonal: "Сезонные цветы",
  gifts: "Подарки",
};

export const occasionLabels: Record<ProductOccasion, string> = {
  birthday: "День рождения",
  love: "Любовь",
  mother: "Маме",
  wedding: "Свадьба",
  sorry: "Извинение",
  "just-because": "Просто так",
};

export const colorLabels: Record<ProductColor, string> = {
  pink: "Розовая",
  white: "Белая",
  red: "Красная",
  burgundy: "Бордовая",
  mix: "Микс",
};

export const badgeLabels: Record<ProductBadge, string> = {
  hit: "Хит",
  new: "Новинка",
  deal: "Выгодно",
};

/* ------------------------------------------------------------------ *
 * Homepage category showcase
 * ------------------------------------------------------------------ */
export interface ShowcaseCategory {
  key: string;
  title: string;
  description: string;
  href: string;
  /** Colour theme for the gradient artwork. */
  accent: ProductColor;
}

export const categoryShowcase: ShowcaseCategory[] = [
  {
    key: "roses",
    title: "Розы",
    description: "Поштучно и букетами — от 11 до 101 розы",
    href: "/catalog?category=roses",
    accent: "red",
  },
  {
    key: "bouquets",
    title: "Букеты",
    description: "Авторские сборные букеты под повод",
    href: "/catalog?category=bouquets",
    accent: "pink",
  },
  {
    key: "mono",
    title: "Монобукеты",
    description: "Один цветок — целое настроение",
    href: "/catalog?category=mono",
    accent: "white",
  },
  {
    key: "boxes",
    title: "Корзины и коробки",
    description: "Готовые композиции в шляпных коробках",
    href: "/catalog?category=boxes",
    accent: "mix",
  },
  {
    key: "seasonal",
    title: "Цветы поштучно",
    description: "Сезонные тюльпаны, пионы, ранункулюсы",
    href: "/catalog?category=seasonal",
    accent: "pink",
  },
  {
    key: "gifts",
    title: "Подарки",
    description: "Открытки, шары и сладости к букету",
    href: "/catalog",
    accent: "burgundy",
  },
];

/* ------------------------------------------------------------------ *
 * Demo catalog — 16 products.
 *
 * 📷 REAL PHOTOS — every `image` / `images` path points at
 * `public/products/`. Those files are NOT shipped: until they exist the
 * photo frames render a premium generated bloom (never a grey box).
 *
 * To switch on real photos:
 *   1. Add the .jpg files to `public/products/` (see that folder's
 *      README.md for the full filename list + recommended sizes).
 *   2. Set `productPhotosAvailable = true` in `src/config/media.ts`.
 *
 * Each product expects: <name>.jpg (main), <name>-detail.jpg (close-up),
 * <name>-wrap.jpg (packaging shot).
 * ------------------------------------------------------------------ */
export const products: Product[] = [
  {
    id: "p01",
    slug: "25-krasnyh-roz",
    name: "25 красных роз",
    category: "roses",
    price: 18900,
    oldPrice: 22900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/rose-25.jpg",
    images: [
      "/products/rose-25.jpg",
      "/products/rose-25-detail.jpg",
      "/products/rose-25-wrap.jpg",
    ],
    description:
      "Классика, которая всегда работает. Крупные красные розы Ред Наоми в дизайнерской упаковке — для самого важного признания.",
    composition: [
      "Розы Ред Наоми — 25 шт",
      "Зелень фисташки",
      "Дизайнерская упаковка",
      "Атласная лента",
    ],
    colors: ["red"],
    occasion: ["love", "birthday"],
    badge: "hit",
    inStock: true,
    isPopular: true,
    createdAt: "2025-11-02",
  },
  {
    id: "p02",
    slug: "51-roza",
    name: "51 роза",
    category: "roses",
    price: 36900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/rose-51.jpg",
    images: [
      "/products/rose-51.jpg",
      "/products/rose-51-detail.jpg",
      "/products/rose-51-wrap.jpg",
    ],
    description:
      "Большой букет, который говорит сам за себя. 51 свежая роза с плотным бутоном — эффектный подарок на любое торжество.",
    composition: [
      "Розы Фридом — 51 шт",
      "Флористическая зелень",
      "Премиальная упаковка",
      "Лента ручной завязки",
    ],
    colors: ["red"],
    occasion: ["love", "wedding"],
    badge: "hit",
    inStock: true,
    isPopular: true,
    createdAt: "2025-09-18",
  },
  {
    id: "p03",
    slug: "nezhnyy-sbornyy-buket",
    name: "Нежный сборный букет",
    category: "bouquets",
    price: 14500,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/mixed-soft.jpg",
    images: [
      "/products/mixed-soft.jpg",
      "/products/mixed-soft-detail.jpg",
      "/products/mixed-soft-wrap.jpg",
    ],
    description:
      "Воздушный букет в пастельной гамме. Лёгкое сочетание кустовых роз и эустомы — для тёплого, ненавязчивого подарка.",
    composition: [
      "Кустовая роза",
      "Эустома",
      "Гипсофила",
      "Эвкалипт",
      "Матовая упаковка",
    ],
    colors: ["pink", "white", "mix"],
    occasion: ["birthday", "just-because"],
    badge: "new",
    inStock: true,
    isPopular: true,
    createdAt: "2026-05-08",
  },
  {
    id: "p04",
    slug: "buket-s-gortenziey",
    name: "Букет с гортензией",
    category: "bouquets",
    price: 21900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/hydrangea.jpg",
    images: [
      "/products/hydrangea.jpg",
      "/products/hydrangea-detail.jpg",
      "/products/hydrangea-wrap.jpg",
    ],
    description:
      "Пышная гортензия создаёт объём и ощущение праздника. Сдержанный, но statement-букет для особенного дня.",
    composition: [
      "Гортензия — 3 шт",
      "Кустовая роза",
      "Сезонная зелень",
      "Корейская упаковка",
    ],
    colors: ["white", "mix"],
    occasion: ["wedding", "birthday"],
    inStock: true,
    isPopular: false,
    createdAt: "2026-03-12",
  },
  {
    id: "p05",
    slug: "rozovye-kustovye-rozy",
    name: "Розовые кустовые розы",
    category: "roses",
    price: 13900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/spray-roses.jpg",
    images: [
      "/products/spray-roses.jpg",
      "/products/spray-roses-detail.jpg",
      "/products/spray-roses-wrap.jpg",
    ],
    description:
      "Много мелких бутонов — букет получается густым и нежным. Хороший выбор «просто так» и для мамы.",
    composition: [
      "Кустовая роза розовая — 15 веток",
      "Эвкалипт",
      "Крафт-упаковка",
    ],
    colors: ["pink"],
    occasion: ["just-because", "mother"],
    inStock: true,
    isPopular: true,
    createdAt: "2026-01-20",
  },
  {
    id: "p06",
    slug: "belye-rozy",
    name: "Белые розы",
    category: "roses",
    price: 16900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/white-roses.jpg",
    images: [
      "/products/white-roses.jpg",
      "/products/white-roses-detail.jpg",
      "/products/white-roses-wrap.jpg",
    ],
    description:
      "Чистый и элегантный букет белых роз Мондиаль. Универсальный подарок, который всегда уместен.",
    composition: [
      "Розы Мондиаль белые — 19 шт",
      "Флористическая зелень",
      "Светлая упаковка",
      "Лента",
    ],
    colors: ["white"],
    occasion: ["wedding", "love"],
    inStock: true,
    isPopular: false,
    createdAt: "2025-12-05",
  },
  {
    id: "p07",
    slug: "korzina-cvetov",
    name: "Корзина цветов",
    category: "baskets",
    price: 27900,
    oldPrice: 32900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/basket.jpg",
    images: [
      "/products/basket.jpg",
      "/products/basket-detail.jpg",
      "/products/basket-wrap.jpg",
    ],
    description:
      "Готовая композиция в корзине — не нужна ваза. Удобно подарить и сразу поставить на стол.",
    composition: [
      "Розы, хризантемы, гербера",
      "Сезонная зелень",
      "Флористическая корзина",
      "Флористическая губка",
    ],
    colors: ["mix", "pink"],
    occasion: ["birthday", "mother"],
    badge: "deal",
    inStock: true,
    isPopular: true,
    createdAt: "2026-02-14",
  },
  {
    id: "p08",
    slug: "cvety-v-korobke",
    name: "Цветы в коробке",
    category: "boxes",
    price: 24500,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/box.jpg",
    images: [
      "/products/box.jpg",
      "/products/box-detail.jpg",
      "/products/box-wrap.jpg",
    ],
    description:
      "Розы в стильной шляпной коробке. Композиция держит форму и долго остаётся свежей.",
    composition: [
      "Кустовые и одноголовые розы",
      "Гипсофила",
      "Шляпная коробка",
      "Зелень",
    ],
    colors: ["pink", "mix"],
    occasion: ["love", "birthday"],
    inStock: true,
    isPopular: true,
    createdAt: "2026-04-02",
  },
  {
    id: "p09",
    slug: "buket-mame",
    name: "Букет «Маме»",
    category: "bouquets",
    price: 15900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/mom.jpg",
    images: [
      "/products/mom.jpg",
      "/products/mom-detail.jpg",
      "/products/mom-wrap.jpg",
    ],
    description:
      "Тёплый букет в нежных тонах — чтобы сказать «спасибо» и «люблю». В комплекте — открытка с вашими словами.",
    composition: [
      "Розы, эустома, альстромерия",
      "Нежная зелень",
      "Упаковка в пастельных тонах",
      "Открытка",
    ],
    colors: ["pink", "white"],
    occasion: ["mother"],
    badge: "hit",
    inStock: true,
    isPopular: true,
    createdAt: "2026-03-01",
  },
  {
    id: "p10",
    slug: "buket-svidanie",
    name: "Букет «Свидание»",
    category: "bouquets",
    price: 19900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/date.jpg",
    images: [
      "/products/date.jpg",
      "/products/date-detail.jpg",
      "/products/date-wrap.jpg",
    ],
    description:
      "Романтичный букет в красно-розовой гамме. Чтобы первое впечатление было ярким.",
    composition: [
      "Красные и розовые розы",
      "Гипсофила",
      "Романтичная упаковка",
      "Лента",
    ],
    colors: ["red", "pink"],
    occasion: ["love"],
    inStock: true,
    isPopular: false,
    createdAt: "2026-02-09",
  },
  {
    id: "p11",
    slug: "buket-premium",
    name: "Букет «Премиум»",
    category: "bouquets",
    price: 49900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/premium.jpg",
    images: [
      "/products/premium.jpg",
      "/products/premium-detail.jpg",
      "/products/premium-wrap.jpg",
    ],
    description:
      "Авторская композиция из премиальных цветов. Пионовидные розы, гортензия и орхидея — для самого торжественного повода.",
    composition: [
      "Пионовидные розы Дэвида Остина",
      "Гортензия",
      "Орхидея",
      "Премиальная дизайнерская упаковка",
    ],
    colors: ["mix", "burgundy"],
    occasion: ["wedding", "love"],
    badge: "new",
    inStock: true,
    isPopular: true,
    createdAt: "2026-05-10",
  },
  {
    id: "p12",
    slug: "sezonnye-tyulpany",
    name: "Сезонные тюльпаны",
    category: "seasonal",
    price: 9900,
    oldPrice: 12900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/tulips.jpg",
    images: [
      "/products/tulips.jpg",
      "/products/tulips-detail.jpg",
      "/products/tulips-wrap.jpg",
    ],
    description:
      "Свежие тюльпаны прямо с поставки. Лёгкий весенний букет по приятной цене.",
    composition: ["Тюльпаны — 25 шт", "Лёгкая упаковка или лента на выбор"],
    colors: ["pink", "mix"],
    occasion: ["just-because", "mother"],
    badge: "deal",
    inStock: true,
    isPopular: false,
    createdAt: "2026-03-20",
  },
  {
    id: "p13",
    slug: "monobuket-hrizantem",
    name: "Монобукет хризантем",
    category: "mono",
    price: 11900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/chrysanthemum.jpg",
    images: [
      "/products/chrysanthemum.jpg",
      "/products/chrysanthemum-detail.jpg",
      "/products/chrysanthemum-wrap.jpg",
    ],
    description:
      "Густой монобукет кустовой хризантемы. Долго стоит и выглядит аккуратно.",
    composition: [
      "Кустовая хризантема — 15 веток",
      "Зелень",
      "Крафт-упаковка",
    ],
    colors: ["white", "mix"],
    occasion: ["just-because", "sorry"],
    inStock: true,
    isPopular: false,
    createdAt: "2026-01-08",
  },
  {
    id: "p14",
    slug: "buket-s-eustomoy",
    name: "Букет с эустомой",
    category: "bouquets",
    price: 17900,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/eustoma.jpg",
    images: [
      "/products/eustoma.jpg",
      "/products/eustoma-detail.jpg",
      "/products/eustoma-wrap.jpg",
    ],
    description:
      "Эустома похожа на маленькие розы и держится очень долго. Деликатный букет для тёплого повода.",
    composition: [
      "Эустома — 9 веток",
      "Флористическая зелень",
      "Матовая упаковка",
      "Лента",
    ],
    colors: ["white", "pink"],
    occasion: ["birthday", "wedding"],
    inStock: true,
    isPopular: false,
    createdAt: "2025-10-22",
  },
  {
    id: "p15",
    slug: "buket-nezhnost",
    name: "Букет «Нежность»",
    category: "bouquets",
    price: 16500,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/tenderness.jpg",
    images: [
      "/products/tenderness.jpg",
      "/products/tenderness-detail.jpg",
      "/products/tenderness-wrap.jpg",
    ],
    description:
      "Пудровый букет с ранункулюсами и эустомой. Спокойное сочетание для признания без лишних слов.",
    composition: [
      "Роза, эустома, ранункулюс",
      "Гипсофила",
      "Пастельная упаковка",
    ],
    colors: ["pink", "white"],
    occasion: ["love", "mother"],
    badge: "hit",
    inStock: true,
    isPopular: true,
    createdAt: "2026-04-18",
  },
  {
    id: "p16",
    slug: "buket-yarkiy-den",
    name: "Букет «Яркий день»",
    category: "bouquets",
    price: 18500,
    // Replace with a real product photo — see public/products/README.md
    image: "/products/bright-day.jpg",
    images: [
      "/products/bright-day.jpg",
      "/products/bright-day-detail.jpg",
      "/products/bright-day-wrap.jpg",
    ],
    description:
      "Сочный контрастный букет, который поднимает настроение. Для дня рождения и хороших новостей.",
    composition: [
      "Герберы, розы, хризантемы",
      "Яркая сезонная зелень",
      "Контрастная упаковка",
    ],
    colors: ["mix"],
    occasion: ["birthday", "just-because"],
    inStock: true,
    isPopular: false,
    createdAt: "2026-04-28",
  },
];

/* ------------------------------------------------------------------ *
 * Query helpers
 * ------------------------------------------------------------------ */

/** Categories that currently have at least one product (for filter chips). */
export const availableCategories: ProductCategory[] = Array.from(
  new Set(products.map((product) => product.category)),
);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getPopularProducts(limit = 8): Product[] {
  return products.filter((product) => product.isPopular).slice(0, limit);
}

/** Related products: same category first, then shared occasions. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const scored = products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === product.category) score += 3;
      score += candidate.occasion.filter((o) =>
        product.occasion.includes(o),
      ).length;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((entry) => entry.candidate);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}
