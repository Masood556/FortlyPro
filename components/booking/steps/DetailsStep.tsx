"use client";

import { useRef, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import {
  hasErrors,
  validateBookingDetails,
  type FieldErrors,
} from "@/lib/validation";
import type { BookingDetails } from "@/types";

export const DETAILS_FORM_ID = "booking-details";

interface DetailsStepProps {
  values: BookingDetails;
  errors: FieldErrors<keyof BookingDetails>;
  onChange: (values: BookingDetails) => void;
  onErrors: (errors: FieldErrors<keyof BookingDetails>) => void;
}

interface FieldProps {
  id: string;
  label: string;
  error?: boolean;
  message: string;
  full?: boolean;
  children: ReactNode;
}

function Field({ id, label, error, message, full, children }: FieldProps) {
  const className = ["field", full && "full", error && "err"].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="e" id={`${id}-error`}>
        {message}
      </span>
    </div>
  );
}

/** Step 4: customer information with inline validation. Submitted via the footer button. */
export function DetailsStep({ values, errors, onChange, onErrors }: DetailsStepProps) {
  const { submitDetails } = useBooking();
  const formRef = useRef<HTMLFormElement>(null);

  const update = (key: keyof BookingDetails, value: string) => {
    onChange({ ...values, [key]: value });
    if (errors[key]) onErrors({ ...errors, [key]: false });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = validateBookingDetails(values);
    onErrors(next);
    if (hasErrors(next)) {
      formRef.current?.querySelector<HTMLInputElement>(".field.err input")?.focus();
      return;
    }
    submitDetails({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      address: values.address.trim(),
    });
  };

  const inputProps = (key: keyof BookingDetails, id: string) => ({
    id,
    value: values[key],
    required: true,
    "aria-invalid": errors[key] || undefined,
    "aria-describedby": `${id}-error`,
    onChange: (event: ChangeEvent<HTMLInputElement>) => update(key, event.target.value),
  });

  return (
    <>
      <h3>Almost done.</h3>
      <p className="sub">We&apos;ll text your confirmation and arrival window.</p>
      <form ref={formRef} className="fields" id={DETAILS_FORM_ID} onSubmit={handleSubmit} noValidate>
        <Field id="fName" label="Full name" error={errors.name} message="Add your name.">
          <input {...inputProps("name", "fName")} autoComplete="name" />
        </Field>
        <Field id="fPhone" label="Mobile" error={errors.phone} message={"Enter a 10‑digit number."}>
          <input
            {...inputProps("phone", "fPhone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={"(512) 555‑0123"}
          />
        </Field>
        <Field id="fEmail" label="Email" full error={errors.email} message="Enter a valid email.">
          <input {...inputProps("email", "fEmail")} type="email" autoComplete="email" />
        </Field>
        <Field id="fAddr" label="Street address" full error={errors.address} message="Add the service address.">
          <input {...inputProps("address", "fAddr")} autoComplete="street-address" />
        </Field>
      </form>
      <p className="consent">
        By booking, you agree to receive texts about your appointment. Message rates may apply.
      </p>
    </>
  );
}
