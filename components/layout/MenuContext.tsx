"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface MenuContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

/** Shares the mobile-menu state between the navbar and the sticky booking bar. */
export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside <MenuProvider>");
  return context;
}
