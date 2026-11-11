"use client";

import { useEffect, useState } from "react";
import { BookNowButton } from "@/components/ui/BookNowButton";
import { useMenu } from "@/components/layout/MenuContext";
import { ChatIcon, PhoneIcon } from "@/components/ui/Icons";
import { PRICES, SITE, formatPrice } from "@/lib/config";

const SMS_BODY = "Hi FortlyPro, I have a question (from the website)";

/**
 * Mobile-only sticky booking bar. Appears after the hero and hides while the
 * booking widget, the footer or the mobile menu is on screen.
 */
export function MobileBookBar() {
  const { menuOpen } = useMenu();
  const [pastHero, setPastHero] = useState(false);
  const [bookVisible, setBookVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      setPastHero(window.scrollY > (hero ? hero.offsetHeight * 0.55 : 400));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });

    const observers: IntersectionObserver[] = [];
    const watch = (element: Element | null, setVisible: (visible: boolean) => void) => {
      if (!element || !("IntersectionObserver" in window)) return;
      const observer = new IntersectionObserver((entries) =>
        entries.forEach((entry) => setVisible(entry.isIntersecting)),
      );
      observer.observe(element);
      observers.push(observer);
    };
    watch(document.getElementById("book"), setBookVisible);
    watch(document.querySelector("footer"), setFooterVisible);

    return () => {
      window.removeEventListener("scroll", update);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const show = pastHero && !bookVisible && !footerVisible && !menuOpen;

  return (
    <div className={show ? "mbar show" : "mbar"} aria-hidden={!show}>
      <div>
        <b>From {formatPrice(PRICES.starter)}</b>
        No charge until it&apos;s done
      </div>
      <a className="mb-ic" href={SITE.phoneHref} aria-label="Call FortlyPro" tabIndex={show ? 0 : -1}>
        <PhoneIcon />
      </a>
      <a
        className="mb-ic"
        href={`${SITE.smsHref}?&body=${encodeURIComponent(SMS_BODY)}`}
        aria-label="Text FortlyPro"
        tabIndex={show ? 0 : -1}
      >
        <ChatIcon />
      </a>
      <BookNowButton tabIndex={show ? 0 : -1} />
    </div>
  );
}
