# Sri Meena Jewellers

Editorial jewellery storefront for Sri Meena Jewellers in Dilsukhnagar,
Hyderabad. Built with Next.js App Router, React, TypeScript, Tailwind CSS,
GSAP/ScrollTrigger, Lenis, Motion, Radix UI, Zustand and lucide-react.

## Run locally

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run the quality checks with:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Update store information

Edit `src/config/shop.ts`. It is the shared source for the store name, formatted
address, phone/WhatsApp number, coordinates, opening hours, rating, offers and
indicative gold rates. Update the rate values and `lastUpdated` text before
publishing current rates.

Set the public deployment origin in `.env.local`:

```text
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```

The value is used by canonical and Open Graph metadata, structured data,
`sitemap.xml` and `robots.txt`. Vercel's `VERCEL_URL` is used automatically as a
fallback for preview deployments; the source fallback is `https://example.com`
and must not be used as the production domain.

## Replace sample catalogue data

`src/data/products.ts` contains 16 entries prefixed with `SAMPLE`. Replace their
names, slugs, categories, metal, weight, purity, making-charge percentage,
approximate prices, descriptions and customisation flags with verified store
information. Product pages are generated from these entries. Prices are
informational estimates only; there is no payment or checkout flow.

Change the image paths in `src/config/images.ts`. Product entries select their
two sample views from that central list. The local Unsplash WebP files in
`public/images/` are visual placeholders and may not depict the corresponding
sample piece; replace them with licensed, consistent 4:5 product photographs
before launch.

The current text wordmark is a logo placeholder. When the approved logo is
available, add it under `public/` and replace the text wordmarks in
`src/components/site-header.tsx`, `src/components/intro-screen.tsx` and
`src/components/site-footer.tsx`.

## Deploy to Vercel

1. Import the project repository in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin in the Vercel
   project environment.
3. Replace the sample products, prices, image files and logo before launch.
4. Deploy with the default Next.js build settings (`npm run build`).

## Structure

- `src/app/` — App Router pages, metadata, sitemap and robots routes.
- `src/components/` — shared navigation, intro, product UI, search and enquiry
  bag.
- `src/sections/` — hero, editorial scroll sections, catalogue and visit section.
- `src/config/` — single-source shop details and swappable image paths.
- `src/data/` — sample product catalogue.
- `src/lib/animations/` — reusable GSAP/ScrollTrigger and Lenis integration.

Animations respect reduced-motion preferences. Desktop pinning and smooth scroll
are disabled on mobile or low-power devices; the collection gallery remains
swipeable on smaller screens.
