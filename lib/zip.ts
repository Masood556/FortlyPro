import type { ZipCheckResult } from "@/types";
import { ZIP_COVERAGE } from "@/lib/data/zip-coverage";

/** Strips non-digits and caps at five characters (input masking). */
export const sanitizeZipInput = (value: string) => value.replace(/\D/g, "").slice(0, 5);

/**
 * Checks a zip against the (mock) coverage table. Any other 787xx zip is
 * treated as general Austin coverage, matching the reference prototype.
 */
export function checkZip(value: string): ZipCheckResult {
  const zip = value.replace(/\D/g, "");
  if (zip.length !== 5) return { state: "bad" };
  const area = ZIP_COVERAGE[zip];
  if (area) return { state: "ok", zip, area };
  if (/^787\d\d$/.test(zip)) return { state: "ok", zip, area: "Austin" };
  return { state: "no", zip };
}
