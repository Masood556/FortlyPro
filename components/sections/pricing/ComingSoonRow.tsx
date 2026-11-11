import type { ReactNode } from "react";
import { SITE } from "@/lib/config";

const SOON_APPLIANCES: { label: string; icon: ReactNode }[] = [
  {
    label: "Oven",
    icon: (
      <>
        <rect x="8" y="6" width="32" height="36" rx="3" />
        <path d="M8 16h32M12 10h4M20 10h4M28 10h4" />
        <rect x="13" y="21" width="22" height="16" rx="2" />
        <path d="M17 29h14" />
      </>
    ),
  },
  {
    label: "Microwave",
    icon: (
      <>
        <rect x="5" y="12" width="38" height="24" rx="3" />
        <rect x="9" y="16" width="22" height="16" rx="2" />
        <path d="M36 18h2M36 23h2M36 28h2M14 24h12" />
      </>
    ),
  },
  {
    label: "Ice maker",
    icon: (
      <>
        <path d="M10 20h28l-3 20H13z" />
        <path d="M10 20a14 8 0 0128 0" />
        <circle cx="18" cy="14" r="2.5" />
        <circle cx="26" cy="12" r="2.5" />
        <circle cx="31" cy="16" r="2.5" />
      </>
    ),
  },
];

/** Unavailable appliances shown as disabled tiles with a "Coming soon" chip. */
export function ComingSoonRow() {
  return (
    <div className="soonrow rv">
      <p className="eyebrow">Coming soon</p>
      <div className="tiles-soon">
        {SOON_APPLIANCES.map((appliance) => (
          <div key={appliance.label} className="tile-soon" role="button" aria-disabled="true">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {appliance.icon}
            </svg>
            <b>{appliance.label}</b>
            <span className="schip">Coming soon</span>
          </div>
        ))}
      </div>
      <a className="btn btn-ghost" href={SITE.waitlistUrl}>
        Join the list
      </a>
    </div>
  );
}
