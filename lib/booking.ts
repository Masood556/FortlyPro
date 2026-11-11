import type {
  ApplianceId,
  BundleKey,
  BundleResult,
  DateOption,
  PricedBundle,
} from "@/types";
import { PRICES, formatPrice } from "@/lib/config";
import { APPLIANCE_NAMES, APPLIANCE_ORDER } from "@/lib/data/appliances";

export const BUNDLES: Record<BundleKey, PricedBundle> = {
  starter: { name: "Starter Bundle", price: PRICES.starter, was: PRICES.starterWas },
  pro: { name: "Pro Bundle", price: PRICES.pro },
  complete: { name: "Full Bundle", price: PRICES.full, was: PRICES.fullWas },
  club: { name: "The Club", price: PRICES.club, unit: " / visit" },
};

/** Appliances preselected when a pricing card CTA is clicked. */
export const BUNDLE_PRESETS: Record<BundleKey, ApplianceId[]> = {
  starter: ["washer", "dryer"],
  pro: ["washer", "dryer", "dishwasher"],
  complete: APPLIANCE_ORDER,
  club: APPLIANCE_ORDER,
};

/** Arrival slots as [hour, minute] in 24h time. */
export const TIME_SLOTS: ReadonlyArray<readonly [number, number]> = [
  [8, 0],
  [10, 30],
  [13, 0],
  [15, 0],
];

const ARRIVAL_WINDOW_MINUTES = 20;

/** Resolves which bundle (if any) the selected appliances qualify for. */
export function resolveBundle(appliances: ApplianceId[], club: boolean): BundleResult {
  const has = (id: ApplianceId) => appliances.includes(id);
  switch (appliances.length) {
    case 0:
      return { ok: false, message: "Select the appliances you want cleaned. Bundles start at two." };
    case 1:
      return { ok: false, message: "Bundles start at two appliances. Add one more to continue." };
    case 2:
      if (has("washer") && has("dryer")) {
        return { ok: true, key: "starter", description: "Washer + Dryer" };
      }
      if (has("dishwasher") && has("disposal")) {
        return { ok: true, key: "starter", description: "Dishwasher + Disposal" };
      }
      return {
        ok: false,
        message: `Starter pairs washer + dryer, or dishwasher + disposal. Add a third appliance for Pro at ${formatPrice(PRICES.pro)}.`,
      };
    case 3:
      return { ok: true, key: "pro", description: "Any 3 appliances" };
    default:
      return club
        ? {
            ok: true,
            key: "club",
            description: `All 4 appliances, recurring. Saves ${formatPrice(PRICES.clubSaving)} every visit.`,
          }
        : { ok: true, key: "complete", description: "All 4 appliances" };
  }
}

export const orderedApplianceNames = (appliances: ApplianceId[]) =>
  APPLIANCE_ORDER.filter((id) => appliances.includes(id)).map((id) => APPLIANCE_NAMES[id]);

export function formatTime(hour: number, minute: number) {
  const meridiem = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${meridiem}`;
}

/** e.g. "8:00–8:20 AM" style window used on the time step and receipt. */
export function formatArrivalWindow(slotIndex: number) {
  const [hour, minute] = TIME_SLOTS[slotIndex];
  const end = new Date(2000, 0, 1, hour, minute + ARRIVAL_WINDOW_MINUTES);
  const start = formatTime(hour, minute).replace(/ (AM|PM)$/, "");
  return `${start}–${formatTime(end.getHours(), end.getMinutes())}`;
}

export const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const fromIsoDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/** The next 14 days, starting tomorrow. Weekends are "by request" only. */
export function buildDateOptions(today: Date, count = 14): DateOption[] {
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(base);
    date.setDate(base.getDate() + index + 1);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    return {
      iso: toIsoDate(date),
      weekdayShort: date.toLocaleDateString("en-US", { weekday: "short" }),
      weekdayLong: date.toLocaleDateString("en-US", { weekday: "long" }),
      monthShort: date.toLocaleDateString("en-US", { month: "short" }),
      monthLong: date.toLocaleDateString("en-US", { month: "long" }),
      day: date.getDate(),
      byRequest: weekend,
    };
  });
}

/**
 * MOCK availability: deterministic pseudo-random "booked" slots so the UI can
 * show disabled states. Replace with the live calendar (e.g. GoHighLevel).
 */
export function isSlotOpen(iso: string, slotIndex: number) {
  const date = fromIsoDate(iso);
  const k = (date.getDate() * 7 + date.getMonth() * 3 + slotIndex * 5) % 9;
  return k !== 0 && k !== 4;
}

export const formatShortDate = (iso: string) =>
  fromIsoDate(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
