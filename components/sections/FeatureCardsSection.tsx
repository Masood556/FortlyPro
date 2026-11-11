interface FeatureCard {
  /** Number or check mark shown in the round badge. */
  marker: string;
  title: string;
  body: string;
}

interface FeatureCardsSectionProps {
  sectionId: string;
  idPrefix?: string;
  eyebrow: string;
  title: string;
  cards: FeatureCard[];
  /** "story-grid" or "team-grid" (same two-column card grid, different semantic use). */
  gridClass: "story-grid" | "team-grid";
  /** Light-grey alternate band. */
  alt?: boolean;
}

/** Heading plus a two-column grid of numbered cards (offer reasons, founders' lessons, team standards). */
export function FeatureCardsSection({
  sectionId,
  idPrefix = "",
  eyebrow,
  title,
  cards,
  gridClass,
  alt,
}: FeatureCardsSectionProps) {
  const headingId = `${idPrefix}h-${sectionId}`;
  return (
    <section className={alt ? "band alt" : "band"} id={`${idPrefix}${sectionId}`} aria-labelledby={headingId}>
      <div className="wrap">
        <div className="head rv">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2" id={headingId}>
            {title}
          </h2>
        </div>
        <div className={`${gridClass} rv`}>
          {cards.map((card) => (
            <div className="scard" key={card.title}>
              <i>{card.marker}</i>
              <b>{card.title}</b>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
