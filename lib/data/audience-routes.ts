/**
 * Audience page routes. Kept free of other imports so next.config.ts can read it
 * (the config loader does not resolve the "@/" alias).
 */
export const AUDIENCE_ROUTE_BASE = "/audience";

export const AUDIENCE_SLUGS = ["airbnb-hosts", "property-managers", "realtors"] as const;

export const audiencePath = (slug: string) => `${AUDIENCE_ROUTE_BASE}/${slug}`;
