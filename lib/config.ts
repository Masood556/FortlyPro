/**
 * Single source of truth for market values shown on the homepage.
 * The reference marks every price/phone/hours value as a market variable,
 * so components read from here instead of hard-coding text.
 */
export const SITE = {
  name: "FortlyPro",
  city: "Austin, TX",
  phoneDisplay: "512‑548‑3089",
  phoneHref: "tel:+15125483089",
  smsHref: "sms:+15125483089",
  email: "book@fortlypro.com",
  googleReviewsUrl: "https://get.fortlypro.com/4m54tyc9",
  waitlistUrl: "https://www.fortlypro.com/waitlist",
  hoursPhone: "Phones answered 24/7.",
  hoursVisit: "Visits Mon–Fri 8am–5pm, Sat–Sun by request.",
  hoursVisitShort: "Visits Mon–Fri 8am–5pm, Sat–Sun by request",
  hoursPhoneShort: "Phones 24/7",
  mobileHours: "Mon–Fri, 8am–5pm",
  replacementCost: "$800+",
} as const;

export const PRICES = {
  starter: 329,
  starterWas: 350,
  pro: 365,
  full: 399,
  fullWas: 450,
  club: 349,
  clubSaving: 50,
  fullMinusPro: 34,
} as const;

export const formatPrice = (amount: number) => `$${amount}`;

/**
 * No booking, quote, checklist or waitlist API is connected yet (the reference
 * marks these handlers as front-end only). While false, success states say so
 * instead of claiming anything was sent.
 */
export const BOOKING_API_CONNECTED = false;
