"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const leftImageX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const rightImageX = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const centerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Animation variants
  const leftImageVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const rightImageVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      },
    },
  };

  const centerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.6,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.8,
      },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.6,
      },
    },
  };

  const decorLineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.1,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-soft-ivory"
    >
      {/* Left Image - Lifestyle */}
      <motion.div
        variants={leftImageVariants}
        initial="hidden"
        animate="visible"
        style={{ x: leftImageX }}
        className="absolute left-0 top-0 w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero-lifestyle.jpg"
            alt="Fashion lifestyle"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-soft-ivory/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-soft-ivory/60 md:from-soft-ivory/40 via-transparent to-soft-ivory/20" />

          {/* Decorative corner accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute bottom-8 left-8 w-16 h-16 hidden md:block"
          >
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-white/60 to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Image - Collection/Texture */}
      <motion.div
        variants={rightImageVariants}
        initial="hidden"
        animate="visible"
        style={{ x: rightImageX }}
        className="absolute right-0 bottom-0 md:top-0 w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero-collection.jpg"
            alt="Fashion collection"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-transparent to-soft-ivory/80" />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-t from-soft-ivory/60 md:from-soft-ivory/40 via-transparent to-soft-ivory/20" />

          {/* Decorative corner accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute bottom-8 right-8 w-16 h-16 hidden md:block"
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-white/60 to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Center Content Container */}
      <motion.div
        style={{ y: centerY, opacity }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <motion.div
          variants={centerVariants}
          initial="hidden"
          animate="visible"
          className="relative pointer-events-auto"
        >
          {/* Elegant frosted glass container */}
          <div className="relative px-12 py-10 sm:px-16 sm:py-12 lg:px-20 lg:py-14">
            {/* Background with blur effect */}
            <div className="absolute inset-0 bg-soft-ivory/85 backdrop-blur-md rounded-sm" />

            {/* Decorative border */}
            <div className="absolute inset-0 border border-blush/20 rounded-sm" />
            <div className="absolute inset-2 border border-champagne-gold/10 rounded-sm" />

            {/* Top decorative line */}
            <motion.div
              variants={decorLineVariants}
              initial="hidden"
              animate="visible"
              className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blush/60 to-transparent origin-center"
            />

            {/* Bottom decorative line */}
            <motion.div
              variants={decorLineVariants}
              initial="hidden"
              animate="visible"
              className="absolute -bottom-px left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent origin-center"
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-blush/40 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-blush/40 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-champagne-gold/40 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-champagne-gold/40 rounded-br-sm" />

            {/* Content */}
            <div className="relative flex flex-col items-center text-center">
              {/* Logo */}
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                className="relative mb-4"
              >
                <Image
                  src="/musta png logo.png"
                  alt="Hienohelma"
                  width={280}
                  height={100}
                  className="h-auto w-48 sm:w-56 lg:w-72 object-contain"
                  priority
                />
                {/* Subtle shimmer overlay on logo */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2,
                    delay: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent skew-x-12"
                />
              </motion.div>

              {/* Decorative divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blush/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-blush/40" />
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blush/50" />
              </motion.div>

              {/* Tagline */}
              <motion.p
                variants={taglineVariants}
                initial="hidden"
                animate="visible"
                className="text-sm sm:text-base tracking-[0.25em] uppercase text-stone font-secondary mb-6"
              >
                Persoonallista muotia
              </motion.p>

              {/* CTA Button */}
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/products" className="group relative">
                  <span className="relative z-10 inline-flex items-center gap-3 px-8 py-3.5 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-500 overflow-hidden">
                    {/* Button shimmer effect */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <span className="relative">Tutustu mallistoon</span>
                    <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {/* Button hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-blush/20 blur-xl -z-10" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-stone/60 font-secondary">
            Vieritä
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-blush/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Ambient decoration - floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, -100],
              x: [0, (i % 2 === 0 ? 20 : -20)],
            }}
            transition={{
              duration: 8 + i * 2,
              delay: 2 + i * 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute w-1 h-1 rounded-full bg-champagne-gold/40"
            style={{
              left: `${15 + i * 15}%`,
              bottom: "10%",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
