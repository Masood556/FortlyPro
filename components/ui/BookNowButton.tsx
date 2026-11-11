"use client";

import type { MouseEvent, ReactNode } from "react";
import { useBooking } from "@/components/booking/BookingProvider";

interface BookNowButtonProps {
  className?: string;
  children?: ReactNode;
  tabIndex?: number;
  onNavigate?: () => void;
}

/** Anchor to `#book` that smooth-scrolls to the widget and focuses its zip field. */
export function BookNowButton({
  className = "btn btn-primary",
  children = "Book Now",
  tabIndex,
  onNavigate,
}: BookNowButtonProps) {
  const { openBooking } = useBooking();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    openBooking();
  };

  return (
    <a className={className} href="#book" tabIndex={tabIndex} onClick={handleClick}>
      {children}
    </a>
  );
}
