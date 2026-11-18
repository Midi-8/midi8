// Validação do pedido de reunião, partilhada pelo formulário (cliente) e pela API (servidor).

export const AREAS = [
  "Web, Software & Mobile",
  "Automação, IA & Dados",
  "Estratégia, Marketing & Campanhas",
  "Consultoria & E-commerce",
] as const;
export type Area = (typeof AREAS)[number];

export const AREA_LABELS: Record<"pt" | "en", Record<Area, string>> = {
  pt: {
    "Web, Software & Mobile": "Web, Software & Mobile",
    "Automação, IA & Dados": "Automação, IA & Dados",
    "Estratégia, Marketing & Campanhas": "Estratégia, Marketing & Campanhas",
    "Consultoria & E-commerce": "Consultoria & E-commerce",
  },
  en: {
    "Web, Software & Mobile": "Web, Software & Mobile",
    "Automação, IA & Dados": "Automation, AI & Data",
    "Estratégia, Marketing & Campanhas": "Strategy, Marketing & Campaigns",
    "Consultoria & E-commerce": "Consulting & E-commerce",
  },
};

export type ContactRequest = {
  name: string;
  email: string;
  company: string;
  areas: Area[];
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactRequest, string>>;

export const CONTACT_EMAIL = "midi8.clientes@gmail.com";
export const CONTACT_PHONE = "+351 930 426 057";
export const CONTACT_PHONE_HREF = "tel:+351930426057";
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/midi8/",
  instagram: "https://www.instagram.com/midi8.dev/",
  instagramHandle: "@midi8.dev",
} as const;

const LIMITS = { name: 100, email: 254, company: 120 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Normaliza valores desconhecidos (ex.: JSON do pedido) para campos válidos. */
export function toContactRequest(input: unknown): ContactRequest {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const validAreas = new Set<string>(AREAS);
  const rawAreas = Array.isArray(o.areas)
    ? o.areas
    : typeof o.area === "string"
      ? [o.area]
      : [];
  const areas = Array.from(
    new Set(rawAreas.map(str).filter((a): a is Area => validAreas.has(a)))
  );
  return {
    name: str(o.name),
    email: str(o.email),
    company: str(o.company),
    areas,
    message: str(o.message),
  };
}

export function validateContact(d: ContactRequest, locale: "pt" | "en" = "pt"): ContactErrors {
  const e: ContactErrors = {};
  if (locale === "en") {
    if (d.name.length < 2) e.name = "Please enter your name.";
    else if (d.name.length > LIMITS.name) e.name = "Name is too long.";
    if (!EMAIL_RE.test(d.email) || d.email.length > LIMITS.email) e.email = "Please enter a valid email address.";
    if (d.company.length < 2) e.company = "Please enter your company name.";
    else if (d.company.length > LIMITS.company) e.company = "Company name is too long.";
    if (d.areas.length === 0) e.areas = "Choose at least one area of interest.";
    return e;
  }

  if (d.name.length < 2) e.name = "Indique o seu nome.";
  else if (d.name.length > LIMITS.name) e.name = "Nome demasiado longo.";
  if (!EMAIL_RE.test(d.email) || d.email.length > LIMITS.email) e.email = "Indique um email válido.";
  if (d.company.length < 2) e.company = "Indique a empresa.";
  else if (d.company.length > LIMITS.company) e.company = "Nome da empresa demasiado longo.";
  if (d.areas.length === 0) e.areas = "Escolha pelo menos uma área de interesse.";
  return e;
}

/** Link mailto com o pedido já preenchido (fallback quando o envio falha). */
export function contactMailto(d: ContactRequest): string {
  const subject = `Agendar reunião — ${d.company || d.name || "Midi8"}`;
  const body = [
    `Nome: ${d.name}`,
    `Email: ${d.email}`,
    `Empresa: ${d.company}`,
    `Áreas: ${d.areas.join(", ")}`,
    "",
    d.message,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
