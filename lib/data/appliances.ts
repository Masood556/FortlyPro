import type { ApplianceId, ApplianceInfo } from "@/types";

export const APPLIANCE_ORDER: ApplianceId[] = ["washer", "dryer", "dishwasher", "disposal"];

export const APPLIANCE_NAMES: Record<ApplianceId, string> = {
  washer: "Washer",
  dryer: "Dryer",
  dishwasher: "Dishwasher",
  disposal: "Disposal",
};

/** Order of the "What we purify" tabs in the reference. */
export const TAB_ORDER: ApplianceId[] = ["washer", "dishwasher", "dryer", "disposal"];

export const APPLIANCE_INFO: Record<ApplianceId, ApplianceInfo> = {
  washer: {
    id: "washer",
    title: "Washing machine",
    slug: "washing-machine-cleaning-austin",
    signs: "Clean laundry that still smells musty.",
    cause: "Buildup in the gasket folds and sludge in the pump filter.",
    hook: "Clean clothes still smell? The odor lives in the **gasket folds** and **around the drum**.",
    parts: [
      { name: "Drum", description: "Steam‑cleaned and descaled, top to bottom.", x: 57, y: 52 },
      { name: "Door gasket", description: "Every fold cleaned by hand, then steamed.", x: 35.5, y: 72.7 },
      { name: "Dispenser drawer", description: "Pulled out; detergent and softener residue steamed off.", x: 33.6, y: 16.1 },
      { name: "Drain‑pump filter", description: "Opened, emptied and scrubbed. The part most owners never knew they had.", x: 26.4, y: 86.8 },
    ],
  },
  dishwasher: {
    id: "dishwasher",
    title: "Dishwasher",
    slug: "dishwasher-cleaning-austin",
    signs: "Film on “clean” dishes. A sour smell when you open the door.",
    cause: "Grease and trapped food in the filter.",
    hook: "Your dishwasher has a **filter**. Most owners have never pulled it.",
    parts: [
      { name: "Racks", description: "Scrubbed and steamed, rack by rack.", x: 27, y: 25.7 },
      { name: "Interior & spray arm", description: "Grease and film steamed off; spray holes cleared.", x: 69, y: 40.9 },
      { name: "Door gasket", description: "Food and film cleared from the seal.", x: 18.6, y: 58 },
      { name: "Filter", description: "Pulled, degreased and scrubbed.", x: 50, y: 70.7 },
      { name: "Detergent dispenser", description: "Residue cleared so soap releases cleanly.", x: 50, y: 84.1 },
    ],
  },
  dryer: {
    id: "dryer",
    title: "Dryer",
    slug: "dryer-cleaning-austin",
    signs: "Towels take two cycles. The dryer runs hot.",
    cause: "Lint packed in the housing below the screen.",
    hook: "The lint that matters is **below the screen**, where you can't see it.",
    cite: "Failure to clean is the leading cause of home clothes‑dryer fires. — NFPA",
    parts: [
      { name: "Drum", description: "Steam‑cleaned so lint and residue don't transfer to clothes.", x: 60, y: 52 },
      { name: "Lint screen", description: "Remove lint that blocks airflow & helps reduce fires.", x: 50, y: 74.5 },
      { name: "Lint housing", description: "Lint vacuumed out of the housing, from the screen slot down to the bottom of the compartment.", x: 50, y: 87.7 },
    ],
  },
  disposal: {
    id: "disposal",
    title: "Garbage disposal",
    slug: "garbage-disposal-cleaning-austin",
    signs: "A kitchen smell that comes back no matter what you pour down.",
    cause: "Buildup and grease in the grinding chamber and under the splash guard.",
    hook: "Lemons only hide the smell for a few minutes. The buildup and grease are hiding in the **grinding chamber**.",
    parts: [
      { name: "Splash guard", description: "Lifted and scrubbed on both sides, where the smell starts.", x: 50, y: 46.4 },
      { name: "Grinding chamber", description: "Degreased and steamed; buildup scrubbed off the walls.", x: 50, y: 57.7 },
    ],
  },
};

export const GASKET_NOTE = {
  title: "A note on front‑loader gaskets.",
  body: "The rubber door seal traps grime and odor. We purify it fold by fold, reducing both. Dark stains set into the rubber can be permanent and may not come out. If the seal needs replacing, that's an appliance repair job, often several hundred dollars, one more reason to keep yours purified.",
};

/** Tile copy for the booking widget's appliance step. */
export const BOOKING_TILES: { id: ApplianceId; label: string; detail: string }[] = [
  { id: "washer", label: "Washer", detail: "Drum, gasket, pump filter" },
  { id: "dryer", label: "Dryer", detail: "Drum, lint screen, housing" },
  { id: "dishwasher", label: "Dishwasher", detail: "Racks, filter, gasket" },
  { id: "disposal", label: "Disposal", detail: "Chamber, splash guard, drain" },
];
