// Validação do pedido de reunião, partilhada pelo formulário (cliente) e pela API (servidor).

export const AREAS = ["Sistemas Distribuídos", "Automação", "Inteligência Artificial", "Consultoria"] as const;
export type Area = (typeof AREAS)[number];

export type ContactRequest = {
  name: string;
  email: string;
  company: string;
  area: Area | "";
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactRequest, string>>;

export const CONTACT_EMAIL = "midi8.clientes@gmail.com";
export const CONTACT_PHONE = "+351 930 426 057";
export const CONTACT_PHONE_HREF = "tel:+351930426057";
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/midi8/",
  github: "https://github.com/Midi-8",
  instagram: "https://www.instagram.com/midi8.dev/",
  instagramHandle: "@midi8.dev",
} as const;

const LIMITS = { name: 100, email: 254, company: 120, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Normaliza valores desconhecidos (ex.: JSON do pedido) para strings aparadas. */
export function toContactRequest(input: unknown): ContactRequest {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const area = str(o.area);
  return {
    name: str(o.name),
    email: str(o.email),
    company: str(o.company),
    area: (AREAS as readonly string[]).includes(area) ? (area as Area) : "",
    message: str(o.message),
  };
}

export function validateContact(d: ContactRequest): ContactErrors {
  const e: ContactErrors = {};
  if (d.name.length < 2) e.name = "Indique o seu nome.";
  else if (d.name.length > LIMITS.name) e.name = "Nome demasiado longo.";
  if (!EMAIL_RE.test(d.email) || d.email.length > LIMITS.email) e.email = "Indique um email válido.";
  if (d.company.length < 2) e.company = "Indique a empresa.";
  else if (d.company.length > LIMITS.company) e.company = "Nome da empresa demasiado longo.";
  if (!d.area) e.area = "Escolha uma área de interesse.";
  if (d.message.length < 20) e.message = "Descreva o projeto em pelo menos 20 caracteres.";
  else if (d.message.length > LIMITS.message) e.message = "Descrição demasiado longa (máx. 5000).";
  return e;
}

/** Link mailto com o pedido já preenchido (fallback quando o envio falha). */
export function contactMailto(d: ContactRequest): string {
  const subject = `Agendar reunião — ${d.company || d.name || "Midi8"}`;
  const body = [
    `Nome: ${d.name}`,
    `Email: ${d.email}`,
    `Empresa: ${d.company}`,
    `Área: ${d.area}`,
    "",
    d.message,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
