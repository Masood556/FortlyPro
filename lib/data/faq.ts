import type { FaqGroup } from "@/types";

export const FAQ_GROUPS: FaqGroup[] = [
  {
    label: "Before you book",
    items: [
      {
        question: "Do you take my appliance apart?",
        answer:
          "No. We don't disassemble appliances. We deep clean and purify every part you can reach through routine maintenance: filters, gaskets, drawers, housings. Anything beyond that is a job for an appliance repair company. Regular purification is the cheapest way to avoid that call.",
      },
      {
        question: "Will this void my warranty or damage the appliance?",
        answer:
          "No. We only clean the parts your manufacturer tells you to maintain anyway, and we never disassemble the unit.",
      },
      {
        question: "When do I pay?",
        answer:
          "Nothing is charged until your cleaning is done. You'll put a card on file when you book, and we charge it after the visit.",
      },
      {
        question: "How do I know my appliance needs it?",
        answer:
          "Musty laundry, a film on “clean” dishes, towels that need two cycles, a sink smell that keeps coming back. If you notice any of those, the buildup is already there.",
      },
      {
        question: "What if I'm not happy with the result?",
        answer:
          "If it's not done right, we come back. Tell us within a few days and we'll return to make it right, no charge.",
      },
    ],
  },
  {
    label: "The service",
    items: [
      {
        question: "How is this different from me cleaning it myself?",
        answer:
          "Store‑bought cleaners and vinegar cycles freshen the surface. We open filters, gaskets, drawers and housings and purify them with high‑heat steam, which reaches the buildup that causes the smell and poor performance.",
      },
      {
        question: "Do cleaning tablets or a cleaning cycle work?",
        answer:
          "They help with the drum. They don't reach the gasket folds, the pump filter or the dispenser housing, which is where the smell lives.",
      },
      {
        question: "Why does my washer still smell after I cleaned it?",
        answer:
          "Because the smell isn't in the drum. It's in the door gasket folds and the drain‑pump filter, two spots most people have never seen. That's where we start.",
      },
      {
        question: "What do you use to clean?",
        answer:
          "High‑heat steam does most of the work. Where buildup is heavy, we add the same kinds of household cleaners you already have under your sink, degreaser, vinegar and the like, plus brushes and scrub tools. Everything is rinsed and wiped down before we leave, so there's no residue in your washer, dishwasher or disposal.",
      },
      {
        question: "How often should appliances be purified?",
        answer:
          "From what we see in Austin homes, buildup starts coming back in about 2 months for disposals, 2–4 months for dishwashers and washers, and around 4 months for dryers. Twice a year keeps ahead of it, which is why The Club is built on two visits a year minimum.",
      },
      {
        question: "Will stains on the rubber seal come out?",
        answer:
          "The buildup and odor, yes. Dark stains that have set into the rubber can be permanent and may not come out. If the seal needs replacing, that's a job for an appliance repair company.",
      },
      {
        question: "Can you help with hard‑water buildup?",
        answer:
          "Yes. We use solutions made to break down hard‑water residue, and the high‑heat steam helps finish the job. We don't work on water lines or plumbing; that's a different service.",
      },
      {
        question: "Do you clean the dryer vent?",
        answer:
          "Not yet. We purify the drum, lint screen and lint housing. The vent duct that runs to the outside is a separate trade, and we may add it later.",
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
      {
        question: "Do you repair appliances?",
        answer:
          "No. If something's broken, an appliance repair company is the right call. Regular purification is the best way to avoid needing one.",
      },
      {
        question: "Do you clean ovens, microwaves or fridges?",
        answer: "Not yet. Microwave and oven purification is coming soon.",
        link: {
          text: "Join the waitlist",
          href: "https://www.fortlypro.com/waitlist",
          after: " and we'll let you know.",
        },
      },
    ],
  },
  {
    label: "Day of",
    items: [
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
          href: "#areas",
          after:
            " or enter your zip to confirm instantly; a few neighborhoods are still on the waitlist.",
        },
      },
      {
        question: "What if I need to reschedule?",
        answer:
          "Life happens. Reschedule or cancel free of charge up to 24 hours before your appointment. Within 24 hours, the full service fee may apply.",
      },
    ],
  },
];
