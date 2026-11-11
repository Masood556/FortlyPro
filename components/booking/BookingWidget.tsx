"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { AppliancesStep } from "@/components/booking/steps/AppliancesStep";
import { ConfirmationStep } from "@/components/booking/steps/ConfirmationStep";
import { DETAILS_FORM_ID, DetailsStep } from "@/components/booking/steps/DetailsStep";
import { TimeStep } from "@/components/booking/steps/TimeStep";
import { ZipStep } from "@/components/booking/steps/ZipStep";
import { BUNDLES, TIME_SLOTS, formatShortDate, formatTime } from "@/lib/booking";
import type { FieldErrors } from "@/lib/validation";
import type { BookingDetails, BookingStep } from "@/types";

const PROGRESS_LABELS = ["Zip code", "Appliances", "Time", "Details"] as const;

const EMPTY_DETAILS: BookingDetails = { name: "", phone: "", email: "", address: "" };

function ProgressBar({ step }: { step: BookingStep }) {
  return (
    <div className="prog" aria-hidden="true">
      {PROGRESS_LABELS.map((label, index) => {
        const position = index + 1;
        const status = position < step ? "done" : position === step ? "cur" : "";
        return (
          <div key={label} className={status}>
            <i>{position}</i>
            {label}
          </div>
        );
      })}
    </div>
  );
}

/** Two-line summary in the footer: bundle + price, then area / date / time. */
function useFooterSummary() {
  const { state, bundle } = useBooking();
  let top = "Card on file, charged after your cleaning";
  let sub = "Free rescheduling up to 24 hrs before";

  if (state.step >= 2 && bundle.ok) {
    const plan = BUNDLES[bundle.key];
    top = `${plan.name} · $${plan.price}${plan.unit ?? ""}`;
    sub = state.area
      ? `${state.area} ${state.zip} · charged after your cleaning`
      : "Charged after your cleaning";
  } else if (state.step >= 2 && state.area) {
    top = `${state.area} ${state.zip}`;
    sub = "Choose at least two appliances";
  }
  if (state.step >= 3 && state.date) {
    sub =
      formatShortDate(state.date) +
      (state.slotIndex !== null
        ? ` · ${formatTime(...TIME_SLOTS[state.slotIndex])}`
        : " · pick a time");
  }
  return { top, sub };
}

/** Multi-step booking widget. All state lives in the shared booking provider. */
export function BookingWidget() {
  const { state, canContinue, goBack, goForward } = useBooking();
  const { step } = state;
  const stepRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(step);
  const [details, setDetails] = useState<BookingDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<FieldErrors<keyof BookingDetails>>({});
  const summary = useFooterSummary();

  // Move focus to the new step's heading so keyboard/screen-reader users follow along.
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    const heading = stepRef.current?.querySelector<HTMLElement>("h3");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }, [step]);

  // Leaving the confirmation screen ("Done") clears the form for the next booking.
  const [seenStep, setSeenStep] = useState(step);
  if (seenStep !== step) {
    setSeenStep(step);
    if (seenStep === 5) {
      setDetails(EMPTY_DETAILS);
      setErrors({});
    }
  }

  const isDetailsStep = step === 4;

  return (
    <div className="widget rv d1" id="widget">
      <ProgressBar step={step} />
      <div className="wbody">
        <div className="wstep on" ref={stepRef} key={step}>
          {step === 1 && <ZipStep />}
          {step === 2 && <AppliancesStep />}
          {step === 3 && <TimeStep />}
          {step === 4 && (
            <DetailsStep values={details} errors={errors} onChange={setDetails} onErrors={setErrors} />
          )}
          {step === 5 && <ConfirmationStep />}
        </div>
      </div>
      {step !== 5 && (
        <div className="wfoot">
          <div className="sum">
            <b>{summary.top}</b>
            {summary.sub}
          </div>
          {step > 1 && (
            <button className="back" type="button" onClick={goBack}>
              Back
            </button>
          )}
          {step > 1 && (
            <button
              className="btn btn-primary"
              type={isDetailsStep ? "submit" : "button"}
              form={isDetailsStep ? DETAILS_FORM_ID : undefined}
              disabled={!canContinue}
              onClick={isDetailsStep ? undefined : goForward}
            >
              {isDetailsStep ? "Confirm booking" : "Continue"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
