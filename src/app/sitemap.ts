import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/skills", "/career", "/contact"] as const;
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteMetadata.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
