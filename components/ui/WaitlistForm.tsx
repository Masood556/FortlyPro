"use client";

import { useState, type FormEvent } from "react";
import { BOOKING_API_CONNECTED } from "@/lib/config";
import { isValidPhone } from "@/lib/validation";

interface WaitlistFormProps {
  /** Market slug; sent as the `market_interest` field (lead source/tag). */
  market: string;
  /** DOM id of the phone input, so pricing CTAs can focus it. */
  inputId: string;
}

type Status = "idle" | "invalid" | "done";

/**
 * Waitlist capture for markets that are not live yet. No lead-capture backend is
 * connected, so a valid number only produces a local, clearly labelled message.
 */
export function WaitlistForm({ market, inputId }: WaitlistFormProps) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidPhone(phone)) {
      setStatus("invalid");
      return;
    }
    setStatus("done");
    setPhone("");
  };

  const message =
    status === "invalid"
      ? "Enter a mobile number."
      : status === "done"
        ? BOOKING_API_CONNECTED
          ? "You're on the list. We'll text you when booking opens."
          : "Demo only: the waitlist isn’t connected yet, so nothing was saved and no text will be sent."
        : "";

  return (
    <>
      <form className="midcap-f waitcap" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="market_interest" value={market} />
        <label className="sr" htmlFor={inputId}>
          Mobile number
        </label>
        <input
          id={inputId}
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
          Join the waitlist
        </button>
      </form>
      <p
        className={status === "invalid" ? "zipmsg no" : status === "done" ? "zipmsg ok" : "zipmsg"}
        aria-live="polite"
      >
        {message}
      </p>
      <p className="consent light">
        By submitting, you agree to receive texts from FortlyPro. Reply STOP to opt out.
      </p>
    </>
  );
}
