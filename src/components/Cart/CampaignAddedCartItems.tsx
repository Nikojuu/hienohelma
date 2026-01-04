"use client";

import type { Campaign, CalculatedCartItem } from "@putiikkipalvelu/storefront-sdk";
import { getImageUrl, isSaleActive } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export const CampaignAddedCartItems = ({
  buyXPayYCampaign,
  calculatedItems,
}: {
  buyXPayYCampaign: Campaign | undefined;
  calculatedItems: CalculatedCartItem[];
}) => {
  const incrementQuantity = useCart((state) => state.incrementQuantity);
  const decrementQuantity = useCart((state) => state.decrementQuantity);
  const removeItem = useCart((state) => state.removeItem);

  return (
    <>
      {calculatedItems.map(({ item, paidQuantity, freeQuantity }, i) => {
        const { product, variation, cartQuantity } = item;

        // Create unique key for this item
        const itemKey = variation
          ? `${product.id}-${variation.id}`
          : product.id;

        // Determine stock logic based on variation or product
        const stockQuantity =
          variation?.quantity !== undefined
            ? variation.quantity
            : product.quantity;

        const isUnlimitedStock = stockQuantity === null;
        const isOutOfStock = stockQuantity === 0;

        // Get current price for display
        let displayPrice = product.price;
        let salePrice = null;
        let isOnSale = false;

        if (variation) {
          isOnSale = isSaleActive(
            variation.saleStartDate ?? product.saleStartDate,
            variation.saleEndDate ?? product.saleEndDate
          );
          displayPrice =
            variation.price !== null ? variation.price : product.price;
          salePrice = variation.salePrice;
        } else {
          isOnSale = isSaleActive(product.saleStartDate, product.saleEndDate);
          salePrice = product.salePrice;
        }

        return (
          <div
            key={`${itemKey}-${i}`}
            className="relative p-4 md:p-6 bg-pearl/30 border border-stone/10"
          >
            <div className="flex gap-4 md:gap-6">
              {/* Product image */}
              {product.slug ? (
                <Link
                  href={`/product/${product.slug}`}
                  className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-soft-ivory group"
                >
                  <img
                    src={getImageUrl(
                      variation?.images[0] || product.images[0],
                      "thumbnail"
                    )}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
              ) : (
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-soft-ivory">
                  <img
                    src={getImageUrl(
                      variation?.images[0] || product.images[0],
                      "thumbnail"
                    )}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Product details */}
              <div className="flex-1 min-w-0">
                {/* Product name */}
                {product.slug ? (
                  <Link
                    href={`/product/${product.slug}`}
                    className="block font-secondary text-sm md:text-base text-midnight hover:text-blush transition-colors duration-300 line-clamp-2 mb-2"
                  >
                    {product.name}
                  </Link>
                ) : (
                  <span className="block font-secondary text-sm md:text-base text-midnight line-clamp-2 mb-2">
                    {product.name}
                  </span>
                )}

                {/* Variation options */}
                {variation && (
                  <div className="space-y-0.5 mb-3">
                    {variation.options.map((opt) => (
                      <p
                        key={`${opt.optionType.name}-${opt.value}`}
                        className="text-xs font-secondary text-stone"
                      >
                        {opt.optionType.name}: {opt.value}
                      </p>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="mb-3">
                  {isOnSale && salePrice ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-secondary text-wine font-medium">
                        {(salePrice / 100).toFixed(2)} €
                      </span>
                      <span className="text-xs font-secondary text-stone line-through">
                        {(displayPrice / 100).toFixed(2)} €
                      </span>
                      <span className="text-xs font-secondary bg-wine/10 text-wine px-2 py-0.5">
                        ALE
                      </span>
                    </div>
                  ) : (
                    <span className="text-base font-secondary text-midnight">
                      {(displayPrice / 100).toFixed(2)} €
                    </span>
                  )}
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrementQuantity(product.id, variation?.id)}
                    disabled={cartQuantity === 1}
                    className="w-8 h-8 flex items-center justify-center border border-stone/20 text-midnight/70 transition-colors duration-300 hover:border-blush hover:text-blush disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                    <span className="sr-only">Vahenna maaraa</span>
                  </button>
                  <span className="w-8 text-center text-sm font-secondary text-midnight">
                    {cartQuantity || 0}
                  </span>
                  <button
                    onClick={() => incrementQuantity(product.id, variation?.id)}
                    disabled={
                      isOutOfStock ||
                      (!isUnlimitedStock && cartQuantity >= stockQuantity)
                    }
                    className="w-8 h-8 flex items-center justify-center border border-stone/20 text-midnight/70 transition-colors duration-300 hover:border-blush hover:text-blush disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Lisaa maaraa</span>
                  </button>
                </div>

                {/* Campaign info */}
                {freeQuantity > 0 && (
                  <div className="mt-3 p-2 bg-whisper-pink/30 border border-blush/15">
                    <p className="text-xs font-secondary text-blush text-center">
                      Kampanja: Osta{" "}
                      {buyXPayYCampaign?.BuyXPayYCampaign?.buyQuantity}, maksa{" "}
                      {buyXPayYCampaign?.BuyXPayYCampaign?.payQuantity}
                    </p>
                  </div>
                )}
              </div>

              {/* Remove button */}
              <button
                aria-label="Poista tuote"
                onClick={() => removeItem(product.id, variation?.id)}
                className="self-start p-2 text-stone hover:text-wine transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
