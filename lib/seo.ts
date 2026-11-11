import { SITE } from "@/lib/config";

/**
 * Public origin used for canonical URLs and structured data. Set
 * NEXT_PUBLIC_SITE_URL per environment; the fallback is the business domain
 * referenced by the reference pages' legal links.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fortlypro.com").replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/** Serialises JSON-LD safely for inlining in a <script> tag. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const BUSINESS = {
  name: SITE.name,
  telephone: "+1-512-548-3089",
  email: SITE.email,
} as const;
