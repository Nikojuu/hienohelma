"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLargeScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-soft-ivory"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          alt="Fashion boutique hero"
          src="/logo.svg"
          fill
          sizes="100vw"
          className="object-cover opacity-5"
          priority
        />
        {/* Elegant overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-soft-ivory/40 via-transparent to-soft-ivory/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-ivory/60 via-transparent to-soft-ivory/60" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Small decorative text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-blush/50" />
            <div className="w-2 h-2 rounded-full border border-blush/60" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-blush/50" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs tracking-[0.2em] uppercase text-stone font-secondary"
          >
            Naisten muotiputiikki
          </motion.span>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-primary tracking-tight leading-none mt-6 mb-6"
          >
            <span className="text-midnight">Uusi</span>
            <br />
            <span className="text-gradient-fashion">Kokoelma</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base lg:text-lg font-secondary text-midnight/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Loyda tyylisi uusimmasta mallistostamme. Ajattomia klassikoita ja
            kauden uusimmat trendit - kaikki huolella valittu sinua varten.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products" className="group">
              <span className="inline-flex items-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight">
                Shop Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/about" className="group">
              <span className="inline-flex items-center gap-3 px-8 py-4 border border-midnight/30 text-midnight font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:border-blush hover:bg-blush/10">
                View Lookbook
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator - thin line animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-blush/50 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
