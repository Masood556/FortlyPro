import { SERVICE_MAP_MARKUP } from "@/lib/data/service-map-markup";

/**
 * The location pages show the same Greater Austin map as the homepage, cropped
 * with a per-location viewBox. The homepage version ends with an in-SVG legend
 * pill; location pages use a caption below the map instead, so it is removed.
 */
const LEGEND_START = '<g><rect x="-64"';
const legendIndex = SERVICE_MAP_MARKUP.lastIndexOf(LEGEND_START);

export const LOCATION_MAP_MARKUP =
  legendIndex === -1 ? SERVICE_MAP_MARKUP : SERVICE_MAP_MARKUP.slice(0, legendIndex).trimEnd();
