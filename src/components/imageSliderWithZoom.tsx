"use client";

import { Button } from "@/components/ui/button";
import { cn, getImageUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ImageSliderWithZoomProps {
  images: string[];
  productName?: string;
}

export function ImageSliderWithZoom({ images, productName }: ImageSliderWithZoomProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [prevImages, setPrevImages] = useState(images);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (images !== prevImages) {
    setPrevImages(images);
    setMainImageIndex(0);
    setLoadedImages(new Set());
  }

  const safeIndex = Math.min(mainImageIndex, images.length - 1);
  if (safeIndex !== mainImageIndex) {
    setMainImageIndex(safeIndex);
  }

  const isLoading = !loadedImages.has(safeIndex);
  const ZOOM_LEVEL = 2.5;

  useEffect(() => {
    images.forEach((image, index) => {
      const img = new window.Image();
      img.src = getImageUrl(image, "large");
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
    });
  }, [images]);

  function handleImageLoad() {
    setLoadedImages((prev) => new Set(prev).add(safeIndex));
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

  function handleMouseEnter() {
    setZoomActive(true);
  }

  function handleMouseLeave() {
    setZoomActive(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setZoomPosition({ x, y });
  }

  const indicatorSize = 100 / ZOOM_LEVEL;

  return (
    <div className="relative grid gap-4 items-start max-w-[600px]">
      {/* Main Image Container */}
      <div
        ref={imageContainerRef}
        className="relative group bg-pearl aspect-square w-full cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={getImageUrl(images[mainImageIndex], "large")}
            alt={productName || "Tuotekuva"}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={handleImageLoad}
            draggable={false}
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Loader2 className="w-8 h-8 text-blush animate-spin" />
            </div>
          )}

          {/* Zoom indicator */}
          {zoomActive && !isLoading && (
            <div
              className="absolute border-2 border-blush pointer-events-none z-20 flex items-center justify-center"
              style={{
                width: `${indicatorSize}%`,
                height: `${indicatorSize}%`,
                left: `${zoomPosition.x * 100}%`,
                top: `${zoomPosition.y * 100}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 0 9999px rgba(34, 40, 49, 0.5)",
              }}
            >
              <Search className="w-6 h-6 text-soft-ivory drop-shadow-md" />
            </div>
          )}

          {/* Navigation buttons */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
              <Button
                onClick={handlePreviousClick}
                variant="ghost"
                size="icon"
                className="bg-soft-ivory/80 backdrop-blur-sm hover:bg-blush hover:text-soft-ivory transition-all duration-300 h-10 w-10 pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleNextClick}
                variant="ghost"
                size="icon"
                className="bg-soft-ivory/80 backdrop-blur-sm hover:bg-blush hover:text-soft-ivory transition-all duration-300 h-10 w-10 pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Zoom panel */}
        {zoomActive && !isLoading && (
          <div className="absolute top-0 left-full ml-4 aspect-square w-[400px] bg-soft-ivory border border-stone/20 overflow-hidden shadow-xl z-50">
            <img
              src={getImageUrl(images[safeIndex], "large")}
              alt={`${productName || "Tuote"} - suurennettu`}
              className="absolute pointer-events-none w-full h-full object-cover"
              style={{
                transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                transform: `scale(${ZOOM_LEVEL})`,
              }}
              draggable={false}
            />

            {/* Zoom level indicator */}
            <div className="absolute bottom-3 right-3 bg-midnight/70 text-soft-ivory text-xs font-secondary px-2 py-1 z-10">
              {ZOOM_LEVEL}x
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <div
              className={cn(
                "relative aspect-square overflow-hidden cursor-pointer transition-all duration-300",
                index === safeIndex
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
      )}
    </div>
  );
}
