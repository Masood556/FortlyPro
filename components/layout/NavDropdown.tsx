"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavDropdownConfig } from "@/lib/data/navigation";

/** Header dropdown (desktop): grouped links plus an optional "see all" link. */
export function NavDropdown({ label, groups, allLink }: NavDropdownConfig) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const hasCurrent = groups.some((group) => group.links.some((link) => link.href === pathname));

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event.type === "keydown" && (event as KeyboardEvent).key !== "Escape") return;
      if (event.type === "pointerdown" && rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="nav-area"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="nav-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-current={hasCurrent ? "page" : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <svg viewBox="0 0 12 8" width="10" height="7" aria-hidden="true">
          <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div className="nav-menu" id={menuId} hidden={!open}>
        {groups.map((group, index) => (
          <div key={group.label ?? index} className="nav-menu-group">
            {group.label && <p>{group.label}</p>}
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={link.href === pathname ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                    {link.badge && <small>{link.badge}</small>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {allLink && (
          <Link className="nav-menu-all" href={allLink.href} onClick={() => setOpen(false)}>
            {allLink.label}
          </Link>
        )}
      </div>
    </li>
  );
}
