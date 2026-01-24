"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/use-cart";
import type {
  ProductDetail,
  ProductVariation,
} from "@putiikkipalvelu/storefront-sdk";
import { toast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";

const AddToCartButton = ({
  product,
  selectedVariation,
}: {
  product: ProductDetail;
  selectedVariation?: ProductVariation;
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.items);

  const availableStock = selectedVariation
    ? selectedVariation.quantity
    : product.quantity;

  const currentCartQuantity = cartItems.reduce((total, item) => {
    if (
      item.product.id === product.id &&
      (!selectedVariation || item.variation?.id === selectedVariation.id)
    ) {
      return total + item.cartQuantity;
    }
    return total;
  }, 0);

  const isOutOfStock =
    availableStock !== null && currentCartQuantity >= availableStock;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    try {
      await addItem(product, selectedVariation);
      setIsSuccess(true);
    } catch (error: any) {
      if (error.code === "CART_LIMIT_EXCEEDED") {
        toast({
          variant: "destructive",
          title: "Ostoskorin raja täynnä",
          description: error.message || "Ostoskorissa voi olla maksimissaan rajallinen määrä eri tuotteita.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Virhe",
          description: "Tuotteen lisääminen ostoskoriin epäonnistui. Yritä uudelleen.",
        });
      }
      console.error("Failed to add to cart:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => setIsSuccess(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="w-full bg-midnight text-soft-ivory hover:bg-blush hover:text-midnight transition-all duration-300"
      disabled={isOutOfStock}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {isOutOfStock
        ? "Ei varastossa"
        : isSuccess
          ? "Lisatty!"
          : "Lisaa ostoskoriin"}
    </Button>
  );
};

export default AddToCartButton;
