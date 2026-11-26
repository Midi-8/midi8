import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/sobre",
  "/servicos",
  "/equipa",
  "/contacto",
  "/privacidade",
  "/termos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    priority:
      route === ""
        ? 1
        : route === "/privacidade" || route === "/termos"
          ? 0.5
          : 0.85,
  }));
}
