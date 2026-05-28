import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Каталог букетов и цветов",
  description:
    "Каталог букетов FLORÉ: розы, сборные букеты, монобукеты, корзины, коробки и подарки с доставкой по Алматы."
};

export default function CatalogPage() {
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
        <Suspense fallback={null}>
          <ProductGrid products={products} />
        </Suspense>
      </div>
    </section>
  );
}
