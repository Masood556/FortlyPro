import Link from "next/link";
import type { QuickAnswer } from "@/types";

interface QuickAnswerSectionProps {
  answer: QuickAnswer;
  /** Links to sibling pages shown under the answer. */
  /** Items without `href` render as non-interactive pills (destination not built yet). */
  related: { label: string; href?: string }[];
  idPrefix?: string;
}

/** Answer-first block under an appliance hero, with links to the other appliance pages. */
export function QuickAnswerSection({ answer, related, idPrefix = "" }: QuickAnswerSectionProps) {
  return (
    <section className="band qa-band" aria-labelledby={`${idPrefix}h-qa`}>
      <div className="wrap">
        <div className="qanswer rv">
          <h2 className="h2 sm" id={`${idPrefix}h-qa`}>
            {answer.heading}
          </h2>
          <p>{answer.body}</p>
        </div>
        <div className="related rv" aria-label="Related">
          <span>Related:</span>
          {related.map((item) => (
            item.href ? (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className="pill-soon" aria-disabled="true">
                {item.label}
              </span>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
