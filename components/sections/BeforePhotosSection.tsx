import { PhotoCard } from "@/components/sections/ResultsSection";
import { GALLERY_GROUPS } from "@/lib/data/gallery";

/** Two "before" photos (washer filter and gasket) on a dark band, as in the ad landing page. */
export function BeforePhotosSection({ idPrefix = "" }: { idPrefix?: string }) {
  const photos = GALLERY_GROUPS[0].photos.slice(0, 2);
  return (
    <section className="band deep" id={`${idPrefix}results`} aria-labelledby={`${idPrefix}h-before`}>
      <div className="wrap">
        <div className="head rv">
          <p className="eyebrow light">Real Austin homes</p>
          <h2 className="h2" id={`${idPrefix}h-before`}>
            This is what&apos;s in there.
          </h2>
        </div>
        <div className="pgroups rv">
          <div className="pgrp">
            <div className="pgrid two">
              {photos.map((photo) => (
                <PhotoCard key={photo.title} photo={photo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
