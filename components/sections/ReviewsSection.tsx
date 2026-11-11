import { ReviewsBlock } from "@/components/sections/ReviewsBlock";

/** Stand-alone dark reviews band (audience pages show reviews without the photo gallery). */
export function ReviewsSection({ idPrefix = "", sectionId = "results" }: { idPrefix?: string; sectionId?: string }) {
  return (
    <section className="band deep" id={`${idPrefix}${sectionId}`} aria-labelledby={`${idPrefix}h-reviews`}>
      <ReviewsBlock idPrefix={idPrefix} standalone />
    </section>
  );
}
