import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./homepage.css";

export const metadata: Metadata = {
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
