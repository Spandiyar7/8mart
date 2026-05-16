import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/catalog/ProductCard";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { SectionAccentScene } from "@/components/three/SectionAccentScene";
import { getPopularProducts } from "@/data/products";

/** Bestsellers — framed 3D product cards with a petal layer + orb accent. */
export function Bestsellers() {
  const items = getPopularProducts(8);

  return (
    <Section
      id="bestsellers"
      className="bg-light-pink/35"
      background={
        <>
          <ParallaxPetalLayer count={9} tone="pink" seed={3} />
          <SectionAccentScene
            size={210}
            className="-right-20 top-8 opacity-70"
          />
        </>
      }
    >
      <SectionTitle
        eyebrow="Бестселлеры"
        title={
          <>
            Что заказывают <span className="text-gradient">чаще всего</span>
          </>
        }
        description="Проверенные букеты, которые точно понравятся. В наличии и готовы к доставке сегодня."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, index) => (
          <JitterMotionCard key={product.id} index={index % 4} hover={false}>
            <ProductCard product={product} />
          </JitterMotionCard>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/catalog" variant="ghost" size="lg">
          Весь каталог
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}
