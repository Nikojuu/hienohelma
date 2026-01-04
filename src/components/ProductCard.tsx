"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

import { getPriceInfo, getImageUrl } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import type { Product } from "@putiikkipalvelu/storefront-sdk";

interface ProductCardProps {
  item: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const priceInfo = getPriceInfo(item);
  const hasVariations = (item.variations ?? []).length > 0;

  const isAvailable = item.quantity !== 0;
  const quantityInfo = item.quantity === 0 ? "Tuote loppu" : "Saatavilla";

  const discountPercentage = priceInfo.salePercent
    ? ((1 - parseFloat(priceInfo.salePercent)) * 100).toFixed(0)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <Link href={`/product/${item.slug}`} className="block h-full">
        <div className="relative h-full bg-pearl overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          {/* Subtle border */}
          <div className="absolute inset-0 border border-stone/10 z-10 pointer-events-none transition-colors duration-500 group-hover:border-blush/30" />

          {/* Image section */}
          <div className="relative aspect-[3/4] overflow-hidden bg-pearl">
            <img
              src={getImageUrl(item.images[0], "small")}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Sale badge */}
            {priceInfo.isOnSale && priceInfo.salePercent && (
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2 py-1 text-xs font-secondary uppercase tracking-wider bg-wine text-soft-ivory">
                  -{discountPercentage}%
                </span>
              </div>
            )}

            {/* Share button - appears on hover */}
            <div className="absolute top-3 right-3 z-20 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                className="p-2 bg-soft-ivory/90 backdrop-blur-sm text-midnight hover:bg-blush hover:text-soft-ivory transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const url = `${window.location.origin}/product/${item.slug}`;
                  if (navigator.share) {
                    navigator.share({ title: item.name, url });
                  } else {
                    navigator.clipboard.writeText(url);
                  }
                }}
                aria-label="Jaa tuote"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Quick view indicator at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-midnight/90 backdrop-blur-sm text-soft-ivory text-center py-3">
                <span className="text-xs tracking-[0.15em] uppercase font-secondary">
                  Nayta tuote
                </span>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="p-4 space-y-2">
            {/* Product name */}
            <h3 className="text-lg font-primary text-midnight line-clamp-2 group-hover:text-blush transition-colors duration-300 leading-tight">
              {item.name}
            </h3>

            {/* Price and availability row */}
            <div className="flex items-center justify-between gap-2">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                {priceInfo.isOnSale && (
                  <span className="text-sm text-stone line-through font-secondary">
                    {priceInfo.currentPrice.toFixed(2)}€
                  </span>
                )}
                <span
                  className={`text-base font-secondary tabular-nums ${priceInfo.isOnSale ? "text-wine font-semibold" : "text-midnight"}`}
                >
                  {priceInfo.isOnSale
                    ? priceInfo.salePrice!.toFixed(2)
                    : priceInfo.currentPrice.toFixed(2)}
                  €
                </span>
              </div>

              {/* Availability indicator */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    hasVariations
                      ? "bg-champagne-gold"
                      : isAvailable
                        ? "bg-emerald-500"
                        : "bg-wine"
                  }`}
                />
                <span className="text-xs text-stone font-secondary">
                  {hasVariations ? "Vaihtoehtoja" : quantityInfo}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const LoadingProductCard: React.FC = () => {
  return (
    <div className="relative bg-pearl overflow-hidden h-full">
      {/* Subtle border */}
      <div className="absolute inset-0 border border-stone/10 z-10 pointer-events-none" />

      {/* Image skeleton with shimmer */}
      <div className="relative aspect-[3/4] w-full bg-pearl overflow-hidden">
        <div className="absolute inset-0 shimmer-fashion" />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 bg-stone/10" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16 bg-stone/10" />
          <Skeleton className="h-3 w-14 bg-stone/10" />
        </div>
      </div>
    </div>
  );
};
