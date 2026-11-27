// Correr: node --test src/lib/contactEmail.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContactEmail } from "./contactEmail.ts";

test("escapa o input e não deixa injetar cabeçalhos nem parâmetros mailto", () => {
  const { subject, html, text } = buildContactEmail({
    name: 'Ana "<img src=x>"',
    email: "a&bcc=x@evil.pt",
    company: "ACME\r\nBcc: x@evil.pt",
    areas: ["Web, Software & Mobile"],
    message: "<script>alert(1)</script>\nsegunda linha",
  });
  assert.ok(!/[\r\n]/.test(subject));
  assert.ok(!html.includes("<script>") && !html.includes("<img"));
  assert.ok(html.includes("&#60;script&#62;") && html.includes("<br>segunda linha"));
  assert.ok(html.includes("mailto:a%26bcc%3Dx@evil.pt?"));
  assert.ok(text.includes("segunda linha"));
});

const base = { name: "Ana Ferreira", email: "ana@exemplo.pt", company: "ACME", areas: ["Web, Software & Mobile"] };
const closing = "Gostaria de agendar uma conversa inicial com a midi8 para explorar este projeto.";
const brief = (horizon) =>
  ["Objetivos:", "  - Lançar produto ou website", "", "Áreas prioritárias:", "  - Web & Software", "", "Horizonte:", `  - ${horizon}`, "", closing].join("\r\n");

test("estrutura o briefing de Serviços e marca urgência", () => {
  const { subject, html, text } = buildContactEmail({ ...base, message: brief("Para já (< 1 mês)") });
  assert.ok(subject.startsWith("[Urgente] "));
  assert.ok(html.includes("Briefing (página Serviços)") && html.includes("• Lançar produto ou website"));
  assert.ok(!html.includes(">Mensagem<") && !text.includes(closing));
});

test("não perde texto acrescentado nem trata texto livre como briefing", () => {
  const edited = buildContactEmail({ ...base, message: brief("1 - 3 meses") + "\nTemos pouco orçamento." });
  assert.ok(!edited.subject.startsWith("[Urgente]"));
  assert.ok(edited.text.includes("MENSAGEM\nTemos pouco orçamento."));
  const free = buildContactEmail({ ...base, message: "Objetivos:\nvender mais\n  - online" });
  assert.ok(free.text.includes("vender mais\n  - online") && !free.text.includes("BRIEFING"));
});
