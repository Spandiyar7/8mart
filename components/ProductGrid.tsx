"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters, type FilterState } from "@/components/ProductFilters";
import { categoryLabels } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

const defaultFilters: FilterState = {
  category: "all",
  price: "all",
  color: "all",
  occasion: "all",
  flowerType: "all",
  sort: "popular"
};

type ProductGridProps = {
  products: Product[];
};

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "ru"));
}

function matchesPrice(price: number, range: string) {
  if (range === "to10000") return price <= 10000;
  if (range === "10to20") return price > 10000 && price <= 20000;
  if (range === "20to40") return price > 20000 && price <= 40000;
  if (range === "from40") return price > 40000;
  return true;
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-graphite/10 bg-white shadow-soft">
      <div className="aspect-[4/4.4] animate-pulse bg-graphite/10" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-24 animate-pulse rounded-full bg-graphite/10" />
        <div className="h-6 w-4/5 animate-pulse rounded-full bg-graphite/10" />
        <div className="h-4 w-full animate-pulse rounded-full bg-graphite/10" />
        <div className="h-11 w-full animate-pulse rounded-full bg-graphite/10" />
      </div>
    </div>
  );
}

export function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory: ProductCategory | undefined =
    categoryParam && categoryParam in categoryLabels
      ? (categoryParam as ProductCategory)
      : undefined;

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    category: initialCategory ?? "all"
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialCategory) {
      setFilters((current) => ({ ...current, category: initialCategory }));
    }
  }, [initialCategory]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 220);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 180);
    return () => window.clearTimeout(timer);
  }, [filters, search]);

  const colors = useMemo(
    () => unique(products.flatMap((product) => product.colors)),
    [products]
  );
  const occasions = useMemo(
    () => unique(products.flatMap((product) => product.occasion)),
    [products]
  );
  const flowerTypes = useMemo(
    () => unique(products.flatMap((product) => product.flowerTypes)),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const searchable = [
          product.name,
          product.description,
          product.composition.join(" "),
          product.occasion.join(" ")
        ]
          .join(" ")
          .toLowerCase();

        return (
          (filters.category === "all" || product.category === filters.category) &&
          matchesPrice(product.price, filters.price) &&
          (filters.color === "all" || product.colors.includes(filters.color)) &&
          (filters.occasion === "all" || product.occasion.includes(filters.occasion)) &&
          (filters.flowerType === "all" ||
            product.flowerTypes.includes(filters.flowerType)) &&
          (!query || searchable.includes(query))
        );
      })
      .sort((a, b) => {
        if (filters.sort === "cheap") return a.price - b.price;
        if (filters.sort === "expensive") return b.price - a.price;
        if (filters.sort === "new") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return b.popularScore - a.popularScore;
      });
  }, [filters, products, search]);

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearch("");
  };

  const filtersBlock = (
    <ProductFilters
      filters={filters}
      colors={colors}
      occasions={occasions}
      flowerTypes={flowerTypes}
      onChange={setFilters}
      onReset={resetFilters}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="hidden lg:block">{filtersBlock}</aside>

      <div>
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-graphite/10 bg-white p-4 shadow-soft sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Поиск по букетам</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-softGraphite/50" aria-hidden="true" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск: розы, маме, гортензия..."
              className="pl-12"
            />
          </label>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal aria-hidden="true" />
                Фильтры
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="overflow-y-auto p-5">
              <SheetTitle className="mb-5 text-xl font-semibold text-graphite">
                Фильтры каталога
              </SheetTitle>
              {filtersBlock}
            </SheetContent>
          </Sheet>

          <div className="text-sm font-semibold text-softGraphite">
            Найдено: {filteredProducts.length}
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-graphite/10 bg-warmMilk p-10 text-center">
            <h2 className="text-2xl font-semibold text-graphite">
              Ничего не найдено
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-softGraphite">
              Попробуйте изменить фильтры или напишите флористу в WhatsApp — подберём букет из свежего наличия.
            </p>
            <Button type="button" onClick={resetFilters} className="mt-6">
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
