import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { BeforePhotosSection } from "@/components/sections/BeforePhotosSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { StoryTeaserSection } from "@/components/sections/StoryTeaserSection";
import { TrustBandSection } from "@/components/sections/TrustBandSection";
import { WhatWeCleanSection, type CleanHeaderContent } from "@/components/sections/WhatWeCleanSection";
import { pickFaqItems } from "@/lib/data/faq";
import { HOME_HERO } from "@/lib/data/hero";
import { audiencePath } from "@/lib/data/audience-routes";

/** Ad landing page: kept out of search results, links still followed (as in the reference). */
export const BOOK_CLEANING_METADATA: Metadata = {
  title: "Book Appliance Deep Cleaning in Austin | FortlyPro",
  description:
    "Book FortlyPro appliance deep cleaning in Austin. Enter your zip, pick a time. From $329, nothing charged until the cleaning is done.",
  robots: { index: false, follow: true },
};

const HERO = { ...HOME_HERO, zipButtonLabel: "Check availability" };

const CLEAN_HEADER: CleanHeaderContent = {
  eyebrow: "What we purify",
  eyebrowLong: " · Washer · Dryer · Dishwasher · Disposal",
  title: "What we purify.",
  instruction: "The cause is buildup in parts you've never cleaned. **Pick an appliance** to see where.",
};

const FAQ_QUESTIONS = [
  "Do you take my appliance apart?",
  "When do I pay?",
  "How do I know my appliance needs it?",
  "When will you arrive?",
  "How long does it take?",
  "What if I need to reschedule?",
];

/**
 * The booking widget lives on this page, so the shared booking provider drives it directly
 * (zip, bundle and appliance state are the same as on the homepage).
 */
export function BookCleaningPage() {
  const idPrefix = "bc-";
  return (
    <SiteShell minimalFooter>
      <HeroSection content={HERO} idPrefix={idPrefix} />
      <TrustBandSection />
      <PricingSection
        propertyManagerLabel="Get a property quote"
        propertyManagerHref={audiencePath("property-managers")}
        idPrefix={idPrefix}
      />
      <BookingSection showTrustChips={false} />
      <BeforePhotosSection idPrefix={idPrefix} />
      <StoryTeaserSection idPrefix={idPrefix} />
      <ReviewsSection idPrefix={idPrefix} sectionId="reviews" />
      <WhatWeCleanSection header={CLEAN_HEADER} idPrefix={idPrefix} />
      <FaqSection
        title="Questions, answered."
        groups={[{ label: "Quick answers", items: pickFaqItems(FAQ_QUESTIONS) }]}
        idPrefix={idPrefix}
      />
      <FinalCtaSection idPrefix={idPrefix} />
    </SiteShell>
  );
}
