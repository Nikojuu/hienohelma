export type PaymentMethod = "stripe" | "paytrail"; // Add more methods as needed

// ============================================
// TEMPLATE CONFIGURATION
// ============================================

// SEO Control - Set to false to disable search engine indexing (for template/development)
// Set to true when deploying a production store
export const SEO_ENABLED = false;

// ============================================
// HOMEPAGE CONTENT
// These are shown as highlighted 3 categories on the homepage
// Used in CategorySection.tsx - customize for your store
// ============================================
export const SHOWCASE_CATEGORIES = [
  {
    title: "Uutuudet",
    description: "Tutustu uusimpiin tulokkaisiimme - löydä kauden trendit ensimmäisenä",
    image: "/uutuudet.avif",
    link: "/products/uutuudet",
  },
  {
    title: "Mekot",
    description:
      "Kauniit mekot jokaiseen tilaisuuteen - löydä omasi valikoimastamme",
    image: "/mekot.avif",
    link: "/products/mekot",
  },
  {
    title: "Ale",
    description:
      "Tarjouksemme odottavat sinua - nappaa suosikkisi edullisesti",
    image: "/alennukset.avif",
    link: "/products/ale",
  },
];
