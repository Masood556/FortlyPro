"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useBookingFlow, type BookingFlow } from "@/hooks/useBookingFlow";
import { buildBookingHref, type BookingHandoff } from "@/lib/booking-handoff";
import { attributionSearchParams } from "@/lib/attribution";
import { findVisibleById } from "@/lib/dom";
import { BOOKING_SECTION_ID, prefersReducedMotion, scrollToSection } from "@/lib/scroll";
import { checkZip } from "@/lib/zip";
import type { BundleKey } from "@/types";

interface BookingContextValue extends BookingFlow {
  /** Set on waitlist markets: booking CTAs point at the waitlist field with this id. */
  waitlistInputId?: string;
  /** True on pages without a booking widget (e.g. /pricing): actions hand off to the homepage. */
  standalone: boolean;
  /** Bumps whenever something asks the widget's zip field to take focus. */
  zipFocusRequest: number;
  /** Scrolls to the widget (or opens the homepage widget when standalone). */
  openBooking: () => void;
  /** Pricing-card CTA: preselects a bundle, then scrolls to / opens the widget. */
  startBundle: (key: BundleKey) => void;
  /** Standalone pages: continue to the homepage widget with the zip carried over. */
  goToBooking: (handoff?: BookingHandoff) => void;
  /** Homepage: apply a zip/bundle that arrived via the URL from another page. */
  applyHandoff: (handoff: BookingHandoff) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

const FOCUS_DELAY_MS = 700;
const HANDOFF_SCROLL_DELAY_MS = 300;

interface BookingProviderProps {
  children: ReactNode;
  /** Set on pages that have no booking widget of their own. */
  standalone?: boolean;
  /**
   * DOM id of a waitlist phone field. On waitlist markets, booking actions
   * focus that field instead of opening the (live) booking widget.
   */
  waitlistInputId?: string;
}

/** Shares booking state between the hero, pricing, area, final CTA and the widget. */
export function BookingProvider({ children, standalone = false, waitlistInputId }: BookingProviderProps) {
  const flow = useBookingFlow();
  const router = useRouter();
  const [zipFocusRequest, setZipFocusRequest] = useState(0);
  const { presetBundle, zipCovered } = flow;
  const step = flow.state.step;
  const knownZip = flow.state.zip;

  const requestZipFocus = useCallback(() => {
    window.setTimeout(
      () => setZipFocusRequest((count) => count + 1),
      prefersReducedMotion() ? 0 : FOCUS_DELAY_MS,
    );
  }, []);

  const goToBooking = useCallback(
    (handoff?: BookingHandoff) => {
      // Keep UTM / click-id / referral params when sending the visitor to the booking widget.
      const href = buildBookingHref(handoff);
      const extra = attributionSearchParams().toString();
      router.push(extra ? href.replace("#book", `${href.includes("?") ? "&" : "?"}${extra}#book`) : href);
    },
    [router],
  );

  const focusWaitlist = useCallback(() => {
    if (!waitlistInputId) return;
    const input = findVisibleById<HTMLInputElement>(waitlistInputId);
    if (!input) return;
    input.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    input.focus({ preventScroll: true });
  }, [waitlistInputId]);

  const openBooking = useCallback(() => {
    if (waitlistInputId) {
      focusWaitlist();
      return;
    }
    if (standalone) {
      goToBooking({ zip: knownZip ?? undefined });
      return;
    }
    scrollToSection(BOOKING_SECTION_ID);
    if (step === 1) requestZipFocus();
  }, [waitlistInputId, focusWaitlist, standalone, goToBooking, knownZip, step, requestZipFocus]);

  const startBundle = useCallback(
    (key: BundleKey) => {
      if (waitlistInputId) {
        focusWaitlist();
        return;
      }
      if (standalone) {
        goToBooking({ bundle: key, zip: knownZip ?? undefined });
        return;
      }
      presetBundle(key);
      scrollToSection(BOOKING_SECTION_ID);
      if (!knownZip) requestZipFocus();
    },
    [waitlistInputId, focusWaitlist, standalone, goToBooking, presetBundle, knownZip, requestZipFocus],
  );

  const applyHandoff = useCallback(
    ({ zip, bundle }: BookingHandoff) => {
      const result = zip ? checkZip(zip) : null;
      if (result?.state === "ok") zipCovered(result.zip, result.area, true);
      if (bundle) presetBundle(bundle);
      if (bundle && result?.state !== "ok") requestZipFocus();
      // The browser's own #book scroll can stall while lazy images shift the layout.
      window.setTimeout(
        () => scrollToSection(BOOKING_SECTION_ID),
        prefersReducedMotion() ? 0 : HANDOFF_SCROLL_DELAY_MS,
      );
    },
    [zipCovered, presetBundle, requestZipFocus],
  );

  const value = useMemo(
    () => ({
      ...flow,
      standalone,
      waitlistInputId,
      zipFocusRequest,
      openBooking,
      startBundle,
      goToBooking,
      applyHandoff,
    }),
    [flow, standalone, waitlistInputId, zipFocusRequest, openBooking, startBundle, goToBooking, applyHandoff],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
