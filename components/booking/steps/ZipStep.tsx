"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { NoticeOkIcon, NoticeWarnIcon } from "@/components/ui/Icons";
import { BOOKING_API_CONNECTED } from "@/lib/config";
import { prefersReducedMotion } from "@/lib/scroll";
import { isValidEmail } from "@/lib/validation";
import { checkZip, sanitizeZipInput } from "@/lib/zip";
import type { ZipNotice } from "@/types";

const ADVANCE_DELAY_MS = 550;

/** Waitlist capture for uncovered zips. No backend yet, so it only confirms locally. */
function WaitlistForm({ zip }: { zip: string }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValidEmail(email)) setJoined(true);
    else inputRef.current?.focus();
  };

  if (joined) {
    return (
      <p style={{ margin: "10px 0 0" }}>
        {BOOKING_API_CONNECTED
          ? `You're on the list for ${zip}.`
          : `Demo only: nothing was saved for ${zip} because the waitlist isn’t connected yet.`}
      </p>
    );
  }

  return (
    <form className="wl" onSubmit={handleSubmit} noValidate>
      <input
        ref={inputRef}
        type="email"
        placeholder="you@email.com"
        aria-label="Email for waitlist"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="btn btn-primary btn-sm" type="submit">
        Join waitlist
      </button>
    </form>
  );
}

function NoticeBody({ notice }: { notice: ZipNotice }) {
  switch (notice.kind) {
    case "covered":
      return (
        <>
          <NoticeOkIcon />
          <div>
            <b>{notice.area} is covered.</b> Next, choose your appliances.
          </div>
        </>
      );
    case "bundle":
      return (
        <>
          <NoticeOkIcon />
          <div>
            <b>{notice.name} selected.</b> First, let&apos;s confirm your zip code.
          </div>
        </>
      );
    case "bad":
      return (
        <>
          <NoticeWarnIcon />
          <div>Enter a 5&#8209;digit zip code.</div>
        </>
      );
    case "uncovered":
      return (
        <>
          <NoticeWarnIcon />
          <div>
            <b>We&apos;re not in {notice.zip} yet.</b> Leave your email and we&apos;ll tell you the
            moment we are.
            <WaitlistForm key={notice.zip} zip={notice.zip} />
          </div>
        </>
      );
  }
}

/** Step 1: zip verification against the (mock) coverage table. */
export function ZipStep() {
  const { state, zipCovered, zipRejected, goTo, zipFocusRequest } = useBooking();
  const [value, setValue] = useState(state.zip ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>(0);

  // A covered zip entered elsewhere on the page (hero, areas, final CTA) mirrors here.
  const [seenZip, setSeenZip] = useState(state.zip);
  if (state.zip !== seenZip) {
    setSeenZip(state.zip);
    if (state.zip) setValue(state.zip);
  }

  useEffect(() => {
    if (zipFocusRequest > 0) inputRef.current?.focus({ preventScroll: true });
  }, [zipFocusRequest]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = checkZip(value);
    if (result.state === "bad") {
      zipRejected({ kind: "bad" });
      inputRef.current?.focus();
    } else if (result.state === "no") {
      zipRejected({ kind: "uncovered", zip: result.zip });
    } else {
      zipCovered(result.zip, result.area, false);
      timerRef.current = window.setTimeout(
        () => goTo(2),
        prefersReducedMotion() ? 0 : ADVANCE_DELAY_MS,
      );
    }
  };

  const notice = state.notice;
  const noticeTone = notice?.kind === "covered" || notice?.kind === "bundle" ? "ok" : "no";

  return (
    <>
      <h3>Where are we cleaning?</h3>
      <p className="sub">We&apos;ll confirm your area instantly.</p>
      <form className="bigzip" onSubmit={handleSubmit} noValidate>
        <label className="sr" htmlFor="wZip">
          Zip code
        </label>
        <input
          ref={inputRef}
          id="wZip"
          value={value}
          onChange={(event) => setValue(sanitizeZipInput(event.target.value))}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Zip code"
        />
        <button className="btn btn-primary" type="submit">
          See times
        </button>
      </form>
      <div className={notice ? `notice show ${noticeTone}` : "notice"} role="status">
        {notice && <NoticeBody notice={notice} />}
      </div>
      <p className="ziplist">
        Serving Greater Austin (some areas coming soon) · <a href="#areas">All areas →</a>
      </p>
    </>
  );
}
