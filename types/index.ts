export type ApplianceId = "washer" | "dryer" | "dishwasher" | "disposal";

export type BundleKey = "starter" | "pro" | "complete" | "club";

export interface PricedBundle {
  name: string;
  price: number;
  /** Original (struck-through) price, when the reference shows one. */
  was?: number;
  /** Suffix shown after the price, e.g. " / visit". */
  unit?: string;
}

export type BundleResult =
  | { ok: true; key: BundleKey; description: string }
  | { ok: false; message: string };

export type ZipCheckResult =
  | { state: "bad" }
  | { state: "no"; zip: string }
  | { state: "ok"; zip: string; area: string };

export interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5;

/** Message shown under the booking widget's zip step. */
export type ZipNotice =
  | { kind: "covered"; area: string }
  | { kind: "bundle"; name: string }
  | { kind: "bad" }
  | { kind: "uncovered"; zip: string };

export interface BookingState {
  step: BookingStep;
  zip: string | null;
  area: string | null;
  appliances: ApplianceId[];
  club: boolean;
  /** Local calendar date as `YYYY-MM-DD`. */
  date: string | null;
  slotIndex: number | null;
  details: BookingDetails | null;
  notice: ZipNotice | null;
}

export interface DateOption {
  iso: string;
  weekdayShort: string;
  weekdayLong: string;
  monthShort: string;
  monthLong: string;
  day: number;
  byRequest: boolean;
}

export interface ApplianceDiagramPart {
  name: string;
  description: string;
  /** Hotspot position as percentages of the diagram box. */
  x: number;
  y: number;
}

export interface ApplianceInfo {
  id: ApplianceId;
  title: string;
  slug: string;
  signs: string;
  cause: string;
  /** Hook headline; `**bold**` segments render as <b>. */
  hook: string;
  cite?: string;
  parts: ApplianceDiagramPart[];
}

export interface Review {
  initials: string;
  name: string;
  quote: string;
}

export interface GalleryPhoto {
  /** Missing until the real photo exists; a labelled placeholder is shown instead. */
  src?: string;
  alt: string;
  /** Placeholder label ("Photo: ...") used while `src` is missing. */
  placeholder?: string;
  stage: "Before" | "Mid-clean";
  title: string;
  caption: string;
}

export interface GalleryGroup {
  label: string;
  photos: GalleryPhoto[];
}

export interface FaqItem {
  question: string;
  /** Render expanded on first load. */
  open?: boolean;
  answer: string;
  link?: { text: string; href: string; after?: string };
}

export interface FaqGroup {
  label: string;
  items: FaqItem[];
}

export interface NavLink {
  label: string;
  href: string;
}

/** Quick-answer block under an appliance hero (answer-first SEO copy). */
export interface QuickAnswer {
  heading: string;
  body: string;
}
