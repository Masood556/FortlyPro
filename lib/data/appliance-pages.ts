import type { CleanHeaderContent } from "@/components/sections/WhatWeCleanSection";
import { GALLERY_GROUPS } from "@/lib/data/gallery";
import type { HeroContent } from "@/lib/data/hero";
import type { ApplianceId, GalleryGroup, QuickAnswer } from "@/types";

export interface AppliancePageContent {
  id: ApplianceId;
  /** Route, without a leading slash. */
  slug: string;
  breadcrumbLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: HeroContent;
  quickAnswer: QuickAnswer;
  /** Guide article pill. The /guides pages are not built yet, so it is shown but not linked. */
  guideLabel: string;
  clean: CleanHeaderContent;
  results: { title: string; group: GalleryGroup };
  pricing: { title: string; lede: string };
  faq: { title: string; tabLabel: string; questions: string[] };
}

const STEAM_VIDEO_CAPTION = "Poster still shown as a photo · tap to play";

const galleryGroup = (label: string) => {
  const group = GALLERY_GROUPS.find((candidate) => candidate.label === label);
  if (!group) throw new Error(`Unknown gallery group: ${label}`);
  return group;
};

/** Reference shows labelled placeholders for the disposal photos: no real photos exist yet. */
const DISPOSAL_GALLERY: GalleryGroup = {
  label: "Garbage disposal",
  photos: [
    {
      alt: "Placeholder: garbage disposal splash guard, underside",
      placeholder: "Photo: splash guard, underside",
      stage: "Before",
      title: "Splash guard, underside",
      caption: "Where the smell starts.",
    },
    {
      alt: "Placeholder: steam pass inside a garbage disposal chamber",
      placeholder: "Photo: steam in the chamber",
      stage: "Mid-clean",
      title: "Grinding chamber, steam pass",
      caption: "Grease and buildup off the walls.",
    },
    {
      alt: "Placeholder: garbage disposal chamber wall buildup",
      placeholder: "Photo: chamber wall buildup",
      stage: "Before",
      title: "Chamber walls",
      caption: "What lemons and ice never touch.",
    },
  ],
};

