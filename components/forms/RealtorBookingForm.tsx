import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/lib/config";

/** Realtor booking / quote request for a buyer or listing (separate from the referral signup). */
export function RealtorBookingForm() {
  return (
    <LeadForm
      kind="realtor_booking"
      bookedBy="customer"
      cardId="quote"
      heading="Set up a closing gift or listing visit"
      sub="We'll reply within one business day with times."
      submitLabel="Request a quote"
      consent="By submitting, you agree to receive texts from FortlyPro."
      showEmailAlternative
      fields={[
        { name: "name", label: "Full name", autoComplete: "name", full: true, required: true, errorMessage: "Add your name." },
        { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
        { name: "units", label: "Properties", type: "select", options: ["1–10", "11–50", "51–200", "200+"] },
        { name: "email", label: "Email", type: "email", autoComplete: "email", full: true, required: true },
      ]}
      success={{ title: "Request received.", message: "We'll be in touch within one business day." }}
      demoSuccess={{
        title: "Quote request ready.",
        message: `Demo only: quote requests aren’t connected yet, so nothing was sent. Email ${SITE.email} to reach us.`,
      }}
    />
  );
}
