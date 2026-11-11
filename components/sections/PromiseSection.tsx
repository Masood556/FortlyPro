import Link from "next/link";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { BookNowButton } from "@/components/ui/BookNowButton";
import { SITE } from "@/lib/config";

const ABOUT_ROWS: [string, string][] = [
  ["Business", "FortlyPro, owner‑operated, founded in Austin, Texas"],
  [
    "What we do",
    "Steam deep cleaning and purification of washing machines, dryers, dishwashers and garbage disposals",
  ],
  [
    "Service area",
    "Greater Austin, 22 communities from Georgetown to Driftwood (some coming soon)",
  ],
  ["Hours", `${SITE.hoursPhone} ${SITE.hoursVisit} Book online any time.`],
  [
    "Our promise",
    "If it's not done right, we come back. Free rescheduling up to 24 hours before your visit.",
  ],
];

interface PromiseSectionProps {
  /** Audience pages show only the "about" card, without the founders' story card. */
  compact?: boolean;
  idPrefix?: string;
  /** Second button under the card (default: "Read our story"). */
  secondaryAction?: { label: string; href: string };
}

export function PromiseSection({
  compact = false,
  idPrefix = "",
  secondaryAction = { label: "Read our story", href: "/our-story" },
}: PromiseSectionProps) {
  return (
    <section
      className={compact ? "band promise story-promise" : "band promise"}
      aria-labelledby={`${idPrefix}h-promise`}
    >
      <div className="wrap">
        <div className="head rv">
          <p className="eyebrow">Our promise</p>
          <h2 className="h2" id={`${idPrefix}h-promise`}>
            <span>Keep it safe.</span> <span>Keep it clean.</span>{" "}
            <span className="mute">Keep it weird.</span>
          </h2>
        </div>
        <div className="promgrid rv">
          {!compact && (
            <div className="pcard story-card">
              <p className="story">
                FortlyPro started at home. We found grime and residue building
                up in our own appliances, couldn&apos;t find anyone to clean
                them properly, and learned to do it ourselves. The results were
                eye&#8209;opening, so we started helping our neighbors.
              </p>
              <div className="team">
                <div className="team-ph" aria-hidden="true">
                  <span>Photo: the founders</span>
                </div>
                <div>
                  <b>
                    Every FortlyPro tech is background&#8209;checked and trained
                    by us personally.
                  </b>
                  <span>Owner&#8209;operated, Austin&#8209;based.</span>
                </div>
              </div>
            </div>
          )}
          <div className="pcard about-card">
            <dl className="about" aria-label="About FortlyPro">
              {ABOUT_ROWS.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
            <div className="contact-row">
              <a className="btn btn-ghost" href={SITE.phoneHref}>
                <PhoneIcon />
                {SITE.phoneDisplay}
              </a>
              <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
                <MailIcon />
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
        <div className="acts rv">
          <BookNowButton />
          <Link className="btn btn-ghost" href={secondaryAction.href}>
            {secondaryAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
