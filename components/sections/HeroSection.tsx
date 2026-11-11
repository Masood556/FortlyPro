import { ChevronRight, GoogleG, StarIcon } from "@/components/ui/Icons";
import { ZipCheckForm } from "@/components/ui/ZipCheckForm";
import { PRICES, SITE, formatPrice } from "@/lib/config";

/** Navy hero: headline, zip gate, trust pills and the steam-cleaning video slot. */
export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="h-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-h1">
            <span className="eyebrow light hero-eyebrow rv">{SITE.city}</span>
            <span className="h1 rv d1" id="h-hero">
              Your appliances are dirtier than you think.
            </span>
          </h1>
          <div className="hero-card rv d2">
            <p className="hero-cat">Appliance deep cleaning &amp; purification</p>
            <p className="hero-sub">
              <span className="apps">
                <em>washing machine</em> · <em>dryer</em> · <em>disposal</em> · <em>dishwasher</em>
              </span>
            </p>
          </div>
          <div className="hero-actions rv d3">
            <ZipCheckForm name="hero" inputId="heroZip" scrollOnCovered />
            <p className="hero-micro">
              <span className="d">
                Within 15 min of your booked time · About 2 hours · No charge until it&apos;s done
              </span>
              <span className="m">
                Within 15 min of your time · About 2 hrs · No charge until done
              </span>
            </p>
            <div className="pillrow">
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
              <a className="revlink pricelink" href="#pricing">
                From <span>{formatPrice(PRICES.starter)}</span> · See pricing <ChevronRight />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-media rv d2">
          <HeroVideoPlaceholder />
        </div>
      </div>
    </section>
  );
}

/**
 * The reference ships no video file: the steam-cleaning clip from fortlypro.com
 * still has to be supplied. Swap this for a <video poster=... /> once it exists.
 */
function HeroVideoPlaceholder() {
  return (
    <div className="hero-video">
      <div className="hv-ph" role="img" aria-label="Steam-cleaning video placeholder">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
        <span>Steam&#8209;cleaning video</span>
        <small>Poster: still of the tech steam&#8209;cleaning</small>
      </div>
    </div>
  );
}
