import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SectionTitle } from "@/components/SectionTitle";

const instagramImages = [
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=82",
  "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=800&q=82",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=82",
  "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=82",
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=82",
  "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=800&q=82"
];

export function InstagramGrid() {
  return (
    <section className="bg-warmMilk py-16 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Instagram"
            title="Больше живых букетов и свежих поставок"
            description="Сетка-заглушка: фото можно заменить реальными публикациями 8MART после подключения Instagram."
          />
          <Button asChild variant="outline" className="w-fit">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" />
              Больше букетов в Instagram
            </a>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((image, index) => (
            <a
              key={image}
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[24px] bg-white shadow-sm"
              aria-label={`Открыть Instagram 8MART, пример фото ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Пример Instagram-фото букета 8MART ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-graphite">
                заменить фото
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
