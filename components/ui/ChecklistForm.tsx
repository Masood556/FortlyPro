"use client";

import { useId, useState, type FormEvent } from "react";
import { BOOKING_API_CONNECTED } from "@/lib/config";
import { isValidPhone } from "@/lib/validation";

interface ChecklistFormProps {
  /** Called after a valid submission (e.g. to dismiss the slide-in). */
  onSubmitted?: () => void;
}

/**
 * "Text me the appliance checklist" form. No SMS backend is connected, so a
 * valid submission only shows a local confirmation.
 */
export function ChecklistForm({ onSubmitted }: ChecklistFormProps) {
  const fieldId = useId();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "done">("idle");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidPhone(phone)) {
      setStatus("invalid");
      return;
    }
    setStatus("done");
    onSubmitted?.();
  };

  if (status === "done") {
    return (
      <p className="zipmsg ok" role="status">
        {BOOKING_API_CONNECTED
          ? "Check your phone for the checklist."
          : "Demo only: no text was sent because messaging isn’t connected yet."}
      </p>
    );
  }

  return (
    <form className="midcap-f" onSubmit={handleSubmit} noValidate>
      <label className="sr" htmlFor={fieldId}>
        Mobile number
      </label>
      <input
        id={fieldId}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="Mobile number"
        value={phone}
        aria-invalid={status === "invalid"}
        onChange={(event) => {
          setPhone(event.target.value);
          if (status === "invalid") setStatus("idle");
        }}
      />
      <button className="btn btn-primary" type="submit">
        Text it to me
      </button>
      {status === "invalid" && (
        <p className="zipmsg no" role="alert">
          Enter a 10{"‑"}digit number.
        </p>
      )}
    </form>
  );
}
