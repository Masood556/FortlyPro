import type { ReactNode } from "react";
import { Emphasis } from "@/components/ui/Emphasis";
import { ChevronRight, GoogleG, StarIcon } from "@/components/ui/Icons";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { ZipCheckForm } from "@/components/ui/ZipCheckForm";
import { PRICES, SITE, formatPrice } from "@/lib/config";
import { HOME_HERO, type HeroContent } from "@/lib/data/hero";

interface HeroSectionProps {
  content?: HeroContent;
  /** Prefix for ids so pages that Next.js keeps mounted (hidden) do not share ids. */
  idPrefix?: string;
  /** Custom content for the right-hand media column (replaces cards / video placeholder). */
  media?: ReactNode;
}

/** Navy hero: headline, zip gate, trust pills and the steam-cleaning video slot. */
export function HeroSection({
  content = HOME_HERO,
  idPrefix = "",
  media,
}: HeroSectionProps) {
  const { card, subline, secondaryLink } = content;

  return (
    <section
      className={`hero ${content.sectionClass ?? ""}`.trim()}
      aria-labelledby={`${idPrefix}h-hero`}
    >
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-h1">
            <span className="eyebrow light hero-eyebrow rv">
              {content.eyebrow}
            </span>
            <span className="h1 rv d1" id={`${idPrefix}h-hero`}>
              {content.headline}
            </span>
            {subline && (
              <span className="hero-cat rv d2">
                <Emphasis text={subline.category} marker="*" as="span" />
              </span>
            )}
          </h1>
          {card && (
            <div className="hero-card rv d2">
              <p className="hero-cat">{card.category}</p>
              <p className="hero-sub">
                <span className="apps">
                  {card.apps.map((app, index) => (
                    <span key={app}>
                      {index > 0 && " · "}
                      <em>{app}</em>
                    </span>
                  ))}
                </span>
              </p>
            </div>
          )}
          {subline && (
            <p className="hero-sub rv d2">
              <span className="apps">
                <Emphasis text={subline.supporting} marker="*" as="em" />
              </span>
            </p>
          )}
          <div className="hero-actions rv d3">
            {content.waitlist ? (
              <WaitlistForm
                market={content.waitlist.market}
                inputId={content.waitlist.inputId}
              />
            ) : (
              <ZipCheckForm name="hero" scrollOnCovered buttonLabel={content.zipButtonLabel} />
            )}
            <p className="hero-micro">
              <span className="d">
                Within 15 min of your booked time · About 2 hours · No charge
                until it&apos;s done
              </span>
              <span className="m">
                Within 15 min of your time · About 2 hrs · No charge until done
              </span>
            </p>
            <div className="pillrow">
              {content.pills ? (
                content.pills.map((pill) => (
                  <a
                    key={pill.label}
                    className="revlink pricelink"
                    href={
                      pill.href.startsWith("#")
                        ? `#${idPrefix}${pill.href.slice(1)}`
                        : pill.href
                    }
                    {...(pill.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {pill.fromPrice && (
                      <>
                        From <span>{formatPrice(PRICES.starter)}</span> ·{" "}
                      </>
                    )}
                    {pill.label} <ChevronRight />
                  </a>
                ))
              ) : (
                <>
                  <a
                    className="revlink"
                    href={SITE.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GoogleG />
                    <StarIcon className="star1" />
                    <span>See our 5&#8209;star Google reviews</span>
                  </a>
                  <a
                    className="revlink pricelink"
                    href={
                      secondaryLink.href.startsWith("#")
                        ? `#${idPrefix}${secondaryLink.href.slice(1)}`
                        : secondaryLink.href
                    }
                  >
                    {secondaryLink.fromPrice && (
                      <>
                        From <span>{formatPrice(PRICES.starter)}</span> ·{" "}
                      </>
                    )}
                    {secondaryLink.label} <ChevronRight />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="hero-media rv d2">
          {media ? (
            media
          ) : content.mediaCards ? (
            <>
              <div className="ccards">
                {content.mediaCards.map((card) => (
                  <a
                    key={card.title}
                    className="ccard"
                    href={
                      card.href.startsWith("#")
                        ? `#${idPrefix}${card.href.slice(1)}`
                        : card.href
                    }
                  >
                    <i dangerouslySetInnerHTML={{ __html: card.icon }} />
                    <b>{card.title}</b>
                    <span>{card.detail}</span>
                    <small>
                      <Emphasis text={card.note} marker="*" as="span" />
                    </small>
                  </a>
                ))}
              </div>
              {content.mediaNote && (
                <p className="consent light">{content.mediaNote}</p>
              )}
            </>
          ) : (
            <HeroVideoPlaceholder caption={content.videoCaption} />
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * The reference ships no video file: the steam-cleaning clip from fortlypro.com
 * still has to be supplied. Swap this for a <video poster=... /> once it exists.
 */
function HeroVideoPlaceholder({ caption }: { caption: string }) {
  return (
    <div className="hero-video">
      <div
        className="hv-ph"
        role="img"
        aria-label="Steam-cleaning video placeholder"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
        <span>Steam&#8209;cleaning video</span>
        <small>{caption}</small>
      </div>
    </div>
  );
}
