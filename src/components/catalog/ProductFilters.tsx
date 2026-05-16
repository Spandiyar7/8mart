"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import {
  availableCategories,
  categoryLabels,
  colorLabels,
  occasionLabels,
} from "@/data/products";
import type {
  ProductCategory,
  ProductColor,
  ProductOccasion,
} from "@/types/product";
import { cn } from "@/lib/cn";

export type PriceKey = "all" | "u15" | "u25" | "u40";
export type SortKey = "popular" | "cheap" | "expensive" | "new";

export interface Filters {
  search: string;
  category: ProductCategory | "all";
  price: PriceKey;
  occasion: ProductOccasion | "all";
  color: ProductColor | "all";
  sort: SortKey;
}

export const PRICE_OPTIONS: { key: PriceKey; label: string; max: number }[] = [
  { key: "all", label: "Любая", max: Infinity },
  { key: "u15", label: "до 15 000 ₸", max: 15000 },
  { key: "u25", label: "до 25 000 ₸", max: 25000 },
  { key: "u40", label: "до 40 000 ₸", max: 40000 },
];

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Сначала популярные" },
  { key: "cheap", label: "Сначала дешевле" },
  { key: "expensive", label: "Сначала дороже" },
  { key: "new", label: "Сначала новые" },
];

const occasionKeys: ProductOccasion[] = [
  "birthday",
  "love",
  "mother",
  "wedding",
  "sorry",
  "just-because",
];
const colorKeys: ProductColor[] = ["pink", "white", "red", "burgundy", "mix"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary text-white shadow-[0_8px_20px_-10px_rgba(217,21,114,0.85)]"
          : "border border-graphite/15 bg-white text-soft-graphite hover:border-primary/40 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-soft-graphite">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

interface ProductFiltersProps {
  filters: Filters;
  onChange: (partial: Partial<Filters>) => void;
  onReset: () => void;
}

/** Category, price, occasion and colour filters for the catalog. */
export function ProductFilters({
  filters,
  onChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-6">
      <FilterGroup title="Категория">
        <Chip
          active={filters.category === "all"}
          onClick={() => onChange({ category: "all" })}
        >
          Все
        </Chip>
        {availableCategories.map((category) => (
          <Chip
            key={category}
            active={filters.category === category}
            onClick={() => onChange({ category })}
          >
            {categoryLabels[category]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Цена">
        {PRICE_OPTIONS.map((option) => (
          <Chip
            key={option.key}
            active={filters.price === option.key}
            onClick={() => onChange({ price: option.key })}
          >
            {option.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Повод">
        <Chip
          active={filters.occasion === "all"}
          onClick={() => onChange({ occasion: "all" })}
        >
          Любой
        </Chip>
        {occasionKeys.map((occasion) => (
          <Chip
            key={occasion}
            active={filters.occasion === occasion}
            onClick={() => onChange({ occasion })}
          >
            {occasionLabels[occasion]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Цветовая гамма">
        <Chip
          active={filters.color === "all"}
          onClick={() => onChange({ color: "all" })}
        >
          Любая
        </Chip>
        {colorKeys.map((color) => (
          <Chip
            key={color}
            active={filters.color === color}
            onClick={() => onChange({ color })}
          >
            {colorLabels[color]}
          </Chip>
        ))}
      </FilterGroup>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-soft-graphite transition-colors hover:text-primary"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Сбросить фильтры
      </button>
    </div>
  );
}
