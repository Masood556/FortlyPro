import Link from "next/link";
import type { ReactNode } from "react";
import { PlanCard } from "@/components/sections/pricing/PlanCard";
import { BundleButton } from "@/components/sections/pricing/BundleButton";
import { ComingSoonRow } from "@/components/sections/pricing/ComingSoonRow";
import { TrustStrip } from "@/components/sections/pricing/TrustStrip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRICES, SITE, formatPrice } from "@/lib/config";

export interface PricingHeaderContent {
  eyebrow: string;
  eyebrowLong?: string;
  title: ReactNode;
  lede: ReactNode;
}

const HOME_PRICING_HEADER: PricingHeaderContent = {
  eyebrow: "Pricing",
  eyebrowLong: " · Appliance deep cleaning, Austin, TX",
  title: (
    <>
      Simple, bundled pricing. <span className="chip-lime">from {formatPrice(PRICES.starter)}</span>
    </>
  ),
  lede: (
    <>
      Replacing a washer runs {SITE.replacementCost}. Purifying it starts at{" "}
      {formatPrice(PRICES.starter)}.
    </>
  ),
};

interface PricingSectionProps {
  header?: PricingHeaderContent;
  /** Label of the property-manager card button. */
  propertyManagerLabel?: string;
  /** Prefix for ids so pages that Next.js keeps mounted (hidden) do not share ids. */
  idPrefix?: string;
  /** Destination of the property-manager card button. */
  propertyManagerHref?: string;
  /** Show the "Coming soon" appliance tiles under the trust strip. */
  showComingSoon?: boolean;
  /** Show the owner-operated / insured trust strip under the plans. */
  showTrustStrip?: boolean;
}

/** Header used on pages that present the three bundles on their own (pricing + appliance pages). */
export function bundlePricingHeader(title: ReactNode, lede: ReactNode): PricingHeaderContent {
  return {
    eyebrow: "Three bundles",
    eyebrowLong: " · One visit · Paid after cleaning",
    title,
    lede,
  };
}

export function PricingSection({
  header = HOME_PRICING_HEADER,
  propertyManagerLabel = "Property managers →",
  idPrefix = "",
  propertyManagerHref = "/#managers",
  showComingSoon = true,
  showTrustStrip = true,
}: PricingSectionProps) {
  return (
    <section className="band" id={`${idPrefix}pricing`} aria-labelledby={`${idPrefix}h-pricing`}>
      <div className="wrap">
        <SectionHeader
          headingId={`${idPrefix}h-pricing`}
          eyebrow={header.eyebrow}
          eyebrowLong={header.eyebrowLong}
          title={header.title}
          lede={header.lede}
        />

        <div className="plans">
          <PlanCard
            bundle="starter"
            name="Starter Bundle"
            countLabel="2 appliances"
            price={PRICES.starter}
            was={PRICES.starterWas}
            features={[
              { lead: "Laundry pair", text: "Washer + Dryer" },
              { lead: "Kitchen pair", text: "Dishwasher + Disposal", alternative: true },
            ]}
            strip={{ icon: "→", content: "Pick your kitchen or laundry pair" }}
          />
          <PlanCard
            bundle="pro"
            name="Pro Bundle"
            countLabel="3 appliances"
            price={PRICES.pro}
            badge="Most popular first visit"
            recommended
            delay={1}
            features={[
              { text: "Mix & match any three appliances" },
              { text: "Any combination, one visit" },
            ]}
            strip={{
              icon: "+",
              content: <>Add the fourth for just {formatPrice(PRICES.fullMinusPro)} more</>,
            }}
          />
          <PlanCard
            bundle="complete"
            name="Full Bundle"
            countLabel="4 appliances"
            price={PRICES.full}
            was={PRICES.fullWas}
            delay={2}
            features={[
              { text: "Dishwasher + Disposal" },
              { text: "Washer + Dryer" },
            ]}
            strip={{
              icon: "★",
              content: (
                <a href={`#${idPrefix}club`}>Join The Club and save {formatPrice(PRICES.clubSaving)} a visit</a>
              ),
            }}
          />
        </div>

        <div className="duo">
          <div className="club rv" id={`${idPrefix}club`}>
            <span className="badge">
              Members save {formatPrice(PRICES.clubSaving)} a visit · Best for families
            </span>
            <div className="ct">
              <b>The Club</b>
              <span className="csub">All four appliances, twice a year.</span>
              <p>
                Two cleanings a year minimum. {formatPrice(PRICES.club)} per visit, paid after
                cleaning.
              </p>
            </div>
            <div className="cprice">
              <s>{formatPrice(PRICES.full)}</s>
              <b>{formatPrice(PRICES.club)}</b>
              <span>/ visit</span>
            </div>
            <BundleButton bundle="club">Join The Club</BundleButton>
          </div>
          <div className="pmbox rv d1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 21V5a1 1 0 011-1h9a1 1 0 011 1v16M14 9h6a1 1 0 011 1v11M7 8h3M7 12h3M7 16h3M17 13h2M17 17h2M3 21h18" />
            </svg>
            <div className="ct">
              <b>Property managers &amp; hosts</b>
              <p>Turnover and retention programs for apartments, rentals and Airbnbs.</p>
            </div>
            <Link className="btn btn-ghost" href={propertyManagerHref}>
              {propertyManagerLabel}
            </Link>
          </div>
        </div>

        {showTrustStrip && <TrustStrip />}
        {showComingSoon && <ComingSoonRow />}
      </div>
    </section>
  );
}
