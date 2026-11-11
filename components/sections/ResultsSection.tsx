import Image from "next/image";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COMPARE_IMAGES, GALLERY_GROUPS } from "@/lib/data/gallery";
import { ReviewsBlock } from "@/components/sections/ReviewsBlock";
import type { GalleryGroup, GalleryPhoto } from "@/types";

export function PhotoCard({ photo }: { photo: GalleryPhoto }) {
  const stageLabel = (
    <span className={photo.stage === "Before" ? "st" : "st mid"}>
      {photo.stage === "Mid-clean" ? "Mid‑clean" : photo.stage}
    </span>
  );

  return (
    <figure className="shot">
      {photo.src ? (
        <div className="ph">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 700px) 100vw, 360px"
            loading="lazy"
          />
          {stageLabel}
        </div>
      ) : (
        <div className="ph ph-empty" role="img" aria-label={photo.alt}>
          {stageLabel}
          <b>{photo.placeholder}</b>
        </div>
      )}
      <figcaption>
        <b>{photo.title}</b>
        {photo.caption}
      </figcaption>
    </figure>
  );
}

interface ResultsSectionProps {
  title?: string;
  /** Photo groups to show; defaults to all appliances (homepage). */
  groups?: GalleryGroup[];
  idPrefix?: string;
  /** Show the before/after slider above the photo groups. */
  showCompare?: boolean;
  /** Show the customer reviews under the photos. */
  showReviews?: boolean;
}

/** Dark "results" band: before/after slider, photo groups, then customer reviews. */
export function ResultsSection({
  title = "The buildup is real. So are the results.",
  groups = GALLERY_GROUPS,
  idPrefix = "",
  showCompare = true,
  showReviews = true,
}: ResultsSectionProps) {
  return (
    <section className="band deep" id={`${idPrefix}results`} aria-labelledby={`${idPrefix}h-results`}>
      <div className="wrap">
        <SectionHeader
          headingId={`${idPrefix}h-results`}
          light
          eyebrow="Before & after"
          eyebrowLong=" · Real Austin homes"
          title={title}
          lede="Unretouched photos from real Austin cleanings."
        />
        {showCompare && (
          <BeforeAfterSlider
          before={COMPARE_IMAGES.before}
          after={COMPARE_IMAGES.after}
          caption={"Top‑load washer rim, before and after."}
        />
        )}

        <div className="pgroups rv">
          {groups.map((group) => (
            <div className="pgrp" key={group.label}>
              <h3 className="plbl">{group.label}</h3>
              <div className="pgrid">
                {group.photos.map((photo) => (
                  <PhotoCard key={photo.src ?? photo.title} photo={photo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showReviews && <ReviewsBlock idPrefix={idPrefix} />}
    </section>
  );
}
