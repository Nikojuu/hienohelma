"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "../ProductCard";
import type { Product } from "@putiikkipalvelu/storefront-sdk";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <Carousel
      className="sm:hidden p-4"
      opts={{
        align: "start",
        loop: true,
        skipSnaps: true,
      }}
    >
      <CarouselContent className="-ml-5">
        {products.map((item) => (
          <CarouselItem key={item.id} className="pl-5 basis-[85%]">
            <ProductCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
