import { FaqAccordion } from "@/components/sections/faq/FaqAccordion";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { ChecklistCallout } from "@/components/ui/ChecklistCallout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/config";

const FAQ_SMS_BODY = "Hi FortlyPro, I have a question (from the FAQ)";

export function FaqSection() {
  return (
    <section className="band alt" id="faq" aria-labelledby="h-faq">
      <div className="wrap faq-one">
        <SectionHeader headingId="h-faq" eyebrow="FAQ" title="Questions, answered." />
        <FaqAccordion />
        <div className="faq-contact rv">
          <p className="anything">Anything else?</p>
          <div className="contact-row">
            <a className="btn btn-ghost" href={SITE.phoneHref}>
              <PhoneIcon />
              Call
            </a>
            <a className="btn btn-ghost" href={`${SITE.smsHref}?&body=${encodeURIComponent(FAQ_SMS_BODY)}`}>
              <ChatIcon />
              Text
            </a>
            <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
              <MailIcon />
              Email
            </a>
          </div>
          <p className="consent">
            By texting, you agree to receive texts from FortlyPro. Reply STOP to opt out.
          </p>
        </div>
        <ChecklistCallout title="Learn more? Text me the appliance checklist." />
      </div>
    </section>
  );
}
