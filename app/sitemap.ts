import { MetadataRoute } from "next";
import { getAllProductPaths } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productPaths = await getAllProductPaths();
  const productUrls = productPaths.map(({ category, slug }) => ({
    url: `${BASE}/products/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/inquiry/success`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...productUrls,
  ];
}
