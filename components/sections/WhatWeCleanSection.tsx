import { ApplianceExplorer } from "@/components/sections/clean/ApplianceExplorer";
import { ArrowDown } from "@/components/ui/Icons";
import { ChecklistCallout } from "@/components/ui/ChecklistCallout";
import { Emphasis } from "@/components/ui/Emphasis";
import type { ApplianceId } from "@/types";

const SCOPE_ROWS = [
  {
    icon: "✓",
    title: "We purify every part you can reach through routine maintenance.",
    detail: "Filters, gaskets, drawers, housings.",
  },
  {
    icon: "✕",
    title: "We don't disassemble or repair.",
    detail: "That's an appliance repair company's job.",
  },
  {
    icon: "→",
    title: "Regular purification is the cheapest way to avoid that call.",
    detail: "Twice a year keeps ahead of the buildup.",
  },
];

export interface CleanHeaderContent {
  eyebrow: string;
  /** Extra eyebrow text hidden on small screens. */
  eyebrowLong?: string;
  title: string;
  /** Intro line; `**bold**` segments render as <b>. */
  instruction: string;
}

const ALL_APPLIANCES_EYEBROW = " · Washer · Dryer · Dishwasher · Disposal";

const HOME_CLEAN_HEADER: CleanHeaderContent = {
  eyebrow: "What we purify",
  eyebrowLong: ALL_APPLIANCES_EYEBROW,
  title: "Where the grime hides.",
  instruction: "The cause is buildup in parts you've never cleaned. **Pick an appliance** to see where.",
};

export const BUNDLE_CLEAN_HEADER: CleanHeaderContent = {
  eyebrow: "What every bundle includes",
  eyebrowLong: ALL_APPLIANCES_EYEBROW,
  title: "What you get for the price.",
  instruction: "Every part listed below is included in your bundle. **Pick an appliance** to see what we purify.",
};

interface WhatWeCleanSectionProps {
  header?: CleanHeaderContent;
  /** Show a single appliance (appliance pages) instead of the tabbed explorer. */
  appliance?: ApplianceId;
  /** Prefix for ids so pages that Next.js keeps mounted (hidden) do not share ids. */
  idPrefix?: string;
}

export function WhatWeCleanSection({ header = HOME_CLEAN_HEADER, appliance, idPrefix = "" }: WhatWeCleanSectionProps) {
  return (
    <section className="band alt" id={`${idPrefix}clean`} aria-labelledby={`${idPrefix}h-clean`}>
      <div className="wrap">
        <div className="head rv">
          <p className="eyebrow">
            {header.eyebrow}
            {header.eyebrowLong && <span className="long">{header.eyebrowLong}</span>}
          </p>
          <h2 className="h2" id={`${idPrefix}h-clean`}>
            {header.title}
          </h2>
          <p className="instr">
            <Emphasis text={header.instruction} /> <ArrowDown />
          </p>
        </div>

        <ApplianceExplorer appliance={appliance} />

        <div className="apart3 rv">
          <div className="apart-left navy">
            <p className="eyebrow left">The question we get most</p>
            <h3 className="apart-h">Do you take my appliance apart?</h3>
            <p className="apart-no">No.</p>
          </div>
          <ul className="apart-rows">
            {SCOPE_ROWS.map((row) => (
              <li key={row.title}>
                <i className="ic">{row.icon}</i>
                <div>
                  <b>{row.title}</b>
                  <span>{row.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ChecklistCallout title="Not ready yet? Text me the appliance checklist." />
      </div>
    </section>
  );
}
