import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/lib/config";

/** Multi-unit inquiry for Airbnb / short-term-rental hosts (not the single-property booking flow). */
export function HostInquiryForm() {
  return (
    <LeadForm
      kind="host_inquiry"
      bookedBy="customer"
      cardId="quote"
      variant="multi"
      eyebrow="Managing more than one?"
      heading="Several units? Let's talk."
      sub="Tell us the count and addresses. We'll map a route, one point of contact, and reply within one business day."
      submitLabel="Request a quote"
      consent="By submitting, you agree to receive texts from FortlyPro."
      showEmailAlternative
      fields={[
        { name: "name", label: "Full name", autoComplete: "name", full: true, required: true, errorMessage: "Add your name." },
        { name: "company", label: "Company or property manager (optional)", autoComplete: "organization", full: true },
        { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
        { name: "units", label: "Units", type: "select", options: ["2–10", "11–50", "51–200", "200+"] },
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
