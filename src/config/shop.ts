export const shop = {
  name: "Sri Meena Jewellers",
  tagline: "Timeless Indian Jewellery",
  addressParts: {
    streetAddress:
      "No. 03, 2-740/2, Opposite Thirumala Hills Road, New Gaddiannaram Colony Arch, Dilsukhnagar",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500036",
    addressCountry: "IN",
  },
  address:
    "No. 03, 2-740/2, Opposite Thirumala Hills Road, New Gaddiannaram Colony Arch, Dilsukhnagar, Hyderabad, Telangana 500036",
  phone: "+91 77990 24920",
  whatsapp: "https://wa.me/917799024920",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://example.com"),
  coordinates: {
    latitude: 17.3636289,
    longitude: 78.5165713,
  },
  hours: [
    {
      days: "Monday – Saturday",
      hours: "10:00 AM – 9:00 PM",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "21:00",
    },
    {
      days: "Sunday",
      hours: "11:00 AM – 6:00 PM",
      dayOfWeek: ["Sunday"],
      opens: "11:00",
      closes: "18:00",
    },
  ],
  rating: 4.9,
  offers: [
    "Retail jewellery",
    "Custom-made designs",
    "Jhumkas",
    "Everyday and occasion jewellery",
  ],
  goldRates: {
    twentyTwoK: 6850,
    twentyFourK: 7470,
    lastUpdated: "Indicative sample rate",
  },
} as const;

export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=17.3636289,78.5165713";
