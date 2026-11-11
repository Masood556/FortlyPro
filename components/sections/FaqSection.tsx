import { FaqAccordion } from "@/components/sections/faq/FaqAccordion";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { ChecklistCallout } from "@/components/ui/ChecklistCallout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/config";
import { FAQ_GROUPS } from "@/lib/data/faq";
import type { FaqGroup } from "@/types";

const FAQ_SMS_BODY = "Hi FortlyPro, I have a question (from the FAQ)";

interface FaqSectionProps {
  title?: string;
  groups?: FaqGroup[];
  idPrefix?: string;
}

export function FaqSection({ title = "Questions, answered.", groups = FAQ_GROUPS, idPrefix = "" }: FaqSectionProps) {
  return (
    <section className="band alt" id={`${idPrefix}faq`} aria-labelledby={`${idPrefix}h-faq`}>
      <div className="wrap faq-one">
        <SectionHeader headingId={`${idPrefix}h-faq`} eyebrow="FAQ" title={title} />
        <FaqAccordion groups={groups} />
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
