"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";

type AboutBlockType = {
  imgSrc: string;
  title: string;
  text: string;
  reverse?: boolean;
};

const AboutBlock = ({ blockInfo }: { blockInfo: AboutBlockType }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className={`mx-auto mb-20 md:mb-32 flex w-full max-w-screen-xl flex-col px-4 sm:px-8 lg:flex-row lg:items-center gap-8 lg:gap-0 ${
        blockInfo.reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Container */}
      <motion.div
        initial={{
          x: blockInfo.reverse ? 60 : -60,
          opacity: 0
        }}
        animate={{
          x: isInView ? 0 : blockInfo.reverse ? 60 : -60,
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full lg:w-1/2 group"
      >
        {/* Image wrapper */}
        <div className="relative aspect-[4/5] overflow-hidden bg-pearl">
          <Image
            fill
            alt={blockInfo.title}
            src={blockInfo.imgSrc}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/10 via-transparent to-soft-ivory/10 pointer-events-none" />
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        initial={{
          x: blockInfo.reverse ? -60 : 60,
          opacity: 0
        }}
        animate={{
          x: isInView ? 0 : blockInfo.reverse ? -60 : 60,
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`relative flex-1 ${
          blockInfo.reverse ? "lg:pr-16 lg:-mr-8" : "lg:pl-16 lg:-ml-8"
        } lg:py-12 z-10`}
      >
        {/* Content card */}
        <div className="relative bg-soft-ivory/95 backdrop-blur-sm p-8 md:p-10 lg:p-12 border border-stone/10 shadow-lg">
          {/* Small decorative circle */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full border border-blush/60" />
            <div className="w-12 h-[1px] bg-gradient-to-r from-blush/50 to-transparent" />
          </div>

          {/* Title */}
          <h3 className="font-primary text-2xl md:text-3xl lg:text-4xl font-bold text-midnight mb-6 tracking-tight">
            {blockInfo.title}
          </h3>

          {/* Text content */}
          <div
            className="prose prose-sm md:prose-base prose-p:leading-relaxed prose-p:text-midnight/70 prose-p:font-secondary max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blockInfo.text),
            }}
          />

          {/* Bottom decorative line */}
          <div className="mt-8 h-[1px] bg-gradient-to-r from-blush/40 via-champagne-gold/30 to-transparent max-w-32" />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutBlock;
