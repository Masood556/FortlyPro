"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { BookNowButton } from "@/components/ui/BookNowButton";
import { ChevronRight } from "@/components/ui/Icons";
import { APPLIANCE_DIAGRAMS } from "@/lib/data/appliance-diagrams";
import { APPLIANCE_INFO, APPLIANCE_NAMES, GASKET_NOTE, TAB_ORDER } from "@/lib/data/appliances";
import type { ApplianceId } from "@/types";

/** Renders `**bold**` segments as <b> without injecting HTML. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((segment, index) =>
        index % 2 === 1 ? <b key={index}>{segment}</b> : segment,
      )}
    </>
  );
}

export function ApplianceExplorer() {
  const [selected, setSelected] = useState<ApplianceId>("washer");
  const [activePart, setActivePart] = useState<number | null>(null);
  const tabRefs = useRef<Partial<Record<ApplianceId, HTMLButtonElement | null>>>({});
  const thumbRef = useRef<HTMLSpanElement>(null);
  const info = APPLIANCE_INFO[selected];

  // Slide the segmented-control thumb under the selected tab.
  useLayoutEffect(() => {
    const placeThumb = () => {
      const tab = tabRefs.current[selected];
      const thumb = thumbRef.current;
      if (!tab || !thumb) return;
      thumb.style.left = `${tab.offsetLeft}px`;
      thumb.style.width = `${tab.offsetWidth}px`;
    };
    placeThumb();
    window.addEventListener("resize", placeThumb);
    document.fonts?.ready.then(placeThumb);
    return () => window.removeEventListener("resize", placeThumb);
  }, [selected]);

  const select = (id: ApplianceId, focus = false) => {
    setSelected(id);
    setActivePart(null);
    if (focus) tabRefs.current[id]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    select(TAB_ORDER[(index + offset + TAB_ORDER.length) % TAB_ORDER.length], true);
  };

  const partHandlers = (index: number) => ({
    onMouseEnter: () => setActivePart(index),
    onFocus: () => setActivePart(index),
    onMouseLeave: () => setActivePart(null),
    onBlur: () => setActivePart(null),
  });

  return (
    <>
      <div className="seg-wrap rv">
        <div className="seg" role="tablist" aria-label="Appliance">
          <span className="thumb" ref={thumbRef} aria-hidden="true" />
          {TAB_ORDER.map((id, index) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[id] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={selected === id}
              aria-controls="panel"
              tabIndex={selected === id ? 0 : -1}
              onClick={() => select(id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              {APPLIANCE_NAMES[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="panel rv" id="panel" role="tabpanel" aria-labelledby={`tab-${selected}`} aria-live="polite">
        <div className="diag">
          <div className="hook">
            <p>
              <Emphasis text={info.hook} />
            </p>
            {info.cite && <small>{info.cite}</small>}
          </div>
          <div className="diag-in fade" key={`diagram-${selected}`}>
            <svg
              viewBox="0 0 440 440"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: APPLIANCE_DIAGRAMS[selected] }}
            />
            {info.parts.map((part, index) => (
              <span
                key={part.name}
                className={activePart === index ? "hs on" : "hs"}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                aria-hidden="true"
                {...partHandlers(index)}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <div className="dfoot">
            {selected === "washer" && (
              <p className="gnote">
                <i className="gi">i</i>
                <span>
                  <b>{GASKET_NOTE.title}</b> {GASKET_NOTE.body}
                </span>
              </p>
            )}
            <BookNowButton />
          </div>
        </div>

        <div className="copy fade" key={`copy-${selected}`}>
          <h3 className="h3">{info.title}</h3>
          <dl className="sc">
            <div>
              <dt>The signs</dt>
              <dd>{info.signs}</dd>
            </div>
            <div>
              <dt>The cause</dt>
              <dd>{info.cause}</dd>
            </div>
          </dl>
          <ol className="parts">
            {info.parts.map((part, index) => (
              <li
                key={part.name}
                className={activePart === index ? "on" : undefined}
                tabIndex={0}
                {...partHandlers(index)}
              >
                <span className="n">{index + 1}</span>
                <div>
                  <b>{part.name}</b>
                  <span>{part.description}</span>
                </div>
              </li>
            ))}
          </ol>
          <Link className="link more hl" href={`/${info.slug}`}>
            More about {info.title.toLowerCase()} purification <ChevronRight />
          </Link>
        </div>
      </div>
    </>
  );
}
