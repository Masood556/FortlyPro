import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/lib/config";

/** Contact-page property quote request (name, phone, units, email). */
export function ContactQuoteForm() {
  return (
    <LeadForm
      kind="contact_quote"
      bookedBy="customer"
      cardId="quote"
      heading="Request a property quote"
      sub="We'll reply within one business day."
      submitLabel="Request a quote"
      consent="By submitting, you agree to receive texts from FortlyPro."
      showEmailAlternative
      fields={[
        { name: "name", label: "Full name", autoComplete: "name", full: true, required: true, errorMessage: "Add your name." },
        { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
        { name: "units", label: "Units", type: "select", options: ["1–10", "11–50", "51–200", "200+"] },
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
