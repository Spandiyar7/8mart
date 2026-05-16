"use client";

import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FlowerPhotoFrame } from "@/components/frames/FlowerPhotoFrame";
import { JitterMotionCard } from "@/components/motion/JitterMotionCard";
import { ParallaxPetalLayer } from "@/components/motion/ParallaxPetalLayer";
import { BloomGlyph } from "@/components/ui/ProductMedia";
import { InstagramIcon } from "@/components/svg/InstagramIcon";
import { brandPhotosAvailable } from "@/config/media";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const tiles = [
  { gradient: "from-[#ffd2e4] to-[#d91572]", rotate: "lg:-rotate-3" },
  { gradient: "from-[#ffe1bf] to-[#e0508f]", rotate: "lg:rotate-2" },
  { gradient: "from-[#ffffff] to-[#f3a8c8]", rotate: "lg:-rotate-1" },
  { gradient: "from-[#ffc9d4] to-[#a8174d]", rotate: "lg:rotate-3" },
  { gradient: "from-[#f0bccd] to-[#8a123f]", rotate: "lg:-rotate-2" },
  { gradient: "from-[#ffe4ef] to-[#ef7fb0]", rotate: "lg:rotate-1" },
];

function InstaFallback({ gradient, index }: { gradient: string; index: number }) {
  return (
    <div
      className={cn("relative h-full w-full bg-gradient-to-br", gradient)}
    >
      <BloomGlyph
        rotation={index * 42}
        className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}

/** Instagram photo wall — framed, gently rotated tiles with depth. */
export function InstagramGrid() {
  return (
    <Section
      id="instagram"
      className="bg-light-pink/35"
      background={<ParallaxPetalLayer count={9} tone="pink" seed={9} />}
    >
      <SectionTitle
        eyebrow="Instagram"
        title={
          <>
            Больше букетов в <span className="text-gradient">нашем профиле</span>
          </>
        }
        description="Свежие поставки, новинки и работы флористов — каждый день в ленте 8MART."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {tiles.map((tile, index) => (
          <JitterMotionCard key={index} index={index} hover={false}>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Открыть Instagram 8MART"
              className={cn("block", tile.rotate)}
            >
              <FlowerPhotoFrame
                src={`/brand-photos/insta-${index + 1}.jpg`}
                alt="Букет 8MART в Instagram"
                available={brandPhotosAvailable}
                fallback={
                  <InstaFallback gradient={tile.gradient} index={index} />
                }
                className="aspect-square w-full"
                rounded="rounded-2xl"
                corner
                petals
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </a>
          </JitterMotionCard>
        ))}
      </div>

      <div className="mt-9 flex justify-center">
        <MagneticButton>
          <Button
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
          >
            <InstagramIcon className="h-[1.05rem] w-[1.05rem]" />
            Больше букетов в Instagram
          </Button>
        </MagneticButton>
      </div>
    </Section>
  );
}
