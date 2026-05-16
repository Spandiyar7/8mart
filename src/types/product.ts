/** Catalog taxonomy for 8MART products. */
export type ProductCategory =
  | "roses"
  | "bouquets"
  | "mono"
  | "boxes"
  | "baskets"
  | "seasonal"
  | "gifts";

/** Occasions a bouquet can be picked for. */
export type ProductOccasion =
  | "birthday"
  | "love"
  | "mother"
  | "wedding"
  | "sorry"
  | "just-because";

/** Dominant colour family — drives both filtering and the gradient artwork. */
export type ProductColor = "pink" | "white" | "red" | "burgundy" | "mix";

/** Merchandising badge shown on a product card. */
export type ProductBadge = "hit" | "new" | "deal";

export interface Product {
  id: string;
  /** URL-safe identifier used by `/product/[slug]`. */
  slug: string;
  name: string;
  category: ProductCategory;
  /** Price in Kazakhstani tenge (₸). */
  price: number;
  /** Optional pre-discount price — renders a struck-through reference price. */
  oldPrice?: number;
  /** Primary image path. Replace placeholders with real photos here. */
  image: string;
  /** Gallery image paths (first entry usually mirrors `image`). */
  images: string[];
  description: string;
  /** Flowers and materials the bouquet is assembled from. */
  composition: string[];
  colors: ProductColor[];
  occasion: ProductOccasion[];
  badge?: ProductBadge;
  inStock: boolean;
  isPopular: boolean;
  /** ISO date — used for the "новые" sort order. */
  createdAt: string;
}
