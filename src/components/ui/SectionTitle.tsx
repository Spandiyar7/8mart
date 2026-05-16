"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Section heading with a staggered scroll-reveal. `title` accepts JSX so
 * callers can highlight accent words with the `.text-gradient` utility.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-light-pink px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-deep-rose"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={cn(
          "font-display text-3xl leading-[1.12] tracking-tight text-graphite sm:text-4xl md:text-[2.85rem]",
          centered ? "max-w-2xl text-balance" : "max-w-xl",
        )}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={cn(
            "text-[0.97rem] leading-relaxed text-soft-graphite",
            centered ? "max-w-xl text-pretty" : "max-w-lg",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
