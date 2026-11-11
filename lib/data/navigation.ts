import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "What we clean", href: "#clean" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "Service area", href: "#areas" },
  { label: "FAQ", href: "#faq" },
];

export interface FooterColumn {
  heading: string;
  note?: string;
  links: { label: string; href: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Washing machine cleaning", href: "/washing-machine-cleaning-austin" },
      { label: "Dryer cleaning", href: "/dryer-cleaning-austin" },
      { label: "Dishwasher cleaning", href: "/dishwasher-cleaning-austin" },
      { label: "Garbage disposal cleaning", href: "/garbage-disposal-cleaning-austin" },
      { label: "Pricing", href: "/pricing" },
      { label: "The Club", href: "/offers" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    heading: "Areas",
    note: "(some coming soon)",
    links: [
      { label: "Austin", href: "/austin" },
      { label: "Cedar Park & Leander", href: "/cedar-park-leander" },
      { label: "Round Rock & Pflugerville", href: "/round-rock-pflugerville" },
      { label: "Lakeway, Bee Cave & Barton Creek", href: "/lakeway-bee-cave-barton-creek" },
      { label: "Westlake & Rollingwood", href: "/westlake-rollingwood" },
      { label: "Dripping Springs & Driftwood", href: "/dripping-springs-driftwood" },
      { label: "South Austin", href: "/south-austin" },
      { label: "Hutto", href: "/hutto" },
      { label: "Georgetown", href: "/georgetown" },
    ],
  },
  {
    heading: "For",
    links: [
      { label: "Property managers", href: "/property-managers" },
      { label: "Realtors", href: "/realtors" },
      { label: "Airbnb & short‑term hosts", href: "/airbnb-hosts" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Reviews", href: "/reviews" },
      { label: "Guides", href: "/guides" },
      { label: "Leave a review", href: "/review" },
    ],
  },
];
