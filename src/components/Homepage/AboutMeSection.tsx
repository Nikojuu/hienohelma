"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Globe } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Globe,
    title: "Euroopasta",
    description: "Viikoittain uutuuksia",
  },
  {
    icon: Sparkles,
    title: "Persoonallista",
    description: "Yksilöllisiä löytöjä",
  },
  {
    icon: MapPin,
    title: "Jyväskylässä",
    description: "Kivijalkamyymälä",
  },
];

const AboutMeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-soft-ivory via-pearl/20 to-soft-ivory"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image container */}
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-pearl/30">
                <Image
                  fill
                  alt="Hienohelma - Persoonallista muotia"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/aboutus.jpg"
                  className="object-cover"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:pl-8"
          >
            {/* Section label */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-blush/60" />
              <span className="text-xs tracking-[0.3em] uppercase text-blush font-secondary">
                Tarinaamme
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-primary text-midnight mb-6 leading-tight"
            >
              Persoonallista
              <br />
              <span className="text-gradient-fashion">Pukeutumista</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base text-midnight/70 font-secondary mb-8 leading-relaxed"
            >
              Hienohelma on jyväskyläläinen naisten vaatekauppa, joka tarjoaa
              persoonallisia ja yksilöllisiä vaatteita. Tuomme viikoittain uusia
              löytöjä Euroopasta ja valikoimastamme löydät mekkoja, puseroita,
              neuleita ja paljon muuta - koossa kuin koossa.
            </motion.p>

            {/* Features grid */}
            <motion.div
              variants={itemVariants}
              className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
            >
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="flex flex-col">
                    <div className="w-10 h-10 bg-whisper-pink flex items-center justify-center mb-3 transition-colors duration-300 group-hover:bg-blush/20">
                      <feature.icon className="w-5 h-5 text-blush" />
                    </div>
                    <h4 className="font-primary font-semibold text-lg text-midnight mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-stone font-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link href="/about" className="group inline-flex">
                <span className="inline-flex items-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight">
                  Lue lisaa meista
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
