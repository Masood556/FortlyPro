"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/scroll";

/**
 * Adds the `in` class to every `.rv` element as it scrolls into view
 * (the reference's fade-up reveal). Mount once per page.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
