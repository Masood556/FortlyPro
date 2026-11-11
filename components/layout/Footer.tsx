import Link from "next/link";
import { SITE } from "@/lib/config";
import { FOOTER_COLUMNS, FOOTER_COMPANY_LINKS } from "@/lib/data/navigation";

/** `minimal` hides the link columns and keeps only the legal row (ad landing page). */
export function Footer({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className={minimal ? "footer-min" : undefined}>
      <div className="wrap">
        <div className="fgrid">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4>
                {column.heading}
                {column.note && (
                  <>
                    {" "}
                    <small>{column.note}</small>
                  </>
                )}
              </h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4>Company</h4>
            <ul>
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <span>{SITE.hoursPhoneShort}</span> · <span>{SITE.hoursVisitShort}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>
            &copy; 2026 FortlyPro. All rights reserved.
            <span className="fl">
              <a href="https://www.fortlypro.com/terms">Terms of Use</a>
              <a href="https://www.fortlypro.com/privacy-policy">Privacy Policy</a>
            </span>
          </span>
          <span className="concept">Last updated November 2026</span>
        </div>
      </div>
    </footer>
  );
}
