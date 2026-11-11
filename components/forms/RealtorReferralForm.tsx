import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/lib/config";

/**
 * Referral-program signup. No reward or incentive is promised, and no referral link/code is
 * shown until the program backend issues one.
 */
export function RealtorReferralForm() {
  return (
    <LeadForm
      kind="realtor_referral"
      bookedBy="realtor"
      cardId="partner"
      variant="partner"
      heading="Join the referral program"
      sub="Your own referral link and code, and a monthly summary of what you sent."
      submitLabel="Join the program"
      consent="By submitting, you agree to receive texts and emails from FortlyPro. Reply STOP to opt out."
      headingOutsideForm
      fields={[
        { name: "name", label: "Full name", autoComplete: "name", full: true, required: true, errorMessage: "Add your name." },
        { name: "brokerage", label: "Brokerage", autoComplete: "organization", full: true },
        { name: "phone", label: "Mobile", type: "tel", autoComplete: "tel", required: true },
        { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
        { name: "closings_per_month", label: "Closings per month", type: "select", full: true, options: ["1–2", "3–5", "6–10", "10+"] },
      ]}
      checks={{
        legend: "I'd use FortlyPro for",
        name: "usage",
        options: [
          { label: "Closing gifts", defaultChecked: true },
          { label: "Listing prep" },
          { label: "Referrals to clients" },
        ],
      }}
      success={{ title: "You're in.", message: "We'll text your referral link within one business day." }}
      demoSuccess={{
        title: "Signup ready.",
        message: `Demo only: the referral program isn’t connected yet, so nothing was sent and no link was issued. Email ${SITE.email} to join.`,
      }}
    />
  );
}
