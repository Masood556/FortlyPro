import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/lib/config";

/** Portfolio / apartment-community quote request (separate from booking one vacant unit). */
export function PropertyManagerQuoteForm() {
  return (
    <LeadForm
      kind="property_manager_quote"
      bookedBy="customer"
      cardId="quote"
      variant="multi"
      eyebrow="Managing a community?"
      heading="Tell us about your portfolio."
      sub="Units, buildings, and whether you want turnover, retention or both. One point of contact, one invoice per building, reply within one business day."
      submitLabel="Request a quote"
      consent="By submitting, you agree to receive texts from FortlyPro."
      showEmailAlternative
      fields={[
        { name: "name", label: "Full name", autoComplete: "name", full: true, required: true, errorMessage: "Add your name." },
        { name: "company", label: "Company", autoComplete: "organization", full: true },
        {
          name: "role",
          label: "Role",
          type: "select",
          full: true,
          options: ["Property manager", "Owner", "Regional / portfolio", "Leasing or maintenance"],
        },
        { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
        { name: "units", label: "Units in portfolio", type: "select", options: ["10–50", "51–200", "201–500", "500+"] },
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
