/** Copy variations for the shared hero section (homepage vs /pricing). */
export interface HeroContent {
  /** Extra class on the section, e.g. "hero-sub-page". */
  sectionClass?: string;
  eyebrow: string;
  headline: string;
  /** Homepage: bordered card with category line and appliance list. */
  card?: { category: string; apps: string[] };
  /**
   * Sub-pages: category line inside the H1 and a supporting paragraph below it.
   * `*word*` segments in `supporting` render as <em>.
   */
  subline?: { category: string; supporting: string };
  /** Pill next to the reviews badge; `fromPrice` prefixes "From $329 ·". */
  secondaryLink: { label: string; href: string; fromPrice?: boolean };
  videoCaption: string;
  /** Replaces the zip form with a mobile-number waitlist form (market not live yet). */
  /** Replaces the video slot with a stack of audience cards (audience pages). */
  mediaCards?: { icon: string; title: string; detail: string; note: string; href: string }[];
  /** Small consent line under the media cards (e.g. SMS opt-in beside the contact cards). */
  mediaNote?: string;
  /**
   * Replaces the default pill row (reviews badge + one link). `fromPrice` prefixes "From $329 ·";
   * `external` opens in a new tab.
   */
  pills?: { label: string; href: string; fromPrice?: boolean; external?: boolean }[];
  /** Zip-form button text (default "See times"). */
  zipButtonLabel?: string;
  waitlist?: { market: string; inputId: string };
}

export const HOME_HERO: HeroContent = {
  eyebrow: "Austin, TX",
  headline: "Your appliances are dirtier than you think.",
  card: {
    category: "Appliance deep cleaning & purification",
    apps: ["washing machine", "dryer", "disposal", "dishwasher"],
  },
  secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
  videoCaption: "Poster: still of the tech steam‑cleaning",
};
