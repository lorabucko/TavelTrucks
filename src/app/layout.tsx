import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: { default: "TravelTrucks | Campers of your dreams", template: "%s | TravelTrucks" },
  description: "Find your next adventure. Explore campers, compare their features and request your booking with TravelTrucks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Providers><a className="skip-link" href="#main">Skip to content</a><Header />{children}</Providers></body></html>;
}
