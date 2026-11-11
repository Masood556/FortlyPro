import Image from "next/image";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COMPARE_IMAGES, GALLERY_GROUPS } from "@/lib/data/gallery";
import { ReviewsBlock } from "@/components/sections/ReviewsBlock";
import type { GalleryPhoto } from "@/types";

function PhotoCard({ photo }: { photo: GalleryPhoto }) {
  return (
    <figure className="shot">
      <div className="ph">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 700px) 100vw, 360px"
          loading="lazy"
        />
        <span className={photo.stage === "Before" ? "st" : "st mid"}>
          {photo.stage === "Mid-clean" ? "Mid‑clean" : photo.stage}
        </span>
      </div>
      <figcaption>
        <b>{photo.title}</b>
        {photo.caption}
      </figcaption>
    </figure>
  );
}

/** Dark "results" band: before/after slider, photo groups, then customer reviews. */
export function ResultsSection() {
  return (
    <section className="band deep" id="results" aria-labelledby="h-results">
      <div className="wrap">
        <SectionHeader
          headingId="h-results"
          light
          eyebrow="Before & after"
          eyebrowLong=" · Real Austin homes"
          title="The buildup is real. So are the results."
          lede="Unretouched photos from real Austin cleanings."
        />
        <BeforeAfterSlider
          before={COMPARE_IMAGES.before}
          after={COMPARE_IMAGES.after}
          caption={"Top‑load washer rim, before and after."}
        />

        <div className="pgroups rv">
          {GALLERY_GROUPS.map((group) => (
            <div className="pgrp" key={group.label}>
              <h3 className="plbl">{group.label}</h3>
              <div className="pgrid">
                {group.photos.map((photo) => (
                  <PhotoCard key={photo.src} photo={photo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewsBlock />
    </section>
  );
}
