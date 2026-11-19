import { CONTACT_EMAIL, toContactRequest, validateContact } from "@/lib/contact";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 64 * 1024; // 64 KB — protege contra payloads abusivos sem limitar textos normais
const requestLog = new Map<string, number[]>();

const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isSameOrigin(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "same-site" && secFetchSite !== "none") {
    return false;
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  return true;
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

function isRateLimited(ip: string, now: number): boolean {
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (requestLog.get(ip) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= RATE_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);

  // Evita crescimento ilimitado do mapa em memória
  if (requestLog.size > 1000) {
    for (const [key, timestamps] of requestLog.entries()) {
      if (timestamps.every((ts) => ts <= windowStart)) {
        requestLog.delete(key);
      }
    }
  }

  return false;
}

// Envia o pedido por email via API do Resend (sem dependência).
// Sem RESEND_API_KEY responde 503 e o formulário oferece o fallback mailto.
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ error: "forbidden_origin" }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "unsupported_media_type" }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "payload_too_large" }, 413);
  }

  let rawText: string;
  try {
    rawText = await request.text();
  } catch {
    return jsonResponse({ error: "invalid_body" }, 400);
  }

  if (new TextEncoder().encode(rawText).length > MAX_BODY_BYTES) {
    return jsonResponse({ error: "payload_too_large" }, 413);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(rawText);
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  // Honeypot: bots preenchem o campo escondido "website". Fingimos sucesso.
  if (raw && typeof raw === "object" && (raw as Record<string, unknown>).website) {
    return jsonResponse({ ok: true });
  }

  if (isRateLimited(getClientIp(request), Date.now())) {
    return jsonResponse({ error: "rate_limited" }, 429);
  }

  const data = toContactRequest(raw);
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return jsonResponse({ error: "invalid", errors }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "unconfigured" }, 503);
  }

  const safeCompany = sanitizeHeaderValue(data.company);
  const safeAreas = sanitizeHeaderValue(data.areas.join(", "));

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Midi8 <site@midi8.com>",
      to: [process.env.CONTACT_TO ?? CONTACT_EMAIL],
      reply_to: data.email,
      subject: `Pedido de reunião — ${safeCompany} (${safeAreas})`,
      text: [
        `Nome: ${data.name}`,
        `Email: ${data.email}`,
        `Empresa: ${data.company}`,
        `Áreas: ${data.areas.join(", ")}`,
        "",
        data.message,
      ].join("\n"),
    }),
  }).catch(() => null);

  if (!res?.ok) {
    return jsonResponse({ error: "send_failed" }, 502);
  }
  return jsonResponse({ ok: true });
}
