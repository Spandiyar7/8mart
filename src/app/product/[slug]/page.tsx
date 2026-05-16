import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductDetail } from "@/components/catalog/ProductDetail";
import { ProductCard } from "@/components/catalog/ProductCard";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { createMetadata, getProductJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Букет не найден" };
  }
  return createMetadata({
    title: product.name,
    description: `${product.name}. ${product.description} Доставка по Костанаю за 1,5–3 часа.`,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <main className="pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductJsonLd(product)),
        }}
      />
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
        <nav
          className="mb-7 flex flex-wrap items-center gap-1.5 text-sm text-soft-graphite"
          aria-label="Хлебные крошки"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            Главная
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/catalog" className="transition-colors hover:text-primary">
            Каталог
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-graphite">{product.name}</span>
        </nav>

        <ProductDetail product={product} />

        <section className="mt-20">
          <h2 className="font-display text-2xl text-graphite sm:text-3xl">
            Похожие букеты
          </h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <JitterMotionCard key={item.id} index={index} hover={false}>
                <ProductCard product={item} />
              </JitterMotionCard>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
