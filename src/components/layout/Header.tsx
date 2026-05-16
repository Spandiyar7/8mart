"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/cn";
import { AnimatedLogoMark } from "@/components/svg/AnimatedLogoMark";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CartButton } from "@/components/cart/CartButton";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Floating glass header. Transparent over the hero, condensing into a
 * frosted pill once the page scrolls.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-5",
          scrolled ? "py-2" : "py-3.5",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-3 pl-4 transition-all duration-300 sm:px-4 sm:pl-5",
            scrolled
              ? "glass-strong h-14 shadow-[0_16px_44px_-22px_rgba(138,18,63,0.45)]"
              : "h-16 bg-transparent",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.03]"
            aria-label="8MART — на главную"
          >
            <AnimatedLogoMark size={scrolled ? 34 : 38} />
            <span className="font-display text-xl font-semibold tracking-tight text-graphite">
              8MART
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Основная навигация"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-soft-graphite transition-colors hover:bg-light-pink hover:text-deep-rose"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppButton
              size="sm"
              label="WhatsApp"
              className="hidden sm:inline-flex"
            />
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className="grid h-11 w-11 place-items-center rounded-full border border-graphite/10 bg-white/70 text-graphite backdrop-blur-md transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
            >
              <Menu className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
