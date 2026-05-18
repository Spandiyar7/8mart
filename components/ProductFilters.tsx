"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryLabels } from "@/data/products";
import type { ProductCategory } from "@/types/product";

export type FilterState = {
  category: "all" | ProductCategory;
  price: string;
  color: string;
  occasion: string;
  flowerType: string;
  sort: string;
};

type ProductFiltersProps = {
  filters: FilterState;
  colors: string[];
  occasions: string[];
  flowerTypes: string[];
  onChange: (filters: FilterState) => void;
  onReset: () => void;
};

const priceRanges = [
  { value: "all", label: "Любая цена" },
  { value: "to10000", label: "до 10 000 ₸" },
  { value: "10to20", label: "10 000–20 000 ₸" },
  { value: "20to40", label: "20 000–40 000 ₸" },
  { value: "from40", label: "40 000 ₸+" }
];

const sortOptions = [
  { value: "popular", label: "популярные" },
  { value: "cheap", label: "дешевле" },
  { value: "expensive", label: "дороже" },
  { value: "new", label: "новые" }
];

function SelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-graphite">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-graphite/15 bg-white px-4 text-sm font-medium text-graphite shadow-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProductFilters({
  filters,
  colors,
  occasions,
  flowerTypes,
  onChange,
  onReset
}: ProductFiltersProps) {
  const categoryOptions = [
    { value: "all", label: "Все категории" },
    ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label }))
  ];

  const colorOptions = [
    { value: "all", label: "Любой цвет" },
    ...colors.map((color) => ({ value: color, label: color }))
  ];

  const occasionOptions = [
    { value: "all", label: "Любой повод" },
    ...occasions.map((occasion) => ({ value: occasion, label: occasion }))
  ];

  const flowerTypeOptions = [
    { value: "all", label: "Любой тип цветов" },
    ...flowerTypes.map((type) => ({ value: type, label: type }))
  ];

  return (
    <div className="rounded-[28px] border border-graphite/10 bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-full bg-lightPink text-deepRose">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-semibold text-graphite">Фильтры</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-sm font-semibold text-softGraphite transition-colors hover:text-primary"
        >
          <X className="size-4" aria-hidden="true" />
          Сбросить
        </button>
      </div>

      <div className="grid gap-4">
        <SelectField
          label="Категория"
          value={filters.category}
          options={categoryOptions}
          onChange={(category) =>
            onChange({ ...filters, category: category as FilterState["category"] })
          }
        />
        <SelectField
          label="Цена"
          value={filters.price}
          options={priceRanges}
          onChange={(price) => onChange({ ...filters, price })}
        />
        <SelectField
          label="Цвет"
          value={filters.color}
          options={colorOptions}
          onChange={(color) => onChange({ ...filters, color })}
        />
        <SelectField
          label="Повод"
          value={filters.occasion}
          options={occasionOptions}
          onChange={(occasion) => onChange({ ...filters, occasion })}
        />
        <SelectField
          label="Тип цветов"
          value={filters.flowerType}
          options={flowerTypeOptions}
          onChange={(flowerType) => onChange({ ...filters, flowerType })}
        />
        <SelectField
          label="Сортировка"
          value={filters.sort}
          options={sortOptions}
          onChange={(sort) => onChange({ ...filters, sort })}
        />
        <Button type="button" variant="secondary" onClick={onReset} className="mt-2">
          Показать все букеты
        </Button>
      </div>
    </div>
  );
}
