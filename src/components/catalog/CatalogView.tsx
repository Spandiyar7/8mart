"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categoryLabels, products } from "@/data/products";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import {
  PRICE_OPTIONS,
  ProductFilters,
  SORT_OPTIONS,
  type Filters,
  type SortKey,
} from "@/components/catalog/ProductFilters";
import { formatItemCount } from "@/lib/formatPrice";
import type { ProductCategory } from "@/types/product";

const DEFAULT_FILTERS: Filters = {
  search: "",
  category: "all",
  price: "all",
  occasion: "all",
  color: "all",
  sort: "popular",
};

/** Interactive catalog — search, filters, sorting and a mobile filter sheet. */
export function CatalogView() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory =
    categoryParam && categoryParam in categoryLabels
      ? (categoryParam as ProductCategory)
      : undefined;

  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    category: initialCategory ?? "all",
  });
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!sheetOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const update = (partial: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...partial }));
  const reset = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    const priceMax =
      PRICE_OPTIONS.find((option) => option.key === filters.price)?.max ??
      Infinity;
    const query = filters.search.trim().toLowerCase();

    const list = products.filter((product) => {
      if (query && !product.name.toLowerCase().includes(query)) return false;
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (
        filters.occasion !== "all" &&
        !product.occasion.includes(filters.occasion)
      )
        return false;
      if (filters.color !== "all" && !product.colors.includes(filters.color))
        return false;
      if (product.price > priceMax) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      switch (filters.sort) {
        case "cheap":
          return a.price - b.price;
        case "expensive":
          return b.price - a.price;
        case "new":
          return b.createdAt.localeCompare(a.createdAt);
        default:
          return Number(b.isPopular) - Number(a.isPopular);
      }
    });
  }, [filters]);

  return (
    <div>
      <div className="relative mb-5">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-soft-graphite"
          aria-hidden="true"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => update({ search: event.target.value })}
          placeholder="Поиск букета по названию…"
          aria-label="Поиск по каталогу"
          className="h-12 w-full rounded-2xl border border-graphite/12 bg-white pl-12 pr-4 text-sm text-graphite outline-none transition-colors placeholder:text-soft-graphite/55 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mb-7 flex items-center justify-between gap-3">
        <p className="text-sm text-soft-graphite">
          Найдено: {formatItemCount(filtered.length)}
        </p>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="catalog-sort">
            Сортировка
          </label>
          <select
            id="catalog-sort"
            value={filters.sort}
            onChange={(event) =>
              update({ sort: event.target.value as SortKey })
            }
            className="h-11 rounded-full border border-graphite/12 bg-white px-4 text-sm font-medium text-graphite outline-none focus:border-primary"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex h-11 items-center gap-2 rounded-full border border-graphite/12 bg-white px-4 text-sm font-semibold text-graphite transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Фильтры
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ProductFilters
              filters={filters}
              onChange={update}
              onReset={reset}
            />
          </div>
        </aside>
        <ProductGrid products={filtered} onReset={reset} />
      </div>

      <AnimatePresence>
        {sheetOpen ? (
          <motion.div
            className="fixed inset-0 z-[65] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Фильтры каталога"
          >
            <motion.div
              className="absolute inset-0 bg-graphite/45 backdrop-blur-sm"
              onClick={() => setSheetOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex max-h-[86vh] flex-col rounded-t-3xl bg-warm-milk"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 280 }}
            >
              <div className="flex items-center justify-between border-b border-graphite/8 px-5 py-4">
                <h2 className="font-display text-xl text-graphite">Фильтры</h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Закрыть фильтры"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-graphite transition-colors hover:text-primary"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <ProductFilters
                  filters={filters}
                  onChange={update}
                  onReset={reset}
                />
              </div>
              <div className="border-t border-graphite/8 p-5">
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="h-12 w-full rounded-full bg-primary font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Показать букеты ({filtered.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
