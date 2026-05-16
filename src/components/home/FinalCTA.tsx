import { ArrowRight, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingPhotoFrame } from "@/components/motion/FloatingPhotoFrame";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { FrameImage } from "@/components/frames/FrameImage";
import { BloomGlyph, ProductMedia } from "@/components/ui/ProductMedia";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";

/** Closing call-to-action — cinematic floral block with framed bouquets. */
export function FinalCTA() {
  const heroBouquet = products[10];
  const sideBouquet = products[2];

  return (
    <Section id="final-cta">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-hover to-deep-rose px-6 py-16 shadow-[var(--shadow-glow)] sm:py-20">
        <ParallaxPetalLayer count={11} tone="soft" seed={10} />
        <BloomGlyph
          rotation={12}
          className="pointer-events-none absolute -left-12 -top-12 w-56 opacity-25"
        />
        <BloomGlyph
          rotation={-20}
          className="pointer-events-none absolute -bottom-14 -right-12 w-60 opacity-25"
        />
        <div className="noise absolute inset-0 opacity-50" />

        <FloatingPhotoFrame
          className="absolute right-2 top-10 hidden w-40 lg:block"
          rounded="rounded-2xl"
        >
          <div className="relative aspect-[4/5] w-full">
            <FrameImage
              src={heroBouquet.image}
              alt={heroBouquet.name}
              fallback={
                <ProductMedia
                  product={heroBouquet}
                  rounded="rounded-none"
                  className="h-full w-full"
                />
              }
              sizes="10rem"
            />
          </div>
        </FloatingPhotoFrame>
        <FloatingPhotoFrame
          className="absolute -left-3 bottom-10 hidden w-32 lg:block"
          rounded="rounded-2xl"
          floatClassName="fx-float-soft"
          delay={0.3}
        >
          <div className="relative aspect-[4/5] w-full">
            <FrameImage
              src={sideBouquet.image}
              alt={sideBouquet.name}
              fallback={
                <ProductMedia
                  product={sideBouquet}
                  rounded="rounded-none"
                  className="h-full w-full"
                />
              }
              sizes="8rem"
            />
          </div>
        </FloatingPhotoFrame>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 className="text-balance font-display text-3xl leading-tight text-white sm:text-5xl">
            Нужен букет сегодня?
          </h2>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-white/85">
            Напишите нам — флорист подберёт вариант под повод и бюджет, соберёт
            букет и пришлёт фото перед доставкой.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <MagneticButton strength={0.45}>
              <WhatsAppButton
                variant="soft"
                size="lg"
                label="Написать в WhatsApp"
              />
            </MagneticButton>
            <Button href={siteConfig.phoneHref} variant="whatsapp" size="lg">
              <Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              Позвонить
            </Button>
            <Button href="/catalog" variant="whatsapp" size="lg">
              Каталог
              <ArrowRight className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
