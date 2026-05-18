export type ProductCategory =
  | "roses"
  | "bouquets"
  | "mono"
  | "boxes"
  | "single"
  | "gifts";

export type ProductBadge = "Хит" | "Новинка" | "Выгодно" | "Премиум" | "Сезон";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  description: string;
  composition: string[];
  colors: string[];
  occasion: string[];
  flowerTypes: string[];
  badge?: ProductBadge;
  inStock: boolean;
  size: string;
  popularScore: number;
  createdAt: string;
};

export type CategoryMeta = {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
};
