import { ApplianceExplorer } from "@/components/sections/clean/ApplianceExplorer";
import { ArrowDown } from "@/components/ui/Icons";
import { ChecklistCallout } from "@/components/ui/ChecklistCallout";

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

export function WhatWeCleanSection() {
  return (
    <section className="band alt" id="clean" aria-labelledby="h-clean">
      <div className="wrap">
        <div className="head rv">
          <p className="eyebrow">
            What we purify
            <span className="long"> · Washer · Dryer · Dishwasher · Disposal</span>
          </p>
          <h2 className="h2" id="h-clean">
            Where the grime hides.
          </h2>
          <p className="instr">
            The cause is buildup in parts you&apos;ve never cleaned. <b>Pick an appliance</b> to see
            where. <ArrowDown />
          </p>
        </div>

        <ApplianceExplorer />

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
