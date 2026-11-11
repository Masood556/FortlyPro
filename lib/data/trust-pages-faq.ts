import type { FaqItem } from "@/types";

/** FAQ items for the trust & entity pages, extracted from the reference pages. */
export const TRUST_FAQ = {
  contact: [
    {
      question: "Do I need to be home?",
      answer:
        "Yes, someone needs to be home for the visit. The exception is vacant rentals between tenants, which we coordinate directly with the owner or property manager.",
    },
    {
      question: "When will you arrive?",
      answer:
        "At the time you booked. We schedule firm appointment times and arrive within 15 minutes either side, not the 4‑hour window most home services give.",
    },
    {
      question: "How long does it take?",
      answer:
        "A full purification takes about 2 hours. Your tech arrives within a 20‑minute window and confirms by text before arriving.",
    },
    {
      question: "Anything to do before we arrive?",
      answer:
        "Just empty the appliances you're having cleaned. We bring everything else.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve the greater Austin area: Central Austin, Northwest Austin, Cedar Park, Round Rock and more.",
      link: {
        text: "See the map",
        href: "/#areas",
        after:
          " or enter your zip to confirm instantly; a few neighborhoods are still on the waitlist.",
      },
    },
    {
      question: "What if I need to reschedule?",
      answer:
        "Life happens. Reschedule or cancel free of charge up to 24 hours before your appointment. Within 24 hours, the full service fee may apply.",
    },
    {
      question: "When do I pay?",
      answer:
        "Nothing is charged until your cleaning is done. You'll put a card on file when you book, and we charge it after the visit.",
    },
  ],
  offers: [
    {
      question: "Are there any coupons or first‑time discounts?",
      answer:
        "No. Our prices are the prices. The Club is the only way the price moves: $349 a visit instead of $399 for all four appliances, with two visits a year minimum.",
      open: true,
    },
    {
      question: "Can I cancel The Club?",
      answer:
        "The Club is two visits a year. You pay per visit, after each cleaning, so there's no upfront commitment. If you stop after the minimum, you simply stop.",
    },
    {
      question: "How often should appliances be purified?",
      answer:
        "From what we see in Austin homes, buildup starts coming back in about 2 months for disposals, 2–4 months for dishwashers and washers, and around 4 months for dryers. Twice a year keeps ahead of it, which is why The Club is built on two visits a year minimum.",
    },
    {
      question: "When do I pay?",
      answer:
        "Nothing is charged until your cleaning is done. You'll put a card on file when you book, and we charge it after the visit.",
    },
    {
      question: "What if I need to reschedule?",
      answer:
        "Life happens. Reschedule or cancel free of charge up to 24 hours before your appointment. Within 24 hours, the full service fee may apply.",
    },
    {
      question: "What if I'm not happy with the result?",
      answer:
        "If it's not done right, we come back. Tell us within a few days and we'll return to make it right, no charge.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve the greater Austin area: Central Austin, Northwest Austin, Cedar Park, Round Rock and more.",
      link: {
        text: "See the map",
        href: "/#areas",
        after:
          " or enter your zip to confirm instantly; a few neighborhoods are still on the waitlist.",
      },
    },
  ],
  story: [
    {
      question: "Do you take my appliance apart?",
      answer:
        "No. We don't disassemble appliances. We deep clean and purify every part you can reach through routine maintenance: filters, gaskets, drawers, housings. Anything beyond that is a job for an appliance repair company. Regular purification is the cheapest way to avoid that call.",
    },
    {
      question: "What do you use to clean?",
      answer:
        "High‑heat steam does most of the work. Where buildup is heavy, we add the same kinds of household cleaners you already have under your sink, degreaser, vinegar and the like, plus brushes and scrub tools. Everything is rinsed and wiped down before we leave, so there's no residue in your washer, dishwasher or disposal.",
    },
    {
      question: "Will this void my warranty or damage the appliance?",
      answer:
        "No. We only clean the parts your manufacturer tells you to maintain anyway, and we never disassemble the unit.",
    },
    {
      question: "What if I'm not happy with the result?",
      answer:
        "If it's not done right, we come back. Tell us within a few days and we'll return to make it right, no charge.",
    },
    {
      question: "When will you arrive?",
      answer:
        "At the time you booked. We schedule firm appointment times and arrive within 15 minutes either side, not the 4‑hour window most home services give.",
    },
    {
      question: "Do you move the appliances?",
      answer: "We work with them in place whenever we can.",
    },
    {
      question: "What brands and types do you service?",
      answer:
        "All of them. If a particular unit gives us trouble, we'll tell you on the spot.",
    },
  ],
  reviews: [
    {
      question: "What if I'm not happy with the result?",
      answer:
        "If it's not done right, we come back. Tell us within a few days and we'll return to make it right, no charge.",
    },
    {
      question: "Will this void my warranty or damage the appliance?",
      answer:
        "No. We only clean the parts your manufacturer tells you to maintain anyway, and we never disassemble the unit.",
    },
    {
      question: "Do you take my appliance apart?",
      answer:
        "No. We don't disassemble appliances. We deep clean and purify every part you can reach through routine maintenance: filters, gaskets, drawers, housings. Anything beyond that is a job for an appliance repair company. Regular purification is the cheapest way to avoid that call.",
    },
    {
      question: "How often should appliances be purified?",
      answer:
        "From what we see in Austin homes, buildup starts coming back in about 2 months for disposals, 2–4 months for dishwashers and washers, and around 4 months for dryers. Twice a year keeps ahead of it, which is why The Club is built on two visits a year minimum.",
    },
    {
      question: "When do I pay?",
      answer:
        "Nothing is charged until your cleaning is done. You'll put a card on file when you book, and we charge it after the visit.",
    },
    {
      question: "When will you arrive?",
      answer:
        "At the time you booked. We schedule firm appointment times and arrive within 15 minutes either side, not the 4‑hour window most home services give.",
    },
  ],
} satisfies Record<"contact" | "offers" | "story" | "reviews", FaqItem[]>;

export const TRUST_FAQ_META = {
  contact: {
    title: "Visit questions, answered.",
    tab: "Before and on the day",
  },
  offers: {
    title: "Club questions, answered.",
    tab: "Club questions",
  },
  story: {
    title: "How we work, answered.",
    tab: "About how we work",
  },
  reviews: {
    title: "Before you book, answered.",
    tab: "What people ask before booking",
  },
} as const;
