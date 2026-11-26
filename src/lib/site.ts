// Usa NEXT_PUBLIC_SITE_URL se definido; caso contrário usa o domínio de produção da Vercel ou midi8.pt.
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://midi8.pt");

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteDomain = (() => {
  try {
    return new URL(siteUrl).hostname.replace(/^www\./, "");
  } catch {
    return "midi8.pt";
  }
})();
