import Link from "next/link";
import { LOCATION_MAP_MARKUP } from "@/lib/data/location-map";
import { PRICES, formatPrice } from "@/lib/config";
import { mapViewBox, type LocationConfig } from "@/lib/data/locations";

interface LocalAreaSectionProps {
  location: LocationConfig;
  /** Prefix for ids so pages kept mounted by Next.js don't share ids. */
  idPrefix?: string;
}

/** "What's different here?": local paragraph, neighborhoods, nearby areas and the cropped map. */
export function LocalAreaSection({ location, idPrefix = "" }: LocalAreaSectionProps) {
  const isLive = location.launchState === "live";
  const pricingHref = `#${idPrefix}pricing`;

  return (
    <section className="band" id={`${idPrefix}local`} aria-labelledby={`${idPrefix}h-loc`}>
      <div className="wrap localgrid">
        <div className="rv">
          <p className="eyebrow left">{location.name}</p>
          <h2 className="h2 sm" id={`${idPrefix}h-loc`}>
            Appliance deep cleaning in {location.name}: what&apos;s different here?
          </h2>
          <p className="lede">
            {location.local}{" "}
            {isLive
              ? `FortlyPro purifies all four appliances in place, in about two hours, from ${formatPrice(PRICES.starter)}, nothing charged until the cleaning is done.`
              : `FortlyPro purifies all four appliances in place, in about two hours; ${location.name} booking opens soon, join the waitlist above.`}
          </p>
          <p className="townlbl ct-lbl">Neighborhoods we cover</p>
          <div className="related loc-hoods" aria-label="Neighborhoods">
            {location.neighborhoods.map((neighborhood) => (
              <a key={neighborhood} href={pricingHref}>
                {neighborhood}
              </a>
            ))}
          </div>
          <p className="related" aria-label="Nearby">
            <span>Nearby:</span>
            <span style={{ color: "var(--ink-2)" }}>{location.nearby}</span> ·{" "}
            <Link href="/#areas">Full service map</Link>
          </p>
        </div>
        <div className="rv">
          <div className="mapwrap locmap">
            <svg
              id={`${idPrefix}locmap`}
              viewBox={mapViewBox(location.map)}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={`Map of the FortlyPro service area around ${location.name}`}
              dangerouslySetInnerHTML={{ __html: LOCATION_MAP_MARKUP }}
            />
          </div>
          <p className="maplegend">
            {isLive ? "Blue = we come to you" : "Opening soon · join the waitlist"}
          </p>
        </div>
      </div>
    </section>
  );
}
