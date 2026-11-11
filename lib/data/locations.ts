/**
 * Location (service-area) pages. One row per market, copied from the package's
 * locations_config.json (the "Locations" tab of the Market Config workbook).
 * The shared template renders everything from these rows: to open a waitlist
 * market, change its `launchState` to "live". No UI changes are needed.
 */
export type LaunchState = "live" | "waitlist";

export interface LocationConfig {
  slug: string;
  /** Display name, e.g. "Cedar Park & Leander". */
  name: string;
  state: "TX";
  launchState: LaunchState;
  /** Crop of the shared Austin map: centre point and size in map units. */
  map: { cx: number; cy: number; w: number; h: number };
  neighborhoods: string[];
  nearby: string;
  /** Location-specific paragraph shown in the "what's different here" section. */
  local: string;
  /** Answer to "Do you come to <name>?". */
  faqAnswer: string;
  metaTitle: string;
  metaDescription: string;
  /** Navigation grouping only; does not change service coverage. */
  navGroup: "Austin" | "North Austin" | "West Austin";
}

export const LOCATIONS: LocationConfig[] = [
  {
    slug: "cedar-park-leander",
    name: "Cedar Park & Leander",
    state: "TX",
    launchState: "live",
    map: { cx: 442, cy: 297, w: 340, h: 255 },
    neighborhoods: ["Cedar Park", "Leander", "Brushy Creek", "Buttercup Creek", "Ranch at Brushy Creek", "Crystal Falls", "Travisso", "Avery Ranch", "Anderson Mill"],
    nearby: "Round Rock, Jollyville and Northwest Austin",
    local:
      "Cedar Park and Leander are full of 2005–2020 front‑load washers, the kind whose door gaskets hold water in the folds; combined with Central Texas hard water, that's the musty‑laundry smell most of our calls here start with, and the dishwasher filter is usually a first‑time clean.",
    faqAnswer:
      "Yes. Cedar Park and Leander are in our service area: Cedar Park, Leander, Brushy Creek, Buttercup Creek, Crystal Falls, Travisso, Avery Ranch and Anderson Mill. Enter your zip to see times.",
    metaTitle: "Appliance Deep Cleaning in Cedar Park, TX | FortlyPro",
    metaDescription:
      "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in Cedar Park & Leander, TX. In your home, from $329.",
    navGroup: "North Austin",
  },
  {
    slug: "round-rock-pflugerville",
    name: "Round Rock & Pflugerville",
    state: "TX",
    launchState: "live",
    map: { cx: 600, cy: 365, w: 340, h: 255 },
    neighborhoods: ["Round Rock", "Pflugerville", "Teravista", "Forest Creek", "Behrens Ranch", "Brushy Creek", "Wells Branch", "Falcon Pointe", "Blackhawk"],
    nearby: "Hutto, Georgetown and Cedar Park",
    local:
      "Round Rock and Pflugerville run on the same Edwards‑limestone water as the rest of Central Texas, so hard‑water scale builds fast in dishwashers and washers, and most homes here are 1995–2015 builds whose appliances have never had the filter pulled or the lint housing opened.",
    faqAnswer:
      "Yes. Round Rock and Pflugerville are in our service area: Round Rock, Pflugerville, Teravista, Forest Creek, Behrens Ranch, Brushy Creek, Wells Branch, Falcon Pointe and Blackhawk. Enter your zip to see times.",
    metaTitle: "Appliance Deep Cleaning in Round Rock, TX | FortlyPro",
    metaDescription:
      "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in Round Rock & Pflugerville, TX. In your home, from $329.",
    navGroup: "North Austin",
  },
  {
    slug: "hutto",
    name: "Hutto",
    state: "TX",
    launchState: "waitlist",
    map: { cx: 680, cy: 300, w: 340, h: 255 },
    neighborhoods: ["Hutto", "Star Ranch", "Hutto Parke", "Riverwalk", "Brooklands", "Siena"],
    nearby: "Round Rock, Pflugerville and Georgetown",
    local:
      "Hutto is one of the fastest‑growing towns in Williamson County, with whole neighborhoods built since 2010 on hard Central Texas water; newer appliances scale up just as fast as old ones, and a washer that's never had its gasket folds cleaned smells the same at five years as at fifteen.",
    faqAnswer:
      "Hutto is on our waitlist. Join above and we'll text you the day booking opens: Hutto, Star Ranch, Hutto Parke, Riverwalk, Brooklands and Siena.",
    metaTitle: "Appliance Deep Cleaning in Hutto, TX | FortlyPro",
    metaDescription:
      "FortlyPro appliance deep cleaning is coming to Hutto, TX. Join the waitlist for washer, dryer, dishwasher and disposal purification.",
    navGroup: "North Austin",
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    state: "TX",
    launchState: "waitlist",
    map: { cx: 579, cy: 210, w: 340, h: 255 },
    neighborhoods: ["Georgetown", "Sun City", "Wolf Ranch", "Berry Creek", "Teravista", "Old Town", "Serenada"],
    nearby: "Round Rock and Hutto",
    local:
      "Georgetown has one of the fastest‑growing retiree populations in Texas, and appliances in Sun City and Berry Creek homes tend to be well cared for on the outside and never opened up inside; the pump filter and the lint housing are usually first‑time cleans.",
    faqAnswer:
      "Georgetown is on our waitlist. Join above and we'll text you the day booking opens: Georgetown, Sun City, Wolf Ranch, Berry Creek, Teravista, Old Town and Serenada.",
    metaTitle: "Appliance Deep Cleaning in Georgetown, TX | FortlyPro",
    metaDescription:
      "FortlyPro appliance deep cleaning is coming to Georgetown, TX. Join the waitlist for washer, dryer, dishwasher and disposal purification.",
    navGroup: "North Austin",
  },
  {
    slug: "lakeway-bee-cave-barton-creek",
    name: "Lakeway, Bee Cave & Barton Creek",
    state: "TX",
    launchState: "live",
    map: { cx: 360, cy: 520, w: 360, h: 270 },
    neighborhoods: ["Lakeway", "Bee Cave", "Barton Creek", "Steiner Ranch", "Rough Hollow", "Falconhead", "Spanish Oaks", "Lost Creek", "Lake Travis"],
    nearby: "Westlake and West Austin",
    local:
      "Homes around Lake Travis and Barton Creek run on well or MUD water that is some of the hardest in the region, so dishwasher filters and spray arms scale up quickly; larger homes here also mean second laundry rooms and extra disposals that get skipped on the regular clean.",
    faqAnswer:
      "Yes. Lakeway, Bee Cave and Barton Creek are in our service area: Lakeway, Bee Cave, Barton Creek, Steiner Ranch, Rough Hollow, Falconhead, Spanish Oaks, Lost Creek and Lake Travis. Enter your zip to see times.",
    metaTitle: "Appliance Deep Cleaning in Lakeway, TX | FortlyPro",
    metaDescription:
      "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in Lakeway, Bee Cave & Barton Creek, TX. In your home, from $329.",
    navGroup: "West Austin",
  },
  {
    slug: "westlake-rollingwood",
    name: "Westlake & Rollingwood",
    state: "TX",
    launchState: "live",
    map: { cx: 470, cy: 530, w: 320, h: 240 },
    neighborhoods: ["Westlake", "West Lake Hills", "Rollingwood", "Tarrytown", "Davenport Ranch", "Rob Roy", "Eanes"],
    nearby: "Barton Creek, Central Austin and Lakeway",
    local:
      "Westlake and Rollingwood have some of the oldest well‑kept homes in the Austin area, many with original or high‑end appliances that owners would rather keep than replace; purifying the gasket, filter and housing is what keeps a 10‑year‑old washer running like it should.",
    faqAnswer:
      "Yes. Westlake and Rollingwood are in our service area: Westlake, West Lake Hills, Rollingwood, Tarrytown, Davenport Ranch, Rob Roy and Eanes. Enter your zip to see times.",
    metaTitle: "Appliance Deep Cleaning in Westlake, TX | FortlyPro",
    metaDescription:
      "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in Westlake & Rollingwood, TX. In your home, from $329.",
    navGroup: "Austin",
  },
  {
    slug: "dripping-springs-driftwood",
    name: "Dripping Springs & Driftwood",
    state: "TX",
    launchState: "live",
    map: { cx: 250, cy: 690, w: 360, h: 270 },
    neighborhoods: ["Dripping Springs", "Driftwood", "Belterra", "Caliterra", "Headwaters", "Sawyer Ranch"],
    nearby: "Bee Cave and South Austin",
    local:
      "Dripping Springs and Driftwood sit on well water and MUD systems with heavy mineral content, which is why dishwashers here film over and washers scale up faster than in town; new‑build neighborhoods like Belterra and Caliterra are full of five‑year‑old appliances that have never been opened up.",
    faqAnswer:
      "Yes. Dripping Springs and Driftwood are in our service area: Dripping Springs, Driftwood, Belterra, Caliterra, Headwaters and Sawyer Ranch. Enter your zip to see times.",
    metaTitle: "Appliance Deep Cleaning in Dripping Springs, TX | FortlyPro",
    metaDescription:
      "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in Dripping Springs & Driftwood, TX. In your home, from $329.",
    navGroup: "West Austin",
  },
  {
    slug: "south-austin",
    name: "South Austin",
    state: "TX",
    launchState: "live",
    map: { cx: 470, cy: 690, w: 360, h: 270 },
    neighborhoods: ["Circle C", "Manchaca", "Buda", "Sunset Valley", "Shady Hollow", "Oak Hill", "South Lamar", "Slaughter Lane"],
    nearby: "Dripping Springs, Central Austin and Westlake",
    local:
      "South Austin is a mix of 1970s ranch homes with second‑hand appliances and new builds in Circle C and Buda on hard city water; the one thing they share is a dishwasher filter and a washer gasket that nobody has ever cleaned, which is where the sour smell and the film on glasses start.",
    faqAnswer:
      "Yes. South Austin is in our service area: Circle C, Manchaca, Buda, Sunset Valley, Shady Hollow, Oak Hill, South Lamar and Slaughter Lane. Enter your zip to see times.",
    metaTitle: "Appliance Deep Cleaning in South Austin, TX | FortlyPro",
    metaDescription:
      "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in South Austin, TX. In your home, from $329.",
    navGroup: "Austin",
  },
];

