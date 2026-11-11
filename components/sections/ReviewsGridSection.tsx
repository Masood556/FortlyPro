import { ReviewCard } from "@/components/sections/ReviewsBlock";
import { GoogleG, StarIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/config";
import { REVIEWS } from "@/lib/data/reviews";

/**
 * The reference shows the same three placeholder reviews twice (six cards); the second row
 * repeats them until more real Google reviews are supplied.
 */
const GRID_REVIEWS = [...REVIEWS, ...REVIEWS];

/** Reviews page grid: the verified Google reviews, the Google badge and links out to Google. */
export function ReviewsGridSection({ idPrefix = "" }: { idPrefix?: string }) {
  return (
    <section className="band" id={`${idPrefix}reviews`} aria-labelledby={`${idPrefix}h-rv`}>
      <div className="wrap">
        <div className="head rv">
          <p className="eyebrow">What customers say</p>
          <h2 className="h2" id={`${idPrefix}h-rv`}>
            Straight from Google.
          </h2>
          <a className="gbadge dark" href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            <GoogleG />
            <StarIcon className="star1" />
            <b>5.0</b>
            <span>on Google</span>
          </a>
        </div>
        <div className="reviews rgrid rv">
          {GRID_REVIEWS.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} delay={index % REVIEWS.length} />
          ))}
        </div>
        <p className="reviews-foot">
          <a className="btn btn-primary" href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            Read all reviews on Google
          </a>{" "}
          {/* /review redirects to the Google reviews page (see next.config.ts). */}
          <a className="btn btn-ghost" href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            Leave a review
          </a>
        </p>
      </div>
    </section>
  );
}
