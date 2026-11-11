import { ChecklistIcon } from "@/components/ui/Icons";
import { ChecklistForm } from "@/components/ui/ChecklistForm";

interface ChecklistCalloutProps {
  title: string;
}

/** Inline "text me the appliance checklist" card used mid-page and under the FAQ. */
export function ChecklistCallout({ title }: ChecklistCalloutProps) {
  return (
    <div className="midcap rv">
      <i className="mc-ic">
        <ChecklistIcon />
      </i>
      <div className="midcap-t">
        <b>{title}</b>
        <span>Two minutes, four appliances, the signs that buildup is already there.</span>
      </div>
      <ChecklistForm />
      <p className="consent">By submitting, you agree to receive texts from FortlyPro. Reply STOP to opt out.</p>
    </div>
  );
}
