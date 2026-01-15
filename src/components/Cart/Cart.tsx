"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import CartItem from "./CartItem";
import {
  calculateCartWithCampaigns,
  type Campaign,
} from "@putiikkipalvelu/storefront-sdk";

const Cart = ({ campaigns }: { campaigns: Campaign[] }) => {
  const items = useCart((state) => state.items);
  const syncWithBackend = useCart((state) => state.syncWithBackend);
  const itemCount = items.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const initializedRef = useRef<boolean>(false);

  const { calculatedItems, cartTotal, originalTotal, totalSavings } =
    calculateCartWithCampaigns(items, campaigns);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!initializedRef.current) {
      syncWithBackend();
      initializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sheet>
      <SheetTrigger
        className="group flex items-center gap-2 p-2 transition-colors duration-300"
        aria-label={
          isMounted && itemCount > 0
            ? `Avaa ostoskori, ${itemCount} tuotetta`
            : "Avaa ostoskori"
        }
      >
        <div className="relative">
          <ShoppingCart
            aria-hidden="true"
            className="h-5 w-5 text-midnight/70 transition-colors duration-300 group-hover:text-blush"
          />
          {isMounted && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-blush text-soft-ivory text-[10px] font-secondary flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-md bg-soft-ivory border-l border-stone/20">
        {/* Header */}
        <SheetHeader className="pr-6 pb-4 border-b border-stone/15">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full border border-blush/60" />
            <SheetTitle className="font-primary text-2xl md:text-3xl text-midnight">
              Ostoskori
            </SheetTitle>
            <span className="text-sm font-secondary text-stone">
              ({itemCount})
            </span>
          </div>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-hidden pr-6">
              <ScrollArea className="h-full py-4">
                <div className="space-y-4">
                  {calculatedItems.map(
                    ({ item, paidQuantity, freeQuantity }) => (
                      <CartItem
                        product={item.product}
                        variation={item.variation}
                        paidQuantity={paidQuantity}
                        freeQuantity={freeQuantity}
                        key={`${item.product.id}-${item.variation?.id ?? "default"}`}
                      />
                    )
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Footer with totals */}
            <div className="pr-6 pt-4 border-t border-stone/15 space-y-4">
              {/* Campaign savings */}
              {totalSavings > 0 && (
                <div className="space-y-2 text-sm font-secondary">
                  <div className="flex justify-between text-stone">
                    <span>Alkuperainen hinta</span>
                    <span>{(originalTotal / 100).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-wine">
                    <span>Kampanja saasto</span>
                    <span>-{(totalSavings / 100).toFixed(2)} €</span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center py-2">
                <span className="font-secondary text-midnight uppercase tracking-wider text-sm">
                  Yhteensa
                </span>
                <span className="text-base text-midnight font-semibold">
                  {(cartTotal / 100).toFixed(2)} €
                </span>
              </div>

              {totalSavings > 0 && (
                <p className="text-xs font-secondary text-center text-wine">
                  Saastat {(totalSavings / 100).toFixed(2)} € kampanjalla!
                </p>
              )}

              {/* Checkout button */}
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight"
                  >
                    <span>Siirry tilaamaan</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          /* Empty cart state */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            {/* Decorative element */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blush/40" />
              <div className="w-2 h-2 rounded-full border border-blush/60" />
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blush/40" />
            </div>

            <div aria-hidden="true" className="relative mb-6 h-48 w-48">
              <Image
                src="https://dsh3gv4ve2.ufs.sh/f/PRCJ5a0N1o4i4qKGOmoWuI5hetYs2UbcZvCKz06lFmBSQgq9"
                fill
                sizes="200px, 200px"
                alt="Tyhja ostoskori"
                className="object-contain opacity-80"
              />
            </div>

            <h3 className="font-primary text-xl md:text-2xl text-midnight mb-2">
              Ostoskorisi on tyhja
            </h3>
            <p className="text-sm md:text-base font-secondary text-stone text-center mb-6">
              Loyda itsellesi sopiva vaate valikoimastamme
            </p>

            <SheetTrigger asChild>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-midnight/30 text-midnight font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:border-blush hover:text-blush"
              >
                <span>Selaa tuotteita</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
