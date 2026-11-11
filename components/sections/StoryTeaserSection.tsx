import Link from "next/link";

/** Short "Our story" card linking to the full Our Story page. */
export function StoryTeaserSection({ idPrefix = "" }: { idPrefix?: string }) {
  return (
    <section className="band" id={`${idPrefix}story`} aria-labelledby={`${idPrefix}h-story`}>
      <div className="wrap">
        <div className="pcard story-card short rv">
          <p className="eyebrow left">Our story</p>
          <h2 className="h2 sm" id={`${idPrefix}h-story`}>
            It started with our own washer.
          </h2>
          <p className="story">
            We found grime and residue building up in our own appliances, couldn&apos;t find anyone to clean
            them properly, and learned to do it ourselves. The results were eye&#8209;opening, so we started
            helping our neighbors. Owner&#8209;operated, Austin&#8209;based, every tech
            background&#8209;checked and trained by us personally.
          </p>
          <Link className="btn btn-ghost" href="/our-story">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
