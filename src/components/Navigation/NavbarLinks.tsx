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

const DesktopDropdown: React.FC<{
  category: Category;
  parentPath?: string;
}> = ({ category, parentPath = "" }) => {
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
        className="flex items-center justify-between gap-3 px-5 py-3 text-midnight/80 font-secondary text-sm tracking-wide capitalize transition-all duration-300 hover:text-blush hover:bg-whisper-pink/30"
      >
        <span>{category.name}</span>
        {hasChildren && (
          <ChevronDown className="h-3 w-3 -rotate-90 opacity-50" />
        )}
      </Link>

      <AnimatePresence>
        {hasChildren && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full top-0 min-w-[200px] bg-soft-ivory/98 backdrop-blur-md border border-stone/10 shadow-lg z-[60]"
          >
            {/* Decorative top line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blush/30 via-champagne-gold/20 to-transparent" />

            <div className="py-2">
              {category.children?.map((child) => (
                <DesktopDropdown
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

export function NavbarLinks({ categories }: { categories: Category[] }) {
  const [isShopHovered, setIsShopHovered] = useState(false);

  const navLinkClasses =
    "relative px-4 py-2 font-secondary text-sm tracking-[0.05em] uppercase text-midnight/80 transition-all duration-300 hover:text-blush group";

  return (
    <div className="flex h-20 items-center">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {/* Products Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsShopHovered(true)}
          onMouseLeave={() => setIsShopHovered(false)}
        >
          <Link href="/products" className={navLinkClasses}>
            <span className="flex items-center gap-1.5">
              Tuotteet
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${
                  isShopHovered ? "rotate-180" : ""
                }`}
              />
            </span>
            {/* Hover underline - expands from center */}
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-blush transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>

          <AnimatePresence>
            {isShopHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full pt-2"
              >
                <div className="relative min-w-[220px] bg-soft-ivory/98 backdrop-blur-md border border-stone/10 shadow-xl">
                  {/* Decorative top gradient */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blush/40 to-transparent" />

                  <div className="py-3">
                    {/* View all products link */}
                    <Link
                      href="/products"
                      className="flex items-center gap-2 px-5 py-2.5 text-midnight font-secondary text-sm tracking-wide transition-all duration-300 hover:text-blush hover:bg-whisper-pink/30 border-b border-stone/10 mb-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-blush/60" />
                      <span>Kaikki tuotteet</span>
                    </Link>

                    {categories.map((category) => (
                      <DesktopDropdown key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* About Link */}
        <Link href="/about" className={navLinkClasses}>
          <span className="hidden lg:inline">Meista</span>
          <span className="lg:hidden">Meista</span>
          <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-blush transition-all duration-300 group-hover:w-full group-hover:left-0" />
        </Link>

        {/* Gallery Link */}
        <Link href="/gallery" className={navLinkClasses}>
          Galleria
          <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-blush transition-all duration-300 group-hover:w-full group-hover:left-0" />
        </Link>

        {/* Contact Link */}
        <Link href="/contact" className={navLinkClasses}>
          Yhteydenotto
          <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-blush transition-all duration-300 group-hover:w-full group-hover:left-0" />
        </Link>
      </nav>
    </div>
  );
}
