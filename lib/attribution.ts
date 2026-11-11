/**
 * Campaign and referral attribution. Query params on any landing URL are kept
 * for the browser session so they are not lost when a visitor moves between
 * pages, and they are sent as hidden fields with every lead form.
 */
export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
  "gclid",
  "ref",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey | "landing_page", string>>;

const STORAGE_KEY = "fp_attribution";

const readRaw = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

const parse = (raw: string): Attribution => {
  try {
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
};

export const readAttribution = (): Attribution => parse(readRaw());

/** Merges any tracking params in the current URL into the stored attribution. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const stored = readAttribution();
  const next: Attribution = { ...stored };
  let changed = false;

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value && stored[key] !== value) {
      next[key] = value;
      changed = true;
    }
  }
  if (!next.landing_page) {
    next.landing_page = window.location.pathname;
    changed = true;
  }
  if (!changed) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: attribution is simply not persisted */
  }
}

/** Query-string pairs for the stored tracking params (used when handing off to booking). */
export function attributionSearchParams(): URLSearchParams {
  const params = new URLSearchParams();
  const stored = readAttribution();
  for (const key of ATTRIBUTION_KEYS) {
    const value = stored[key];
    if (value) params.set(key, value);
  }
  return params;
}

export const ATTRIBUTION_STORAGE_KEY = STORAGE_KEY;
