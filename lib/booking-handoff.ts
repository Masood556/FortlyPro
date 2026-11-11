import type { BundleKey } from "@/types";

const BUNDLE_KEYS: readonly BundleKey[] = ["starter", "pro", "complete", "club"];

export interface BookingHandoff {
  zip?: string;
  bundle?: BundleKey;
}

export const isBundleKey = (value: string | null): value is BundleKey =>
  value !== null && (BUNDLE_KEYS as readonly string[]).includes(value);

/**
 * Link into the homepage booking widget from pages that don't host one
 * (e.g. /pricing). The zip and bundle travel as query params.
 */
export function buildBookingHref({ zip, bundle }: BookingHandoff = {}) {
  const params = new URLSearchParams();
  if (zip) params.set("zip", zip);
  if (bundle) params.set("bundle", bundle);
  const query = params.toString();
  return `/${query ? `?${query}` : ""}#book`;
}
