"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useId } from "react";
import { BookNowButton } from "@/components/ui/BookNowButton";
import { useMenu } from "@/components/layout/MenuContext";
import { SITE } from "@/lib/config";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { NAV_ITEMS, NAV_MENUS } from "@/lib/data/navigation";

/** Shared header + mobile sheet for every page. Active link follows the current route. */
export function Navbar() {
  const { menuOpen, setMenuOpen } = useMenu();
  const pathname = usePathname();
  const sheetId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  // Every page uses the same solid white header (as on the location and other sub-pages).
  const headerClass = ["nav", "scrolled", menuOpen && "open"].filter(Boolean).join(" ");
  const items = NAV_ITEMS;
  const ariaCurrent = (href?: string) => (href && href === pathname ? "page" : undefined);

  return (
    <>
      <header className={headerClass}>
        <div className="wrap">
          <Link className="logo" href="/" aria-label="FortlyPro home">
            <span className="wordmark" aria-hidden="true">
              Fortly<b>Pro</b>
            </span>
            <Image src="/images/asset-1.png" alt="FortlyPro" width={95} height={21} priority />
          </Link>
          <ul>
            {items.map((item) =>
              item.menu ? (
                <NavDropdown key={item.label} {...NAV_MENUS[item.menu]} />
              ) : (
                <li key={item.label}>
                  <Link href={item.href ?? "/"} aria-current={ariaCurrent(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
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
              aria-controls={sheetId}
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
      <nav className="sheet" id={sheetId} aria-label="Mobile">
        {items.map((item) => (
          <Fragment key={item.label}>
            {item.href ? (
              <Link
                href={item.href}
                aria-current={ariaCurrent(item.href)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <p className="sheet-label">{item.label}</p>
            )}
            {item.menu &&
              NAV_MENUS[item.menu].groups.map((group, index) => (
                <div className="sheet-group" key={group.label ?? index}>
                  {group.label && <p>{group.label}</p>}
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={ariaCurrent(link.href)}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
          </Fragment>
        ))}
        <div className="tel-row">
          <span>{SITE.mobileHours}</span>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        </div>
      </nav>
    </>
  );
}
