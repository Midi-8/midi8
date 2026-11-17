import { OG_ALT, OG_SIZE, renderBrandOgImage } from "@/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderBrandOgImage();
}
