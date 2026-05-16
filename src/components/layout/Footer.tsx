import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AnimatedLogoMark } from "@/components/svg/AnimatedLogoMark";
import { InstagramIcon } from "@/components/svg/InstagramIcon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const catalogLinks = [
  { label: "Розы", href: "/catalog?category=roses" },
  { label: "Букеты", href: "/catalog?category=bouquets" },
  { label: "Монобукеты", href: "/catalog?category=mono" },
  { label: "Цветы в коробке", href: "/catalog?category=boxes" },
  { label: "Весь каталог", href: "/catalog" },
];

const companyLinks = [
  { label: "О нас", href: "/about" },
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-light-pink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Site footer — brand, navigation, contacts and a closing WhatsApp CTA. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-graphite text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(217,21,114,0.4),transparent_68%)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <AnimatedLogoMark size={40} animate={false} />
              <span className="font-display text-2xl font-semibold">8MART</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Цветочный склад в Костанае. Большой выбор свежих цветов и доставка
              за {siteConfig.deliveryTime}.
            </p>
            <p className="font-display text-lg text-light-pink">
              Красиво. Быстро. С любовью.
            </p>
          </div>

          <FooterColumn title="Каталог" links={catalogLinks} />
          <FooterColumn title="Компания" links={companyLinks} />

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Контакты
            </h3>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-light-pink"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <p className="flex items-center gap-2.5 text-sm text-white/75">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {siteConfig.city}, {siteConfig.address}
            </p>
            <p className="flex items-center gap-2.5 text-sm text-white/75">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              Работаем {siteConfig.workingHours}
            </p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-light-pink"
            >
              <InstagramIcon className="h-4 w-4 text-primary" />
              @8mart_kostanay
            </a>
            <WhatsAppButton size="sm" className="mt-1 w-fit" variant="primary" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} 8MART — доставка цветов в Костанае.</p>
          <p>Демо-сайт. Контакты и фотографии заменяются на реальные перед запуском.</p>
        </div>
      </div>
    </footer>
  );
}
