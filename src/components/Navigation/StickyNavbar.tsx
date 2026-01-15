"use client";

import type { Campaign } from "@putiikkipalvelu/storefront-sdk";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function StickyNavbar({
  children,
  campaigns,
  logoUrl,
}: {
  children: React.ReactNode;
  campaigns: Campaign[];
  logoUrl: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const getCampaignEmoji = (type: string) => {
    switch (type) {
      case "BUY_X_PAY_Y":
        return "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsScrolled(false);
      } else if (currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent md:bg-soft-ivory/95 md:backdrop-blur-md md:border-b md:border-stone/10">
      <nav
        className={`w-full max-w-[3500px] mx-auto px-4
         flex items-center h-20`}
      >
        <Link href="/" className="lg:mr-20 ml-10 lg:ml-20 hidden md:block">
          <Image
            src={logoUrl}
            alt="logo"
            width={80}
            height={80}
            sizes="80px"
          />
        </Link>
        {children}
      </nav>
      {!isScrolled && campaigns.length > 0 && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="bg-midnight text-soft-ivory text-center py-2.5 px-4"
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {campaigns.map((campaign, index) => (
              <span key={campaign.id} className="flex items-center gap-2">
                <span className="text-soft-ivory text-sm font-secondary tracking-wide">
                  {getCampaignEmoji(campaign.type)} {campaign.name}
                </span>
                {index < campaigns.length - 1 && (
                  <span className="text-blush/50 text-sm hidden sm:inline">|</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
