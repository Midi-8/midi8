import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = ["", "/solucoes", "/sobre", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    priority: route === "" ? 1 : 0.8,
  }));
}
