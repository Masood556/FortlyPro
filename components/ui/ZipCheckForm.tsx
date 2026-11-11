"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { SITE } from "@/lib/config";
import { prefersReducedMotion, scrollToSection, BOOKING_SECTION_ID } from "@/lib/scroll";
import { checkZip, sanitizeZipInput } from "@/lib/zip";
import type { ZipCheckResult } from "@/types";

interface ZipCheckFormProps {
  /** Used for the input id and label association. */
  name: string;
  /** Scroll to the booking widget after a covered zip (hero behaviour). */
  scrollOnCovered?: boolean;
  inputId?: string;
  /** Visually hidden label text. */
  label?: string;
  /** Submit button text. */
  buttonLabel?: string;
}

const SCROLL_DELAY_MS = 650;

/**
 * Zip form used in the hero, service-area and final CTA sections. On pages
 * without a booking widget it continues to the homepage widget instead.
 */
export function ZipCheckForm({ name, scrollOnCovered, inputId, label = "Your zip code", buttonLabel = "See times" }: ZipCheckFormProps) {
  const generatedId = useId();
  const fieldId = inputId ?? `${name}-zip-${generatedId}`;
  const messageId = `${fieldId}-msg`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ZipCheckResult | null>(null);
  const { zipCovered, standalone, goToBooking } = useBooking();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = checkZip(value);
    setResult(next);
    if (next.state === "bad") {
      inputRef.current?.focus();
      return;
    }
    if (next.state !== "ok") return;

    if (standalone) {
      goToBooking({ zip: next.zip });
      return;
    }
    zipCovered(next.zip, next.area, true);
    if (scrollOnCovered) {
      window.setTimeout(
        () => scrollToSection(BOOKING_SECTION_ID),
        prefersReducedMotion() ? 0 : SCROLL_DELAY_MS,
      );
    }
  };

  const messageClass = result ? `zipmsg ${result.state === "ok" ? "ok" : "no"}` : "zipmsg";

  return (
    <>
      <form className="zipform" onSubmit={handleSubmit} noValidate>
        <label className="sr" htmlFor={fieldId}>
          {label}
        </label>
        <input
          ref={inputRef}
          id={fieldId}
          value={value}
          onChange={(event) => setValue(sanitizeZipInput(event.target.value))}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Zip code"
          aria-describedby={messageId}
        />
        <button className="btn btn-primary" type="submit">
          {buttonLabel}
        </button>
      </form>
      <p className={messageClass} id={messageId} aria-live="polite">
        {result?.state === "bad" && "Enter a 5‑digit zip code."}
        {result?.state === "no" && (
          <>
            We&apos;re not in {result.zip} yet.{" "}
            <Link href={SITE.waitlistUrl}>Join the waitlist</Link>
          </>
        )}
        {result?.state === "ok" &&
          (standalone ? (
            <>{result.area} is covered. Taking you to booking…</>
          ) : (
            <>
              {result.area} is covered.{" "}
              <a
                href="#book"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(BOOKING_SECTION_ID);
                }}
              >
                Choose your appliances
              </a>
            </>
          ))}
      </p>
    </>
  );
}
