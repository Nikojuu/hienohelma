"use client";
import { useTransition } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import type {
  ProductDetail,
  ProductVariation,
} from "@putiikkipalvelu/storefront-sdk";
import { addToWishlist } from "@/lib/actions/authActions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface WishlistButtonProps {
  product: ProductDetail;
  selectedVariation?: ProductVariation;
}

const WishlistButton = ({
  product,
  selectedVariation,
}: WishlistButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToWishlist = async () => {
    startTransition(async () => {
      const currentPath = window.location.pathname + window.location.search;
      const result = await addToWishlist(
        product.id,
        currentPath,
        selectedVariation?.id
      );

      if (result.requiresLogin) {
        router.push(
          `/login?returnUrl=${encodeURIComponent(result.returnUrl || "/mypage")}`
        );
        return;
      }
      if (result.error) {
        toast({
          title: "Virhe",
          description: "Tuotetta ei voitu lisata toivelistalle",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Onnistui",
          description: "Tuote lisatty toivelistalle",
        });
      }
    });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full border-midnight/30 text-midnight hover:border-blush hover:bg-blush/10 hover:text-blush transition-all duration-300"
      onClick={handleAddToWishlist}
      aria-label="Add to wishlist"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Lisataan...
        </>
      ) : (
        <>
          <Heart className="mr-2 h-4 w-4" />
          Lisaa toivelistalle
        </>
      )}
    </Button>
  );
};

export default WishlistButton;
