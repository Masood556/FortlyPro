"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookNowButton } from "@/components/ui/BookNowButton";
import { useMenu } from "@/components/layout/MenuContext";
import { SITE } from "@/lib/config";
import { NAV_LINKS } from "@/lib/data/navigation";

/** Header turns white once the hero has been scrolled past. */
function useScrolledPastHero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      setScrolled(window.scrollY > (hero ? hero.offsetHeight - 120 : 8));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
}

export function Navbar() {
  const { menuOpen, setMenuOpen } = useMenu();
  const scrolled = useScrolledPastHero();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  const headerClass = ["nav", scrolled && "scrolled", menuOpen && "open"].filter(Boolean).join(" ");

  return (
    <>
      <header className={headerClass} id="nav">
        <div className="wrap">
          <a className="logo" href="#top" aria-label="FortlyPro home">
            <span className="wordmark" aria-hidden="true">
              Fortly<b>Pro</b>
            </span>
            <Image src="/images/asset-1.png" alt="FortlyPro" width={95} height={21} priority />
          </a>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="right">
            <a className="tel" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
            <BookNowButton className="btn btn-primary btn-sm" />
            <button
              className="menu-btn"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="sheet"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i>
                <span />
                <span />
              </i>
            </button>
          </div>
        </div>
      </header>
      <nav className="sheet" id="sheet" aria-label="Mobile">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <div className="tel-row">
          <span>{SITE.mobileHours}</span>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        </div>
      </nav>
    </>
  );
}