/** URL prefix of the location pages, e.g. /location/cedar-park-leander. */
export const LOCATION_ROUTE_BASE = "/location";

export const locationPath = (slug: string) => `${LOCATION_ROUTE_BASE}/${slug}`;

export const getLocation = (slug: string): LocationConfig | undefined =>
  LOCATIONS.find((location) => location.slug === slug);

/** Like getLocation, but throws for an unknown slug (used by the static route files). */
export function requireLocation(slug: string): LocationConfig {
  const location = getLocation(slug);
  if (!location) throw new Error(`Unknown location: ${slug}`);
  return location;
}

/** Rounds half values to the nearest even integer, matching how the reference crops were computed. */
const roundHalfEven = (value: number) => {
  const floor = Math.floor(value);
  const diff = value - floor;
  if (diff < 0.5) return floor;
  if (diff > 0.5) return floor + 1;
  return floor % 2 === 0 ? floor : floor + 1;
};

/** SVG viewBox for a location's crop of the shared map. */
export const mapViewBox = ({ cx, cy, w, h }: LocationConfig["map"]) =>
  `${roundHalfEven(cx - w / 2)} ${roundHalfEven(cy - h / 2)} ${w} ${h}`;

export const NAV_GROUP_ORDER: LocationConfig["navGroup"][] = ["Austin", "North Austin", "West Austin"];

/** Locations grouped for navigation menus, in a stable order. */
export const LOCATION_NAV_GROUPS = NAV_GROUP_ORDER.map((group) => ({
  label: group === "Austin" ? "Austin area" : `${group} area`,
  locations: LOCATIONS.filter((location) => location.navGroup === group),
}));
