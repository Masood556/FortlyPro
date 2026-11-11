import type { FaqItem } from "@/types";

/** FAQ items for each audience page, extracted from the reference pages. */
export const AUDIENCE_FAQ = {
  airbnb: [
    {
      question: "Can you work around guest check‑in and check‑out?",
      answer:
        "Yes. Tell us the gap between stays and we book inside it. A visit takes about two hours and we arrive within 15 minutes of the booked time, so the turnover window holds.",
      open: true,
    },
    {
      question: "Do I need to be there?",
      answer:
        "No. A lockbox code or a smart‑lock code works. Tell us how we get in and how you'd like it left.",
    },
    {
      question: "Can you handle several units?",
      answer:
        "Yes. Give us the unit count and addresses and we'll schedule them as a route. One point of contact, one invoice.",
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
      question: "Do you take my appliance apart?",
      answer:
        "No. We don't disassemble appliances. We deep clean and purify every part you can reach through routine maintenance: filters, gaskets, drawers, housings. Anything beyond that is a job for an appliance repair company. Regular purification is the cheapest way to avoid that call.",
    },
  ],
  pm: [
    {
      question: "How does the turnover program work?",
      answer:
        "When a unit goes vacant, the office sends us the unit number and the make‑ready date. We purify all four appliances in place before move‑in, coordinate access with your team, and invoice per unit after the visit.",
      open: true,
    },
    {
      question: "What is the retention program?",
      answer:
        "Scheduled visits to occupied units, typically twice a year, so odor complaints stop before they start and appliances last longer. We schedule by building and notify residents the way you prefer.",
    },
    {
      question: "How do you handle access to vacant units?",
      answer:
        "Through your office: keys, lockbox or smart‑lock codes. Tell us your process and we follow it.",
    },
    {
      question: "How is a portfolio invoiced?",
      answer:
        "Per unit, after each visit, rolled up by building. One point of contact for scheduling and one for billing.",
    },
    {
      question: "How often should appliances be purified?",
      answer:
        "From what we see in Austin homes, buildup starts coming back in about 2 months for disposals, 2–4 months for dishwashers and washers, and around 4 months for dryers. Twice a year keeps ahead of it, which is why The Club is built on two visits a year minimum.",
    },
    {
      question: "Do you take my appliance apart?",
      answer:
        "No. We don't disassemble appliances. We deep clean and purify every part you can reach through routine maintenance: filters, gaskets, drawers, housings. Anything beyond that is a job for an appliance repair company. Regular purification is the cheapest way to avoid that call.",
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
  realtor: [
    {
      question: "How does the closing gift work?",
      answer:
        "You send us the buyer's name, address and move‑in date. We reach out to schedule a visit that works for them and purify all four appliances. Your client hears it came from you. You're charged after the visit, same as any booking.",
      open: true,
    },
    {
      question: "Can you purify a listing before photos or showings?",
      answer:
        "Yes. A musty laundry room or a sour dishwasher is the kind of thing buyers notice and don't mention. Book it like any visit; vacant homes are fine, we coordinate access with you.",
    },
    {
      question: "Do I need to be home?",
      answer:
        "Yes, someone needs to be home for the visit. The exception is vacant rentals between tenants, which we coordinate directly with the owner or property manager.",
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
      question: "Do you take my appliance apart?",
      answer:
        "No. We don't disassemble appliances. We deep clean and purify every part you can reach through routine maintenance: filters, gaskets, drawers, housings. Anything beyond that is a job for an appliance repair company. Regular purification is the cheapest way to avoid that call.",
    },
  ],
} satisfies Record<"airbnb" | "pm" | "realtor", FaqItem[]>;
