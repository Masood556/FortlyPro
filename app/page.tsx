import { BookingProvider } from "@/components/booking/BookingProvider";
import { ChecklistSlideIn } from "@/components/layout/ChecklistSlideIn";
import { Footer } from "@/components/layout/Footer";
import { MenuProvider } from "@/components/layout/MenuContext";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { Navbar } from "@/components/layout/Navbar";
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
import { RevealObserver } from "@/components/ui/RevealObserver";

export default function HomePage() {
  return (
    <MenuProvider>
      <BookingProvider>
        <Navbar />
        <main id="top">
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
        </main>
        <Footer />
        <ChecklistSlideIn />
        <MobileBookBar />
        <RevealObserver />
      </BookingProvider>
    </MenuProvider>
  );
}
