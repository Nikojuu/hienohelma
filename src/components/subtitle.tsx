"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SubtitleProps {
  subtitle: string;
  description?: string;
  dark?: boolean;
  alignment?: "center" | "left";
}

const Subtitle = ({
  subtitle,
  description,
  dark,
  alignment = "center",
}: SubtitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`py-16 md:py-24 ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${alignment === "center" ? "mx-auto" : ""} max-w-4xl px-4`}
      >
        {/* Decorative element above title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex items-center gap-4 mb-6 ${
            alignment === "center" ? "justify-center" : "justify-start"
          }`}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-blush/50" />
          <div className="w-2 h-2 rounded-full border border-blush/60" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-blush/50" />
        </motion.div>

        {/* Main title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-primary tracking-tight ${
            dark ? "text-soft-ivory" : "text-midnight"
          }`}
        >
          {subtitle}
        </h2>

        {/* Optional description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-4 text-base font-secondary max-w-2xl ${
              alignment === "center" ? "mx-auto" : ""
            } ${dark ? "text-soft-ivory/70" : "text-stone"}`}
          >
            {description}
          </motion.p>
        )}

        {/* Underline accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mt-6 w-16 h-[2px] bg-gradient-to-r from-blush to-champagne-gold ${
            alignment === "center" ? "mx-auto" : ""
          }`}
        />
      </motion.div>
    </div>
  );
};

export default Subtitle;
