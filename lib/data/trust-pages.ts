import { PRICES, SITE, formatPrice } from "@/lib/config";
import { CONTACT_ICONS } from "@/lib/data/contact-icons";
import type { HeroContent } from "@/lib/data/hero";
import { TRUST_FAQ, TRUST_FAQ_META } from "@/lib/data/trust-pages-faq";
import type { FaqItem } from "@/types";

export type TrustPageId = "contact" | "offers" | "story" | "reviews";

export interface TrustPageContent {
  id: TrustPageId;
  slug: string;
  breadcrumbLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: HeroContent;
  faq: { title: string; tabLabel: string; items: FaqItem[] };
}

const faqFor = (id: TrustPageId) => ({
  title: TRUST_FAQ_META[id].title,
  tabLabel: TRUST_FAQ_META[id].tab,
  items: TRUST_FAQ[id],
});

const SUBPAGE = "hero-sub-page";
const VIDEO_NOTE = "Poster still shown as a photo · tap to play";
const SEE_PRICING = { label: "See pricing", href: "/pricing", fromPrice: true } as const;

export const TRUST_PAGES: Record<TrustPageId, TrustPageContent> = {
  contact: {
    id: "contact",
    slug: "contact",
    breadcrumbLabel: "Contact",
    metaTitle: "Contact FortlyPro | Austin, TX | FortlyPro",
    metaDescription:
      "Call or text 512‑548‑3089, email book@fortlypro.com, or book online any time. Appliance deep cleaning across Greater Austin, TX. Phones answered 24/7.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "Contact · Austin, TX",
      headline: "Call, text, or book online.",
      subline: {
        category: "*We answer 24/7.* Book online any time.",
        supporting:
          "Fastest is the zip box: pick a time and you're booked. Prefer a person? Call or text and we reply in minutes, not days.",
      },
      secondaryLink: SEE_PRICING,
      videoCaption: VIDEO_NOTE,
      mediaCards: [
        {
          icon: CONTACT_ICONS.cc[0],
          title: "Call",
          detail: SITE.phoneDisplay,
          note: "Tap to call · *answered 24/7*",
          href: SITE.phoneHref,
        },
        {
          icon: CONTACT_ICONS.cc[1],
          title: "Text",
          detail: SITE.phoneDisplay,
          note: "Reply in minutes · 7 days a week",
          href: `${SITE.smsHref}?&body=${encodeURIComponent("Hi FortlyPro, I have a question (from the contact page)")}`,
        },
        {
          icon: CONTACT_ICONS.cc[2],
          title: "Email",
          detail: SITE.email,
          note: "Reply within one business day",
          href: `mailto:${SITE.email}`,
        },
      ],
      mediaNote: "By texting, you agree to receive texts from FortlyPro. Reply STOP to opt out.",
    },
    faq: faqFor("contact"),
  },
  offers: {
    id: "offers",
    slug: "offers",
    breadcrumbLabel: "Offers",
    metaTitle: "FortlyPro Offers | The Club, Austin TX",
    metaDescription:
      "One offer: The Club. All four appliances purified twice a year for $349 a visit instead of $399, paid after each cleaning. No coupons.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "Offers · Austin, TX",
      headline: "One offer. It's a good one.",
      subline: {
        category: `The Club: members save *${formatPrice(PRICES.clubSaving)}* a visit`,
        supporting:
          "We don't run coupons or first‑time discounts. We run one standing offer for people who want their appliances purified on a schedule, and it saves you money every single visit.",
      },
      secondaryLink: { label: "Join The Club", href: "#club" },
      videoCaption: VIDEO_NOTE,
    },
    faq: faqFor("offers"),
  },
  story: {
    id: "story",
    slug: "our-story",
    breadcrumbLabel: "Our story",
    metaTitle: "Our Story | FortlyPro, Austin TX",
    metaDescription:
      "A husband‑and‑wife team who couldn’t find anyone to deep clean their own appliances, learned to do it, and now purify homes across Greater Austin.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "Our story · Austin, TX",
      headline: "It started with our own washer.",
      subline: {
        category: "Owner‑operated appliance purification",
        supporting:
          "We found grime and residue building up in our own appliances, couldn't find anyone to clean them properly, and learned to do it ourselves. The results were eye‑opening, so we started helping our neighbors.",
      },
      secondaryLink: SEE_PRICING,
      videoCaption: VIDEO_NOTE,
    },
    faq: faqFor("story"),
  },
  reviews: {
    id: "reviews",
    slug: "reviews",
    breadcrumbLabel: "Reviews",
    metaTitle: "FortlyPro Reviews | Austin, TX",
    metaDescription:
      "Google reviews from Austin homeowners who had FortlyPro purify their washers, dryers, dishwashers and disposals. Read them, then book online.",
    hero: {
      sectionClass: SUBPAGE,
      eyebrow: "Reviews · Austin, TX",
      headline: "Loved by Austin homeowners.",
      subline: {
        category: "5‑star Google reviews for FortlyPro",
        supporting:
          "Real reviews from real Austin homes, pulled straight from Google. Read them, then see the before and after for yourself.",
      },
      secondaryLink: SEE_PRICING,
      videoCaption: VIDEO_NOTE,
      pills: [
        { label: "See pricing", href: "/pricing", fromPrice: true },
        { label: "Read all on Google", href: SITE.googleReviewsUrl, external: true },
      ],
    },
    faq: faqFor("reviews"),
  },
};

