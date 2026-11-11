import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteShell } from "@/components/layout/SiteShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocalAreaSection } from "@/components/sections/LocalAreaSection";
import { PricingSection, bundlePricingHeader } from "@/components/sections/PricingSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { BUNDLE_CLEAN_HEADER, WhatWeCleanSection } from "@/components/sections/WhatWeCleanSection";
import { BUSINESS, SITE_URL, absoluteUrl, jsonLdString } from "@/lib/seo";
import { PRICES, formatPrice } from "@/lib/config";
import { pickFaqItems } from "@/lib/data/faq";
import type { HeroContent } from "@/lib/data/hero";
import { locationPath, type LocationConfig } from "@/lib/data/locations";
import type { FaqGroup } from "@/types";

/** FAQ questions shared by every location page (each location adds its own first question). */
const SHARED_FAQ_QUESTIONS = [
  "When will you arrive?",
  "How long does it take?",
  "When do I pay?",
  "Do you take my appliance apart?",
  "How often should appliances be purified?",
];

export function buildLocationMetadata(location: LocationConfig): Metadata {
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical: locationPath(location.slug) },
    openGraph: {
      type: "website",
      title: location.metaTitle,
      description: location.metaDescription,
      url: locationPath(location.slug),
    },
  };
}

const idPrefixFor = (location: LocationConfig) => `${location.slug}-`;
const waitlistInputIdFor = (location: LocationConfig) => `${idPrefixFor(location)}wlPhone`;

function buildHero(location: LocationConfig): HeroContent {
  const isLive = location.launchState === "live";
  return {
    sectionClass: "hero-sub-page",
    eyebrow: `${location.name}, ${location.state}`,
    headline: "Your appliances are dirtier than you think.",
    subline: {
      category: `Appliance deep cleaning & purification in ${location.name}`,
      supporting: isLive
        ? `Washer, dryer, dishwasher and disposal, steam‑purified in your ${location.name} home. From ${formatPrice(PRICES.starter)}, nothing charged until the cleaning is done.`
        : `${location.name} is on our list. Join the waitlist and we'll text you the moment booking opens. Bundles from ${formatPrice(PRICES.starter)}.`,
    },
    secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
    videoCaption: "Poster still shown as a photo · tap to play",
    waitlist: isLive ? undefined : { market: location.slug, inputId: waitlistInputIdFor(location) },
  };
}

function buildFaqGroups(location: LocationConfig): FaqGroup[] {
  return [
    {
      label: `${location.name} questions`,
      items: [
        {
          question: `Do you come to ${location.name}?`,
          answer: location.faqAnswer,
          open: true,
        },
        ...pickFaqItems(SHARED_FAQ_QUESTIONS),
      ],
    },
  ];
}

/** Structured data limited to what the project supports: no address, geo, ratings or hours. */
function buildStructuredData(location: LocationConfig, faqGroups: FaqGroup[]) {
  const url = absoluteUrl(locationPath(location.slug));
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Service area", item: absoluteUrl("/#areas") },
      { "@type": "ListItem", position: 3, name: location.name, item: url },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: [item.answer, item.link?.text, item.link?.after].filter(Boolean).join(" "),
        },
      })),
    ),
  };
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    // Only live markets are served today; waitlist markets must not claim coverage.
    ...(location.launchState === "live"
      ? { areaServed: location.neighborhoods.map((name) => ({ "@type": "Place", name })) }
      : {}),
  };
  return [breadcrumbs, faq, business];
}

/** Shared template for every location page. All content comes from `location`. */
export function LocationPage({ location }: { location: LocationConfig }) {
  const idPrefix = idPrefixFor(location);
  const isLive = location.launchState === "live";
  const faqGroups = buildFaqGroups(location);

  const pricingHeader = bundlePricingHeader(
    `${location.name} pricing.`,
    isLive
      ? "Every bundle is one visit, about 2 hours, and we arrive within 15 minutes of your booked time."
      : `Booking opens soon in ${location.name}. Prices below are what you'll pay; join the waitlist and we'll text you first.`,
  );

  return (
    <SiteShell standaloneBooking waitlistInputId={isLive ? undefined : waitlistInputIdFor(location)}>
      {buildStructuredData(location, faqGroups).map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
        />
      ))}
      <Breadcrumbs
        current={location.name}
        trail={[{ label: "Service area", href: "/#areas" }]}
      />
      <HeroSection content={buildHero(location)} idPrefix={idPrefix} />
      <LocalAreaSection location={location} idPrefix={idPrefix} />
      <PricingSection
        header={pricingHeader}
        propertyManagerLabel="Get a property quote"
        idPrefix={idPrefix}
      />
      <WhatWeCleanSection header={BUNDLE_CLEAN_HEADER} idPrefix={idPrefix} />
      <ResultsSection idPrefix={idPrefix} />
      <FaqSection
        title={`${location.name} questions, answered.`}
        groups={faqGroups}
        idPrefix={idPrefix}
      />
      <FinalCtaSection idPrefix={idPrefix} />
    </SiteShell>
  );
}
