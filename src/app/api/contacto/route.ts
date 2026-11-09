import { CONTACT_EMAIL, toContactRequest, validateContact } from "@/lib/contact";

// Envia o pedido por email via API do Resend (sem dependência).
// Sem RESEND_API_KEY responde 503 e o formulário oferece o fallback mailto.
// shortcut: sem rate limiting; acrescentar (ex.: por IP) se aparecer spam.
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots preenchem o campo escondido "website". Fingimos sucesso.
  if (raw && typeof raw === "object" && (raw as Record<string, unknown>).website) {
    return Response.json({ ok: true });
  }

  const data = toContactRequest(raw);
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "invalid", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Midi8 <site@midi8.com>",
      to: [process.env.CONTACT_TO ?? CONTACT_EMAIL],
      reply_to: data.email,
      subject: `Pedido de reunião — ${data.company} (${data.area})`,
      text: [
        `Nome: ${data.name}`,
        `Email: ${data.email}`,
        `Empresa: ${data.company}`,
        `Área: ${data.area}`,
        "",
        data.message,
      ].join("\n"),
    }),
  }).catch(() => null);

  if (!res?.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
