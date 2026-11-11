import type { GalleryGroup } from "@/types";

export const COMPARE_IMAGES = {
  after: {
    src: "/images/asset-2.jpg",
    alt: "Top-load washer rim after a FortlyPro deep clean, residue-free",
  },
  before: {
    src: "/images/asset-3.jpg",
    alt: "The same style of washer rim before cleaning, coated in buildup and grime",
  },
} as const;

export const GALLERY_GROUPS: GalleryGroup[] = [
  {
    label: "Washing machine",
    photos: [
      { src: "/images/asset-4.jpg", alt: "Washer drain-pump filter clogged with sludge and debris", stage: "Before", title: "Washer drain‑pump filter", caption: "The part most owners never knew existed." },
      { src: "/images/asset-5.jpg", alt: "Front-load washer door gasket with dark buildup in the folds", stage: "Before", title: "Front‑load door gasket", caption: "Buildup lives in the folds." },
      { src: "/images/asset-6.jpg", alt: "Technician cleaning inside a front-load washer gasket", stage: "Mid-clean", title: "Gasket, fold by fold", caption: "Cleaned by hand, then steam‑purified." },
      { src: "/images/asset-7.jpg", alt: "Steam wand purifying a washer detergent drawer housing", stage: "Mid-clean", title: "Detergent drawer housing", caption: "Steam reaches what a sponge can't." },
      { src: "/images/asset-8.jpg", alt: "Hand-scrubbing a detergent dispenser tray in a basin", stage: "Mid-clean", title: "Dispenser tray", caption: "Detergent residue, scrubbed out." },
    ],
  },
  {
    label: "Dishwasher",
    photos: [
      { src: "/images/asset-9.jpg", alt: "Dishwasher filter well with food residue and grime", stage: "Before", title: "Dishwasher filter well", caption: "Where “clean” dishes pick up the smell." },
      { src: "/images/asset-10.jpg", alt: "Dishwasher filter assembly removed, coated in buildup", stage: "Before", title: "Dishwasher filters, removed", caption: "Pulled out, degreased, purified." },
      { src: "/images/asset-11.jpg", alt: "Steam wand cleaning a removed appliance filter", stage: "Mid-clean", title: "Filter, steam pass", caption: "Every removable part, purified." },
    ],
  },
  {
    label: "Dryer",
    photos: [
      { src: "/images/asset-12.jpg", alt: "Dryer lint screen caked with lint and film", stage: "Before", title: "Dryer lint screen", caption: "Film and lint block airflow." },
      { src: "/images/asset-13.jpg", alt: "Technician vacuuming lint from a dryer lint housing", stage: "Mid-clean", title: "Dryer lint housing", caption: "Lint vacuumed from the housing, screen slot down." },
    ],
  },
];
