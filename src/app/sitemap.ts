import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getAllProductSlugs } from "@/data/products";

export const dynamic = "force-static";

/** Generates `/sitemap.xml` from the static routes plus every product page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/catalog",
    "/delivery",
    "/about",
    "/contacts",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProductSlugs().map(
    (slug) => ({
      url: `${siteUrl}/product/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...productRoutes];
}
