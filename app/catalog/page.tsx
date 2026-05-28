import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { categoryLabels, products } from "@/data/products";
import type { ProductCategory } from "@/types/product";

export const metadata: Metadata = {
  title: "Каталог букетов и цветов",
  description:
    "Каталог букетов FLORÉ: розы, сборные букеты, монобукеты, корзины, коробки и подарки с доставкой по Алматы."
};

type CatalogPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const category =
    params.category && params.category in categoryLabels
      ? (params.category as ProductCategory)
      : undefined;

  return (
    <section className="bg-warmMilk py-10 sm:py-14">
      <div className="container-page">
        <div className="mb-8">
          <SectionTitle
            eyebrow="каталог"
            title="Букеты, розы и композиции с доставкой по Алматы"
            description="Фильтруйте по категории, цене, цвету, поводу и типу цветов. На мобильном фильтры открываются удобным нижним листом."
          />
        </div>
        <ProductGrid products={products} initialCategory={category} />
      </div>
    </section>
  );
}
