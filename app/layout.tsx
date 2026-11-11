import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";
import "./homepage.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Appliance Deep Cleaning in Austin, TX | FortlyPro",
  description:
    "Steam deep cleaning and purification for washers, dryers, dishwashers and disposals in your Austin home. From $329, nothing charged until it’s done.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

/**
 * The reference CSS sets smooth scrolling on <html>. data-scroll-behavior tells Next.js to
 * switch it off while it resets the scroll position on route changes, so a new page opens at the top.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