export const OFFER_REASONS = [
  {
    marker: "1",
    title: "The math",
    body: `Full Bundle is ${formatPrice(PRICES.full)} once. The Club is ${formatPrice(PRICES.club)} per visit, twice a year: ${formatPrice(PRICES.clubSaving)} saved each time, and your appliances never get back to “dirtier than you think.”`,
  },
  {
    marker: "2",
    title: "The rhythm",
    body: "In Austin homes, buildup returns in about two months for disposals, two to four for dishwashers and washers, four for dryers. Twice a year keeps ahead of all four.",
  },
  {
    marker: "3",
    title: "No surprises",
    body: "Nothing is charged until each cleaning is done. Two visits a year minimum. Reschedule free up to 24 hours before.",
  },
  {
    marker: "4",
    title: "Why no coupons",
    body: "Our prices are the prices. A coupon would mean we'd been overcharging everyone else. The Club is the only way the price moves, and it moves for people who commit.",
  },
];

export const STORY_LESSONS = [
  {
    marker: "1",
    title: "Nobody cleans the parts that smell.",
    body: "House cleaners wipe the outside. Repair companies fix what's broken. The gasket folds, pump filter, lint housing and splash guard sit in between, and nobody touches them.",
  },
  {
    marker: "2",
    title: "Steam reaches what a sponge can't.",
    body: "High‑heat steam, the right brushes and a few household cleaners break down grease and buildup in place, no disassembly, nothing left behind.",
  },
  {
    marker: "3",
    title: "Twice a year keeps ahead of it.",
    body: "In Austin homes, buildup comes back in about two months for disposals, two to four for dishwashers and washers, four for dryers. Twice a year is the rhythm, which is why The Club exists.",
  },
  {
    marker: "4",
    title: "Show up when you said you would.",
    body: "A fixed appointment time, and we arrive within 15 minutes either side of it, not a four‑hour range. Nothing charged until the cleaning is done, and if it's not done right, we come back.",
  },
];

export const STORY_TEAM = [
  { marker: "✓", title: "Background‑checked", body: "Every FortlyPro tech passes a background check before a first visit." },
  { marker: "✓", title: "Trained by the founders", body: "Each tech learns the FortlyPro process from us, appliance by appliance, before going out alone." },
  { marker: "✓", title: "Fully insured", body: "Your home and your appliances are covered while we work." },
  { marker: "✓", title: "Owner‑operated, Austin‑based", body: "We live here, we book the jobs, and we answer the phone." },
];

/** Contact page copy for the message band. */
export const CONTACT_FORM_COPY = {
  eyebrow: "Send a message",
  title: "Questions, quotes, or a few units at once.",
  lede: "Homeowners: the zip box is faster. Property managers, realtors and hosts: use the form and we'll reply within one business day.",
  areasLabel: "Communities we serve (some coming soon)",
};
