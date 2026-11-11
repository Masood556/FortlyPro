import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteShell } from "@/components/layout/SiteShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection, bundlePricingHeader } from "@/components/sections/PricingSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { BUNDLE_CLEAN_HEADER, WhatWeCleanSection } from "@/components/sections/WhatWeCleanSection";
import { PRICES, SITE, formatPrice } from "@/lib/config";
import { PRICING_FAQ_GROUPS } from "@/lib/data/faq";
import type { HeroContent } from "@/lib/data/hero";

export const metadata: Metadata = {
  title: "Appliance Deep Cleaning Prices, Austin TX | FortlyPro",
  description:
    "Bundle pricing for appliance deep cleaning in Austin: Starter $329, Pro $365, Full $399, The Club $349 a visit. One visit, paid after your cleaning.",
};

const PRICING_HERO: HeroContent = {
  sectionClass: "hero-sub-page",
  eyebrow: "Pricing · Austin, TX",
  headline: "Simple, bundled pricing.",
  subline: {
    category: `Appliance deep cleaning & purification from ${formatPrice(PRICES.starter)}`,
    supporting: `Replacing a washer runs ${SITE.replacementCost}. Purifying it starts at ${formatPrice(PRICES.starter)}. Nothing is charged until your cleaning is done.`,
  },
  secondaryLink: { label: "What's included", href: "#clean" },
  videoCaption: "Poster still shown as a photo · tap to play",
};

const PRICING_HEADER = bundlePricingHeader(
  "Pick a bundle. Pay after it's done.",
  "Every bundle is one visit, about 2 hours, and we arrive within 15 minutes of your booked time.",
);

/** Keeps ids unique while Next.js holds other pages mounted but hidden. */
const ID_PREFIX = "pricing-";

export default function PricingPage() {
  return (
    <SiteShell standaloneBooking>
      <Breadcrumbs current="Pricing" />
      <HeroSection content={PRICING_HERO} idPrefix={ID_PREFIX} />
      <PricingSection header={PRICING_HEADER} propertyManagerLabel="Get a property quote" idPrefix={ID_PREFIX} />
      <WhatWeCleanSection header={BUNDLE_CLEAN_HEADER} idPrefix={ID_PREFIX} />
      <ResultsSection idPrefix={ID_PREFIX} />
      <FaqSection title="Pricing questions, answered." groups={PRICING_FAQ_GROUPS} idPrefix={ID_PREFIX} />
      <FinalCtaSection idPrefix={ID_PREFIX} />
    </SiteShell>
  );
}
