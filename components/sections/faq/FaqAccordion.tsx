"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { FAQ_GROUPS } from "@/lib/data/faq";

/**
 * Tabbed FAQ. Each question is a native <details>, which gives keyboard and
 * screen-reader behaviour for free; every group stays in the DOM (hidden) so
 * the answers remain crawlable.
 */
export function FaqAccordion() {
  const [activeGroup, setActiveGroup] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectGroup = (index: number, focus = false) => {
    setActiveGroup(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    selectGroup((index + offset + FAQ_GROUPS.length) % FAQ_GROUPS.length, true);
  };

  return (
    <div className="qa rv d1">
      <div className="qtabs" role="tablist" aria-label="Question groups">
        {FAQ_GROUPS.map((group, index) => (
          <button
            key={group.label}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`faq-tab-${index}`}
            aria-selected={activeGroup === index}
            aria-controls={`faq-group-${index}`}
            tabIndex={activeGroup === index ? 0 : -1}
            onClick={() => selectGroup(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div className="qpanel">
        {FAQ_GROUPS.map((group, index) => (
          <div
            key={group.label}
            className="qgroup"
            id={`faq-group-${index}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${index}`}
            hidden={activeGroup !== index}
          >
            {group.items.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <i aria-hidden="true" />
                </summary>
                <div className="ans">
                  {item.answer}
                  {item.link && (
                    <>
                      {" "}
                      <a href={item.link.href}>{item.link.text}</a>
                      {item.link.after}
                    </>
                  )}
                </div>
              </details>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
