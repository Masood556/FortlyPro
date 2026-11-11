import { BundleButton } from "@/components/sections/pricing/BundleButton";
import { PRICES, formatPrice } from "@/lib/config";

const CLUB_POINTS = [
  "Washer · Dryer · Dishwasher · Disposal, every visit",
  "Two cleanings a year minimum",
  "Paid after each cleaning, nothing upfront",
  "Within 15 min of your booked time · about 2 hours",
];

/** The Club offer card shown in the Offers hero. Prices come from the shared config. */
export function OfferCard({ idPrefix = "" }: { idPrefix?: string }) {
  return (
    <div className="offer-card" id={`${idPrefix}club`}>
      <span className="badge">
        Members save <span>{formatPrice(PRICES.clubSaving)}</span> a visit · Best for families
      </span>
      <b>The Club</b>
      <span className="csub">All four appliances, twice a year.</span>
      <div className="cprice">
        <s>{formatPrice(PRICES.full)}</s>
        <b>{formatPrice(PRICES.club)}</b>
        <span>/ visit</span>
      </div>
      <ul>
        {CLUB_POINTS.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <BundleButton bundle="club">Join The Club</BundleButton>
    </div>
  );
}
