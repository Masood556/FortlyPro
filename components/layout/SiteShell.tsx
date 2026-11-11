import { Suspense, type ReactNode } from "react";
import { BookingHandoffReader } from "@/components/booking/BookingHandoffReader";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { ChecklistSlideIn } from "@/components/layout/ChecklistSlideIn";
import { AttributionCapture } from "@/components/layout/AttributionCapture";
import { Footer } from "@/components/layout/Footer";
import { MenuProvider } from "@/components/layout/MenuContext";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/ui/RevealObserver";

interface SiteShellProps {
  children: ReactNode;
  /** True when the page has no booking widget (booking actions go to the homepage). */
  standaloneBooking?: boolean;
  /** Waitlist markets: id of the waitlist phone field that booking CTAs should focus. */
  waitlistInputId?: string;
  /** Minimal footer (legal row only). */
  minimalFooter?: boolean;
}

/** Shared page chrome: providers, navbar, footer, slide-in, mobile bar and reveal animation. */
export function SiteShell({ children, standaloneBooking = false, waitlistInputId, minimalFooter = false }: SiteShellProps) {
  return (
    <MenuProvider>
      <BookingProvider standalone={standaloneBooking} waitlistInputId={waitlistInputId}>
        <Navbar />
        <main>{children}</main>
        <Footer minimal={minimalFooter} />
        <ChecklistSlideIn />
        <MobileBookBar />
        <RevealObserver />
        <AttributionCapture />
        {!standaloneBooking && (
          <Suspense fallback={null}>
            <BookingHandoffReader />
          </Suspense>
        )}
      </BookingProvider>
    </MenuProvider>
  );
}
