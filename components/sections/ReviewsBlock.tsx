import { GoogleG, StarIcon, StarRating } from "@/components/ui/Icons";
import { SITE } from "@/lib/config";
import { REVIEWS } from "@/lib/data/reviews";
import type { Review } from "@/types";

/** Customer testimonials (lives inside the dark results band, as in the reference). */
/** One Google-review card (stars, quote, initials, name). */
export function ReviewCard({ review, delay = 0 }: { review: Review; delay?: number }) {
  return (
    <figure className={`review rv${delay ? ` d${delay}` : ""}`}>
      <StarRating />
      <q>{review.quote}</q>
      <figcaption className="who">
        <i>{review.initials}</i>
        <span>
          {review.name}
          <small>Google review</small>
        </span>
      </figcaption>
    </figure>
  );
}

interface ReviewsBlockProps {
  idPrefix?: string;
  /** Reviews are the first thing in their band (no gallery above), so skip the divider and top spacing. */
  standalone?: boolean;
}

export function ReviewsBlock({ idPrefix = "", standalone = false }: ReviewsBlockProps) {
  return (
    <div className="wrap">
      <div className={standalone ? "head rv" : "head rv revhead"}>
        <h2 className="h2 sm" id={`${idPrefix}h-reviews`}>
          Loved by Austin homeowners.
        </h2>
        <a className="gbadge" href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
          <GoogleG />
          <StarIcon className="star1" />
          <b>5.0</b>
          <span>on Google</span>
        </a>
      </div>
      <div className="reviews">
        {REVIEWS.map((review, index) => (
          <ReviewCard key={review.name} review={review} delay={index} />
        ))}
      </div>
      <p className="reviews-foot">
        <a className="btn btn-white" href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
          Read all reviews on Google
        </a>
      </p>
    </div>
  );
}
