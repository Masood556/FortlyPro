import { audiencePath, AUDIENCE_ROUTE_BASE } from "@/lib/data/audience-routes";
import { PRICES, formatPrice } from "@/lib/config";
import { AUDIENCE_ICONS } from "@/lib/data/audience-icons";
import { AUDIENCE_FAQ } from "@/lib/data/audience-faq";
import type { HeroContent } from "@/lib/data/hero";
import type { FaqItem } from "@/types";

export type AudienceId = "airbnb" | "pm" | "realtor";

export { AUDIENCE_ROUTE_BASE, audiencePath };

export interface AudiencePageContent {
  id: AudienceId;
  slug: string;
  breadcrumbLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: HeroContent;
  /** The "how it works / book or quote" band. */
  contact: {
    /** Anchor id (the reference's #host-form / #realtor-form). */
    sectionId: string;
    eyebrow: string;
    title: string;
    lede: string;
    /** Single-unit booking block (zip + call/text); absent on the realtor page. */
    singleUnit?: { smsBody: string };
    icons: readonly string[];
  };
  /** Realtor-only referral program band. */
  referral?: { eyebrow: string; title: string; lede: string; perks: string[]; icons: readonly string[] };
  pricing: { eyebrow: string; eyebrowLong: string; title: string; propertyManagerHref: string };
  faq: { title: string; tabLabel: string; items: FaqItem[] };
}

const STEAM_NOTE = "Poster still shown as a photo · tap to play";
const SUBPAGE = "hero-sub-page";

const heroCards = (
  id: AudienceId,
  cards: { title: string; detail: string; note: string; href: string }[],
) =>
  cards.map((card, index) => ({
    ...card,
    icon: AUDIENCE_ICONS[id].cc[index],
  }));

