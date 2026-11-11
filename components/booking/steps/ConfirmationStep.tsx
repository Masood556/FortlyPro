"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import {
  BUNDLES,
  formatArrivalWindow,
  formatShortDate,
  orderedApplianceNames,
} from "@/lib/booking";
import { buildIcs, downloadIcs } from "@/lib/calendar";
import { BOOKING_API_CONNECTED } from "@/lib/config";

/**
 * Step 5: booking summary. While no booking API is connected this is labelled
 * as a demo so nobody is told a visit was actually scheduled.
 */
export function ConfirmationStep() {
  const { state, bundle, restart } = useBooking();
  const { details, date, slotIndex } = state;
  if (!details || !date || slotIndex === null || !bundle.ok) return null;

  const plan = BUNDLES[bundle.key];
  const rows: [string, string][] = [
    ["When", `${formatShortDate(date)} · arrival ${formatArrivalWindow(slotIndex)}`],
    ["Where", `${details.address}, ${state.area} ${state.zip}`],
    ["Appliances", orderedApplianceNames(state.appliances).join(", ")],
    ["Bundle", `${plan.name} · $${plan.price}${plan.unit ?? ""}`],
    ["Due today", "$0"],
  ];

  return (
    <div className="done">
      <div className="tick">
        <svg viewBox="0 0 36 36">
          <path d="M9 18.5l6 6 12-13" />
        </svg>
      </div>
      <h3>{BOOKING_API_CONNECTED ? "You’re booked." : "Booking summary ready."}</h3>
      <p className="sub">
        {BOOKING_API_CONNECTED
          ? `Confirmation is on its way to ${details.phone}.`
          : "Demo only: online booking isn’t connected yet, so nothing was submitted and no text was sent."}
      </p>
      <dl className="receipt">
        {rows.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="acts">
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => downloadIcs(buildIcs(date, slotIndex, details.address, String(Date.now())))}
        >
          Add to calendar
        </button>
        <button className="btn btn-primary" type="button" onClick={restart}>
          Done
        </button>
      </div>
    </div>
  );
}
