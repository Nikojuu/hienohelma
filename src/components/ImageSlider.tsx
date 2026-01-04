"use client";

import { Button } from "@/components/ui/button";
import { cn, getImageUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface iAppProps {
  images: string[];
  productName?: string;
}

export function ImageSlider({ images, productName }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const isLoading = !loadedImages.has(mainImageIndex);

  useEffect(() => {
    images.forEach((image, index) => {
      const img = new window.Image();
      img.src = getImageUrl(image, "medium");
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
    });
  }, [images]);

  function handleImageLoad() {
    setLoadedImages((prev) => new Set(prev).add(mainImageIndex));
  }

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-4 items-start">
      {/* Main Image */}
      <div className="relative overflow-hidden aspect-square w-full group bg-pearl">
        <img
          src={getImageUrl(images[mainImageIndex], "small")}
          srcSet={`${getImageUrl(images[mainImageIndex], "small")} 400w, ${getImageUrl(images[mainImageIndex], "medium")} 800w`}
          sizes="400px"
          alt={productName || "Tuotekuva"}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleImageLoad}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Loader2 className="w-8 h-8 text-blush animate-spin" />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <Button
            onClick={handlePreviousClick}
            variant="ghost"
            size="icon"
            className="bg-soft-ivory/80 backdrop-blur-sm hover:bg-blush hover:text-soft-ivory transition-all duration-300 h-10 w-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleNextClick}
            variant="ghost"
            size="icon"
            className="bg-soft-ivory/80 backdrop-blur-sm hover:bg-blush hover:text-soft-ivory transition-all duration-300 h-10 w-10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === mainImageIndex
                  ? "bg-blush w-6"
                  : "bg-soft-ivory/60 hover:bg-soft-ivory"
              )}
              aria-label={`Kuva ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            className={cn(
              "relative aspect-square overflow-hidden cursor-pointer transition-all duration-300",
              index === mainImageIndex
                ? "ring-2 ring-blush"
                : "ring-1 ring-stone/10 hover:ring-blush/40"
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <img
              src={getImageUrl(image, "thumbnail")}
              alt={`${productName || "Tuote"} - pikkukuva`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
