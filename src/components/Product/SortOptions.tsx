"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Uusimmat", value: "newest" },
  { label: "Hinta: Alhaisin", value: "price_asc" },
  { label: "Hinta: Korkein", value: "price_desc" },
  { label: "Suosituimmat", value: "popularity" },
];

export function SortOptions() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    params.set("page", "1");
    return params.toString();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <span className="text-xs tracking-[0.2em] uppercase font-secondary text-stone">
        Jarjesta:
      </span>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <Link
            key={option.value}
            href={`${pathname}?${createQueryString("sort", option.value)}`}
            className={`text-sm font-secondary px-4 py-2 border transition-all duration-300 ${
              currentSort === option.value
                ? "border-blush bg-blush/10 text-midnight"
                : "border-stone/20 text-stone hover:border-blush/40 hover:text-midnight"
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
