import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChatDock } from "@/components/ChatDock";
import { ScrollProgressBar } from "@/components/motion";
import { BRAND } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Tallow & Stone — Design-led renovations, extensions & restorations | Melbourne",
    template: "%s · Tallow & Stone",
  },
  description:
    "A design-led building studio in Gardenvale working across bayside and inner south-east Melbourne. Kitchens, bathrooms, extensions, whole-home renovations and restoration — with a cost plan before you spend a dollar on drawings.",
  keywords: [
    "builder Melbourne",
    "renovation bayside Melbourne",
    "kitchen renovation Hampton",
    "bathroom renovation Brighton",
    "extension builder Melbourne",
    "heritage restoration Melbourne",
  ],
  openGraph: {
    title: "Tallow & Stone — Design-led renovations & extensions",
    description:
      "214 projects across bayside and inner south-east Melbourne since 2011. Honest cost plans, one crew, a 12-month care visit.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <meta name="theme-color" content="#14120f" />
      </head>
      <body className="grain bg-paper text-ink antialiased">
        <ScrollProgressBar />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatDock />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GeneralContractor",
              name: BRAND.legal,
              address: BRAND.address,
              telephone: BRAND.phoneDisplay,
              email: BRAND.email,
              areaServed: "Bayside and inner south-east Melbourne",
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "63" },
            }),
          }}
        />
      </body>
    </html>
  );
}
