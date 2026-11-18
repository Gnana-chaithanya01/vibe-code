import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { IntroScreen } from "@/components/intro-screen";
import { SiteHeader } from "@/components/site-header";
import { shop } from "@/config/shop";
import { images } from "@/config/images";
import { SmoothScroll } from "@/lib/animations/smooth-scroll";
import { StoreHydration } from "@/components/store-hydration";
import { GlobalEnquiryBag } from "@/components/global-enquiry-bag";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { CustomCursor } from "@/components/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(shop.siteUrl),
  title: `${shop.name} | Jewellery Shop in Dilsukhnagar, Hyderabad`,
  description:
    "Discover timeless Indian jewellery, custom-made designs and everyday pieces at Sri Meena Jewellers in Dilsukhnagar, Hyderabad.",
  applicationName: shop.name,
  openGraph: {
    title: `${shop.name} | Jewellery Shop in Dilsukhnagar, Hyderabad`,
    description:
      "Discover timeless Indian jewellery, custom-made designs and everyday pieces in Dilsukhnagar, Hyderabad.",
    siteName: shop.name,
    locale: "en_IN",
    type: "website",
    images: [images.hero.primary],
  },
  twitter: {
    card: "summary_large_image",
    title: `${shop.name} | Jewellery Shop in Dilsukhnagar, Hyderabad`,
    description:
      "Discover timeless Indian jewellery and custom-made designs in Hyderabad.",
    images: [images.hero.primary],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <StructuredData />
        <IntroScreen />
        <SiteHeader />
        <SmoothScroll />
        <StoreHydration />
        <CustomCursor />
        {children}
        <SiteFooter />
        <GlobalEnquiryBag />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
