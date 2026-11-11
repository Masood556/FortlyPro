"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useAttribution } from "@/hooks/useAttribution";
import { BOOKING_API_CONNECTED, SITE } from "@/lib/config";
import { submitLead, type LeadKind } from "@/lib/lead-submission";
import { isValidEmail, isValidName, isValidPhone } from "@/lib/validation";

export interface LeadField {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "select";
  options?: string[];
  autoComplete?: string;
  /** Full-width cell in the two-column grid. */
  full?: boolean;
  /** Validated and flagged when empty/invalid. */
  required?: boolean;
  /** Inline error text; defaults depend on the type. */
  errorMessage?: string;
}

export interface LeadChecks {
  legend: string;
  /** Submitted field name for the selected values. */
  name: string;
  options: { label: string; defaultChecked?: boolean }[];
}

export interface LeadFormProps {
  kind: LeadKind;
  /** Hidden `booked_by` attribution value. */
  bookedBy: string;
  fields: LeadField[];
  checks?: LeadChecks;
  /** Extra class on the card, e.g. "multi" or "partner". */
  variant?: string;
  /** DOM id of the card (the reference's #quote / #partner anchors). */
  cardId: string;
  eyebrow?: string;
  heading: string;
  sub: string;
  submitLabel: string;
  consent: string;
  /** Show the "Or email ..." line (booking/quote forms). */
  showEmailAlternative?: boolean;
  /** Shown after a valid submit when the lead endpoint is connected. */
  success: { title: string; message: string };
  /** Honest title/message used while no lead endpoint is connected. */
  demoSuccess: { title: string; message: string };
  /** Where the heading/sub/consent live: partner cards keep them outside the <form>. */
  headingOutsideForm?: boolean;
}

const HIDDEN_KEYS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
  "gclid",
  "landing_page",
] as const;

const DEFAULT_ERRORS = {
  text: "This field is required.",
  tel: "Enter a 10‑digit number.",
  email: "Enter a valid email.",
} as const;

function isFieldValid(field: LeadField, value: string) {
  if (!field.required) return true;
  if (field.type === "tel") return isValidPhone(value);
  if (field.type === "email") return isValidEmail(value);
  if (field.type === "select") return value.length > 0;
  return isValidName(value);
}

/**
 * Reusable audience lead form (host inquiry, property-manager quote, realtor booking and
 * referral). Validates on the client, sends attribution as hidden fields and posts through
 * `submitLead`. It never reports success as "sent" unless that integration confirms it.
 */
export function LeadForm({
  kind,
  bookedBy,
  fields,
  checks,
  variant,
  cardId,
  eyebrow,
  heading,
  sub,
  submitLabel,
  consent,
  showEmailAlternative,
  success,
  demoSuccess,
  headingOutsideForm,
}: LeadFormProps) {
  const uid = useId();
  const attribution = useAttribution();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, field.type === "select" ? (field.options?.[0] ?? "") : ""])),
  );
  const [selected, setSelected] = useState<string[]>(() =>
    (checks?.options ?? []).filter((option) => option.defaultChecked).map((option) => option.label),
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "failed">("idle");
  const [done, setDone] = useState<"sent" | "demo" | null>(null);
  const [failure, setFailure] = useState("");

  const fieldId = (name: string) => `${uid}-${name}`;

  const toggleOption = (label: string) =>
    setSelected((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "submitting" || status === "done") return;

    const nextErrors = Object.fromEntries(
      fields.map((field) => [field.name, !isFieldValid(field, values[field.name] ?? "")]),
    );
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      const firstInvalid = fields.find((field) => nextErrors[field.name]);
      if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid.name))}`)?.focus();
      return;
    }

    setStatus("submitting");
    setFailure("");
    const payload = {
      ...values,
      ...(checks ? { [checks.name]: selected } : {}),
      booked_by: bookedBy,
      ...Object.fromEntries(HIDDEN_KEYS.map((key) => [key, attribution[key] ?? ""])),
    };
    const result = await submitLead({ kind, fields: payload });

    if (result.status === "error") {
      setStatus("failed");
      setFailure(result.message);
      return;
    }
    setStatus("done");
    setDone(result.status === "sent" ? "sent" : "demo");
  };

  const copy = done === "sent" || BOOKING_API_CONNECTED ? success : demoSuccess;
  const className = ["quote", "rv", "d1", variant, done && "is-sent"].filter(Boolean).join(" ");

  const headingBlock = (
    <>
      {eyebrow && <p className="eyebrow light left">{eyebrow}</p>}
      <h3>{heading}</h3>
      <p className="sub">{sub}</p>
    </>
  );

  const formBody = (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {HIDDEN_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={attribution[key] ?? ""} readOnly />
      ))}
      <input type="hidden" name="booked_by" value={bookedBy} readOnly />
      {!headingOutsideForm && headingBlock}
      <div className="fields">
        {fields.map((field) => {
          const id = fieldId(field.name);
          const invalid = errors[field.name];
          const className = ["field", field.full && "full", invalid && "err"].filter(Boolean).join(" ");
          return (
            <div key={field.name} className={className}>
              <label htmlFor={id}>{field.label}</label>
              {field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  value={values[field.name]}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                >
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  inputMode={field.type === "tel" ? "tel" : undefined}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  value={values[field.name]}
                  aria-invalid={invalid || undefined}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, [field.name]: event.target.value }));
                    if (invalid) setErrors((current) => ({ ...current, [field.name]: false }));
                  }}
                />
              )}
              {field.required && (
                <span className="e">{field.errorMessage ?? DEFAULT_ERRORS[field.type === "select" ? "text" : (field.type ?? "text")]}</span>
              )}
            </div>
          );
        })}
        {checks && (
          <div className="field full">
            <label>{checks.legend}</label>
            <div className="checks">
              {checks.options.map((option) => (
                <label key={option.label}>
                  <input
                    type="checkbox"
                    name={checks.name}
                    value={option.label}
                    checked={selected.includes(option.label)}
                    onChange={() => toggleOption(option.label)}
                  />{" "}
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      {failure && (
        <p className="zipmsg no" role="alert">
          {failure}
        </p>
      )}
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "submitting" || status === "done"}
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
      {!headingOutsideForm && <p className="consent">{consent}</p>}
      {showEmailAlternative && (
        <p className="alt">
          Or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      )}
    </form>
  );

  return (
    <div className={className} id={cardId}>
      {headingOutsideForm && headingBlock}
      {formBody}
      {headingOutsideForm && <p className="consent">{consent}</p>}
      <div className="sent" role="status">
        <div className="done">
          <div className="tick">
            <svg viewBox="0 0 36 36" style={{ animation: "draw .6s .15s var(--ease) forwards" }}>
              <path d="M9 18.5l6 6 12-13" />
            </svg>
          </div>
        </div>
        <h3>{copy.title}</h3>
        <p className="sub" style={{ margin: "6px 0 0" }}>
          {copy.message}
        </p>
      </div>
    </div>
  );
}

