import Link from "next/link";
import Image from "next/image";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { STORE_NAME } from "@/app/utils/constants";

export function Footer({ logoUrl }: { logoUrl: string }) {
  return (
    <footer className="relative bg-midnight overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Logo & Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <Link href="/" className="group flex-shrink-0">
              <div className="relative">
                <Image
                  src={logoUrl}
                  alt={`${STORE_NAME} logo`}
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-soft-ivory/60 font-secondary text-sm text-center md:text-left max-w-xs leading-relaxed">
              Persoonallista pukeutumista Jyväskylästä.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xs tracking-[0.3em] uppercase font-secondary text-blush mb-2">
              Tietoa
            </h3>
            <nav className="flex flex-col items-center gap-3">
              <Link
                href="/contact"
                className="text-sm font-secondary text-soft-ivory/70 hover:text-blush transition-colors duration-300"
              >
                Yhteystiedot
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm font-secondary text-soft-ivory/70 hover:text-blush transition-colors duration-300"
              >
                Tietosuojakaytanto
              </Link>
              <Link
                href="/terms"
                className="text-sm font-secondary text-soft-ivory/70 hover:text-blush transition-colors duration-300"
              >
                Maksu- ja toimitusehdot
              </Link>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-xs tracking-[0.3em] uppercase font-secondary text-blush mb-2">
              Seuraa meita
            </h3>
            <p className="text-soft-ivory/60 font-secondary text-sm text-center md:text-right mb-2">
              Loyda meidat myos somesta!
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group flex items-center gap-2 text-soft-ivory/70 hover:text-blush transition-colors duration-300"
            >
              <InstagramLogoIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-secondary">@{STORE_NAME.toLowerCase().replace(/\s+/g, '_')}</span>
            </a>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-10">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-blush/20" />
          <div className="w-2 h-2 rounded-full border border-blush/60" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-blush/20" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs font-secondary text-soft-ivory/70">
            &copy; {new Date().getFullYear()} {STORE_NAME}. Kaikki oikeudet pidatetaan.
          </p>
        </div>
      </div>
    </footer>
  );
}
