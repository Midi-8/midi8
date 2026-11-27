// Conteúdo do email interno enviado quando alguém preenche o formulário de contacto.
import type { ContactRequest } from "./contact";

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const oneLine = (v: string, max = 200) => v.replace(/[\r\n]+/g, " ").trim().slice(0, max);

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Lisbon",
  }).format(d);

// Formato gerado em src/components/BriefBuilder.tsx (página Serviços). Se mudar lá, mudar aqui.
const BRIEF_HEADINGS: Record<string, string> = {
  "Objetivos:": "Objetivos",
  "Goals:": "Objetivos",
  "Áreas prioritárias:": "Áreas prioritárias",
  "Priority areas:": "Áreas prioritárias",
  "Horizonte:": "Horizonte",
  "Timeline:": "Horizonte",
};
const BRIEF_CLOSINGS = [
  "Gostaria de agendar uma conversa inicial com a midi8 para explorar este projeto.",
  "I would like to schedule an initial conversation with midi8 to discuss this project.",
];
const URGENT = ["Para já (< 1 mês)", "ASAP (< 1 month)"];

/** Separa o briefing do texto livre. O que não encaixa no formato fica em `rest`: nada se perde. */
function parseBrief(message: string) {
  const sections: { title: string; items: string[] }[] = [];
  const rest: string[] = [];
  let current: (typeof sections)[number] | undefined;
  for (const line of message.split(/\r?\n/)) {
    const title = BRIEF_HEADINGS[line.trim()];
    const item = /^\s*-\s+(.+)$/.exec(line)?.[1];
    if (title) {
      current = { title, items: [] };
      sections.push(current);
    } else if (current && item) {
      current.items.push(item.trim());
    } else {
      current = undefined;
      if (!BRIEF_CLOSINGS.includes(line.trim())) rest.push(line);
    }
  }
  // Só é briefing se tiver objetivos ou horizonte e nenhuma secção vazia.
  const isBrief =
    sections.some((s) => s.title !== "Áreas prioritárias") && sections.every((s) => s.items.length > 0);
  if (!isBrief) return { sections: [], rest: message, urgent: false };
  return {
    sections,
    rest: rest.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
    urgent: sections.some((s) => s.title === "Horizonte" && s.items.some((i) => URGENT.includes(i))),
  };
}

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const LABEL = "margin:0 0 6px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;";

export function buildContactEmail(data: ContactRequest, receivedAt: Date = new Date()) {
  const name = oneLine(data.name);
  const company = oneLine(data.company);
  const areas = data.areas.join(", ");
  const brief = parseBrief(data.message);
  const fromBrief = brief.sections.length > 0;
  const message = brief.rest || (fromBrief ? "" : "(sem mensagem)");
  const heading = fromBrief ? "Novo pedido de reunião · com briefing" : "Novo pedido de reunião";
  const received = formatDate(receivedAt);

  const subject = oneLine(`${brief.urgent ? "[Urgente] " : ""}Novo pedido de reunião: ${company} (${name})`);

  const firstName = name.split(" ")[0];
  const replyHref = `mailto:${encodeURIComponent(data.email).replace("%40", "@")}?subject=${encodeURIComponent(
    `midi8 | Reunião com ${company}`,
  )}&body=${encodeURIComponent(`Olá ${firstName},\n\nObrigado pelo seu contacto. `)}`;

  const text = [
    "NOVO PEDIDO DE REUNIÃO",
    `${company} - ${name}`,
    "",
    `Nome:    ${name}`,
    `Empresa: ${company}`,
    `Email:   ${data.email}`,
    `Áreas:   ${areas}`,
    "",
    ...(fromBrief
      ? ["BRIEFING (página Serviços)", ...brief.sections.flatMap((s) => [`${s.title}:`, ...s.items.map((i) => `  - ${i}`)]), ""]
      : []),
    ...(message ? ["MENSAGEM", message, ""] : []),
    "---",
    `Recebido: ${received}`,
    `Basta responder a este email: a resposta segue para ${data.email}.`,
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:10px 0;border-bottom:1px solid #eef0f3;width:90px;font-size:13px;color:#6b7280;">${label}</td><td style="padding:10px 0;border-bottom:1px solid #eef0f3;font-size:15px;color:#0b0f17;word-break:break-word;">${value}</td></tr>`;

  const chips = data.areas
    .map(
      (a) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;background:#eef4ff;color:#0a4fb8;font-size:13px;">${escapeHtml(a)}</span>`,
    )
    .join("");

  const briefHtml = fromBrief
    ? `<tr><td style="padding:16px 28px 0;">
<p style="${LABEL}">Briefing (página Serviços)</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;">
${brief.sections
  .map(
    (s) =>
      `<tr><td style="padding:12px 16px;border-bottom:1px solid #eef0f3;"><p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#0b0f17;">${s.title}</p>${s.items
        .map((i) => `<p style="margin:2px 0;font-size:14px;line-height:1.5;color:#374151;">• ${escapeHtml(i)}</p>`)
        .join("")}</td></tr>`,
  )
  .join("\n")}
</table>
</td></tr>`
    : "";

  const messageHtml = message
    ? `<tr><td style="padding:16px 28px 0;">
<p style="${LABEL}">Mensagem</p>
<div style="padding:16px 18px;background:#f8f9fb;border-left:3px solid #0069f8;border-radius:8px;font-size:15px;line-height:1.6;color:#1f2937;word-break:break-word;">${escapeHtml(message).replace(/\r?\n/g, "<br>")}</div>
</td></tr>`
    : "";

  const urgentBadge = brief.urgent
    ? `<p style="margin:12px 0 0;"><span style="display:inline-block;padding:5px 12px;border-radius:999px;background:#fff1e6;color:#9a3412;font-size:12px;font-weight:700;">Urgente: arranque em menos de 1 mês</span></p>`
    : "";

  const html = `<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:${FONT};">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(`${name} · ${areas} · ${oneLine(message, 90)}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
<tr><td style="height:5px;background:#0069f8;background-image:linear-gradient(90deg,#c015ff,#0069f8,#00e8b2);font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:28px 28px 8px;">
<p style="margin:0 0 20px;font-size:18px;font-weight:700;color:#0b0f17;">midi8</p>
<p style="${LABEL}">${heading}</p>
<h1 style="margin:0;font-size:24px;line-height:1.25;color:#0b0f17;">${escapeHtml(company)}</h1>
<p style="margin:4px 0 0;font-size:15px;color:#4b5563;">${escapeHtml(name)}</p>
${urgentBadge}
</td></tr>
<tr><td style="padding:12px 28px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Nome", escapeHtml(name))}
${row("Empresa", escapeHtml(company))}
${row("Email", `<a href="${escapeHtml(replyHref)}" style="color:#0069f8;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
</table>
</td></tr>
<tr><td style="padding:22px 28px 0;">
<p style="${LABEL}">Áreas de interesse</p>
${chips}
</td></tr>
${briefHtml}
${messageHtml}
<tr><td style="padding:26px 28px 8px;">
<a href="${escapeHtml(replyHref)}" style="display:inline-block;padding:13px 24px;border-radius:999px;background:#0b0f17;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Responder a ${escapeHtml(firstName)}</a>
</td></tr>
<tr><td style="padding:16px 28px 28px;">
<p style="margin:0;padding-top:16px;border-top:1px solid #eef0f3;font-size:12px;line-height:1.7;color:#6b7280;">
Recebido: ${received}<br>
<strong style="color:#0b0f17;">O site promete resposta em 24 horas.</strong><br>
Enviado pelo formulário de contacto. Ao responder, a mensagem segue para o cliente.
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html, text };
}
