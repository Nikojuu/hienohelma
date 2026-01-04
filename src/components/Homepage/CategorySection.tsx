"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SHOWCASE_CATEGORIES } from "@/app/utils/constants";

const CategorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative py-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-soft-ivory via-pearl/30 to-soft-ivory" />

      <motion.div
        ref={ref}
        className="relative container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {SHOWCASE_CATEGORIES.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            <Link href={category.link} className="block">
              <div className="relative overflow-hidden bg-pearl">
                {/* Subtle border */}
                <div className="absolute inset-0 border border-stone/10 z-10 pointer-events-none transition-colors duration-500 group-hover:border-blush/30" />

                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/20 to-transparent" />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 shimmer-fashion" />
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-10">
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-primary text-soft-ivory mb-2 transform transition-all duration-500">
                    {category.title}
                  </h3>

                  {/* Description - appears on hover */}
                  <p className="text-sm text-soft-ivory/80 font-secondary max-w-xs opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {category.description}
                  </p>

                  {/* Explore link */}
                  <div className="flex items-center gap-2 mt-4 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-xs tracking-[0.2em] uppercase text-blush font-secondary">
                      Tutustu
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-blush transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategorySection;
