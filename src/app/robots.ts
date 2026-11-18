import type { MetadataRoute } from "next";
import { shop } from "@/config/shop";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${shop.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
