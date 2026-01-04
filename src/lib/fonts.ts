import { Cormorant_Garamond, Inter } from "next/font/google";

export const textPrimary = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const textSecondary = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
