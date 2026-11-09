// shortcut: default domain is assumed, set NEXT_PUBLIC_SITE_URL in production.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://midi8.com").replace(/\/$/, "");
