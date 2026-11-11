import Link from "next/link";
import type { ReactNode } from "react";
import { ChatIcon, PhoneIcon } from "@/components/ui/Icons";
import { ZipCheckForm } from "@/components/ui/ZipCheckForm";
import { SITE } from "@/lib/config";
import { COMMUNITIES } from "@/lib/data/zip-coverage";

interface AudienceContactSectionProps {
  /** Anchor id of the band (reference: #host-form / #realtor-form). */
  sectionId: string;
  idPrefix?: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Single-unit booking block (zip + call/text). Omitted on the realtor page. */
  singleUnit?: { smsBody: string };
  /** Icons for the three trust rows. */
  icons: readonly string[];
  /** Label above the communities list. */
  areasLabel?: string;
  /** The audience-specific inquiry form, rendered in the right column. */
  form: ReactNode;
}

/** "How it works" band: copy and trust rows on the left, the audience form on the right. */
export function AudienceContactSection({
  sectionId,
  idPrefix = "",
  eyebrow,
  title,
  lede,
  singleUnit,
  icons,
  areasLabel = "Where we go (some coming soon)",
  form,
}: AudienceContactSectionProps) {
  const trustRows: ReactNode[] = [
    <>
      <span>{SITE.hoursPhone.replace(/\.$/, "")}</span> · <span>{SITE.hoursVisitShort}</span>
    </>,
    "Greater Austin · 22 communities (some coming soon)",
    "Owner‑operated, Austin‑based",
  ];

  return (
    <section className="band" id={`${idPrefix}${sectionId}`} aria-labelledby={`${idPrefix}h-form`}>
      <div className="wrap contact-grid">
        <div className="rv">
          <p className="eyebrow left">{eyebrow}</p>
          <h2 className="h2 sm" id={`${idPrefix}h-form`}>
            {title}
          </h2>
          <p className="lede">{lede}</p>
          {singleUnit && (
            <div className="hostbook" id={`${idPrefix}book-one`}>
              <ZipCheckForm name="hosts" label="Zip code" />
              <div className="contact-row">
                <a className="btn btn-ghost" href={SITE.phoneHref}>
                  <PhoneIcon />
                  Call
                </a>
                <a
                  className="btn btn-ghost"
                  href={`${SITE.smsHref}?&body=${encodeURIComponent(singleUnit.smsBody)}`}
                >
                  <ChatIcon />
                  Text
                </a>
              </div>
            </div>
          )}
          <ul className="trustlist contact-trust">
            {trustRows.map((row, index) => (
              <li key={index}>
                <i dangerouslySetInnerHTML={{ __html: icons[index] }} />
                <span>{row}</span>
              </li>
            ))}
          </ul>
          <p className="townlbl ct-lbl">
            {areasLabel} · <Link href="/#areas">See the map →</Link>
          </p>
          <p className="townline" aria-label="Communities served">
            {COMMUNITIES.map((community, index) => (
              <span key={community}>
                {index > 0 && (
                  <>
                    {" "}
                    <i>·</i>{" "}
                  </>
                )}
                {community}
              </span>
            ))}
          </p>
        </div>
        <div className="formcol">{form}</div>
      </div>
    </section>
  );
}
