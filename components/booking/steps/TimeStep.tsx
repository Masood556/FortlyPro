"use client";

import { useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import {
  TIME_SLOTS,
  buildDateOptions,
  formatArrivalWindow,
  formatTime,
  isSlotOpen,
} from "@/lib/booking";

/** Step 3: date and arrival-time selection (mock availability). */
export function TimeStep() {
  const { state, selectDate, selectSlot } = useBooking();
  // Lazy initializer: only runs in the browser, after the visitor reaches this step.
  const [dates] = useState(() => buildDateOptions(new Date()));

  const arriveText = () => {
    if (state.slotIndex !== null) {
      return (
        <>
          Arrival <b>{formatArrivalWindow(state.slotIndex)}</b> · about 2 hours on site.
        </>
      );
    }
    return state.date ? "Pick an arrival time." : "Choose a day to see open arrival times.";
  };

  return (
    <>
      <h3>Pick a time.</h3>
      <p className="sub">Weekdays 8am–5pm. Weekends by request.</p>
      <div className="dates" role="group" aria-label="Date">
        {dates.map((date) => (
          <button
            key={date.iso}
            className="date"
            type="button"
            disabled={date.byRequest}
            aria-pressed={state.date === date.iso}
            aria-label={`${date.weekdayLong}, ${date.monthLong} ${date.day}${date.byRequest ? ", by request only" : ""}`}
            onClick={() => selectDate(date.iso)}
          >
            <small>{date.weekdayShort}</small>
            <b>{date.day}</b>
            <em>{date.byRequest ? "By request" : date.monthShort}</em>
          </button>
        ))}
      </div>
      <div className="slots" role="group" aria-label="Arrival time">
        {state.date &&
          TIME_SLOTS.map(([hour, minute], index) => {
            const open = isSlotOpen(state.date as string, index);
            const label = formatTime(hour, minute);
            return (
              <button
                key={label}
                className="slot"
                type="button"
                disabled={!open}
                aria-pressed={state.slotIndex === index}
                aria-label={open ? undefined : `${label}, booked`}
                onClick={() => selectSlot(index)}
              >
                {label}
              </button>
            );
          })}
      </div>
      <p className="arrive" aria-live="polite">
        {arriveText()}
      </p>
    </>
  );
}
