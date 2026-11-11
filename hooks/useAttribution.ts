"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ATTRIBUTION_STORAGE_KEY, readAttribution, type Attribution } from "@/lib/attribution";

const subscribe = (notify: () => void) => {
  window.addEventListener("storage", notify);
  return () => window.removeEventListener("storage", notify);
};

const getSnapshot = () => {
  try {
    return sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

/** Stored campaign/referral attribution; empty on the server and before hydration. */
export function useAttribution(): Attribution {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "");
  return useMemo(() => (raw ? readAttribution() : {}), [raw]);
}
