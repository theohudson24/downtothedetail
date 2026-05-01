/*
  layout.tsx  (Root Layout)
  ─────────────────────────────────────────────────────────────────────────────
  This file is the single shared wrapper that Next.js renders around EVERY page.
  Think of it as the HTML document shell — it contains:
    - The <html> and <body> tags
    - Font loading (next/font replaces the old CSS @import for Google Fonts)
    - The persistent Header and Footer components
    - ClientInit, which handles scroll-reveal animations
    - The "skip to content" accessibility link

  How next/font works:
    Manrope and Instrument_Sans are loaded directly from Google Fonts at build
    time and self-hosted — no external request from the user's browser. Each
    font is configured with a CSS variable name so that the existing CSS
    `font-family: var(--font-body)` and `font-family: var(--font-display)`
    references continue to work without any CSS changes.

  The `metadata` export is Next.js's way of setting <head> meta tags. Each
  individual page can export its own `metadata` to override these defaults.
*/

import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientInit from "@/components/ClientInit";
import { Providers } from "@/components/Providers";

// Body font — loaded for weights used across all pages
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body", // injects as CSS var on <html> so globals.css picks it up
  display: "swap",         // show fallback font while Manrope loads (avoids layout shift)
});

// Display / heading font
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"], // Instrument Sans only supports up to 700
  variable: "--font-display",
  display: "swap",
});

// Default metadata — individual pages can override title/description
export const metadata: Metadata = {
  title: "Down To The Detail | Premium Auto Detailing",
  description:
    "Premium interior, exterior, and protection detailing with a cleaner booking flow and a more polished customer experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
      Apply both font variable classes to <html> so the CSS custom properties
      --font-body and --font-display are available to every element on the page.
    */
    <html lang="en" className={`${manrope.variable} ${instrumentSans.variable}`}>
      <body>
        {/*
          ClientInit runs JS-only side effects (adding the "js" class and
          setting up scroll-reveal). It renders no DOM output.
        */}
        <ClientInit />

        {/* Keyboard accessibility: lets screen reader users jump past the nav */}
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        {/*
          page-shell is a flex column that fills the viewport height,
          so the footer is always pushed to the bottom even on short pages.
        */}
        <Providers>
          <div className="page-shell">
            <Header />

            {/*
              `children` is whatever page.tsx renders for the current route.
              Each page wraps its content in <main id="main-content"> so the
              skip link above has a valid target.
            */}
            {children}

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
