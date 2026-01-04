import Hero from "@/components/Hero";
import Subtitle from "@/components/subtitle";
import AboutMeSection from "@/components/Homepage/AboutMeSection";
import CategorySection from "@/components/Homepage/CategorySection";
import { ProductCard } from "@/components/ProductCard";
import { Metadata } from "next";
import { ProductCarousel } from "@/components/Product/ProductCarousel";
import { getStoreConfig, getSEOValue, SEO_FALLBACKS } from "@/lib/storeConfig";
import { SEO_ENABLED } from "../utils/constants";
import { storefront } from "@/lib/storefront";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await getStoreConfig();

    const title = getSEOValue(config.seo.seoTitle, `${config.store.name} | Verkkokauppa`);
    const description = getSEOValue(
      config.seo.seoDescription,
      `Tutustu ${config.store.name} valikoimaan. ${SEO_FALLBACKS.description}`
    );
    const domain = getSEOValue(config.seo.domain, SEO_FALLBACKS.domain);
    const ogImage = getSEOValue(config.seo.openGraphImageUrl, SEO_FALLBACKS.openGraphImage);
    const twitterImage = getSEOValue(config.seo.twitterImageUrl, SEO_FALLBACKS.twitterImage);

    return {
      title,
      description,
      robots: SEO_ENABLED
        ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        : "noindex, nofollow",
      alternates: {
        canonical: domain,
      },
      openGraph: {
        title,
        description,
        url: domain,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: "fi_FI",
        type: "website",
        siteName: config.store.name,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [twitterImage],
      },
    };
  } catch (error) {
    console.error("Error generating homepage metadata:", error);

    // Fallback metadata
    return {
      title: SEO_FALLBACKS.title,
      description: SEO_FALLBACKS.description,
      robots: "noindex, nofollow",
    };
  }
}

export const revalidate = 3600;

export default async function Home() {
  const latestProducts = await storefront.products.latest(6, {
    next: { revalidate: 3600 },
  });

  return (
    <main className="bg-soft-ivory">
      {/* Hero Section - Full viewport fashion showcase */}
      <Hero />

      {/* Latest Products Section */}
      <section className="relative py-8 bg-gradient-to-b from-soft-ivory via-pearl/20 to-soft-ivory">
        <Subtitle
          subtitle="Uudet tuotteet"
          description="Tutustu viimeisimpiin lisayksiin - jokainen huolella valittu sinulle"
        />

        {/* Desktop grid */}
        <div className="hidden sm:block container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestProducts.map((item) => (
              <ProductCard item={item} key={item.id} />
            ))}
          </div>

          {/* View all products link */}
          <div className="flex justify-center mt-16">
            <a
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-midnight/20 text-midnight font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:border-blush hover:text-blush"
            >
              <span>Nayta kaikki tuotteet</span>
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
            </a>
          </div>
        </div>

        {/* Mobile carousel */}
        <ProductCarousel products={latestProducts} />
      </section>

      {/* Categories Section */}
      <section className="relative">
        <Subtitle
          subtitle="Kategoriat"
          description="Tutustu valikoimaamme kategorioittain"
        />
        <CategorySection />
      </section>

      {/* About Section */}
      <AboutMeSection />

      {/* Final CTA Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-soft-ivory via-pearl/40 to-whisper-pink/30 overflow-hidden">
        {/* Decorative border frame */}
        <div className="absolute inset-6 sm:inset-10 border border-stone/10 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          {/* Decorative header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-blush/50" />
            <div className="w-2 h-2 rounded-full border border-blush/60" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-blush/50" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-primary text-midnight mb-4">
            Loyda tyylisi
          </h2>

          <p className="text-base text-stone font-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Valikoimastamme loydat ajattomia klassikoita ja kauden uusimmat trendit.
            Olitpa etsimassa jotain erityista itsellesi tai lahjaa - taalta loydat sen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight"
            >
              Selaa kaikkia tuotteita
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
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-midnight/30 text-midnight font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:border-blush hover:text-blush"
            >
              Ota yhteytta
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
