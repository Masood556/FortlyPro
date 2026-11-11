"use client";

import { useRef, useState, type FormEvent } from "react";
import { BOOKING_API_CONNECTED, SITE } from "@/lib/config";
import {
  hasErrors,
  validateQuoteRequest,
  type FieldErrors,
  type QuoteRequest,
} from "@/lib/validation";

const UNIT_RANGES = ["1–10", "11–50", "51–200", "200+"];
const EMPTY_QUOTE: QuoteRequest = { name: "", phone: "", units: UNIT_RANGES[0], email: "" };

type QuoteErrors = FieldErrors<"name" | "phone" | "email">;

/**
 * Property-manager quote request. Validates client-side; with no backend
 * connected, the success state says the request was not actually sent.
 */
export function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (key: keyof QuoteRequest, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== "units" && errors[key]) setErrors((current) => ({ ...current, [key]: false }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = validateQuoteRequest(values);
    setErrors(next);
    if (hasErrors(next)) {
      formRef.current?.querySelector<HTMLInputElement>(".field.err input")?.focus();
      return;
    }
    setSent(true);
  };

  const fieldClass = (base: string, error?: boolean) => (error ? `${base} err` : base);

  return (
    <div className={sent ? "quote rv d1 is-sent" : "quote rv d1"} id="quote">
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h3>Request a property quote</h3>
        <p className="sub">We&apos;ll reply within one business day.</p>
        <div className="fields">
          <div className={fieldClass("field full", errors.name)}>
            <label htmlFor="qName">Full name</label>
            <input
              id="qName"
              autoComplete="name"
              required
              value={values.name}
              aria-invalid={errors.name || undefined}
              onChange={(event) => update("name", event.target.value)}
            />
            <span className="e">Add your name.</span>
          </div>
          <div className={fieldClass("field", errors.phone)}>
            <label htmlFor="qPhone">Phone</label>
            <input
              id="qPhone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={values.phone}
              aria-invalid={errors.phone || undefined}
              onChange={(event) => update("phone", event.target.value)}
            />
            <span className="e">Enter a 10&#8209;digit number.</span>
          </div>
          <div className="field">
            <label htmlFor="qUnits">Units</label>
            <select
              id="qUnits"
              value={values.units}
              onChange={(event) => update("units", event.target.value)}
            >
              {UNIT_RANGES.map((range) => (
                <option key={range}>{range}</option>
              ))}
            </select>
          </div>
          <div className={fieldClass("field full", errors.email)}>
            <label htmlFor="qEmail">Email</label>
            <input
              id="qEmail"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              aria-invalid={errors.email || undefined}
              onChange={(event) => update("email", event.target.value)}
            />
            <span className="e">Enter a valid email.</span>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Request a quote
        </button>
        <p className="consent">By submitting, you agree to receive texts from FortlyPro.</p>
        <p className="alt">
          Or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </form>
      <div className="sent" role="status">
        <div className="done">
          <div className="tick">
            <svg viewBox="0 0 36 36" style={{ animation: "draw .6s .15s var(--ease) forwards" }}>
              <path d="M9 18.5l6 6 12-13" />
            </svg>
          </div>
        </div>
        <h3>{BOOKING_API_CONNECTED ? "Request received." : "Quote request ready."}</h3>
        <p className="sub" style={{ margin: "6px 0 0" }}>
          {BOOKING_API_CONNECTED
            ? "We'll be in touch within one business day."
            : `Demo only: quote requests aren’t connected yet, so nothing was sent. Email ${SITE.email} to reach us.`}
        </p>
      </div>
    </div>
  );
}
