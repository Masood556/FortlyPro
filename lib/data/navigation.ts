import { appliancePath } from "@/lib/data/appliances";
import { audiencePath } from "@/lib/data/audience-routes";
import { LOCATIONS, LOCATION_NAV_GROUPS, getLocation, locationPath } from "@/lib/data/locations";

export interface NavDropdownConfig {
  label: string;
  groups: { label?: string; links: { label: string; href: string; badge?: string }[] }[];
  /** Trailing "see all" link, e.g. the section the item used to point at. */
  allLink?: { label: string; href: string };
}

/** Dropdown contents, referenced by `menu` on a nav item. */
export const NAV_MENUS: Record<"areas", NavDropdownConfig> = {
  areas: {
    label: "Service area",
    groups: LOCATION_NAV_GROUPS.map((group) => ({
      label: group.label,
      links: group.locations.map((location) => ({
        label: location.name,
        href: locationPath(location.slug),
      })),
    })),
    allLink: { label: "Full service map", href: "/#areas" },
  },
};

export interface NavItem {
  label: string;
  /** Destination of the plain link, or of the top-level row on mobile. Omit for a menu-only item. */
  href?: string;
  /** Opens this dropdown on desktop and lists its links under the item on mobile. */
  menu?: keyof typeof NAV_MENUS;
}

/** Header navigation: the reference items; "Service area" opens the location dropdown. */
export const NAV_ITEMS: NavItem[] = [
  { label: "What we clean", href: "/#clean" },
  { label: "Results", href: "/#results" },
  { label: "Pricing", href: "/pricing" },
  { label: "Service area", href: "/#areas", menu: "areas" },
  { label: "FAQ", href: "/#faq" },
];

/** Order of the location links in the footer (as in the reference). */
const FOOTER_AREA_SLUGS = [
  "cedar-park-leander",
  "round-rock-pflugerville",
  "lakeway-bee-cave-barton-creek",
  "westlake-rollingwood",
  "dripping-springs-driftwood",
  "south-austin",
  "hutto",
  "georgetown",
] as const satisfies readonly (typeof LOCATIONS)[number]["slug"][];

export interface FooterColumn {
  heading: string;
  note?: string;
  links: { label: string; href: string }[];
}

/**
 * Footer columns, as in the reference HTML. Appliance links point at the built
 * pages; the other destinations follow the reference URLs and are not built yet.
 */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Washing machine cleaning", href: appliancePath("washing-machine-cleaning-austin") },
      { label: "Dryer cleaning", href: appliancePath("dryer-cleaning-austin") },
      { label: "Dishwasher cleaning", href: appliancePath("dishwasher-cleaning-austin") },
      { label: "Garbage disposal cleaning", href: appliancePath("garbage-disposal-cleaning-austin") },
      { label: "Pricing", href: "/pricing" },
      { label: "The Club", href: "/offers" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    heading: "Areas",
    note: "(some coming soon)",
    // "Austin" has no page yet; the rest come from the location config.
    links: [
      { label: "Austin", href: "/austin" },
      ...FOOTER_AREA_SLUGS.map((slug) => {
        const location = getLocation(slug);
        if (!location) throw new Error(`Unknown location: ${slug}`);
        return { label: location.name, href: locationPath(location.slug) };
      }),
    ],
  },
  {
    heading: "For",
    links: [
      { label: "Property managers", href: audiencePath("property-managers") },
      { label: "Realtors", href: audiencePath("realtors") },
      { label: "Airbnb & short‑term hosts", href: audiencePath("airbnb-hosts") },
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

/** Company column: internal pages first, then contact details. */
export const FOOTER_COMPANY_LINKS: { label: string; href: string }[] = [
  { label: "Our story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];
