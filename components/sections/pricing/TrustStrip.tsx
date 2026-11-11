import type { ReactNode } from "react";

const TRUST_ITEMS: { label: string; icon: ReactNode }[] = [
  {
    label: "Owner‑operated",
    icon: <path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" />,
  },
  {
    label: "Background‑checked technicians",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-3.8 4-6 8-6s7.2 2.2 8 6" />
        <path d="M15.5 17.5l1.8 1.8 3.2-3.6" />
      </>
    ),
  },
  {
    label: "Fully insured",
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.6-3.4 8.4-8 9-4.6-.6-8-4.4-8-9V6z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    label: "Free rescheduling up to 24 hrs",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    label: "Not done right? We come back",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

export function TrustStrip() {
  return (
    <div className="trust rv">
      {TRUST_ITEMS.map((item) => (
        <span key={item.label}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {item.icon}
          </svg>
          {item.label}
        </span>
      ))}
    </div>
  );
}
