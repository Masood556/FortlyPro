"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { isBundleKey } from "@/lib/booking-handoff";

/**
 * Homepage only: picks up `?zip=` / `?bundle=` set by other pages (e.g. /pricing)
 * and applies them to the booking widget once. Renders nothing.
 */
export function BookingHandoffReader() {
  const params = useSearchParams();
  const { applyHandoff } = useBooking();
  const appliedRef = useRef(false);

  useEffect(() => {
    if (appliedRef.current) return;
    const zip = params.get("zip");
    const bundle = params.get("bundle");
    if (!zip && !bundle) return;
    appliedRef.current = true;
    applyHandoff({ zip: zip ?? undefined, bundle: isBundleKey(bundle) ? bundle : undefined });
  }, [params, applyHandoff]);

  return null;
}
