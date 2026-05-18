import type { CategoryMeta, Product, ProductCategory } from "@/types/product";

export const categoryLabels: Record<ProductCategory, string> = {
  roses: "Розы",
  bouquets: "Букеты",
  mono: "Монобукеты",
  boxes: "Корзины и коробки",
  single: "Цветы поштучно",
  gifts: "Подарки"
};

export const categories: CategoryMeta[] = [
  {
    id: "roses",
    name: "Розы",
    description: "Классические, кустовые, белые, красные и премиальные сорта",
    image:
      "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "bouquets",
    name: "Букеты",
    description: "Сборные букеты под повод, настроение и бюджет",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "mono",
    name: "Монобукеты",
    description: "Один вид цветов в чистой современной подаче",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "boxes",
    name: "Корзины и коробки",
    description: "Эффектные композиции, которые удобно дарить и хранить",
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "single",
    name: "Цветы поштучно",
    description: "Соберите свой букет из свежих цветов в наличии",
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "gifts",
    name: "Подарки / клубника / открытки",
    description: "Дополнения к букету для красивого готового подарка",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85"
  }
];

const gallery = {
  redRoses: [
    "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1548094967-e25a127d1f6d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85"
  ],
  softBouquet: [
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=85"
  ],
  hydrangea: [
    "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85"
  ],
  pinkSpray: [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=85"
  ],
  box: [
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=85"
  ],
  tulips: [
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1200&q=85"
  ]
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "25-red-roses",
    name: "25 красных роз",
    category: "roses",
    price: 16500,
    oldPrice: 18900,
    image: gallery.redRoses[0],
    images: gallery.redRoses,
    description:
      "Классический букет из красных роз для сильного, понятного жеста. Подойдет для признания, годовщины и важного подарка сегодня.",
    composition: ["25 красных роз", "атласная лента", "премиальная упаковка"],
    colors: ["красный"],
    occasion: ["Любовь", "Свидание", "День рождения"],
    flowerTypes: ["роза"],
    badge: "Хит",
    inStock: true,
    size: "Высота 50-60 см",
    popularScore: 98,
    createdAt: "2026-01-05"
  },
  {
    id: "p-002",
    slug: "51-red-rose",
    name: "51 роза",
    category: "roses",
    price: 32900,
    image: gallery.redRoses[1],
    images: gallery.redRoses,
    description:
      "Объемный букет из 51 розы, который выглядит торжественно и дорого без лишнего декора.",
    composition: ["51 роза", "плотная дизайнерская упаковка", "лента"],
    colors: ["красный", "розовый", "белый"],
    occasion: ["Любовь", "Юбилей", "Свадьба"],
    flowerTypes: ["роза"],
    badge: "Премиум",
    inStock: true,
    size: "Высота 60-70 см",
    popularScore: 94,
    createdAt: "2026-01-12"
  },
  {
    id: "p-003",
    slug: "soft-mixed-bouquet",
    name: "Нежный сборный букет",
    category: "bouquets",
    price: 18900,
    oldPrice: 21500,
    image: gallery.softBouquet[0],
    images: gallery.softBouquet,
    description:
      "Легкий сборный букет в светлой гамме. Хороший выбор для мамы, коллеги, дня рождения или подарка без повода.",
    composition: ["розы", "эустома", "хризантема", "зелень", "упаковка"],
    colors: ["розовый", "белый", "кремовый"],
    occasion: ["Маме", "День рождения", "Просто так"],
    flowerTypes: ["роза", "эустома", "хризантема"],
    badge: "Выгодно",
    inStock: true,
    size: "Средний букет, 35-45 см",
    popularScore: 96,
    createdAt: "2026-02-02"
  },
  {
    id: "p-004",
    slug: "hydrangea-bouquet",
    name: "Букет с гортензией",
    category: "bouquets",
    price: 24500,
    image: gallery.hydrangea[0],
    images: gallery.hydrangea,
    description:
      "Фактурный букет с крупной гортензией и мягкими сезонными цветами. Флорист соберет композицию в актуальной палитре.",
    composition: ["гортензия", "розы", "эустома", "сезонная зелень"],
    colors: ["голубой", "розовый", "белый"],
    occasion: ["День рождения", "Маме", "Свадьба"],
    flowerTypes: ["гортензия", "роза", "эустома"],
    badge: "Новинка",
    inStock: true,
    size: "Крупный букет, 45-55 см",
    popularScore: 91,
    createdAt: "2026-03-08"
  },
  {
    id: "p-005",
    slug: "pink-spray-roses",
    name: "Розовые кустовые розы",
    category: "mono",
    price: 13900,
    image: gallery.pinkSpray[0],
    images: gallery.pinkSpray,
    description:
      "Нежные кустовые розы с большим количеством бутонов. Букет выглядит воздушно и живо.",
    composition: ["кустовая роза", "матовая упаковка", "лента"],
    colors: ["розовый"],
    occasion: ["Просто так", "Маме", "Извинение"],
    flowerTypes: ["кустовая роза"],
    badge: "Хит",
    inStock: true,
    size: "Высота 45-55 см",
    popularScore: 90,
    createdAt: "2026-02-19"
  },
  {
    id: "p-006",
    slug: "white-roses",
    name: "Белые розы",
    category: "roses",
    price: 17200,
    image: gallery.softBouquet[1],
    images: gallery.softBouquet,
    description:
      "Строгий и чистый букет из белых роз. Подходит для свадьбы, благодарности и лаконичного подарка.",
    composition: ["25 белых роз", "светлая упаковка", "лента"],
    colors: ["белый"],
    occasion: ["Свадьба", "День рождения", "Благодарность"],
    flowerTypes: ["роза"],
    inStock: true,
    size: "Высота 50-60 см",
    popularScore: 86,
    createdAt: "2026-01-22"
  },
  {
    id: "p-007",
    slug: "flower-basket",
    name: "Корзина цветов",
    category: "boxes",
    price: 28500,
    oldPrice: 31900,
    image: gallery.box[0],
    images: gallery.box,
    description:
      "Композиция в корзине для подарка, который сразу выглядит завершенным. Удобно доставлять в офис, домой или ресторан.",
    composition: ["розы", "альстромерия", "хризантема", "зелень", "корзина"],
    colors: ["розовый", "белый", "зеленый"],
    occasion: ["Юбилей", "День рождения", "Маме"],
    flowerTypes: ["роза", "альстромерия", "хризантема"],
    badge: "Премиум",
    inStock: true,
    size: "Корзина 30-35 см",
    popularScore: 89,
    createdAt: "2026-02-14"
  },
  {
    id: "p-008",
    slug: "flowers-in-box",
    name: "Цветы в коробке",
    category: "boxes",
    price: 22900,
    image: gallery.box[1],
    images: gallery.box,
    description:
      "Аккуратная композиция в коробке с влажной флористической базой. Цветы дольше сохраняют форму и свежесть.",
    composition: ["розы", "эустома", "гипсофила", "шляпная коробка"],
    colors: ["розовый", "кремовый"],
    occasion: ["День рождения", "Любовь", "Просто так"],
    flowerTypes: ["роза", "эустома", "гипсофила"],
    badge: "Новинка",
    inStock: true,
    size: "Коробка 24-28 см",
    popularScore: 87,
    createdAt: "2026-03-20"
  },
  {
    id: "p-009",
    slug: "bouquet-for-mom",
    name: "Букет «Маме»",
    category: "bouquets",
    price: 19900,
    image: gallery.softBouquet[2],
    images: gallery.softBouquet,
    description:
      "Теплый сборный букет без резких контрастов. Флорист подберет цветы так, чтобы подарок выглядел заботливо и свежо.",
    composition: ["розы", "эустома", "диантус", "сезонная зелень"],
    colors: ["розовый", "персиковый", "белый"],
    occasion: ["Маме", "День рождения", "Благодарность"],
    flowerTypes: ["роза", "эустома", "диантус"],
    badge: "Хит",
    inStock: true,
    size: "Средний букет, 40-50 см",
    popularScore: 95,
    createdAt: "2026-01-28"
  },
  {
    id: "p-010",
    slug: "date-bouquet",
    name: "Букет «Свидание»",
    category: "bouquets",
    price: 14900,
    image: gallery.pinkSpray[1],
    images: gallery.pinkSpray,
    description:
      "Не слишком формальный букет для свидания, прогулки или приятного сюрприза вечером.",
    composition: ["кустовая роза", "альстромерия", "зелень", "упаковка"],
    colors: ["розовый", "красный"],
    occasion: ["Свидание", "Любовь", "Просто так"],
    flowerTypes: ["кустовая роза", "альстромерия"],
    badge: "Выгодно",
    inStock: true,
    size: "Компактный букет, 30-40 см",
    popularScore: 84,
    createdAt: "2026-02-10"
  },
  {
    id: "p-011",
    slug: "premium-bouquet",
    name: "Букет «Премиум»",
    category: "bouquets",
    price: 42900,
    image: gallery.hydrangea[1],
    images: gallery.hydrangea,
    description:
      "Большой авторский букет с выразительной фактурой. Подходит для важных дат и подарков, где нужен вау-эффект.",
    composition: ["гортензия", "пионовидные розы", "эустома", "эвкалипт"],
    colors: ["белый", "розовый", "зеленый"],
    occasion: ["Юбилей", "Свадьба", "День рождения"],
    flowerTypes: ["гортензия", "пионовидная роза", "эустома"],
    badge: "Премиум",
    inStock: true,
    size: "Крупный букет, 55-65 см",
    popularScore: 93,
    createdAt: "2026-03-01"
  },
  {
    id: "p-012",
    slug: "seasonal-tulips",
    name: "Тюльпаны сезонные",
    category: "mono",
    price: 11900,
    image: gallery.tulips[0],
    images: gallery.tulips,
    description:
      "Сезонные тюльпаны в чистой упаковке. Цвет зависит от свежей поставки, флорист пришлет фото перед доставкой.",
    composition: ["25 тюльпанов", "упаковка", "лента"],
    colors: ["розовый", "желтый", "белый", "микс"],
    occasion: ["Весна", "Маме", "Просто так"],
    flowerTypes: ["тюльпан"],
    badge: "Сезон",
    inStock: true,
    size: "Высота 35-45 см",
    popularScore: 88,
    createdAt: "2026-03-15"
  },
  {
    id: "p-013",
    slug: "single-roses-from-450",
    name: "Розы поштучно",
    category: "single",
    price: 450,
    image: gallery.redRoses[2],
    images: gallery.redRoses,
    description:
      "Розы поштучно для самостоятельного букета. Доступность оттенков лучше уточнить в WhatsApp перед заказом.",
    composition: ["роза поштучно"],
    colors: ["красный", "белый", "розовый", "микс"],
    occasion: ["Любовь", "День рождения", "Просто так"],
    flowerTypes: ["роза"],
    badge: "Выгодно",
    inStock: true,
    size: "Высота 50-60 см",
    popularScore: 83,
    createdAt: "2026-01-16"
  },
  {
    id: "p-014",
    slug: "strawberry-card-set",
    name: "Подарочный набор к букету",
    category: "gifts",
    price: 5900,
    image: gallery.box[2],
    images: gallery.box,
    description:
      "Открытка, сладкое дополнение или клубника к букету. Добавьте к заказу, чтобы подарок был полностью готов.",
    composition: ["открытка", "сладкое дополнение", "подарочная упаковка"],
    colors: ["кремовый", "розовый"],
    occasion: ["День рождения", "Любовь", "Маме"],
    flowerTypes: ["подарок"],
    badge: "Новинка",
    inStock: true,
    size: "Компактный набор",
    popularScore: 70,
    createdAt: "2026-04-02"
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return products
    .slice()
    .sort((a, b) => b.popularScore - a.popularScore)
    .slice(0, limit);
}
