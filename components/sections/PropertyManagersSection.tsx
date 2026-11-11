import type { ReactNode } from "react";
import { QuoteForm } from "@/components/sections/managers/QuoteForm";

const PROGRAMS: { title: string; detail: string; icon: ReactNode }[] = [
  {
    title: "Renter Turn‑Over Program",
    detail: "Every appliance purified between tenants, so move‑in day starts clean.",
    icon: (
      <>
        <path d="M4 20V8l8-5 8 5v12" />
        <path d="M9 20v-6h6v6" />
        <path d="M2 20h20" />
      </>
    ),
  },
  {
    title: "Renter Retention Program",
    detail: "Scheduled cleans that cut odor complaints and extend appliance life.",
    icon: (
      <>
        <path d="M20 12a8 8 0 11-2.3-5.6" />
        <path d="M20 4v4.5h-4.5" />
      </>
    ),
  },
  {
    title: "Airbnb & Short‑Term Rentals",
    detail: "Guest‑ready appliances that keep odors out of your reviews.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="17" rx="2" />
        <path d="M4 9h16M9 2v4M15 2v4" />
        <path d="M9 14.5l2 2 4-4.5" />
      </>
    ),
  },
];

export function PropertyManagersSection() {
  return (
    <section className="band" id="managers" aria-labelledby="h-pm">
      <div className="wrap pm">
        <div className="rv">
          <p className="eyebrow left">
            Property managers<span className="long"> and hosts</span>
          </p>
          <h2 className="h2 sm" id="h-pm">
            Fewer complaints. <span className="mute">Longer&#8209;lasting appliances.</span>
          </h2>
          <p className="lede">
            Reduce renter complaints and extend the lifetime of appliances. Vacant unit between
            tenants? We coordinate access with you directly.
          </p>
          <ul className="progs cards">
            {PROGRAMS.map((program) => (
              <li key={program.title}>
                <span className="pi">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {program.icon}
                  </svg>
                </span>
                <div>
                  <b>{program.title}</b>
                  <span>{program.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
