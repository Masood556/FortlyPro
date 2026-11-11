import { BookingWidget } from "@/components/booking/BookingWidget";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TRUST_CHIPS = [
  "Owner‑operated",
  "Background‑checked techs",
  "Fully insured",
  "Within 15 min of your booked time",
  "Not done right? We come back",
];

export function BookingSection() {
  return (
    <section className="band alt" id="book" aria-labelledby="h-book">
      <div className="wrap book-one">
        <SectionHeader
          headingId="h-book"
          eyebrow="Book online"
          className="book-head"
          small
          title={
            <>
              Book online in 60 seconds. <span className="mute">No calls needed.</span>
            </>
          }
        />
        <BookingWidget />
        <ul className="trustchips" aria-label="Trust">
          {TRUST_CHIPS.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
