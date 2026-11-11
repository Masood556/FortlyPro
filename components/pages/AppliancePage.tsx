import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteShell } from "@/components/layout/SiteShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection, bundlePricingHeader } from "@/components/sections/PricingSection";
import { QuickAnswerSection } from "@/components/sections/QuickAnswerSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { WhatWeCleanSection } from "@/components/sections/WhatWeCleanSection";
import { APPLIANCE_PAGES, type AppliancePageContent } from "@/lib/data/appliance-pages";
import { appliancePath } from "@/lib/data/appliances";
import { pickFaqItems } from "@/lib/data/faq";

export function buildApplianceMetadata(page: AppliancePageContent): Metadata {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      type: "website",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

/** One appliance service page: same shell and sections, page-specific copy from `content`. */
export function AppliancePage({ content }: { content: AppliancePageContent }) {
  const related: { label: string; href?: string }[] = APPLIANCE_PAGES.filter((page) => page.id !== content.id).map((page) => ({
    label: page.breadcrumbLabel.replace("Garbage disposal", "Disposal"),
    href: appliancePath(page.slug),
  }));
  // Pricing exists; the guide article does not yet, so its pill has no href.
  related.push({ label: "Pricing", href: "/pricing" }, { label: content.guideLabel });
  // Pages stay mounted (hidden) after navigation, so their ids must not collide with the homepage ids.
  const idPrefix = `${content.id}-`;
  const faqGroups = [{ label: content.faq.tabLabel, items: pickFaqItems(content.faq.questions) }];

  return (
    <SiteShell standaloneBooking>
      {/* "Services" has no page yet, so it is plain text rather than a dead link. */}
      <Breadcrumbs current={content.breadcrumbLabel} trail={[{ label: "Services" }]} />
      <HeroSection content={content.hero} idPrefix={idPrefix} />
      <QuickAnswerSection answer={content.quickAnswer} related={related} idPrefix={idPrefix} />
      <WhatWeCleanSection header={content.clean} appliance={content.id} idPrefix={idPrefix} />
      <ResultsSection title={content.results.title} groups={[content.results.group]} idPrefix={idPrefix} />
      <PricingSection
        header={bundlePricingHeader(content.pricing.title, content.pricing.lede)}
        propertyManagerLabel="Get a property quote"
        idPrefix={idPrefix}
      />
      <FaqSection title={content.faq.title} groups={faqGroups} idPrefix={idPrefix} />
      <FinalCtaSection idPrefix={idPrefix} />
    </SiteShell>
  );
}
