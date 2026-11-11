import { SiteShell } from "@/components/layout/SiteShell";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { PropertyManagersSection } from "@/components/sections/PropertyManagersSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { WhatWeCleanSection } from "@/components/sections/WhatWeCleanSection";

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <PricingSection />
      <WhatWeCleanSection />
      <ResultsSection />
      <ServiceAreasSection />
      <BookingSection />
      <PropertyManagersSection />
      <FaqSection />
      <PromiseSection />
      <FinalCtaSection />
    </SiteShell>
  );
}
