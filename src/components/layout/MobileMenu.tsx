"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { AnimatedLogoMark } from "@/components/svg/AnimatedLogoMark";
import { InstagramIcon } from "@/components/svg/InstagramIcon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-height slide-in navigation drawer for small screens. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <motion.div
            className="absolute inset-0 bg-graphite/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="glass-strong absolute inset-y-0 right-0 flex w-[min(86vw,22rem)] flex-col gap-7 overflow-y-auto p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <AnimatedLogoMark size={34} animate={false} />
                <span className="font-display text-lg font-semibold text-graphite">
                  8MART
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть меню"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-graphite transition-colors hover:bg-light-pink hover:text-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl text-graphite transition-colors hover:bg-light-pink hover:text-deep-rose"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <WhatsAppButton size="lg" fullWidth label="Написать в WhatsApp" />

              <div className="flex flex-col gap-2.5 rounded-2xl bg-white/55 p-4 text-sm text-soft-graphite">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <p className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  {siteConfig.address}
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  Работаем {siteConfig.workingHours}
                </p>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-primary"
                >
                  <InstagramIcon className="h-4 w-4 text-primary" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
