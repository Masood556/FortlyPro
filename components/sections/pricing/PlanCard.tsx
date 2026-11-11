import type { ReactNode } from "react";
import { BundleButton } from "@/components/sections/pricing/BundleButton";
import type { BundleKey } from "@/types";

export interface PlanFeature {
  /** Bold lead-in, e.g. "Laundry pair". */
  lead?: string;
  text: string;
  /** Renders the "or" divider before this item. */
  alternative?: boolean;
}

interface PlanCardProps {
  bundle: BundleKey;
  name: string;
  countLabel: string;
  price: number;
  was?: number;
  features: PlanFeature[];
  /** Footer line under the features (icon + text/link). */
  strip: { icon: string; content: ReactNode };
  badge?: string;
  recommended?: boolean;
  delay?: 1 | 2;
}

export function PlanCard({
  bundle,
  name,
  countLabel,
  price,
  was,
  features,
  strip,
  badge,
  recommended,
  delay,
}: PlanCardProps) {
  const className = ["plan", recommended && "pop", "rv", delay && `d${delay}`]
    .filter(Boolean)
    .join(" ");
  const hasAlternatives = features.some((feature) => feature.alternative);

  return (
    <article className={className}>
      {badge && <span className="badge">{badge}</span>}
      <div className="pname">{name}</div>
      <div className="pcount">
        <span className="cchip">{countLabel}</span>
      </div>
      <div className="price">
        <b>
          <sup>$</sup>
          {price}
        </b>
        {was && <s>${was}</s>}
      </div>
      <ul className={hasAlternatives ? "orlist" : undefined}>
        {features.map((feature) => (
          <li key={feature.text} className={feature.alternative ? "orli" : undefined}>
            {feature.alternative && <span className="or">or</span>}
            {feature.lead ? (
              <>
                <b>{feature.lead}</b> · {feature.text}
              </>
            ) : (
              feature.text
            )}
          </li>
        ))}
      </ul>
      <p className="strip">
        <i>{strip.icon}</i>
        {strip.content}
      </p>
      <BundleButton bundle={bundle} />
    </article>
  );
}
