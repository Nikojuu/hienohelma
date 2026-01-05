"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Category } from "@putiikkipalvelu/storefront-sdk";
import { motion, AnimatePresence } from "framer-motion";

const buildCategoryPath = (
  category: Category,
  parentPath: string = ""
): string => {
  return parentPath ? `${parentPath}/${category.slug}` : category.slug;
};

// Priority order for categories (lowercase slugs)
const CATEGORY_ORDER = [
  "sesonkiale",
  "uutuudet",
  "naiset",
  "asusteet",
  "merkit",
  "pellavavaatteet",
  "lahjakortit",
];

const sortCategories = (categories: Category[]): Category[] => {
  return [...categories].sort((a, b) => {
    const aIndex = CATEGORY_ORDER.indexOf(a.slug.toLowerCase());
    const bIndex = CATEGORY_ORDER.indexOf(b.slug.toLowerCase());

    // If both are in the order list, sort by that order
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    // If only a is in the list, a comes first
    if (aIndex !== -1) return -1;
    // If only b is in the list, b comes first
    if (bIndex !== -1) return 1;
    // Otherwise, maintain original order
    return 0;
  });
};

// Subcategory dropdown item (for nested categories)
const SubcategoryItem: React.FC<{
  category: Category;
  parentPath: string;
}> = ({ category, parentPath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const slugPath = buildCategoryPath(category, parentPath);
  const categoryPath = `/products/${slugPath}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={categoryPath}
        className="group/item flex items-center justify-between gap-3 px-6 py-3 text-midnight/70 font-secondary text-[13px] tracking-wide transition-all duration-300 hover:text-blush hover:bg-whisper-pink/20"
      >
        <span className="relative">
          {category.name}
          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blush/50 transition-all duration-300 group-hover/item:w-full" />
        </span>
        {hasChildren && (
          <ChevronDown className="h-3 w-3 -rotate-90 opacity-40" />
        )}
      </Link>

      <AnimatePresence>
        {hasChildren && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-full top-0 -ml-1 min-w-[200px] bg-white border border-stone/10 shadow-xl shadow-midnight/10 rounded-sm z-[60]"
          >
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-gradient-to-r from-blush/40 to-transparent" />
            <div className="py-2">
              {category.children?.map((child) => (
                <SubcategoryItem
                  key={child.id}
                  category={child}
                  parentPath={slugPath}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Top-level category nav item with optional dropdown
const CategoryNavItem: React.FC<{
  category: Category;
  isHighlighted?: boolean;
}> = ({ category, isHighlighted = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const categoryPath = `/products/${category.slug}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={categoryPath}
        className={`
          group relative px-4 xl:px-5 py-2 font-secondary text-[13px] tracking-[0.12em] uppercase
          transition-all duration-500 ease-out
          ${isHighlighted
            ? "text-blush font-medium"
            : "text-midnight/70 hover:text-midnight"
          }
        `}
      >
        <span className="flex items-center gap-1.5">
          {category.name}
          {hasChildren && (
            <ChevronDown
              className={`h-3 w-3 opacity-40 transition-all duration-300 ${
                isHovered ? "rotate-180 opacity-70" : ""
              }`}
            />
          )}
        </span>

        {/* Elegant underline animation */}
        <span
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full
            transition-all duration-500 ease-out
            ${isHighlighted
              ? "w-6 bg-blush/60"
              : "w-0 bg-blush group-hover:w-8"
            }
          `}
        />
      </Link>

      <AnimatePresence>
        {hasChildren && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-50"
          >
            <div className="relative min-w-[220px] bg-white border border-stone/10 shadow-xl shadow-midnight/10 rounded-sm">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-blush/60 to-transparent" />

              <div className="py-3">
                {category.children?.map((child) => (
                  <SubcategoryItem
                    key={child.id}
                    category={child}
                    parentPath={category.slug}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function NavbarLinks({ categories }: { categories: Category[] }) {
  const sortedCategories = sortCategories(categories);

  // Check if category should be highlighted (sale or new arrivals)
  const isHighlightedCategory = (slug: string) => {
    return slug.toLowerCase() === "sesonkiale";
  };

  return (
    <div className="flex-1 flex h-20 items-center justify-center">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
        {/* Sorted categories with elegant spacing */}
        {sortedCategories.map((category, index) => (
          <div key={category.id} className="flex items-center">
            <CategoryNavItem
              category={category}
              isHighlighted={isHighlightedCategory(category.slug)}
            />

            {/* Subtle separator dot between items (not after last category) */}
            {index < sortedCategories.length - 1 && (
              <span className="hidden xl:block w-[3px] h-[3px] rounded-full bg-stone/20 mx-1" />
            )}
          </div>
        ))}

        {/* Elegant divider before contact */}
        <div className="hidden xl:flex items-center mx-3">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-stone/20 to-transparent" />
        </div>

        {/* Contact Link */}
        <Link
          href="/contact"
          className="group relative px-4 xl:px-5 py-2 font-secondary text-[13px] tracking-[0.12em] uppercase text-midnight/70 hover:text-midnight transition-all duration-500"
        >
          Yhteystiedot
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] rounded-full bg-blush transition-all duration-500 ease-out group-hover:w-8" />
        </Link>
      </nav>
    </div>
  );
}
