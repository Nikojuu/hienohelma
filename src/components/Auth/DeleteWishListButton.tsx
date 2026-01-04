"use client";
import { WishlistItem } from "@/app/(auth)/(dashboard)/mywishlist/page";
import { Button } from "../ui/button";
import { Trash2, XCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteWishlistItem } from "@/lib/actions/authActions";

const DeleteWishlistButton = ({
  productId,
  variationId,
}: {
  productId: string;
  variationId?: string | null;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteWishlistItem = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteWishlistItem(productId, variationId);

      if (result?.success) {
        toast({
          title: "Tuote poistettu toivelistalta",
          description: "Tuote on poistettu onnistuneesti toivelistaltasi.",
        });
        router.refresh();
      } else {
        toast({
          title: "Poistaminen epaonnistui",
          description: result?.error || "Yrita uudelleen.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Poistaminen epaonnistui",
        description: "Odottamaton virhe tapahtui. Yrita uudelleen.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDeleteWishlistItem}
      disabled={isDeleting}
      className="inline-flex items-center gap-2 px-4 py-2 border border-wine/30 text-wine font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-wine/5 hover:border-wine/60 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? "Poistetaan..." : "Poista"}
    </button>
  );
};

export default DeleteWishlistButton;
