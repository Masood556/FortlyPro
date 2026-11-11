import type { ReactNode } from "react";

interface ReferralSectionProps {
  idPrefix?: string;
  eyebrow: string;
  title: string;
  lede: string;
  perks: string[];
  icons: readonly string[];
  /** The referral signup form. */
  form: ReactNode;
}

/** Realtor referral-program band: what you get on the left, the signup form on the right. */
export function ReferralSection({ idPrefix = "", eyebrow, title, lede, perks, icons, form }: ReferralSectionProps) {
  return (
    <section className="band alt" id={`${idPrefix}referral`} aria-labelledby={`${idPrefix}h-ref`}>
      <div className="wrap contact-grid">
        <div className="rv">
          <p className="eyebrow left">{eyebrow}</p>
          <h2 className="h2 sm" id={`${idPrefix}h-ref`}>
            {title}
          </h2>
          <p className="lede">{lede}</p>
          <ul className="trustlist perks">
            {perks.map((perk, index) => (
              <li key={perk}>
                <i dangerouslySetInnerHTML={{ __html: icons[index] }} />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="formcol">{form}</div>
      </div>
    </section>
  );
}
