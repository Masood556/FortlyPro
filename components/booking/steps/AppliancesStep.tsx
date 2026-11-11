"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { BOOKING_TILES } from "@/lib/data/appliances";
import { BUNDLES, orderedApplianceNames } from "@/lib/booking";
import { PRICES, formatPrice } from "@/lib/config";
import type { ApplianceId } from "@/types";

const TILE_ICONS: Record<ApplianceId, ReactNode> = {
  washer: (
    <>
      <rect x="6" y="3" width="20" height="26" rx="3" />
      <path d="M6 9h20" />
      <circle cx="16" cy="18.5" r="6" />
      <circle cx="16" cy="18.5" r="3.2" opacity=".45" />
      <path d="M9.5 6h4" />
    </>
  ),
  dryer: (
    <>
      <rect x="6" y="3" width="20" height="26" rx="3" />
      <path d="M6 9h20" />
      <circle cx="16" cy="18.5" r="6" />
      <path d="M13.5 18.5c.8-1 1.7-1 2.5 0s1.7 1 2.5 0" opacity=".6" />
      <circle cx="22" cy="6" r="1" />
    </>
  ),
  dishwasher: (
    <>
      <rect x="6" y="3" width="20" height="26" rx="3" />
      <path d="M6 9h20" />
      <path d="M10 14h12M10 20h12" opacity=".6" />
      <path d="M12 14v3M16 14v3M20 14v3M12 20v3M16 20v3M20 20v3" opacity=".45" />
      <path d="M9.5 6h4" />
    </>
  ),
  disposal: (
    <>
      <path d="M3 8h26" />
      <path d="M7 8v4a4 4 0 004 4h10a4 4 0 004-4V8" />
      <rect x="12" y="16" width="8" height="9" rx="2" />
      <path d="M16 25v4" />
    </>
  ),
};

/** Step 2: appliance tiles plus the dynamic bundle/price summary. */
export function AppliancesStep() {
  const { state, bundle, toggleAppliance, setClub } = useBooking();
  const selected = bundle.ok ? BUNDLES[bundle.key] : null;

  return (
    <>
      <h3>What needs a deep clean?</h3>
      <p className="sub">Pick your appliances. We&apos;ll apply the best bundle.</p>
      <div className="tiles">
        {BOOKING_TILES.map((tile) => (
          <button
            key={tile.id}
            className="tile"
            type="button"
            aria-pressed={state.appliances.includes(tile.id)}
            onClick={() => toggleAppliance(tile.id)}
          >
            <svg className="ic" viewBox="0 0 32 32">
              {TILE_ICONS[tile.id]}
            </svg>
            <div>
              <b>{tile.label}</b>
              <span>{tile.detail}</span>
            </div>
            <i className="chk">
              <svg viewBox="0 0 16 16">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </i>
          </button>
        ))}
      </div>
      <div className={bundle.ok ? "bundle" : "bundle hint"} aria-live="polite">
        {bundle.ok && selected ? (
          <>
            <div className="row">
              <b>{selected.name}</b>
              <span className="amt">
                {selected.was && <s>${selected.was}</s>}${selected.price}
                <small style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-3)" }}>
                  {selected.unit}
                </small>
              </span>
            </div>
            <p>
              {bundle.description} · {orderedApplianceNames(state.appliances).join(", ")}
            </p>
            {state.appliances.length === 4 && (
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={state.club}
                  onChange={(event) => setClub(event.target.checked)}
                />
                <span className="sw" aria-hidden="true" />
                <span>
                  Make it recurring with <b style={{ fontSize: 15 }}>The Club</b> —{" "}
                  {formatPrice(PRICES.club)} per visit
                </span>
              </label>
            )}
          </>
        ) : (
          <p>{bundle.ok ? "" : bundle.message}</p>
        )}
      </div>
    </>
  );
}