export const AUDIENCE_PAGES: AudiencePageContent[] = [
  {
    id: "airbnb",
    slug: "airbnb-hosts",
    breadcrumbLabel: "Airbnb & short‑term hosts",
    metaTitle: "Appliance Cleaning for Airbnb Hosts, Austin TX | FortlyPro",
    metaDescription:
      "Keep the smell out of the review. Washer, dryer, dishwasher and disposal purified between stays in your Austin short‑term rental. From $329.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "For Airbnb & short‑term hosts · Austin, TX",
      headline: "Keep the smell out of the review.",
      subline: {
        category: "Guest‑ready appliances, on a schedule",
        supporting:
          "A musty washer or a sour dishwasher is the one thing a guest notices and never mentions until the review. We purify all four appliances between stays, in place, on a schedule you set.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_NOTE,
      mediaCards: heroCards("airbnb", [
        { title: "Turnover visit", detail: "All four appliances between stays", note: "Booked around your calendar, keys or lockbox", href: "#book-one" },
        { title: "The Club for hosts", detail: `Twice a year, ${formatPrice(PRICES.club)} a visit`, note: "Keeps ahead of buildup on busy units", href: "#host-form" },
        { title: "Several units", detail: "Scheduled by the unit, one invoice", note: "Tell us the count; we'll map the route", href: "#host-form" },
      ]),
    },
    contact: {
      sectionId: "host-form",
      eyebrow: "How it works for hosts",
      title: "One unit? Book it like any home.",
      lede: "Enter the zip, pick a slot in the gap between guests, tell us how we get in. About two hours, charged after the visit.",
      singleUnit: { smsBody: "Hi FortlyPro, I host a short-term rental and have a question" },
      icons: AUDIENCE_ICONS.airbnb.tl,
    },
    pricing: {
      eyebrow: "Pricing for hosts",
      eyebrowLong: " · Same bundles, per unit",
      title: "What a turnover visit costs.",
      propertyManagerHref: audiencePath("property-managers"),
    },
    faq: { title: "Host questions, answered.", tabLabel: "Host questions", items: AUDIENCE_FAQ.airbnb },
  },
  {
    id: "pm",
    slug: "property-managers",
    breadcrumbLabel: "Property managers",
    metaTitle: "Appliance Cleaning for Apartments, Austin TX | FortlyPro",
    metaDescription:
      "Fewer renter complaints, longer‑lasting appliances. Turnover and retention purification for Austin apartment communities, scheduled by the building.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "For property managers & multifamily owners · Austin, TX",
      headline: "Fewer complaints. Longer‑lasting appliances.",
      subline: {
        category: "Appliance purification for apartment communities",
        supporting:
          "Odor complaints and early replacements both start in the same places: gasket folds, dishwasher filters, lint housings, disposal chambers. We purify all four appliances in place, between tenants and on a schedule, by the building.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_NOTE,
      mediaCards: heroCards("pm", [
        { title: "Renter turnover program", detail: "Every appliance purified between tenants", note: "Move‑in day starts clean; coordinate access with the office", href: "#book-one" },
        { title: "Renter retention program", detail: "Scheduled visits for occupied units", note: "Cuts odor complaints and extends appliance life", href: "#host-form" },
        { title: "Portfolio scheduling", detail: "By the building, one point of contact", note: "Tell us the unit count; we'll map the route", href: "#host-form" },
      ]),
    },
    contact: {
      sectionId: "host-form",
      eyebrow: "How it works for communities",
      title: "One vacant unit? Book it like any home.",
      lede: "Enter the zip, pick a slot, tell us how we get in. About two hours per unit, charged after the visit.",
      // The reference reuses the host text here; kept verbatim.
      singleUnit: { smsBody: "Hi FortlyPro, I host a short-term rental and have a question" },
      icons: AUDIENCE_ICONS.pm.tl,
    },
    pricing: {
      eyebrow: "Pricing for communities",
      eyebrowLong: " · Same bundles, per unit, no surprises",
      title: "What a unit costs.",
      propertyManagerHref: "#host-form",
    },
    faq: { title: "Community questions, answered.", tabLabel: "Community questions", items: AUDIENCE_FAQ.pm },
  },
  {
    id: "realtor",
    slug: "realtors",
    breadcrumbLabel: "Realtors",
    metaTitle: "Appliance Cleaning for Realtors, Austin TX | FortlyPro",
    metaDescription:
      "A closing gift buyers actually use, and showing‑ready listings. FortlyPro appliance purification for Austin agents, plus a referral program.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "For realtors · Austin, TX",
      headline: "A closing gift they'll actually use.",
      subline: {
        category: "Appliance purification for your buyers and your listings",
        supporting:
          "New owners inherit the last family's washer gasket, dishwasher filter and disposal. A FortlyPro visit on move‑in day is the gift that gets talked about.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_NOTE,
      mediaCards: heroCards("realtor", [
        { title: "Closing gift", detail: `Full Bundle · ${formatPrice(PRICES.full)}, booked in your name`, note: "We schedule with your buyer; you get the thank‑you", href: "#realtor-form" },
        { title: "Listing prep", detail: "Showing‑ready appliances before photos", note: "No musty laundry room on the walkthrough", href: "#realtor-form" },
        { title: "Investor & rental clients", detail: "Turnover purification between tenants", note: "Same bundles, scheduled by the unit", href: "#realtor-form" },
      ]),
    },
    contact: {
      sectionId: "realtor-form",
      eyebrow: "How it works for agents",
      title: "Book it for your client. We handle the rest.",
      lede: "Tell us the address and the move‑in or listing date. We coordinate the visit with your client, and your client hears it came from you.",
      icons: AUDIENCE_ICONS.realtor.tl.slice(0, 3),
    },
    referral: {
      eyebrow: "The referral program",
      title: "Refer a client. Get credit for it.",
      lede: "Join once, get your own link and code, and send it to clients who ask about their appliances. Every booking that comes through it is tracked to you.",
      perks: ["Your own referral link and code", "Your client hears it came from you", "Monthly summary of what you referred"],
      icons: AUDIENCE_ICONS.realtor.tl.slice(3),
    },
    pricing: {
      eyebrow: "Pricing for your clients",
      eyebrowLong: " · Same bundles, no markup",
      title: "What a gift or listing visit costs.",
      propertyManagerHref: audiencePath("property-managers"),
    },
    faq: { title: "Realtor questions, answered.", tabLabel: "Realtor questions", items: AUDIENCE_FAQ.realtor },
  },
];

export const getAudiencePage = (id: AudienceId): AudiencePageContent => {
  const page = AUDIENCE_PAGES.find((candidate) => candidate.id === id);
  if (!page) throw new Error(`No audience page for ${id}`);
  return page;
};
