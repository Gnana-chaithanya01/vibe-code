import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { shop } from "@/config/shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = shop.siteUrl.replace(/\/$/, "");

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
