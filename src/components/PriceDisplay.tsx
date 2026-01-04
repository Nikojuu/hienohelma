import React from "react";

interface PriceDisplayProps {
  displayPrice: number;
  originalPrice?: number;
  isOnSale?: boolean;
  salePercent?: string | null;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  displayPrice,
  originalPrice,
  isOnSale = false,
  salePercent,
}) => {
  const discountPercentage = React.useMemo(() => {
    if (salePercent && !isNaN(parseFloat(salePercent))) {
      return ((1 - parseFloat(salePercent)) * 100).toFixed(0);
    }
    return null;
  }, [salePercent]);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        {isOnSale && discountPercentage !== null && (
          <span className="px-2 py-0.5 text-xs font-secondary uppercase tracking-wider bg-wine text-soft-ivory">
            -{discountPercentage}%
          </span>
        )}
        {isOnSale && originalPrice && (
          <span className="text-stone text-sm line-through font-secondary">
            {originalPrice.toFixed(2)}€
          </span>
        )}
      </div>
      <span className={`text-lg font-secondary tabular-nums ${isOnSale ? "text-wine font-semibold" : "text-midnight font-medium"}`}>
        {displayPrice.toFixed(2)}€
      </span>
    </div>
  );
};
