"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useBookingFlow, type BookingFlow } from "@/hooks/useBookingFlow";
import { BOOKING_SECTION_ID, prefersReducedMotion, scrollToSection } from "@/lib/scroll";
import type { BundleKey } from "@/types";

interface BookingContextValue extends BookingFlow {
  /** Bumps whenever something asks the widget's zip field to take focus. */
  zipFocusRequest: number;
  /** Scrolls to the widget (and focuses the zip field if still on step 1). */
  openBooking: () => void;
  /** Pricing-card CTA: preselects a bundle, then scrolls to the widget. */
  startBundle: (key: BundleKey) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

const FOCUS_DELAY_MS = 700;

/** Shares booking state between the hero, pricing, area, final CTA and the widget. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const flow = useBookingFlow();
  const [zipFocusRequest, setZipFocusRequest] = useState(0);
  const { presetBundle } = flow;
  const step = flow.state.step;

  const requestZipFocus = useCallback(() => {
    window.setTimeout(
      () => setZipFocusRequest((count) => count + 1),
      prefersReducedMotion() ? 0 : FOCUS_DELAY_MS,
    );
  }, []);

  const openBooking = useCallback(() => {
    scrollToSection(BOOKING_SECTION_ID);
    if (step === 1) requestZipFocus();
  }, [step, requestZipFocus]);

  const startBundle = useCallback(
    (key: BundleKey) => {
      presetBundle(key);
      scrollToSection(BOOKING_SECTION_ID);
      if (!flow.state.zip) requestZipFocus();
    },
    [presetBundle, flow.state.zip, requestZipFocus],
  );

  const value = useMemo(
    () => ({ ...flow, zipFocusRequest, openBooking, startBundle }),
    [flow, zipFocusRequest, openBooking, startBundle],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
