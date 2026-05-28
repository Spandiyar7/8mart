"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.article
          key={category.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: index * 0.04 }}
          className="group overflow-hidden rounded-[28px] bg-white shadow-soft"
        >
          <Link href={`/catalog?category=${category.id}`} className="block">
            <div className="relative aspect-[4/2.7] overflow-hidden bg-warmMilk">
              <Image
                src={category.image}
                alt={`${category.name} FLORÉ`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/90 text-graphite shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-graphite">
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-softGraphite">
                {category.description}
              </p>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