export const APPLIANCE_PAGES: AppliancePageContent[] = [
  {
    id: "washer",
    slug: "washing-machine-cleaning-austin",
    breadcrumbLabel: "Washing machine cleaning",
    metaTitle: "Washing Machine Cleaning in Austin, TX | FortlyPro",
    metaDescription:
      "Clean clothes still smell? We steam deep clean and purify the drum, gasket folds, dispenser and pump filter in your Austin home. From $329.",
    hero: {
      sectionClass: "hero-sub-page",
      eyebrow: "Washing machine cleaning · Austin, TX",
      headline: "Clean clothes still smell?",
      subline: {
        category: "Washing machine deep cleaning & purification",
        supporting:
          "The odor lives in the *gasket folds* and *around the drum*, where tablets and vinegar cycles never reach. We steam‑purify it in your home.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_VIDEO_CAPTION,
    },
    guideLabel: "Guide: get the smell out of a washing machine",
    quickAnswer: {
      heading: "How do you get the smell out of a washing machine?",
      body: "The smell is buildup in the door gasket folds, the dispenser drawer and the drain‑pump filter, not the drum. Cleaning tablets and vinegar cycles freshen the drum and leave the rest. FortlyPro steam deep cleans and purifies all four parts in your Austin home, in place, during a visit of about 2 hours, from $329 as part of a bundle, with nothing charged until the cleaning is done.",
    },
    clean: {
      eyebrow: "What we purify",
      eyebrowLong: " · Front‑load and top‑load",
      title: "Where the grime hides in a washer.",
      instruction: "Four parts carry the smell. **We purify all four**, in place, no disassembly.",
    },
    results: {
      title: "Real Austin washers, before and after.",
      group: galleryGroup("Washing machine"),
    },
    pricing: {
      title: "Your washer is in every bundle.",
      lede: "Pair it with the dryer (Starter), add a third appliance (Pro), or do all four (Full). Paid after the cleaning.",
    },
    faq: {
      title: "Washing machine questions, answered.",
      tabLabel: "Washing machine questions",
      questions: [
        "Why does my washer still smell after I cleaned it?",
        "Do cleaning tablets or a cleaning cycle work?",
        "Will stains on the rubber seal come out?",
        "How often should appliances be purified?",
        "Do you take my appliance apart?",
        "Will this void my warranty or damage the appliance?",
        "When do I pay?",
        "When will you arrive?",
        "How long does it take?",
      ],
    },
  },
  {
    id: "dryer",
    slug: "dryer-cleaning-austin",
    breadcrumbLabel: "Dryer cleaning",
    metaTitle: "Dryer Cleaning in Austin, TX | FortlyPro",
    metaDescription:
      "Towels take two cycles? We vacuum the lint housing from the screen slot down and steam clean the drum, in your Austin home. From $329.",
    hero: {
      sectionClass: "hero-sub-page",
      eyebrow: "Dryer cleaning · Austin, TX",
      headline: "Towels take two cycles?",
      subline: {
        category: "Dryer deep cleaning & purification",
        supporting:
          "The lint that matters is *below the screen*, packed in the housing where you can't see it. We vacuum it out and steam‑clean the drum, in your home.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_VIDEO_CAPTION,
    },
    guideLabel: "Guide: clean a dryer lint housing",
    quickAnswer: {
      heading: "Why does my dryer take two cycles to dry?",
      body: "Usually lint. The screen catches some of it; the rest packs into the housing below the screen slot, where it blocks airflow, makes the dryer run hot and raises fire risk. FortlyPro vacuums the housing out from the screen slot down and steam‑cleans the drum, in your Austin home, in place, from $329 as part of a bundle, with nothing charged until the cleaning is done. The vent duct to the outside is a separate trade.",
    },
    clean: {
      eyebrow: "What we purify",
      eyebrowLong: " · Drum · Lint screen · Lint housing",
      title: "Where the lint hides in a dryer.",
      instruction:
        "Three parts, one of them you've never seen. **We clean all three**, in place, no disassembly.",
    },
    results: {
      title: "Real Austin dryers, before and after.",
      group: galleryGroup("Dryer"),
    },
    pricing: {
      title: "Your dryer is in every bundle.",
      lede: "Pair it with the washer (Starter), add a third appliance (Pro), or do all four (Full). Paid after the cleaning.",
    },
    faq: {
      title: "Dryer questions, answered.",
      tabLabel: "Dryer questions",
      questions: [
        "Do you clean the dryer vent?",
        "How often should appliances be purified?",
        "Do you take my appliance apart?",
        "Will this void my warranty or damage the appliance?",
        "Do you move the appliances?",
        "When do I pay?",
        "When will you arrive?",
        "How long does it take?",
      ],
    },
  },
  {
    id: "dishwasher",
    slug: "dishwasher-cleaning-austin",
    breadcrumbLabel: "Dishwasher cleaning",
    metaTitle: "Dishwasher Cleaning in Austin, TX | FortlyPro",
    metaDescription:
      "Film on clean dishes? We pull and purify the filter, clear the gasket and dispenser, and steam the interior, in your Austin home. From $329.",
    hero: {
      sectionClass: "hero-sub-page",
      eyebrow: "Dishwasher cleaning · Austin, TX",
      headline: "Film on “clean” dishes?",
      subline: {
        category: "Dishwasher deep cleaning & purification",
        supporting:
          "Your dishwasher has a *filter* most owners have never pulled. That's where the film and the sour smell start. We pull it, purify it and steam the rest, in your home.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_VIDEO_CAPTION,
    },
    guideLabel: "Guide: why your dishwasher smells",
    quickAnswer: {
      heading: "Why does my dishwasher smell, and why are my dishes still dirty?",
      body: "Almost always the filter. Every cycle traps food in a filter at the bottom of the tub; left there, it sours and redeposits as a film on glasses and plates. Dishwasher cleaner tablets rinse the tub and miss it. FortlyPro pulls and purifies the filter, clears the gasket and dispenser, and steam‑cleans the interior and spray arm, in your Austin home, in place, from $329 as part of a bundle, with nothing charged until the cleaning is done.",
    },
    clean: {
      eyebrow: "What we purify",
      eyebrowLong: " · Racks · Spray arm · Gasket · Filter · Dispenser",
      title: "Where the grime hides in a dishwasher.",
      instruction:
        "Five parts, one of them most owners have never pulled. **We purify all five**, in place, no disassembly.",
    },
    results: {
      title: "Real Austin dishwashers, before and after.",
      group: galleryGroup("Dishwasher"),
    },
    pricing: {
      title: "Your dishwasher is in every bundle.",
      lede: "Pair it with the disposal (Starter), add a third appliance (Pro), or do all four (Full). Paid after the cleaning.",
    },
    faq: {
      title: "Dishwasher questions, answered.",
      tabLabel: "Dishwasher questions",
      questions: [
        "Do cleaning tablets or a cleaning cycle work?",
        "Can you help with hard‑water buildup?",
        "How often should appliances be purified?",
        "Do you take my appliance apart?",
        "Will this void my warranty or damage the appliance?",
        "What do you use to clean?",
        "When do I pay?",
        "When will you arrive?",
        "How long does it take?",
      ],
    },
  },
  {
    id: "disposal",
    slug: "garbage-disposal-cleaning-austin",
    breadcrumbLabel: "Garbage disposal cleaning",
    metaTitle: "Garbage Disposal Cleaning in Austin, TX | FortlyPro",
    metaDescription:
      "A sink smell that comes back? We degrease and steam‑purify the splash guard and grinding chamber, in your Austin home. From $329.",
    hero: {
      sectionClass: "hero-sub-page",
      eyebrow: "Garbage disposal cleaning · Austin, TX",
      headline: "A sink smell that keeps coming back?",
      subline: {
        category: "Garbage disposal deep cleaning & purification",
        supporting:
          "Lemons and ice hide it for a few minutes. The buildup and grease are in the *grinding chamber* and under the *splash guard*. We degrease and steam‑purify both, in your home.",
      },
      secondaryLink: { label: "See pricing", href: "#pricing", fromPrice: true },
      videoCaption: STEAM_VIDEO_CAPTION,
    },
    guideLabel: "Guide: why your disposal smells",
    quickAnswer: {
      heading: "Why does my garbage disposal smell even after lemons and ice?",
      body: "Lemons and ice freshen the blades for a few minutes; the smell comes from grease and food buildup coating the grinding chamber walls and the underside of the rubber splash guard, which nothing you pour down reaches. FortlyPro lifts and scrubs the splash guard on both sides and degreases and steam‑purifies the chamber, in your Austin home, in place, from $329 as part of a bundle, with nothing charged until the cleaning is done.",
    },
    clean: {
      eyebrow: "What we purify",
      eyebrowLong: " · Splash guard · Grinding chamber",
      title: "Where the smell hides in a disposal.",
      instruction:
        "Two parts nothing you pour down the sink reaches. **We purify both**, in place, no disassembly.",
    },
    results: {
      title: "Real Austin disposals, before and after.",
      group: DISPOSAL_GALLERY,
    },
    pricing: {
      title: "Your disposal is in every bundle.",
      lede: "Pair it with the dishwasher (Starter), add a third appliance (Pro), or do all four (Full). Paid after the cleaning.",
    },
    faq: {
      title: "Disposal questions, answered.",
      tabLabel: "Disposal questions",
      questions: [
        "Do you clean the drain line?",
        "How often should appliances be purified?",
        "Do you take my appliance apart?",
        "Do you repair appliances?",
        "Will this void my warranty or damage the appliance?",
        "What do you use to clean?",
        "When do I pay?",
        "When will you arrive?",
        "How long does it take?",
      ],
    },
  },
];

export function getAppliancePage(id: ApplianceId): AppliancePageContent {
  const page = APPLIANCE_PAGES.find((candidate) => candidate.id === id);
  if (!page) throw new Error(`No appliance page for ${id}`);
  return page;
}
