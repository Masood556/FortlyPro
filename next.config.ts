import type { NextConfig } from "next";
import { APPLIANCE_INFO, appliancePath } from "./lib/data/appliances";
import { SITE } from "./lib/config";
import { AUDIENCE_SLUGS, audiencePath } from "./lib/data/audience-routes";
import { LOCATIONS, locationPath } from "./lib/data/locations";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  /**
   * The location, appliance and audience pages live under /location, /application and /audience.
   * Redirect the earlier top-level URLs so old links and bookmarks keep working.
   */
  async redirects() {
    const moved = [
      ...LOCATIONS.map((location) => ({ slug: location.slug, to: locationPath(location.slug) })),
      ...AUDIENCE_SLUGS.map((slug) => ({ slug, to: audiencePath(slug) })),
      ...Object.values(APPLIANCE_INFO).map((appliance) => ({
        slug: appliance.slug,
        to: appliancePath(appliance.slug),
      })),
    ];
    return [
      ...moved.map(({ slug, to }) => ({ source: `/${slug}`, destination: to, permanent: false })),
      // The reference footer links /review: it is the Google "write a review" page.
      { source: "/review", destination: SITE.googleReviewsUrl, permanent: false },
      // FP-27: one canonical home URL. /home and the old /home- variant redirect permanently to /.
      { source: "/home", destination: "/", permanent: true },
      { source: "/home-", destination: "/", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
