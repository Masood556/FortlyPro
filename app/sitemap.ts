import type { MetadataRoute } from "next";
import { APPLIANCE_PAGES } from "@/lib/data/appliance-pages";
import { AUDIENCE_SLUGS, audiencePath } from "@/lib/data/audience-routes";
import { LOCATIONS, locationPath } from "@/lib/data/locations";
import { TRUST_PAGES } from "@/lib/data/trust-pages";
import { absoluteUrl } from "@/lib/seo";
import { appliancePath } from "@/lib/data/appliances";

/**
 * FP-29: sitemap of the indexable pages. /book-cleaning is intentionally left out because it is
 * noindex. Submitting this sitemap in Google Search Console is a manual account task.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/pricing",
    ...APPLIANCE_PAGES.map((page) => appliancePath(page.slug)),
    ...LOCATIONS.map((location) => locationPath(location.slug)),
    ...AUDIENCE_SLUGS.map((slug) => audiencePath(slug)),
    ...Object.values(TRUST_PAGES).map((page) => `/${page.slug}`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
