"use client";

import type { MouseEvent, ReactNode } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import type { BundleKey } from "@/types";

interface BundleButtonProps {
  bundle: BundleKey;
  children?: ReactNode;
}

/** Pricing CTA: preselects the bundle in the booking widget, then scrolls to it. */
export function BundleButton({ bundle, children = "Book Now" }: BundleButtonProps) {
  const { startBundle } = useBooking();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    startBundle(bundle);
  };

  return (
    <a className="btn btn-primary" href="#book" onClick={handleClick}>
      {children}
    </a>
  );
}
