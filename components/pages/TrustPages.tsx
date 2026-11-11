import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactQuoteForm } from "@/components/forms/ContactQuoteForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteShell } from "@/components/layout/SiteShell";
import { AudienceContactSection } from "@/components/sections/AudienceContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OfferCard } from "@/components/sections/OfferCard";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ReviewsGridSection } from "@/components/sections/ReviewsGridSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { CONTACT_ICONS } from "@/lib/data/contact-icons";
import { COMPARE_IMAGES } from "@/lib/data/gallery";
import {
  CONTACT_FORM_COPY,
  OFFER_REASONS,
  STORY_LESSONS,
  STORY_TEAM,
  TRUST_PAGES,
  type TrustPageContent,
} from "@/lib/data/trust-pages";
import { absoluteUrl, jsonLdString } from "@/lib/seo";

export function buildTrustMetadata(page: TrustPageContent): Metadata {
  const path = `/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", title: page.metaTitle, description: page.metaDescription, url: path },
  };
}

/** Breadcrumb and visible-FAQ structured data only: nothing about ratings or reviews is invented. */
function StructuredData({ page }: { page: TrustPageContent }) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: page.breadcrumbLabel, item: absoluteUrl(`/${page.slug}`) },
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
  return (
    <>
      {data.map((entry, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(entry) }} />
      ))}
    </>
  );
}

function PageFrame({ page, idPrefix, children, media }: { page: TrustPageContent; idPrefix: string; children: ReactNode; media?: ReactNode }) {
  return (
    <SiteShell standaloneBooking>
      <StructuredData page={page} />
      <Breadcrumbs current={page.breadcrumbLabel} />
      <HeroSection content={page.hero} idPrefix={idPrefix} media={media} />
      {children}
    </SiteShell>
  );
}

const faqSection = (page: TrustPageContent, idPrefix: string) => (
  <FaqSection
    title={page.faq.title}
    groups={[{ label: page.faq.tabLabel, items: page.faq.items }]}
    idPrefix={idPrefix}
  />
);

export function ContactPage() {
  const page = TRUST_PAGES.contact;
  const idPrefix = "contact-";
  return (
    <PageFrame page={page} idPrefix={idPrefix}>
      <AudienceContactSection
        sectionId="managers"
        idPrefix={idPrefix}
        eyebrow={CONTACT_FORM_COPY.eyebrow}
        title={CONTACT_FORM_COPY.title}
        lede={CONTACT_FORM_COPY.lede}
        areasLabel={CONTACT_FORM_COPY.areasLabel}
        icons={CONTACT_ICONS.tl}
        form={<ContactQuoteForm />}
      />
      <PromiseSection compact idPrefix={idPrefix} />
      <ReviewsSection idPrefix={idPrefix} />
      {faqSection(page, idPrefix)}
      <FinalCtaSection idPrefix={idPrefix} />
    </PageFrame>
  );
}

export function OffersPage() {
  const page = TRUST_PAGES.offers;
  const idPrefix = "offers-";
  return (
    <PageFrame page={page} idPrefix={idPrefix} media={<OfferCard idPrefix={idPrefix} />}>
      <FeatureCardsSection
        sectionId="why"
        idPrefix={idPrefix}
        eyebrow="Why a membership and not a coupon"
        title="Buildup comes back. So do we."
        cards={OFFER_REASONS}
        gridClass="story-grid"
      />
      <PromiseSection compact idPrefix={idPrefix} secondaryAction={{ label: "See all pricing", href: "/pricing" }} />
      <ReviewsSection idPrefix={idPrefix} />
      {faqSection(page, idPrefix)}
      <FinalCtaSection idPrefix={idPrefix} />
    </PageFrame>
  );
}

/** The reference has no founders' photo yet, so its labelled placeholder is kept. */
function FoundersPhotoPlaceholder() {
  return (
    <div className="hero-video photo-slot">
      <div className="hv-ph" role="img" aria-label="Placeholder for a photo of the founders">
        <span>Photo: the founders</span>
        <small>Husband&#8209;and&#8209;wife team</small>
      </div>
    </div>
  );
}

export function StoryPage() {
  const page = TRUST_PAGES.story;
  const idPrefix = "story-";
  return (
    <PageFrame page={page} idPrefix={idPrefix} media={<FoundersPhotoPlaceholder />}>
      <FeatureCardsSection
        sectionId="story"
        idPrefix={idPrefix}
        eyebrow="How FortlyPro happened"
        title="Four things we learned the hard way."
        cards={STORY_LESSONS}
        gridClass="story-grid"
      />
      <FeatureCardsSection
        sectionId="team"
        idPrefix={idPrefix}
        eyebrow="Who comes to your home"
        title="Trained by us, personally."
        cards={STORY_TEAM}
        gridClass="team-grid"
        alt
      />
      <PromiseSection compact idPrefix={idPrefix} secondaryAction={{ label: "Contact us", href: "/contact" }} />
      <ReviewsSection idPrefix={idPrefix} />
      {faqSection(page, idPrefix)}
      <FinalCtaSection idPrefix={idPrefix} />
    </PageFrame>
  );
}

export function ReviewsPage() {
  const page = TRUST_PAGES.reviews;
  const idPrefix = "reviews-";
  return (
    <PageFrame
      page={page}
      idPrefix={idPrefix}
      media={
        <BeforeAfterSlider
          variant="hero"
          before={COMPARE_IMAGES.before}
          after={COMPARE_IMAGES.after}
          caption={"Top‑load washer rim, before and after."}
        />
      }
    >
      <ReviewsGridSection idPrefix={idPrefix} />
      <ResultsSection idPrefix={idPrefix} showCompare={false} showReviews={false} />
      {faqSection(page, idPrefix)}
      <FinalCtaSection idPrefix={idPrefix} />
    </PageFrame>
  );
}
