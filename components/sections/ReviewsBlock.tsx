import { GoogleG, StarIcon, StarRating } from "@/components/ui/Icons";
import { SITE } from "@/lib/config";
import { REVIEWS } from "@/lib/data/reviews";

/** Customer testimonials (lives inside the dark results band, as in the reference). */
export function ReviewsBlock() {
  return (
    <div className="wrap">
      <div className="head rv revhead">
        <h2 className="h2 sm" id="h-reviews">
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
          <figure key={review.name} className={`review rv${index ? ` d${index}` : ""}`}>
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
