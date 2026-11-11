import type { Metadata } from "next";
import { HostInquiryForm } from "@/components/forms/HostInquiryForm";
import { PropertyManagerQuoteForm } from "@/components/forms/PropertyManagerQuoteForm";
import { RealtorBookingForm } from "@/components/forms/RealtorBookingForm";
import { RealtorReferralForm } from "@/components/forms/RealtorReferralForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteShell } from "@/components/layout/SiteShell";
import { AudienceContactSection } from "@/components/sections/AudienceContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { ReferralSection } from "@/components/sections/ReferralSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { PRICES, SITE, formatPrice } from "@/lib/config";
import { type AudienceId, type AudiencePageContent } from "@/lib/data/audience-pages";
import { audiencePath } from "@/lib/data/audience-routes";
import { absoluteUrl, jsonLdString } from "@/lib/seo";
import type { ReactNode } from "react";

export function buildAudienceMetadata(page: AudiencePageContent): Metadata {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: audiencePath(page.slug) },
    openGraph: {
      type: "website",
      title: page.metaTitle,
      description: page.metaDescription,
      url: audiencePath(page.slug),
    },
  };
}

/** Each audience has its own inquiry form: they are deliberately not interchangeable. */
const INQUIRY_FORMS: Record<AudienceId, () => ReactNode> = {
  airbnb: () => <HostInquiryForm />,
  pm: () => <PropertyManagerQuoteForm />,
  realtor: () => <RealtorBookingForm />,
};

/** Structured data limited to verified content: breadcrumbs and the visible FAQ. */
function buildStructuredData(page: AudiencePageContent) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: page.breadcrumbLabel, item: absoluteUrl(audiencePath(page.slug)) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: [item.answer, item.link?.text, item.link?.after].filter(Boolean).join(" "),
        },
      })),
    },
  ];
}

/** Shared template for the Airbnb-host, property-manager and realtor pages. */
export function AudiencePage({ content }: { content: AudiencePageContent }) {
  const idPrefix = `${content.id}-`;
  const { contact, referral, pricing, faq } = content;

  return (
    <SiteShell standaloneBooking>
      {buildStructuredData(content).map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />
      ))}
      {/* "For" has no page of its own yet, so it is plain text rather than a dead link. */}
      <Breadcrumbs current={content.breadcrumbLabel} trail={[{ label: "For" }]} />
      <HeroSection content={content.hero} idPrefix={idPrefix} />
      <AudienceContactSection
        sectionId={contact.sectionId}
        idPrefix={idPrefix}
        eyebrow={contact.eyebrow}
        title={contact.title}
        lede={contact.lede}
        singleUnit={contact.singleUnit}
        icons={contact.icons}
        form={INQUIRY_FORMS[content.id]()}
      />
      {referral && (
        <ReferralSection
          idPrefix={idPrefix}
          eyebrow={referral.eyebrow}
          title={referral.title}
          lede={referral.lede}
          perks={referral.perks}
          icons={referral.icons}
          form={<RealtorReferralForm />}
        />
      )}
      <PricingSection
        header={{
          eyebrow: pricing.eyebrow,
          eyebrowLong: pricing.eyebrowLong,
          title: pricing.title,
          lede: (
            <>
              Replacing a washer runs {SITE.replacementCost}. Purifying it starts at {formatPrice(PRICES.starter)}.
            </>
          ),
        }}
        propertyManagerLabel="Get a property quote"
        propertyManagerHref={
          pricing.propertyManagerHref.startsWith("#")
            ? `#${idPrefix}${pricing.propertyManagerHref.slice(1)}`
            : pricing.propertyManagerHref
        }
        showComingSoon={false}
        idPrefix={idPrefix}
      />
      <PromiseSection compact idPrefix={idPrefix} />
      <ReviewsSection idPrefix={idPrefix} />
      <FaqSection
        title={faq.title}
        groups={[{ label: faq.tabLabel, items: faq.items }]}
        idPrefix={idPrefix}
      />
      <FinalCtaSection idPrefix={idPrefix} />
    </SiteShell>
  );
}
