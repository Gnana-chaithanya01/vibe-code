export const images = {
  blurDataURL: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20"><rect width="16" height="20" fill="#FBF6EC"/><path d="M2 14c3-5 5-7 12-9" fill="none" stroke="#B8913F" stroke-opacity=".35"/></svg>',
  )}`,
  hero: {
    primary: "/images/hero-jewellery.webp",
    secondary: "/images/jhumkas.webp",
  },
  about: "/images/crafted-jewellery.webp",
  collections: [
    "/images/gold-jewellery.webp",
    "/images/necklace.webp",
    "/images/hero-jewellery.webp",
    "/images/jhumkas.webp",
    "/images/crafted-jewellery.webp",
    "/images/bracelet.webp",
  ],
  products: [
    "/images/gold-jewellery.webp",
    "/images/necklace.webp",
    "/images/hero-jewellery.webp",
    "/images/jhumkas.webp",
    "/images/crafted-jewellery.webp",
    "/images/bracelet.webp",
  ],
} as const;
