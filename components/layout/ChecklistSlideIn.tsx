"use client";

import { useEffect, useRef, useState } from "react";
import { ChecklistForm } from "@/components/ui/ChecklistForm";

const STORAGE_KEY = "fp_slidein";
const SCROLL_TRIGGER = 0.6;
const EXIT_INTENT_MIN_WIDTH = 900;
const CLOSE_ANIMATION_MS = 300;

type Phase = "idle" | "mounted" | "visible" | "closed";

const readFlag = () => {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
};

const writeFlag = () => {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* storage unavailable: the prompt may reappear next visit */
  }
};

/** Once-per-visitor "text me the checklist" prompt: after 60% scroll or exit intent. */
export function ChecklistSlideIn() {
  const [phase, setPhase] = useState<Phase>("idle");
  const blockedRef = useRef(false);
  const shownRef = useRef(false);

  useEffect(() => {
    blockedRef.current = readFlag();

    const show = () => {
      if (shownRef.current || blockedRef.current) return;
      shownRef.current = true;
      writeFlag();
      setPhase("mounted");
      requestAnimationFrame(() => setPhase("visible"));
    };
    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (depth > SCROLL_TRIGGER) show();
    };
    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget && event.clientY <= 0 && window.innerWidth > EXIT_INTENT_MIN_WIDTH) show();
    };
    // Any submitted form means the visitor has already engaged: stop prompting.
    const onSubmit = () => {
      blockedRef.current = true;
      writeFlag();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("submit", onSubmit);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  const close = () => {
    setPhase("mounted");
    window.setTimeout(() => setPhase("closed"), CLOSE_ANIMATION_MS);
  };

  return (
    <div
      className={phase === "visible" ? "slidein on" : "slidein"}
      role="dialog"
      aria-label="Text me the appliance checklist"
      hidden={phase === "idle" || phase === "closed"}
    >
      <button className="si-x" type="button" aria-label="Close" onClick={close}>
        &times;
      </button>
      <b>Not ready to book yet?</b>
      <span>Text me the free appliance checklist: the signs buildup is already there.</span>
      <ChecklistForm />
      <p className="consent">By submitting, you agree to receive texts from FortlyPro. Reply STOP to opt out.</p>
    </div>
  );
}
