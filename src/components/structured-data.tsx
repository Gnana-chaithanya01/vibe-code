import { shop } from "@/config/shop";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: shop.name,
  url: shop.siteUrl,
  telephone: shop.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: shop.addressParts.streetAddress,
    addressLocality: shop.addressParts.addressLocality,
    addressRegion: shop.addressParts.addressRegion,
    postalCode: shop.addressParts.postalCode,
    addressCountry: shop.addressParts.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: shop.coordinates.latitude,
    longitude: shop.coordinates.longitude,
  },
  openingHoursSpecification: shop.hours.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: entry.dayOfWeek.map(
      (day) => `https://schema.org/${day}`,
    ),
    opens: entry.opens,
    closes: entry.closes,
  })),
};

export function StructuredData() {
  const json = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <script
      dangerouslySetInnerHTML={{ __html: json }}
      type="application/ld+json"
    />
  );
}
